import { Collapse, Button, Divider } from 'antd';
import { GetServerSideProps } from 'next';
import { loadDB } from 'lib/db';
import { useState, useEffect } from 'react';
import { User } from 'firebase';
const { Panel } = Collapse;
import MainHead from 'components/MainHead'
import PageTopBar from 'components/PageTopBar';
import { sendCaseClosedEmail } from 'pages/api/sendCaseClosedEmail';
import CaseCloseConfirmModal from 'components/CaseCloseConfirmModal';

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

async function onCaseClosed(
    caseInfo: {[key: string]: any} | null, 
) {
    if (caseInfo == null) {
        return;
    }
	const firebase = loadDB();
    const firestore = firebase.firestore();
    const caseID = caseInfo.caseID;
    const caseDoc = await firestore.collection('cases').doc(caseID).get()
    const caseDataFromDB = caseDoc.data()
    const updatedData = {...caseDataFromDB, ...{
        caseStatus: 'Closed',
      }}
    firestore.collection('cases').doc(caseID).set(updatedData);
    // sendClaimedEmail(caseInfo, referrerEmail)
}

function getExtra(
    claimedCase: {[key: string]: any},
    onClicked: () => void
) {
    return  (
        <Button 
            type="primary" 
            onClick={(event) => {
                onClicked();
                event.stopPropagation();
            }}
            disabled={claimedCase.caseStatus === 'Closed'}
        >
            Close
        </Button>
    )
}

function filterCasesByReferrer(
    cases: Array<{[key: string]: any}>, 
    referrers: Array<{[key: string]: any}>, 
    user: User | null,
): Array<{[key: string]: any}> {
    let currentReferrer: {[key: string]: any} | null = null
    referrers.forEach((referrerInfo) => {
        if (referrerInfo.loginEmail === user?.email) {
            currentReferrer = referrerInfo;
        }
    })
    const filteredCases: Array<{[key: string]: any}> = []
    cases.forEach((caseInfo) => { 
        if (caseInfo.referrerEmail === user?.email) {
            filteredCases.push(caseInfo)
        }
    })
    return filteredCases;
}

function filterCasesByApplicant(
    cases: Array<{[key: string]: any}>, 
    user: User | null,
): Array<{[key: string]: any}> {
    const filteredCases: Array<{[key: string]: any}> = []
    cases.forEach((caseInfo) => { 
        if (caseInfo.candidateEmail === user?.email) {
            filteredCases.push(caseInfo)
        }
    })
    return filteredCases;
}

function MyCasesAsApplicant(
    props: {applicantCases: Array<{[key: string]: any}>}, 
) {
    return (
        <>
            <h1 style={{paddingLeft: 20, margin: 20}}>My cases as an applicant</h1>
            <Collapse style={{margin: 20}}>
                {
                    props.applicantCases.map((caseInfo) => {
                        const header = (<>
                            <b>{caseInfo.company}</b>
                            <Divider type="vertical" style={{fontStyle: 'bold'}} plain={true}/>
                            <span>{caseInfo.caseStatus}</span>
                            <Divider type="vertical" style={{fontStyle: 'bold'}} plain={true}/>
                            <span>{caseInfo.referrerEmail}</span>
                        </>)
                        return (
                            <Panel 
                                header={header} 
                                key={caseInfo.caseID} 
                            >
                                <p>Candidate Email: <b>{caseInfo.candidateEmail}</b></p>
                                <p>Case Status: <b>{caseInfo.caseStatus}</b></p>
                                <p>Applying to: <b>{caseInfo.company}</b></p>
                                <p>Interested Positions: <b>{caseInfo.positions}</b></p>
                                <p>Additional Info: <b>{caseInfo.comments}</b></p>
                                <p>Case Created on: <b>{caseInfo.createTime}</b></p>
                            </Panel>)
                    })
                }
            </Collapse>
        </>
    )
}

function MyCasesAsReferrer(
    props: {referrerCases: Array<{[key: string]: any}>}
) {
    const [confirmCloseDialogVisible, setConfirmCloseDialogVisible] = useState<boolean>(false)
    const [currentCase, setCurrentCase] = useState<{[key: string]: any} | null>(null)

    return (
        <>
            <h1 style={{paddingLeft: 20, margin: 20}}>My cases as a referrer</h1>
            <Collapse style={{margin: 20}}>
                {
                    props.referrerCases.map((caseInfo) => {
                        const header = (<>
                            <b>{caseInfo.candidateEmail}</b>
                            <Divider type="vertical" style={{fontStyle: 'bold'}} plain={true}/>
                            <span>{caseInfo.caseStatus}</span>
                        </>)
                        return (
                            <Panel 
                                header={header} 
                                key={caseInfo.caseID} 
                                extra={getExtra(
                                    caseInfo, 
                                    () => {
                                        setCurrentCase(caseInfo)
                                        setConfirmCloseDialogVisible(true)
                                    }
                                )}>
                                <p>Candidate Email: <b>{caseInfo.candidateEmail}</b></p>
                                <p>Case Status: <b>{caseInfo.caseStatus}</b></p>
                                <p>Applying to: <b>{caseInfo.company}</b></p>
                                <p>Interested Positions: <b>{caseInfo.positions}</b></p>
                                <p>Additional Info: <b>{caseInfo.comments}</b></p>
                                <p>Case Created on: <b>{caseInfo.createTime}</b></p>
                            </Panel>)
                    })
                }
            </Collapse>
            <CaseCloseConfirmModal 
                visible = {confirmCloseDialogVisible}
                onConfirm={() => {
                    onCaseClosed(currentCase);
                    setConfirmCloseDialogVisible(false)
                    if (currentCase != null) {
                        sendCaseClosedEmail(currentCase)
                    }
                }}
                onCancel={() => {setConfirmCloseDialogVisible(false)}} 
            />
        </>
    )
}

function MyCases(props: { [key: string]: Array<{[key: string]: any}> }) {
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

    const myReferrerCases = 
        user == null ? 
            [] : 
            filterCasesByReferrer(props.cases, props.referrersInfo, user);
        
    const myApplicantCases = user == null ? 
        [] : 
        filterCasesByApplicant(props.cases, user);

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
            <MyCasesAsApplicant applicantCases={myApplicantCases} />
            <MyCasesAsReferrer referrerCases={myReferrerCases} />
		</>
	)
}

export default MyCases