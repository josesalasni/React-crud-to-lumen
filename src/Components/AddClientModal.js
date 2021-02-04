import React, { useState } from 'react';
import { Modal, Button,  Form, Input, DatePicker} from 'antd';


import { gql, useMutation } from '@apollo/client';


const InsertClient = gql`
  mutation createClient($name: String! , $date: String!, $company: String! ) {
    createClient(name: $name, date: $date, company: $company ) {
      name
      date
      company
    }
  }
`;


const AddClientModal = (props) => {

  const [form] = Form.useForm();

  const completedForm = () => {
    setIsModalVisible(false);
    form.resetFields();
    props.addedClient();
  }
    
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [addClient, { data }] = useMutation(InsertClient , {
    onCompleted: completedForm
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log('Success:', values);

    addClient({ variables: { name: values.name , date: values.date, company: values.company } } ) ;


  };



  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  

  return (

    

    <div>
      <Button onClick={showModal} className="button-add" >Agregar nuevo</Button>

      <Modal  width={800} title="Agregar Cliente" visible={isModalVisible} onCancel={handleCancel}>

        <Form
        form={form}
        name="addclient"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Nombre"
                name="name"
                rules={[{ required: true, message: 'Ingrese el nombre del cliente' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Compañia"
                name="company"
                rules={[{ required: true, message: 'Ingrese la compañia del cliente' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Fecha"
                name="date"
                rules={[{ required: true, message: 'Ingrese la fecha nacimiento' }]}
            >
                <DatePicker/>
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Enviar
                </Button>
            </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddClientModal;