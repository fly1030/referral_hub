
import { Modal, Button } from 'antd';

function CaseCloseConfirmModal(props: {
    visible: boolean, 
    onCancel: () => void, 
    onConfirm: () => void
}) {
    const modalContent = 
        <>
            <b>Thanks! Can you confirm if the referral has been submitted? </b>
            <p> </p>
            <p>Once confirmed we'll send an email notification to the applicant!</p>
        </>
    const footerButtonGroup = 
        [
            <Button key="confirm" type="primary" onClick={props.onConfirm}>
                Confirm
            </Button>,
            <Button key="back" onClick={props.onCancel}>
                Cancel
            </Button>,
        ];
    return (
        <Modal
            title="Confirm case closed"
            visible={props.visible}
            onOk={props.onConfirm}
            onCancel={props.onCancel}
            footer={footerButtonGroup}
        >
            {modalContent}
        </Modal>
    );
}

export default CaseCloseConfirmModal