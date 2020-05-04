import MainHead from 'components/MainHead'
import { Divider, Col, Button } from 'antd'

import { loadDB } from '../lib/db.js'
import { GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import { User } from 'firebase'
import EntryButtonSection from '../components/EntryButtonSection'
import LoginModal from '../components/LoginModal'
import PageTopBar from '../components/PageTopBar'
import { sendTestEmail } from './api/sendTestEmail'
import { Companies } from 'lib/companies'

const style = {
	entryButtonCont: {
		maxWidth: 1024,
	},
	entryButton: { border: '2px solid lightblue', borderRadius: 10, maxWidth: 300 },
	companyLogos: {
		display: 'flex',
		width: '100%',
	},
	logo: {
		width: 'auto',
		height: 32,
		marginTop: 20,
		marginBottom: 20,
		// objectFit: 'cover' as const,
	},
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const firebase = loadDB()
	const db = firebase.firestore()
	const snapshot = await db.collection('users').get()
	const data: Array<any> = []
	snapshot.forEach((doc) => data.push(doc.data()))
	// Pass data to the page via props
	return { props: { data } }
}

const Index = (props: { [key: string]: Array<any> }) => {
	const [user, setUser] = useState<User | null>(null)
	const [loginModalVisible, setLoginModalVisible] = useState(false)

	useEffect(() => {
		const firebase = loadDB()
		firebase.auth().onAuthStateChanged((user) => {
			if (user != null) {
				setUser(user)
			} else {
				setUser(null)
			}
		})
	}, [])

	const onLeftClick =
		user == null
			? () => {
					console.log('call: ', user)
					setLoginModalVisible(true)
			  }
			: () => {}

	const onRightClick =
		user == null
			? () => {
					setLoginModalVisible(true)
			  }
			: () => {}

	return (
		<>
			<MainHead title="Yes Onward" />
			<PageTopBar
				isLoggedIn={user != null}
				onLogout={() => {
					setUser(null)
				}}
				onLoginClicked={() => setLoginModalVisible(true)}
			/>
			<LoginModal
				visible={loginModalVisible}
				onConfirm={() => {
					setLoginModalVisible(false)
				}}
				onCancel={() => {
					setLoginModalVisible(false)
				}}
				onLoginSuccess={(user: User) => {
					setUser(user)
					setLoginModalVisible(false)
				}}
			/>
			<Button
				size="large"
				style={{ position: 'absolute', right: 0 }}
				onClick={async () => {
					await sendTestEmail()
					alert('sent??')
				}}
			>
				send!
			</Button>
			<EntryButtonSection user={user} onLeftClick={onLeftClick} onRightClick={onRightClick} />
			<Divider orientation="center">
				<h3 className="center">Get inside contacts to:</h3>
			</Divider>

			<div style={style.companyLogos} className="flex justify-center flex-wrap">
				{Companies.map((company, index) => (
					<div className="p2" key={index}>
						<img style={style.logo} src={`/img/logos/${company.key}.png`} />
					</div>
				))}
			</div>
		</>
	)
}

export default Index
