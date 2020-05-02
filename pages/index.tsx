import MainHead from 'components/MainHead'
import { Empty } from 'antd'
import {loadDB} from '../lib/db.js';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async context => {
	const firebase = loadDB();
	const db = firebase.firestore();
	const snapshot = await db.collection('users').get();
	const data: Array<any> = [];
	snapshot.forEach(doc => data.push(doc.data()));
	// Pass data to the page via props
	return { props: { data } }
  }

const Index = (props: {[key: string]: Array<any>}) => {
	const {data} = props;
	return <>
		<MainHead title="Yes Onward" />
		<Empty description="hello" />
		<div>{data.map(user => user.name)}</div>
	</>
};

export default Index
