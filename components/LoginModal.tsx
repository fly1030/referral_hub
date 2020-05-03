
import { Modal, Button } from 'antd';
import Login from 'components/login';
import { User } from 'firebase';

function LoginModal(props: {
    visible: boolean, 
    onCancel: () => void, 
    onConfirm: () => void,
    onLoginSuccess: (user: User | null) => void}) {
    return (
        <Modal
            title="Log In"
            visible={props.visible}
            onOk={props.onConfirm}
            onCancel={props.onCancel}
            footer={[
                <Button key="back" onClick={props.onCancel}>
                  Return
                </Button>,
              ]}
        >
            <Login onLoginSuccess={props.onLoginSuccess}/>
        </Modal>
    );
}

export default LoginModal