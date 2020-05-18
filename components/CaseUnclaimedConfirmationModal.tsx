
import { Modal, Button } from 'antd';

function CaseUnclaimConfirmModal(props: {
    visible: boolean, 
    onCancel: () => void, 
    onConfirm: () => void
}) {
    const modalContent = 
        <>
            <b>Please confirm if you want to unclaim this case </b>
            <p> </p>
            <p>Once confirmed, this case will be available for other referrers to claim!</p>
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
            title="Unclaim this case?"
            visible={props.visible}
            onOk={props.onConfirm}
            onCancel={props.onCancel}
            footer={footerButtonGroup}
        >
            {modalContent}
        </Modal>
    );
}

export default CaseUnclaimConfirmModal