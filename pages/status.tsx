import { List, Button, Modal, Form, Select, Input, Spin, Tooltip } from 'antd'
import { Companies, Company } from 'lib/companies'
import MainHead from 'components/MainHead'
import { useState, useEffect, ReactNode } from 'react'
import { loadDB } from 'lib/db'
import StatusDialog from 'components/StatusDialog'
import { User } from 'firebase'
import PageTopBar from '../components/PageTopBar'
import { PositionsList } from 'lib/PositionsList'
import CaseCancelConfirmModal from 'components/CaseCancelConfirmationModal'
import { CloseCircleOutlined } from '@ant-design/icons'
import JobIDSelector from 'components/JobIDSelector'
const { Option } = Select

const style = {
	list: {
		maxWidth: 1024,
		width: '100%',
	},
	logo: {
		width: 'auto',
		height: 32,
	},
	statusButtonStyle: {
		marginTop: 4,
		width: 100,
	},
}

function writeCasesData(company: string, positions: Array<string>, resume: string, yoe: number, comments: string, jobIDs: Array<string>) {
	const firebase = loadDB()
	const user = firebase.auth().currentUser
	if (user == null) {
		console.log('no logged in user')
		return
	}

	const candidateEmail = user.email
	const name = user.displayName
	const caseID = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
	const firestore = firebase.firestore()
	const createTime = new Date().toDateString()
	firestore.collection('cases').doc(caseID).set({
		caseID,
		candidateEmail,
		candidateName: name,
		yoe,
		company,
		positions,
		jobIDs,
		caseStatus: 'Requested',
		createTime,
		referrerEmail: '',
		resume,
		comments,
	})
}

async function cancelCases(caseID: string) {
	const firebase = loadDB()
	const user = firebase.auth().currentUser
	if (user == null) {
		console.log('no logged in user')
		return
	}

	const firestore = firebase.firestore()
	firestore.collection('cases').doc(caseID).delete()
}

async function getCasesByCandidate(user: User | null) {
	const firebase = loadDB()
	const data: Array<any> = []
	if (user == null) {
		return data
	}
	const userEmail = user.email
	const firestore = firebase.firestore()
	const snapshot = await firestore.collection('cases').get()
	snapshot.forEach((doc) => data.push(doc.data()))
	return data.filter((row) => row.candidateEmail === userEmail)
}

function ReferralDialog(props: { visible: boolean; company: Company | null; onClose: () => void; onSubmit: () => void }) {
	const [positions, setPositions] = useState<Array<string>>([])
	const [resume, setResume] = useState<string>('')
	const [comments, setComments] = useState<string>('')
	const [yoe, setYoe] = useState<number | null>(null)
	const [jobIDs, setJobIDs] = useState<Array<string>>([])

	const positionOptions: Array<ReactNode> = []
	PositionsList.forEach((position) => {
		positionOptions.push(
			<Option value={position} key={position}>
				{position}
			</Option>,
		)
	})
	const YoEOptions: Array<ReactNode> = []
	for (let i = 0; i < 30; i++) {
		YoEOptions.push(
			<Option value={i} key={i}>
				{i}
			</Option>,
		)
	}
	return (
		<Modal
			title={
				<div className="flex justify-center items-center">
					<img className="mr1" style={style.logo} src={`/img/logos/${props.company?.key}.png`} />
					<span>{props.company?.name}</span>
				</div>
			}
			visible={props.visible}
			okButtonProps={{
				disabled: !positions || positions.length === 0 || !resume || !yoe || !jobIDs || jobIDs.length === 0,
			}}
			onOk={() => {
				const companyName = props.company?.name
				if (companyName == null) {
					console.log('Must provide company name')
					return
				}
				writeCasesData(companyName, positions, resume, yoe ?? 0, comments, jobIDs)
				props.onClose()
			}}
			onCancel={props.onClose}
		>
			<Form initialValues={{ positions: [], resume: '' }} labelAlign="left" labelCol={{ span: 4, offset: 0 }}>
				<Form.Item label="Category" name="positions" rules={[{ required: true, message: 'Provide your desired positions' }]}>
					<Select
						mode="multiple"
						placeholder="Please select"
						onChange={(value) => {
							setPositions(value)
						}}
						defaultValue={[]}
						style={{ width: '100%' }}
					>
						{positionOptions}
					</Select>
				</Form.Item>
				<Form.Item label="JobIDs" name="jobIDs" rules={[{ required: true, message: 'Enter interested job IDs' }]}>
					<JobIDSelector
						jobIDs={jobIDs}
						onSelectorChange={(value: Array<string>) => {
							setJobIDs(value)
						}}
						careerPage={props.company?.careerPage}
					/>
				</Form.Item>
				<Form.Item label="Resume" name="resume" rules={[{ required: true, message: 'Enter a link to your resume' }]}>
					<Input.Group compact>
						<Input
							style={{ width: '100%' }}
							placeholder="Link to your resume, google drive, dropbox, etc.."
							defaultValue=""
							onChange={(e) => {
								setResume(e.target.value)
							}}
						/>
					</Input.Group>
				</Form.Item>
				<Form.Item label="YoE" name="yoe" rules={[{ required: true, message: 'Years of experiences' }]}>
					<Input.Group compact>
						<Select
							placeholder="Years of experiences..."
							onChange={(value: number) => {
								setYoe(value)
							}}
							style={{ width: '100%' }}
						>
							{YoEOptions}
						</Select>
					</Input.Group>
				</Form.Item>
				<Form.Item label="Comments" name="comments" rules={[{ required: false, message: 'Enter comments for your application' }]}>
					<Input.Group compact>
						<Input
							style={{ width: '100%' }}
							placeholder="Anythig else you want to add..."
							defaultValue=""
							onChange={(e) => {
								setComments(e.target.value)
							}}
						/>
					</Input.Group>
				</Form.Item>
			</Form>
		</Modal>
	)
}

function actionButton(
	item: Company,
	referredCases: Array<{ [key: string]: any }>,
	onReferClick: (item: Company) => void,
	onShowStatusClick: () => void,
	onCancelClick: (item: Company) => void,
) {
	let actionButton = [
		<Button type="primary" onClick={() => onReferClick(item)} style={style.statusButtonStyle}>
			Refer me
		</Button>,
		<Button danger type="link" disabled={true} onClick={() => onCancelClick(item)}>
			<CloseCircleOutlined />
		</Button>,
	]
	referredCases.forEach((row) => {
		if (row.company === item.name) {
			actionButton = [
				<Button type="primary" onClick={() => onShowStatusClick()} style={style.statusButtonStyle}>
					Status
				</Button>,
				<Button danger type="link" onClick={() => onCancelClick(item)}>
					<CloseCircleOutlined />
				</Button>,
			]
			return
		}
	})
	return actionButton
}

function Status() {
	const [referCompany, setReferCompany] = useState<Company | null>(null)
	const [user, setUser] = useState<User | null>(null)
	const [referredCases, setReferredCases] = useState<Array<any>>([])
	const [isStatusDialogVisible, setIsStatusDialogVisible] = useState<boolean>(false)
	const [isReferralDialogVisible, setIsReferralDialogVisible] = useState<boolean>(false)
	const [isCancellationDialogVisible, setIsCancellationDialogVisible] = useState<boolean>(false)

	useEffect(() => {
		async function getCases() {
			const cases = await getCasesByCandidate(user)
			setReferredCases(cases)
		}
		getCases()
	}, [user, isReferralDialogVisible, isCancellationDialogVisible])

	useEffect(() => {
		const firebase = loadDB()
		firebase.auth().onAuthStateChanged((user) => {
			if (user != null) {
				setUser(user)
			} else {
				setUser(null)
			}
		})
	}, [])

	if (user == null) {
		return (
			<>
				<MainHead title="Yes Onward" />
				<PageTopBar
					isLoggedIn={user != null}
					onLogout={() => {
						const firebase = loadDB()
						firebase.auth().signOut()
						setUser(null)
						window.location.href = '/'
					}}
					onLoginClicked={() => {}}
				/>
				<div style={{ textAlign: 'center', paddingTop: 20 }}>
					<Spin size="large" />
				</div>
			</>
		)
	}

	return (
		<>
			<MainHead title="Yes Onward" />
			<PageTopBar
				isLoggedIn={user != null}
				onLogout={() => {
					const firebase = loadDB()
					firebase.auth().signOut()
					setUser(null)
					window.location.href = '/'
				}}
				onLoginClicked={() => {}}
			/>
			<div className="flex justify-center">
				<List
					style={style.list}
					itemLayout="horizontal"
					dataSource={Companies}
					renderItem={(item) => {
						const dialogActionButton = actionButton(
							item,
							referredCases,
							() => {
								setReferCompany(item)
								setIsReferralDialogVisible(true)
							},
							() => {
								setReferCompany(item)
								setIsStatusDialogVisible(true)
							},
							() => {
								setReferCompany(item)
								setIsCancellationDialogVisible(true)
							},
						)
						return (
							<List.Item actions={dialogActionButton}>
								<Tooltip placement="topLeft" title={item.name}>
									<List.Item.Meta avatar={<img style={style.logo} src={`/img/logos/${item.key}.png`} />} />
								</Tooltip>
							</List.Item>
						)
					}}
				/>
				<ReferralDialog
					visible={isReferralDialogVisible}
					company={referCompany}
					onClose={() => setIsReferralDialogVisible(false)}
					onSubmit={() => {
						console.log('submit!')
					}}
				/>
				<CaseCancelConfirmModal
					visible={isCancellationDialogVisible}
					company={referCompany}
					referredCases={referredCases}
					onCancel={() => setIsCancellationDialogVisible(false)}
					onConfirm={async (caseID: string) => {
						await cancelCases(caseID)
						setIsCancellationDialogVisible(false)
					}}
				/>
				<StatusDialog visible={isStatusDialogVisible} onClose={() => setIsStatusDialogVisible(false)} company={referCompany} referredCases={referredCases} />
			</div>
		</>
	)
}

export default Status
