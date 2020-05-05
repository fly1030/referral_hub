import { Modal, Form, Card, Steps, Tooltip } from "antd";
import { Company } from "lib/companies";
const { Step } = Steps;
import {ReferralSteps} from 'lib/ReferralSteps'


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
    let stepNumber = undefined;
    ReferralSteps.forEach(stepObject => {
        if (stepObject.id === filteredCase.caseStatus) {
            stepNumber = stepObject.number;
        }
    })
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
                <Form.Item label="Created on" name="createTime">
                    <Card bodyStyle={{paddingBottom: 0, paddingTop: 0}}>{filteredCase.createTime}</Card>
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
                        <Tooltip title="Referrer's email will be available once the case is claimed">
                            <span>TBD</span>
                        </Tooltip>}
                    </Card>
				</Form.Item>
			</Form>
            <Steps size="small" current={stepNumber}>
                <Step title="Requested" />
                <Step title="Claimed" />
                <Step title="Confirmed" />
                <Step title="Closed" />
            </Steps>,
		</Modal>
	)
}

export default StatusDialog