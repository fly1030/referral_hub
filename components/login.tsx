import { Form, Input, Button, Checkbox } from 'antd';
import {useState, ChangeEvent} from 'react';
import { loadDB } from '../lib/db.js'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {	
    const onFinishFailed = () => {};
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null); 
    
    return (
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={() => {}}
          onFinishFailed={onFinishFailed}
        >
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
    
          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
    
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={
                () => {
                    const firebase = loadDB();
                    if (email == null || password == null) {
                        return;
                    }
                    console.log('email: ', email);
                    console.log('password: ', password);
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