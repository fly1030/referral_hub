
import { Modal, Button, Select, Form, Input} from 'antd';
import { useState } from 'react';
import { Companies } from 'lib/companies'
import { loadDB } from 'lib/db';
const { Option } = Select;

function writeReferrerData(
	currentComppany: string, 
	companyEmail: string,
) {
	const firebase = loadDB();
	const user = firebase.auth().currentUser;
	if (user == null) {
		console.log('no logged in user');
		return;
	}

    const userEmail = user.email;
    if (userEmail == null) {
		console.log('user has no proper email address');
		return;
	}
	const firestore = firebase.firestore();
	firestore.collection('referrers').doc(userEmail).set({
	  company: currentComppany,
	  loginEmail: userEmail,
	  companyEmail: companyEmail,
	});
  }

function ReferrerInfoFormModal(props: {
    visible: boolean, 
    onCancel: () => void, 
    onConfirm: () => void}) {
    const [currentComppany, setCurrentCompany] = useState<string | null>(null);
    const [companyEmail, setCompanyEmail] = useState<string | null>(null);

    const companyList = Companies.map(company => <Option value={company.name} key={company.name}>{company.name}</Option>);
    companyList.push(<Option value='Others' key='Others'>{'Others'}</Option>);
     
    return (
        <Modal
            title="Tell us more about you"
            visible={props.visible}
            onOk={props.onConfirm}
            onCancel={props.onCancel}
            footer={[
                <Button key="back" onClick={() => {
                    if (currentComppany != null && companyEmail != null) {
                        writeReferrerData(currentComppany, companyEmail);
                    }
					props.onConfirm();
					window.location.href="/AvailableCases";
                }}>
                    OK
                </Button>,
            ]}>
			<Form initialValues={{positions: '', resume: ''}} labelAlign="left">
				<Form.Item label="Company" name="company" rules={[{required: true}]}>
					<Select 
						placeholder="Please select your current company" 
						onChange={(value) => {setCurrentCompany(value)}} 
						defaultValue={"Please select your current company"}
						style={{ width: '100%' }}>
						{companyList.map(company => company)}
					</Select>
				</Form.Item>
				<Form.Item label="Company Email" name="companyEmail" rules={[{required: true}]}>
					<Input.Group compact>
						<Input 
						 style={{ width: '100%' }} 
						 placeholder="Company Email Address.." 
						 defaultValue=""
						 onChange={(e) => {setCompanyEmail(e.target.value)}}
						/>
					</Input.Group>
				</Form.Item>
			</Form>
        </Modal>
    );
}

export default ReferrerInfoFormModal