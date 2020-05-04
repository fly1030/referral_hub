
import { Modal, Button, Card} from 'antd';
import { User } from 'firebase';

function ReferrerInfoFormModal(props: {
    visible: boolean, 
    onCancel: () => void, 
    onConfirm: () => void,
    onLoginSuccess: (user: User | null) => void}) {

    return (
        <Modal
            title="Send us an email from your work email account"
            visible={props.visible}
            onOk={props.onConfirm}
            onCancel={props.onCancel}
            footer={[
                <Button key="back" onClick={props.onCancel}>
                    OK
                </Button>,
            ]}>
            <Card>
                <p>Thanks for your willingness to help!</p>
                <p>Before we start to connect referrers with the candidates, we want to make sure that referrers are eligible to make referral.</p>
                <p>So please send an email to <a>hello@yesonward.com</a> from you work email account</p>
            </Card>,
        </Modal>
    );
}

export default ReferrerInfoFormModal