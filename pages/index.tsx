import MainHead from 'components/MainHead'
import { Divider, Card } from 'antd'
import { AlertOutlined, CheckOutlined } from '@ant-design/icons'

import { loadDB } from '../lib/db.js'
import { GetServerSideProps } from 'next'
import { ReactNode, useState, useEffect } from 'react'
import { User } from 'firebase'

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
		// objectFit: 'cover' as const,
	},
}

const Companies = ['fb', 'uber', 'twitter', 'microsoft', 'linkedin', 'apple', 'doordash', 'airbnb', 'google', 'netflix']

export const getServerSideProps: GetServerSideProps = async (context) => {
	const firebase = loadDB()
	const db = firebase.firestore()
	const snapshot = await db.collection('users').get()
	const data: Array<any> = []
	snapshot.forEach((doc) => data.push(doc.data()))
	// Pass data to the page via props
	return { props: { data } }
}

function EntryButton(props: { title: string; subtitle: ReactNode; href: string }) {
	return (
		<a className="flex flex-column items-center p1" href={props.href}>
			<Card hoverable style={style.entryButton}>
				<h2 className="center nowrap">{props.title}</h2>
			</Card>
			<h3 className="mt1 center">{props.subtitle}</h3>
		</a>
	)
}

const Index = (props: { [key: string]: Array<any> }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
        const firebase = loadDB();
		firebase.auth().onAuthStateChanged((user) => {
			if (user != null) {
				setUser(user);
			} else {
				setUser(null);
			}
		});
	}, []);

	/*
	if (user == null) {
		console.log('user: ', user);
		const firebase = loadDB();
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider).then(
			result => {
				const user = result.user;
				setUser(user);
			}
		)
	}
	*/
	
	const { data } = props
	return (
		<>
			<MainHead title="Yes Onward" />
			<div className="flex justify-center">
				<div style={style.entryButtonCont} className="flex flex-row justify-center mt4">
					<EntryButton
						title="I can refer people"
						subtitle={
							<span>
								Refer people without exposing your personal info <CheckOutlined className="h2" style={{ color: '#7cb305' }} />.
							</span>
						}
						href="/login"
					/>
					<Divider type="vertical" style={{ height: '100%' }} />
					<EntryButton
						title="I want to be referred"
						subtitle={
							<span>
								Get updates as the referral process progresses <AlertOutlined className="h2" style={{ color: '#f5222d' }} />.
							</span>
						}
						href="/login"
					/>
				</div>
			</div>
			<Divider orientation="center">
				<h3 className="center">Get inside contacts to:</h3>
			</Divider>

			<div style={style.companyLogos} className="flex justify-center flex-wrap">
				{Companies.map((company) => (
					<div className="p2">
						<img style={style.logo} src={`/img/logos/${company}.png`} />
					</div>
				))}
			</div>
		</>
	)
}

export default Index
