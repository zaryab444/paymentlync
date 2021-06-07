
import {Row,Col,Card,Divider,Input,Button,Typography,Form,notification} from 'antd';
import React from 'react';
import { connect } from 'umi';
import type { ConnectState } from '@/models/connect';
import Api from "./loginService";
import styles from './index.less';
import { useHistory } from "react-router-dom";




const openNotification = (reason?,data?) => {
  notification.open({
    message: reason,
    description:
      data,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};

const Login = () => {



 
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  


  function handleUsernameChange (evt : any) {
    setUsername(evt.target.value);
  };

  function handlePasswordChange (evt : any)   {
    setPassword(evt.target.value);
  };



  let history = useHistory();

  const Text=Typography;

  const logo = "data:image/png;base64,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"
  const api = new Api();
 

  function handleSubmit(event : any) {
   console.log(event)
   api
   .login(event)
   .then((response) => {
     if(!response.data.statuscode){
      openNotification("Logged In",response.data.statusmessage)
      localStorage.setItem("UserInfo",JSON.stringify(response.data.response[0]))
      let SmSData = JSON.parse(response.data.response[0].smstemplate);

      localStorage.setItem("smsData",JSON.stringify(SmSData?.body))

      
      history.push("/dashboard")
     }
     else{
      openNotification("Failed",response.data.statusmessage)
      // console.log("failed")
     }
    

   })
   .catch((err) => console.log(err));
};



const isEnabled = username.length > 0 && password.length > 0;


  return (
    <Row style={{marginTop:'5%'}}>
          <Col span={8} lg={8} md={4} xs={2} sm={2}></Col>
          <Col span={8} lg={8} md={16} xs={20} sm={20}>
              <Card hoverable>
                  <Row>
                      <Col style={{marginTop:'8%'}} span={24}>
                          <img alt="not Found" style={{display:'block',marginLeft:'auto',marginRight:'auto',width:'50%'}} src={logo}/>
                      </Col>
                  </Row>
                  <Form
                      onFinish={handleSubmit}
                      name="normal_login"
                      className="login-form"
                      initialValues={{ remember: true }}
                  >
                  <Row style={{marginTop:'11%',marginRight:'3%',marginLeft:'3%'}}>
                      <Col span={24}>
                          <Form.Item
                            name="Username"
                            rules={[
                              {
                                required: true,
                                message: 'Please input your username!',
                              },
                            ]}
                          >
                          <Input size="large" placeholder="Username"
                          
                          onChange={handleUsernameChange}
                          />
                          </Form.Item>
                      </Col>
                      <Col style={{marginTop:'2%'}} span={24}>
                          <Form.Item
                          name="Password"
                            rules={[
                              {
                                required: true,
                                message: 'Please enter your password!',
                              },
                            ]}
                          >
                          <Input.Password size="large" placeholder="Password"
                              onChange={handlePasswordChange}
                          />
                          </Form.Item>
                      </Col>
                      <Col span={24} style={{marginTop:'8%'}}>
                          <Form.Item>
                              <Button type="primary" htmlType={'submit'} 
                              
                              disabled={!isEnabled}
                              block>Sign in</Button>
                          </Form.Item>
                      </Col>
                      <Col style={{marginTop:'5%'}} span={24}>
                          <Divider plain>OR</Divider>
                      </Col>
                      <Col style={{marginTop:'5%'}} span={24}>
                          <Button type="text" href={'/apps/authorized/forgetpassword'} block>Forgot Password?</Button>
                      </Col>
                  </Row>
                  </Form>
              </Card>
              <Card style={{marginTop:'3%'}} hoverable>
                  <Row>
                      <Col style={{marginTop:'2%',textAlign:'center'}} span={24}>
                            <Text>Don't have an account?<a href={'/apps/authorized/register'}> Sign Up</a> </Text>
                      </Col>
                  </Row>
              </Card>
          </Col>
          <Col span={8} lg={8} md={4} xs={2} sm={2}></Col>
      </Row>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
