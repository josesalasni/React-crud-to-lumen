import { Form, Input, Button, Checkbox, Row, Col } from 'antd';


import React, { useState,useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from "react-router-dom";

import "./Styles/LoginScreen.css";



const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


const LoginUser = gql`
  mutation loginUser($email: String!, $password: String!  ) {
    loginUser(email: $email, password: $password ) {
      token
    }
  }
`;

const LoginScreen = (props) => {

  let history = useHistory();

  const [loginUser, { data }] = useMutation(LoginUser , {
    onCompleted(data) {
      completedLogin(data)
      history.push("/clients");
    } 
  });

  const onFinish = (values) => {

    loginUser({ variables: { email: values.email , password: values.password } } ) ;


    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  function completedLogin(data){
    localStorage.setItem('token',  data.loginUser.token );
  }

  return (
      
      <div className="background" >

        <Row>

            <Col span={8}> </Col>


            <Col span={8}>
                
                <Form
                {...layout}
                name="basic"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                >
                <Form.Item
                    label="Username"
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                      Ingresar
                    </Button>
                </Form.Item>
                </Form>


            </Col>

            <Col span={8}> </Col>


        </Row>
          
      </div>
    
  );
};
export default LoginScreen;