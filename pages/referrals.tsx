import { Collapse, Button, Empty, Spin } from 'antd'
import { GetServerSideProps } from 'next'
import { loadDB } from 'lib/db'
import { useState, useEffect } from 'react'
import { User } from 'firebase'
const { Panel } = Collapse
import MainHead from 'components/MainHead'
import PageTopBar from 'components/PageTopBar'
import { sendClaimedEmail } from 'pages/api/sendClaimedEmail'
import CaseClaimedConfirmModal from 'components/CaseClaimedConfirmModal'
import ReferrerInfoFormModal from 'components/ReferrerInfoFormModal'

export const getServerSideProps: GetServerSideProps = async (context) => {
	const firebase = loadDB()
	const db = firebase.firestore()
	const referrers = await db.collection('referrers').get()
	const referrersInfo: Array<{ [key: string]: any }> = []
	referrers.forEach((doc) => {
		const referrerInfo = doc.data()
		referrersInfo.push(referrerInfo)
	})
	const snapshot = await db.collection('cases').get()
	const cases: Array<{ [key: string]: any }> = []
	snapshot.forEach((data) => {
		const casesFromCollection = data.data()
		cases.push(casesFromCollection)
	})
	return { props: { cases, referrersInfo } }
}

async function onCaseClaimed(availableCase: { [key: string]: any } | null, referrerEmail?: string | null) {
	if (referrerEmail == null || availableCase == null) {
		return
	}
	const firebase = loadDB()
	const firestore = firebase.firestore()
	const caseID = availableCase.caseID
	const caseDoc = await firestore.collection('cases').doc(caseID).get()
	const caseDataFromDB = caseDoc.data()
	const updatedData = {
		...caseDataFromDB,
		...{
			referrerEmail: referrerEmail,
			caseStatus: 'Claimed',
		},
	}
	firestore.collection('cases').doc(caseID).set(updatedData)
	sendClaimedEmail(availableCase, referrerEmail)
}

function getExtra(
	availableCase: { [key: string]: any },
	onButtonClicked: () => void,
	isClaimed: boolean,
	referrerEmail?: string | null,
	) {
	return (
		<Button
			type="primary"
			onClick={(event) => {
				onButtonClicked()
				event.stopPropagation()
			}}
			disabled={availableCase.caseStatus !== 'Requested' || isClaimed || referrerEmail == null}
		>
			{'Claim'}
		</Button>
	)
}

function filterAvailableCasesByCompany(
	cases: Array<{ [key: string]: any }>,
	referrer: { [key: string]: any } | null,
): Array<{ [key: string]: any }> {
	if (referrer == null) {
		return []
	}
	const targetedCompany: string | null = referrer.company
	const filteredCases: Array<{ [key: string]: any }> = []
	cases.forEach((caseInfo) => {
		if (caseInfo.company === targetedCompany && caseInfo.caseStatus === 'Requested') {
			filteredCases.push(caseInfo)
		}
	})
	return filteredCases
}

function AvailableCases(props: { [key: string]: Array<{ [key: string]: any }> }) {
	const [user, setUser] = useState<User | null>(null)
	const [confirmClaimDialogVisible, setConfirmClaimDialogVisible] = useState<boolean>(false)
	const [currentCase, setCurrentCase] = useState<{ [key: string]: any } | null>(null)
	const [claimedCases, setClaimedCases] = useState<Array<string>>([])
	const [referrerInfoModalVisible, setReferrerInfoModalVisible] = useState(true)

	let initialReferrerInfo = null
	props.referrersInfo.forEach((referrerInfo) => {
		if (referrerInfo.loginEmail === user?.email) {
			initialReferrerInfo = referrerInfo
		}
	})
	const [currentReferrer, setCurrentReferrer] = useState<{ [key: string]: any } | null>(initialReferrerInfo)

	useEffect(() => {
		const firebase = loadDB()
		firebase.auth().onAuthStateChanged((user) => {
			if (user != null) {
				setUser(user)
				props.referrersInfo.forEach((referrerInfo) => {
					if (referrerInfo.loginEmail === user?.email) {
						setCurrentReferrer(referrerInfo)
						return
					}
				})
			} else {
				setUser(null)
			}
		})
	}, [])

	const avaliableCases = user == null ? [] : filterAvailableCasesByCompany(props.cases, currentReferrer)

	if (user == null) {
		return (
			<>
				<MainHead title="Available Cases" />
				<PageTopBar
					isLoggedIn={user != null}
					onLogout={() => {
						const firebase = loadDB()
						firebase.auth().signOut()
						setUser(null)
						window.location.href = '/'
					}}
					onLoginClicked={() => {}}
				/>
				<div style={{textAlign: "center", paddingTop: 20}}><Spin size="large" /></div>
			</>
		)
	}

	if (currentReferrer == null) {
		return (
			<>
				<MainHead title="Available Cases" />
				<PageTopBar
					isLoggedIn={user != null}
					onLogout={() => {
						const firebase = loadDB()
						firebase.auth().signOut()
						setUser(null)
						window.location.href = '/'
					}}
					onLoginClicked={() => {}}
				/>
				<ReferrerInfoFormModal
					visible={referrerInfoModalVisible}
					onConfirm={(company: string, companyEmail: string) => {
						setReferrerInfoModalVisible(false)
						setCurrentReferrer({company, companyEmail, loginEmail: user?.email})
					}}
					onCancel={() => {
						setReferrerInfoModalVisible(false)
					}}
				/>
			</>
		)
	}

	if (avaliableCases.length === 0) {
		return (
			<>
				<MainHead title="Available Cases" />
				<PageTopBar
					isLoggedIn={user != null}
					onLogout={() => {
						const firebase = loadDB()
						firebase.auth().signOut()
						setUser(null)
						window.location.href = '/'
					}}
					onLoginClicked={() => {}}
				/>
				<Empty
					image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
					imageStyle={{
					height: 60,
					}}
					description={
					<span>
						There is no active referral requestes currently
					</span>
					}
				/>
			</>
		)
	}

	// 	<h1 style={{paddingLeft: 20, margin: 20}}>{`Available cases for ${currentReferrer?.company}`}</h1>
	return (
		<>
			<MainHead title="Available Cases" />
			<PageTopBar
				isLoggedIn={user != null}
				onLogout={() => {
					const firebase = loadDB()
					firebase.auth().signOut()
					setUser(null)
					window.location.href = '/'
				}}
				onLoginClicked={() => {}}
			/>
			<Collapse style={{ margin: '20px' }}>
				{avaliableCases.map((availableCase) => {
					let caseStatus = availableCase.caseStatus
					if (claimedCases.includes(availableCase.caseID)) {
						caseStatus = 'Claimed'
					}
					return (
						<Panel 
							header={<b>{`Candidate: ${availableCase.candidateEmail}`}</b>} 
							key={availableCase.caseID} 
							extra={getExtra(
								availableCase,
								() => {
									setConfirmClaimDialogVisible(true)
									setCurrentCase(availableCase)
								},
								claimedCases.includes(availableCase.caseID),
								user?.email
							)}>
							<p>
								Candidate Email: <b>{availableCase.candidateEmail}</b>
							</p>
							<p>
								Case Status: <b>{caseStatus}</b>
							</p>
							<p>
								Applying to: <b>{availableCase.company}</b>
							</p>
							<p>
								Interested Positions: <b>{availableCase.positions}</b>
							</p>
							<p>
								Additional Info: <b>{availableCase.comments}</b>
							</p>
							<p>
								Case Created on: <b>{availableCase.createTime}</b>
							</p>
						</Panel>
					)
				})}
			</Collapse>
			<CaseClaimedConfirmModal 
                visible = {confirmClaimDialogVisible}
                onConfirm={() => {
					onCaseClaimed(currentCase, user?.email)
					setConfirmClaimDialogVisible(false)
					if (currentCase != null) {
						const updatedClaimedCases = [...claimedCases, currentCase.caseID]
						setClaimedCases(updatedClaimedCases)
					}
                }}
                onCancel={() => {setConfirmClaimDialogVisible(false)}} 
            />
		</>
	)
}

export default AvailableCases
