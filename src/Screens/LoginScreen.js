import { Form, Input, Button, Checkbox, Row, Col } from 'antd';

import "./Styles/LoginScreen.css";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

/*
const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;
*/

const LoginScreen = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

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
                    name="username"
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