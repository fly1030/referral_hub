
import { Modal, Button } from 'antd';

function CaseClaimedConfirmModal(props: {
    visible: boolean, 
    onCancel: () => void, 
    onConfirm: () => void
}) {
    const modalContent = 
        <>
            <b>Thanksfor offering help! Once you claim the case please make the referral within three days </b>
            <p>Once confirmed we'll send an email notice to you with case, you can also expand the collapsed section to see more!</p>
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
            title="Confirm claim case"
            visible={props.visible}
            onOk={props.onConfirm}
            onCancel={props.onCancel}
            footer={footerButtonGroup}
        >
            {modalContent}
        </Modal>
    );
}

export default CaseClaimedConfirmModal