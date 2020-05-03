import { Form, Input, Button, Divider } from 'antd';
import {useState, ChangeEvent} from 'react';
import { loadDB } from '../lib/db.js'
import { GoogleOutlined } from '@ant-design/icons';
import { User } from 'firebase';

const layout = {
    wrapperCol: { span: 24 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 24 },
};

const style = {
	confirmButton: { border: '2px solid lightblue', borderRadius: 10, width: '100%', maxWidth: 500},
}

const Login = (props: {onLoginSuccess: (user: User | null) => void}) => {	
    const onFinishFailed = () => {};
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null); 
    const {onLoginSuccess} = props;
    
    return (
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={() => {}}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item {...layout}>
            <Button 
              icon={<GoogleOutlined />}
              type="primary" 
              style={style.confirmButton} 
              htmlType="submit" 
              onClick={
                () => {
                  const firebase = loadDB();
                  const provider = new firebase.auth.GoogleAuthProvider();
                  firebase.auth().signInWithPopup(provider).then(
                    result => {
                      const user = result.user;
                      onLoginSuccess(user);
                    }
                  )
                }
            }>
              Sign in with Google
            </Button>
          </Form.Item>
          <Form.Item {...layout}>
            <Divider />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input onChange={(event: ChangeEvent<HTMLInputElement>) => {setEmail(event.currentTarget.value)} }/>
          </Form.Item>
    
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password onChange={(event: ChangeEvent<HTMLInputElement>) => {setPassword(event.currentTarget.value)} }/>
          </Form.Item>
    
          <Form.Item {...tailLayout}>
            <Button style={style.confirmButton} htmlType="submit" onClick={
                () => {
                    const firebase = loadDB();
                    if (email == null || password == null) {
                        return;
                    }
                    firebase.auth().signInWithEmailAndPassword(email, password).then((u)=>{
                        window.location.href="/";
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            }>
              Submit
            </Button>
          </Form.Item>
        </Form>
      );
}

export default Login