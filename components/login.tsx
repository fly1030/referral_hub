import { Button } from 'antd'
import { loadDB } from '../lib/db.js'
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons'
import { User } from 'firebase'

const style = {
	confirmButton: { borderRadius: 10, width: '100%', maxWidth: 500, marginTop: 5 },
	emailInput: { marginLeft: 28, maxWidth: 385 },
}

const Login = (props: { onLoginSuccess: (user: User | null) => void }) => {
	const { onLoginSuccess } = props

	return (
		<>
			<Button
				style={style.confirmButton}
				icon={<GoogleOutlined />}
				type="primary"
				size="large"
				htmlType="submit"
				onClick={() => {
					const firebase = loadDB()
					const provider = new firebase.auth.GoogleAuthProvider()
					firebase
						.auth()
						.signInWithPopup(provider)
						.then((result) => {
							const user = result.user
							onLoginSuccess(user)
						})
						.catch((error) => {
							const errorCode = error.code
							console.log(errorCode)
							const errorMessage = error.message
							console.log(errorMessage)
						})
				}}
			>
				Sign in with Google
			</Button>
			<Button
				style={style.confirmButton}
				icon={<FacebookOutlined />}
				type="primary"
				size="large"
				htmlType="submit"
				onClick={() => {
					const firebase = loadDB()
					const provider = new firebase.auth.FacebookAuthProvider()
					firebase
						.auth()
						.signInWithPopup(provider)
						.then((result) => {
							const user = result.user
							onLoginSuccess(user)
						})
						.catch((error) => {
							const errorCode = error.code
							console.log(errorCode)
							const errorMessage = error.message
							console.log(errorMessage)
						})
				}}
			>
				Sign in with Facebook
			</Button>
		</>
	)
}

export default Login
