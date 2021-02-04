import React, { useState,useEffect } from 'react';
import { Table, Tag, Button, Space, Row, Col, Popconfirm, message } from 'antd';


import './Styles/LoginScreen.css';
import { useLazyQuery, useMutation, gql } from '@apollo/client';
import AddClientModal from '../Components/AddClientModal';
import UpdateClientModal from '../Components/UpdateClientModal';

const DeleteClient = gql`
  mutation deleteClient($id: Int!  ) {
    deleteClient(id: $id ) {
      name
    }
  }
`;


const GetClients = gql`
  query GetClients {
    clients {
      id,
      name,
      company,
      date
    }
  }
`;


function ShowData() {

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Compañia',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Edad',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
           <Popconfirm
              title={ "¿Estás seguro que desea borrar al cliente " + record.name + " ?"} 
              onConfirm={ () => confirmDelete(record)  }
              //onCancel={cancel}
              okText="Si"
              cancelText="No"
            >
              
              <Button type="primary"> Borrar</Button>
          </Popconfirm>

          <UpdateClientModal updatedClient={() => refetch() } clientSelected={record} > </UpdateClientModal>
        </Space>
      ),
    },
  ];

  /*function handleEdit(record) {
    setSelectedClient(record);

  }*/

  
  function confirmDelete(record) {
    console.log(record);
    deleteClient( { variables: { id: record.id  } } );
  }

  function completedDelete () {
    refetch();
    message.success('Elemento borrado');
  }

  const [deleteClient, { dataClientDeleted }] = useMutation(DeleteClient , {
    onCompleted: completedDelete
  });

  const [getClient, {loading, error, data, refetch} ]  = useLazyQuery (GetClients);

  const [selectedClient, setSelectedClient] = useState({});

  useEffect(() => {
    getClient();
  },[getClient]);

  if (loading) return 'Loading...';
  if (error) return ` ${error}`;

  return (
    <div>
      <AddClientModal addedClient={ () =>  refetch() } />
      <Table  rowKey={record => record.id}  dataSource={data?.clients} columns={columns} />;
    </div>
  );
}


function ClientTable () {

  return (
    <div className="background" > 

      <Row>
        <Col span={3} > </Col>
        <Col span={18}>  
          <div className="tableScreen">
            <p className={"titlefont"}> Clientes </p>
            
            {ShowData () }
            
          </div>
        </Col>
        <Col span={3} > </Col>
      </Row>
    </div>
  )
}

export default ClientTable;