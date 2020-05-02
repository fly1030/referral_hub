import Link from 'next/link';
import {loadDB} from '../lib/db.js';
import { useState, useEffect } from 'react';

function Index() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const firebase = loadDB();
        const db = firebase.firestore();
        db.collection('users')
            .get()
            .then(snapshot => {
                const data = [];
                snapshot.forEach(doc => data.push(doc.data()));
                console.log('data: ', data);
                setUsers(data);
            })
            .catch(error => {});
    }, []);
  
    return <>
        <div style={{fontSize: 20}}>{users.map(user => <span>{user.name}</span>)}</div>
        <Link href="./about">
            <a>click me</a>
        </Link>
    </>;
}

export default Index