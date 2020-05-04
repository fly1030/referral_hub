import { List, Button, Modal, Form, Select, Input } from 'antd'
import { Companies, Company } from 'lib/companies'
import MainHead from 'components/MainHead'
import { useState, useEffect } from 'react'
import { loadDB } from 'lib/db'
import { GetServerSideProps } from 'next'

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
	const caseID = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	const firebase = loadDB();
	const user = firebase.auth().currentUser;
	if (user == null) {
		console.log('no logged in user');
		return;
	}

	const userEmail = user.email;
	const firestore = firebase.firestore();
	firestore.collection('cases').doc(caseID).set({
	  caseID: caseID,
	  candidateEmail: userEmail,
	  company: company,
	  positions : positions,
	  caseStatus: 'requested',
	  referrerEmail: '',
	  resume: resume,
	});
  }

async function getCasesByCandidate() {
	const firebase = loadDB();
	const user = firebase.auth().currentUser;
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
			visible={props.company != null}
			onOk={() => {
				const companyName = props.company?.name;
				if (companyName == null) {
					console.log('Must provide company name');
					return;
				}
				writeCasesData(companyName, formData.positions, formData.resume);
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

function getActionName(
	item: Company, 
	referredCases: Array<{[key: string]: any}>,
): string {
	referredCases.forEach((row) => {		
		if (row.company === item.key) {
		return 'Show Status';
	}})
	return 'Refer me';
}

function Status() {
	const [referCompany, setReferCompany] = useState<Company | null>(null)
	const [referredCases, setReferredCases] = useState<Array<any>>([]);

	useEffect(() => {
		async function getCases() {
			const cases = await getCasesByCandidate();
			setReferredCases(cases);
		}
		getCases();
	}, [])
	return (
		<>
			<MainHead title="Status" />
			<div className="flex justify-center">
				<List
					style={style.list}
					itemLayout="horizontal"
					dataSource={Companies}
					renderItem={(item) => {
						const actions = [
							<Button type="primary" onClick={() => setReferCompany(item)}>
								{getActionName(item, referredCases)}
							</Button>,
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
					company={referCompany}
					onClose={() => setReferCompany(null)}
					onSubmit={() => {
						
						console.log('submit!')
					}}
				/>
			</div>
		</>
	)
}

export default Status
