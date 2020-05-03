import MainHead from 'components/MainHead'
import { Divider, Card } from 'antd'
import { AlertOutlined, CheckOutlined } from '@ant-design/icons'

import { loadDB } from '../lib/db.js'
import { GetServerSideProps } from 'next'
import { ReactNode } from 'react'

const style = {
	entryButton: { border: '2px solid lightblue', borderRadius: 10 },
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

function EntryButton(props: { title: string; subtitle: ReactNode; href: string }) {
	return (
		<a className="entryButton mr4" href={props.href}>
			<Card hoverable style={style.entryButton}>
				<h2 className="center">{props.title}</h2>
			</Card>
			<h3 className="mt1">{props.subtitle}</h3>
		</a>
	)
}

const Index = (props: { [key: string]: Array<any> }) => {
	const { data } = props
	return (
		<>
			<style jsx>{`
				.entryButton {
					display: block;
				}
				.entryButton:hover h3 {
					font-weight: bold;
				}
			`}</style>

			<MainHead title="Yes Onward" />
			<div className="flex flex-row justify-center mt4">
				<EntryButton
					title="I can refer people"
					subtitle={
						<span>
							Refer people without exposing your personal info <CheckOutlined className="h2" style={{ color: '#7cb305' }} />.
						</span>
					}
					href="/login"
				/>
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
			<Divider />
			<div>{data.map((user) => user.name)}</div>
		</>
	)
}

export default Index
