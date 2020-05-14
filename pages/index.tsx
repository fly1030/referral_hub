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
import { GetServerSideProps } from 'next'
import PageFooter from 'components/IndexFooter'

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

export const getServerSideProps: GetServerSideProps = async (context) => {
	const firebase = loadDB()
    const db = firebase.firestore()
    const referrers = await db.collection('referrers').get()
	const referrersCount = referrers.size;
	
	const snapshot = await db.collection('cases').get()
	let closedCasesCount = 0
	snapshot.forEach((data) => { 
		const casesFromCollection = data.data();
		if (casesFromCollection.caseStatus === 'Closed') {
			closedCasesCount += 1
		}
    })
	return { props: {closedCasesCount, referrersCount} }
}

const Index = (props: { [key: string]: number }) => {
	const [user, setUser] = useState<User | null>(null)
	const [loginModalVisible, setLoginModalVisible] = useState(false)
	const [isReferralButtonClicked, setIsReferralButtonClicked] = useState(false)
	const [isCandidateButtonClicked, setIsCandidateButtonClicked] = useState(false)
	const {closedCasesCount, referrersCount} = props

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
			<div className="px1 flex items-center content-center flex-wrap">
				<Col
					flex="1 1 50%"
					className="flex items-center"
					style={{
						paddingRight: 20,
						paddingLeft: 20,
						width: '100%',
					}}
				>
					<div className="flex flex-column justify-center items-center" style={{ minWidth: '43em', flexGrow: 1 }}>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								fontSize: 20,
							}}
						>
							<h1>Redefine referral experience</h1>
						</div>
						<div
							style={{
								display: 'flex',
								justifyContent: 'start',
								fontSize: 20,
							}}
						>
							<div>
								<div>
									<b style={{ color: 'black' }}>Job seekers:</b> Put your resume directly into the internal hiring teams.
								</div>
								<div>
									<b style={{ color: 'black' }}>Referrers:</b> Get more referral leads without exposing your personal info.
								</div>
							</div>
						</div>
						<EntryButtonSection user={user} onLeftClick={onLeftClick} onRightClick={onRightClick} />
						<Divider />
						<StatisticsSection 
							closedCasesCount={closedCasesCount} 
							referrersCount={referrersCount} 
							companiesCount={Companies.length}
						/>
					</div>
				</Col>
				<Col flex="1 1 50%" style={{ maxWidth: '70em', minWidth: '43em' }}>
					<img style={style.banner} src={`/img/logos/undraw_through_the_park_lxnl.svg`} />
				</Col>
			</div>
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
			<PageFooter />
		</>
	)
}

export default Index
