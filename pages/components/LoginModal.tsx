
import { Modal, Button } from 'antd';
import Login from 'components/login';

function LoginModal(props: {visible: boolean, onCancel: () => void, onConfirm: () => void}) {
    console.log('prop.visible: ', props.visible);
    return (
        <Modal
            title="Basic Modal"
            visible={props.visible}
            onOk={props.onConfirm}
            onCancel={props.onCancel}
            footer={[
                <Button key="back" onClick={props.onCancel}>
                  Return
                </Button>,
              ]}
        >
            <Login />
        </Modal>
    );
}

export default LoginModal