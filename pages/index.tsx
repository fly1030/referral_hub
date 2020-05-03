import MainHead from 'components/MainHead'
import { Divider } from 'antd'

import { loadDB } from '../lib/db.js'
import { GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import { User } from 'firebase'
import EntryButtonSection from './components/EntryButtonSection'

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
		console.log('user changed 1111: ', user);
	}, []);

	return (
		<>
			<MainHead title="Yes Onward" />
			<EntryButtonSection user={user}/>
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
