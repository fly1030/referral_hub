import MainHead from 'components/MainHead'
import { Divider } from 'antd'

import { loadDB } from '../lib/db.js'
import { GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import { User } from 'firebase'
import EntryButtonSection from '../components/EntryButtonSection'
import StatisticsSection from '../components/StatisticsSection'
import LoginModal from '../components/LoginModal'
import PageTopBar from '../components/PageTopBar'
import { Companies } from 'lib/companies'
import HowtoSection from '../components/HowtoSection'
import router from 'next/router'

const style = {
	entryButton: { border: '2px solid lightblue', borderRadius: 10, maxWidth: 300 },
	companyLogos: {
		display: 'flex',
		width: '100%',
		paddingLeft: 60,
		paddingRight: 60,
	},
	logo: {
		width: 'auto',
		height: 32,
		marginTop: 20,
		marginBottom: 20,
	},
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const firebase = loadDB()
	const db = firebase.firestore()
	const snapshot = await db.collection('referrers').get()
	const data: Array<any> = []
	snapshot.forEach((doc) => data.push(doc.data()))
	// Pass data to the page via props
	return { props: { data } }
}

const Index = (props: { [key: string]: Array<any> }) => {
	const [user, setUser] = useState<User | null>(null)
	const [loginModalVisible, setLoginModalVisible] = useState(false)
	const [referrerInfoModalVisible, setReferrerInfoModalVisible] = useState(false)
	const [isReferralButtonClicked, setIsReferralButtonClicked] = useState(false)
	const [isCandidateButtonClicked, setIsCandidateButtonClicked] = useState(false)
	const verifiedReferrers = props.data
	const verifiedReferrersEmail = verifiedReferrers.map((referrer) => referrer.loginEmail)

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
					setLoginModalVisible(true)
					setIsReferralButtonClicked(true)
			  }
			: () => {
				router.push('/referrals')
			  }

	const onRightClick =
		user == null
			? () => {
					setLoginModalVisible(true)
					setIsCandidateButtonClicked(true)
			  }
			: () => {
					window.location.href = '/status'
			  }

	return (
		<>
			<MainHead title="Yes Onward" />
			<PageTopBar
				isLoggedIn={user != null}
				onLogout={() => {
					const firebase = loadDB()
					firebase.auth().signOut()
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
					if (isReferralButtonClicked) {
						router.push('/referrals')
					} else if (isCandidateButtonClicked) {
						router.push('/status')
					}
				}}
			/>
			<div className="flex justify-center" style={{ marginTop: '30px', fontSize: 20 }}>
				<h1>Get referred to multiple companies with just one click</h1>
			</div>
			<EntryButtonSection user={user} onLeftClick={onLeftClick} onRightClick={onRightClick} />
			<StatisticsSection />
			<Divider className="mt4" orientation="center" style={{ marginTop: 40 }}>
				<p className="center" style={{ marginTop: '16px' }}>
					Get inside contacts to:
				</p>
			</Divider>

			<div style={style.companyLogos} className="flex justify-center flex-wrap">
				{Companies.map((company, index) => (
					<div className="p2" key={index}>
						<img style={style.logo} src={`/img/logos/${company.key}.png`} />
					</div>
				))}
			</div>
			<Divider className="mt3" orientation="center" />
			<HowtoSection />
		</>
	)
}

export default Index
