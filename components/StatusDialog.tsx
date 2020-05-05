import { Modal, Form, Card } from "antd";
import { Company } from "lib/companies";

function StatusDialog(props: { 
    visible: boolean,
    company: Company | null, 
    referredCases: Array<{[key: string]: any}>,
	onClose: () => void,
	}) {
    const {company, visible, referredCases, onClose} = props;
    if (company == null) {
        return null;
    }

    const filteredCases = referredCases.filter((row) => row.company === company.name);
    if (filteredCases.length < 1) {
        return null;
    }
    const filteredCase = filteredCases[0];
	return (
		<Modal
			title={<h2>Case Status</h2>}
			visible={visible}
			onOk={onClose}
			onCancel={onClose}
		>
			<Form labelAlign="left" labelCol={{ span: 4, offset: 0 }}>
				<Form.Item label="Case ID" name="caseID">
                    <Card bodyStyle={{paddingBottom: 0, paddingTop: 0}}>{filteredCase.caseID}</Card>
				</Form.Item>
                <Form.Item label="Company" name="company">
                    <Card bodyStyle={{paddingBottom: 0, paddingTop: 0}}>{filteredCase.company}</Card>
				</Form.Item>
                <Form.Item label="Status" name="caseStatus">
                    <Card bodyStyle={{paddingBottom: 0, paddingTop: 0}}>{filteredCase.caseStatus}</Card>
				</Form.Item>
				<Form.Item label="Referrer" name="referrer">
                    <Card bodyStyle={{paddingBottom: 0, paddingTop: 0}}>
                        {filteredCase.referrerEmail != null && filteredCase.referrerEmail.length > 0 ? 
                        filteredCase.referrerEmail : 
                        'TBD'}
                    </Card>
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default StatusDialog