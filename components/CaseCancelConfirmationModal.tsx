import { Modal, Button } from 'antd';
import { Company } from "lib/companies";

function CaseCancelConfirmModal(props: {
    visible: boolean,
    company: Company | null, 
    referredCases: Array<{[key: string]: any}>,
    onCancel: () => void, 
    onConfirm: (caseID: string) => void
}) {
    const {company, visible, referredCases, onCancel, onConfirm} = props;
    if (company == null) {
        return null;
    }

    const filteredCases = referredCases.filter((row) => row.company === company.name);
    if (filteredCases.length < 1) {
        return null;
    }
    const filteredCase = filteredCases[0];

    const modalContent = 
            <b>Are you sure you want to cancel this referral? </b>

    const footerButtonGroup = 
        [
            <Button key="confirm" type="primary" onClick={() => {onConfirm(filteredCase.caseID)}}>
                Confirm
            </Button>,
            <Button key="back" onClick={props.onCancel}>
                Cancel
            </Button>,
        ];
    return (
        <Modal
            title="Confirm case cancellation"
            visible={visible}
            onOk={() => {}}
            onCancel={onCancel}
            footer={footerButtonGroup}
        >
            {modalContent}
        </Modal>
    );
}

export default CaseCancelConfirmModal