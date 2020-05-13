import MainHead from 'components/MainHead'
import { Divider, Row, Col } from 'antd'

import { loadDB } from '../lib/db.js'
import { useState, useEffect } from 'react'
import { User } from 'firebase'
import EntryButtonSection from '../components/EntryButtonSection'
import StatisticsSection from '../components/StatisticsSection'
import LoginModal from '../components/LoginModal'
import PageTopBar from '../components/PageTopBar'
import { Companies } from 'lib/companies'
import HowtoSection from '../components/HowtoSection'

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
	banner: {
		width: '100%',
		height: 'auto',
	},
}

const Index = () => {
	const [user, setUser] = useState<User | null>(null)
	const [loginModalVisible, setLoginModalVisible] = useState(false)
	const [isReferralButtonClicked, setIsReferralButtonClicked] = useState(false)
	const [isCandidateButtonClicked, setIsCandidateButtonClicked] = useState(false)

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
				window.location.href = '/referrals'
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
						window.location.href = '/referrals'
					} else if (isCandidateButtonClicked) {
						window.location.href = '/status'
					}
				}}
			/>
			<Row style={{paddingLeft: 20}}>
				<Col flex="1 1 50%" style={{
					display: 'flex', 
					alignItems: 'center', 
					paddingRight: 20, 
					paddingLeft: 20, 
					maxWidth: 600,
					marginTop: 30,
				}}>
					<div>
						<div style={{ 
							display: 'flex', 
							justifyContent: 'start', 
							marginTop: '30px', 
							fontSize: 20,
						}}>
							<h1>Redefine referral experiences</h1>
						</div>
						<div style={{
							display: 'flex', 
							justifyContent: 'start', 
							fontSize: 20 , 
						}}>
							<p>
								Candidates will get referred to multiple companies with just one click
								while referrers get access to large pool of talents while not exposing their contact information
							</p>
						</div>
						
						<EntryButtonSection user={user} onLeftClick={onLeftClick} onRightClick={onRightClick} />
					</div>
				</Col>
				<Col flex="1 1 50%" style={{paddingRight: 20, marginTop: 30}}>
					<img style={style.banner} src={`/img/logos/undraw_through_the_park_lxnl.svg`} />
				</Col>
			</Row>
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
