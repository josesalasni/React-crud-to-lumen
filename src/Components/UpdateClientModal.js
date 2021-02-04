import React, { useState } from 'react';
import moment from 'moment';
import { Modal, Button,  Form, Input, DatePicker , message} from 'antd';


import { gql, useMutation } from '@apollo/client';


const UpdateClient = gql`
  mutation updateClient( $id: Int!,  $name: String! , $date: String!, $company: String! ) {
    updateClient(id: $id, name: $name, date: $date, company: $company ) {
      id
    }
  }
`;

const UpdateClientModal = (props) => {

  const [form] = Form.useForm();

  const completedForm = () => {
    setIsModalVisible(false);
    form.resetFields();
    message.success('Elemento editado');
    props.updatedClient();
  }

  const [updateClient, { data }] = useMutation(UpdateClient , {
    onCompleted: completedForm
  });
    
  const [isModalVisible, setIsModalVisible] = useState(false);



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

    updateClient({ variables: { id: props.clientSelected.id , name: values.name , date: values.date, company: values.company } } ) ;


  };



  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  

  return (

    <div>
      <Button onClick={showModal} className="button-add" >Editar</Button>

      <Modal  width={800} title="Editar Cliente" visible={isModalVisible} onCancel={handleCancel}>

        <Form
        form={form}
        name="editclient"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Nombre"
                name="name"
                initialValue={props.clientSelected.name}
                rules={[{ required: true, message: 'Ingrese el nombre del cliente' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Compañia"
                name="company"
                initialValue={props.clientSelected.company}
                rules={[{ required: true, message: 'Ingrese la compañia del cliente' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Fecha"
                name="date"
                initialValue={ moment(props.clientSelected.date, 'YYYY-MM-DD') }
                rules={[{ required: true, message: 'Ingrese la fecha nacimiento' }]}
            >
                <DatePicker />
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

export default UpdateClientModal;