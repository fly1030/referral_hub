
import { Modal, Button } from 'antd';
import Login from 'components/login';
import { User } from 'firebase';
import { useState } from 'react';
import SignupForm from './SignupForm';

function LoginModal(props: {
    visible: boolean, 
    onCancel: () => void, 
    onConfirm: () => void,
    onLoginSuccess: (user: User | null) => void}) {
    const [shouldShowSignup, setShouldShowSignup] = useState(false);

    console.log('shouldShowSignup: ', shouldShowSignup);
    const modalContent = shouldShowSignup ? 
        <SignupForm 
            onSignupSuccess={props.onLoginSuccess}
        /> : 
        <Login 
            onLoginSuccess={props.onLoginSuccess} 
        />;
    const footerButtonGroup = shouldShowSignup ? [
        <Button key="back" onClick={props.onCancel}>
          Return
        </Button>,
      ] : 
        [
            <Button key="signup" onClick={() => {setShouldShowSignup(true)}}>
                Sign up
            </Button>,
            <Button key="back" onClick={props.onCancel}>
                Return
            </Button>,
        ];
    return (
        <Modal
            title="Log In"
            visible={props.visible}
            onOk={props.onConfirm}
            onCancel={props.onCancel}
            footer={footerButtonGroup}
        >
            {modalContent}
        </Modal>
    );
}

export default LoginModal