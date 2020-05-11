import { Modal, Button } from 'antd'
import Login from 'components/login'
import { User } from 'firebase'
import { useState } from 'react'
import SignupForm from './SignupForm'

function LoginModal(props: { 
	visible: boolean; 
	onCancel: () => void; 
	onConfirm: () => void; 
	onLoginSuccess: (user: User | null) => void 
}) {
	const [shouldShowSignup, setShouldShowSignup] = useState(false)
	return (
		<Modal
			title={shouldShowSignup ? "Sign up" : "Log In"}
			visible={props.visible}
			onOk={props.onConfirm}
			onCancel={props.onCancel}
			footer={
				shouldShowSignup
					? [
							<Button
								key="Login"
								onClick={() => {
									setShouldShowSignup(false)
								}}
							>	
								Log in
							</Button>,
							<Button key="back" onClick={props.onCancel}>
								Return
							</Button>
					  ]
					: [
							<Button
								key="signup"
								onClick={() => {
									setShouldShowSignup(true)
								}}
							>
								Sign up
							</Button>,
							<Button key="back" onClick={props.onCancel}>
								Return
							</Button>,
					  ]
			}
		>
			{shouldShowSignup ? 
			<SignupForm onSignupSuccess={props.onLoginSuccess} /> : 
			<Login onLoginSuccess={props.onLoginSuccess} />}
		</Modal>
	)
}

export default LoginModal
