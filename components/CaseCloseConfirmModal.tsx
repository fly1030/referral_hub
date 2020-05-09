
import { Modal, Button } from 'antd';

function CaseCloseConfirmModal(props: {
    visible: boolean, 
    onCancel: () => void, 
    onConfirm: () => void
}) {
    const modalContent = 
        <>
            <b>Thanks! Can you confirm if the referral has been made? </b>
            <p>Once confirmed we'll send an email notice to the applicant to let them know!</p>
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