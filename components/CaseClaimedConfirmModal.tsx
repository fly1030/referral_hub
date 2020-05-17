import { Modal, Button } from 'antd'

function CaseClaimedConfirmModal(props: { visible: boolean; onCancel: () => void; onConfirm: () => void }) {
	const modalContent = (
		<>
			<b>Thanks for offering help! Once you claim the case please make the referral within three days </b>
			<p> </p>
			<p>We'll send an email notice to you with the application's details, click the link provided to see more info.</p>
		</>
	)
	const footerButtonGroup = [
		<Button key="confirm" type="primary" onClick={props.onConfirm}>
			Confirm
		</Button>,
		<Button key="back" onClick={props.onCancel}>
			Cancel
		</Button>,
	]
	return (
		<Modal title="Confirm claim case" visible={props.visible} onOk={props.onConfirm} onCancel={props.onCancel} footer={footerButtonGroup}>
			{modalContent}
		</Modal>
	)
}

export default CaseClaimedConfirmModal
