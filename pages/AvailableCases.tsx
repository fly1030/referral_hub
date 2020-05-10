import { Collapse, Button } from 'antd';
import { GetServerSideProps } from 'next';
import { loadDB } from 'lib/db';
import { useState, useEffect } from 'react';
import { User } from 'firebase';
const { Panel } = Collapse;
import MainHead from 'components/MainHead'
import PageTopBar from 'components/PageTopBar';
import { sendClaimedEmail } from 'pages/api/sendClaimedEmail';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const firebase = loadDB()
    const db = firebase.firestore()
    const referrers = await db.collection('referrers').get()
   const referrersInfo: Array<{[key: string]: any}> = [] 
    referrers.forEach((doc) => {
        const referrerInfo = doc.data();
        referrersInfo.push(referrerInfo);
    })
	const snapshot = await db.collection('cases').get()
	const cases: Array<{[key: string]: any}> = []
	snapshot.forEach((data) => { 
        const casesFromCollection = data.data();
       cases.push(casesFromCollection)
    })
	return { props: {cases, referrersInfo} }
}

async function onCaseClaimed(
    availableCase: {[key: string]: any}, 
    referrerEmail?: string | null,
) {
    if (referrerEmail == null) {
        return
    }
	const firebase = loadDB();
    const firestore = firebase.firestore();
    const caseID = availableCase.caseID;
    const caseDoc = await firestore.collection('cases').doc(caseID).get()
    const caseDataFromDB = caseDoc.data()
    const updatedData = {...caseDataFromDB, ...{
        referrerEmail: referrerEmail,
        caseStatus: 'Claimed',
      }}
    firestore.collection('cases').doc(caseID).set(updatedData);
    sendClaimedEmail(availableCase, referrerEmail)
}

function getExtra(
    availableCase: {[key: string]: any}, 
    referrerEmail?: string | null,
) {
    return  (
        <Button 
        type="primary" 
        onClick={(event) => {
            onCaseClaimed(availableCase, referrerEmail);
            event.stopPropagation();
        }}
        disabled={availableCase.caseStatus !== 'Requested' || referrerEmail == null}
        >
            Claim
        </Button>
    )
}

function filterAvailableCasesByCompany(
    cases: Array<{[key: string]: any}>, 
    referrers: Array<{[key: string]: any}>, 
    user: User | null,
): Array<{[key: string]: any}> {
    let targetedCompany: string | null = null
    referrers.forEach((referrerInfo) => {
        if (referrerInfo.loginEmail === user?.email) {
            targetedCompany = referrerInfo.company;
        }
    })
    const filteredCases: Array<{[key: string]: any}> = []
    cases.forEach((caseInfo) => { 
        if (caseInfo.company === targetedCompany && caseInfo.caseStatus === 'Requested') {
            filteredCases.push(caseInfo)
        }
    })
    return filteredCases;
}

function AvailableCases(props: { [key: string]: Array<{[key: string]: any}> }) {
    const [user, setUser] = useState<User | null>(null)

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

    const avaliableCases = 
        user == null ? 
            [] : 
            filterAvailableCasesByCompany(props.cases, props.referrersInfo, user);
    
    let currentReferrer: {[key: string]: any} | null = null
    props.referrersInfo.forEach((referrerInfo) => {
        if (referrerInfo.loginEmail === user?.email) {
            currentReferrer = referrerInfo;
        }
    })

    if (currentReferrer == null) {
        return <div/>;
    }

	return (
		<>
            <MainHead title="Available Cases" />
            <PageTopBar
				isLoggedIn={user != null}
				onLogout={() => {
					const firebase = loadDB();
					firebase.auth().signOut();
					setUser(null);
					window.location.href="/";
				}}
				onLoginClicked={() => {}}
			/>
            <Collapse style={{margin: '20px'}}>
                {
                    avaliableCases.map((availableCase) => {
                        return (
                            <Panel 
                                header={<b>{availableCase.candidateEmail}</b>} 
                                key={availableCase.caseID} 
                                extra={getExtra(availableCase, user?.email)}
                            >
                                <p>Candidate Email: <b>{availableCase.candidateEmail}</b></p>
                                <p>Case Status: <b>{availableCase.caseStatus}</b></p>
                                <p>Applying to: <b>{availableCase.company}</b></p>
                                <p>Interested Positions: <b>{availableCase.positions}</b></p>
                                <p>Additional Info: <b>{availableCase.comments}</b></p>
                                <p>Case Created on: <b>{availableCase.createTime}</b></p>
                            </Panel>)
                    })
                }

            </Collapse>
		</>
	)
}

export default AvailableCases