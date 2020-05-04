import { Form, Input, Button, Divider } from 'antd';
import {useState, ChangeEvent} from 'react';
import { loadDB } from '../lib/db.js'
import { User } from 'firebase';

const tailLayout = {
    wrapperCol: { offset: 4, span: 24 },
};

const style = {
    confirmButton: { border: '2px solid lightblue', borderRadius: 10, width: '100%', maxWidth: 500},
    emailInput: {marginLeft: 28, maxWidth: 385},
}

const SignupForm = (props: {onSignupSuccess: (user: User | null) => void}) => {	
    const onFinishFailed = () => {};
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null); 
    
    return (
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={() => {}}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input onChange={(event: ChangeEvent<HTMLInputElement>) => {setEmail(event.currentTarget.value)} }/>
          </Form.Item>
    
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password style={style.emailInput} onChange={(event: ChangeEvent<HTMLInputElement>) => {setPassword(event.currentTarget.value)} }/>
          </Form.Item>
    
          <Form.Item {...tailLayout}>
            <Button style={style.confirmButton} htmlType="submit" onClick={
                () => {
                    const firebase = loadDB();
                    if (email == null || password == null) {
                        return;
                    }
                    firebase.auth().createUserWithEmailAndPassword(email, password).then((u)=>{
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

export default SignupForm