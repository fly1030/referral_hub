import { List, Button, Modal, Form, Select, Input } from 'antd'
import { Companies, Company } from 'lib/companies'
import MainHead from 'components/MainHead'
import { useState, useEffect } from 'react'
import { loadDB } from 'lib/db'
import StatusDialog from 'components/StatusDialog'
import { User } from 'firebase'
import PageTopBar from '../components/PageTopBar'

const style = {
	list: {
		maxWidth: 1024,
		width: '100%',
	},
	logo: {
		width: 'auto',
		height: 32,
	},
}
type ReferralData = {
	positions: Array<string>
	resume: string
}

function writeCasesData(
	company: string, 
	positions: Array<string>, 
	resume: string,
) {
	const firebase = loadDB();
	const user = firebase.auth().currentUser;
	if (user == null) {
		console.log('no logged in user');
		return;
	}

	const userEmail = user.email;
	const caseID = (((1+Math.random())*0x10000)|0).toString(16).substring(1) + (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	const firestore = firebase.firestore();
	const createTime = new Date().toDateString();
	firestore.collection('cases').doc(caseID).set({
	  caseID: caseID,
	  candidateEmail: userEmail,
	  company: company,
	  positions : positions,
	  caseStatus: 'Requested',
	  createTime: createTime,
	  referrerEmail: '',
	  resume: resume,
	});
  }

async function getCasesByCandidate(user: User | null) {
	const firebase = loadDB();
	const data: Array<any> = [];
	if (user == null) {
		return data;
	}
	const userEmail = user.email;
	const firestore = firebase.firestore();
	const snapshot = await firestore.collection('cases').get();
	snapshot.forEach((doc) => data.push(doc.data()))
	return data.filter(row => row.candidateEmail === userEmail);
}

function ReferralDialog(props: {
	visible: boolean, 
	company: Company | null,
	onClose: () => void,
	onSubmit: (data: ReferralData) => void,
	}) {
	const [formData, setFormData] = useState<ReferralData>(() => {
		return {
			positions: [],
			resume: '',
		}
	})
	return (
		<Modal
			title={
				<div className="flex justify-center items-center">
					<img className="mr1" style={style.logo} src={`/img/logos/${props.company?.key}.png`} />
					<span>{props.company?.name}</span>
				</div>
			}
			visible={props.visible}
			onOk={() => {
				const companyName = props.company?.name;
				if (companyName == null) {
					console.log('Must provide company name');
					return;
				}
				writeCasesData(companyName, formData.positions, formData.resume);
				props.onClose();
				console.log('REFER')

			}}
			onCancel={props.onClose}
		>
			<Form initialValues={formData} labelAlign="left" labelCol={{ span: 4, offset: 0 }}>
				<Form.Item label="Positions" name="positions" rules={[{ required: true, message: 'Provide your desired positions' }]}>
					<Select mode="multiple" placeholder="Please select" onChange={() => {}} style={{ width: '100%' }}></Select>
				</Form.Item>
				<Form.Item label="Resume" name="resume" rules={[{ required: true, message: 'Enter a link to your resume' }]}>
					<Input.Group compact>
						<Select placeholder="Resume" value="Resume" dropdownClassName="no-width-override">
							<Select.Option value="Option1-1">Previous resume 1</Select.Option>
							<Select.Option value="Option1-2">Previous resume 2</Select.Option>
						</Select>

						<Input style={{ width: 300 }} placeholder="resume link.." />
					</Input.Group>
				</Form.Item>
			</Form>
		</Modal>
	)
}

function actionButton(
	item: Company, 
	referredCases: Array<{[key: string]: any}>,
	onReferClick: (item: Company) => void,
	onShowStatusClick: () => void,
) {
	let actionButton = <Button type="primary" onClick={() => onReferClick(item)}>
		Refer me
	</Button>;
	referredCases.forEach((row) => {		
		if (row.company === item.name) {
			actionButton = <Button type="primary" onClick={() => onShowStatusClick()}>
				Show Status
			</Button>;
			return;
		}
	})
	return actionButton;
}

function Status() {
	const [referCompany, setReferCompany] = useState<Company | null>(null);
	const [user, setUser] = useState<User | null>(null)
	const [referredCases, setReferredCases] = useState<Array<any>>([]);
	const [isStatusDialogVisible, setIsStatusDialogVisible] = useState<boolean>(false);
	const [isReferralDialogVisible, setIsReferralDialogVisible] = useState<boolean>(false);

	useEffect(() => {
		async function getCases() {
			const cases = await getCasesByCandidate(user);
			setReferredCases(cases);
		}
		getCases();
	}, [user, isReferralDialogVisible])

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

	return (
		<>
			<MainHead title="Status" />
			<PageTopBar
				isLoggedIn={user != null}
				onLogout={() => {
					const firebase = loadDB();
					firebase.auth().signOut();
					setUser(null);
					window.location.href="/";
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
								setReferCompany(item);
								setIsReferralDialogVisible(true);
							}, 
							() => {
								setReferCompany(item);
								setIsStatusDialogVisible(true);
							});
						const actions = [
							dialogActionButton,
							<Button danger type="link">
								Cancel
							</Button>,
						]
						return (
							<List.Item actions={actions}>
								<List.Item.Meta avatar={<img style={style.logo} src={`/img/logos/${item.key}.png`} />} description={item.name} />
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
				<StatusDialog
					visible={isStatusDialogVisible}
					onClose={() => setIsStatusDialogVisible(false)}
					company={referCompany}
					referredCases={referredCases}
				/>
			</div>
		</>
	)
}

export default Status
