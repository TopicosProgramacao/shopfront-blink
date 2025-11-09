import { useState, useEffect } from 'react';
import { Layout, Typography, Button, Modal, Input, Form, notification, Table, Drawer, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Header from '@/components/Header';

const { Content } = Layout;
const { Title } = Typography;

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const Clients = () => {
  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem('clients');
    return saved ? JSON.parse(saved) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleAddClient = async (values: any) => {
    const newClient: Client = {
      id: Date.now(),
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
    };

    setClients([...clients, newClient]);
    
    notification.success({
      message: 'Success',
      description: 'Client added successfully!',
      placement: 'topRight',
    });

    handleCancel();
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    editForm.setFieldsValue(client);
    setIsDrawerOpen(true);
  };

  const handleUpdateClient = async (values: any) => {
    if (!editingClient) return;

    const updatedClient: Client = {
      ...editingClient,
      ...values,
    };

    setClients(clients.map(c => c.id === editingClient.id ? updatedClient : c));
    
    notification.success({
      message: 'Success',
      description: 'Client updated successfully!',
      placement: 'topRight',
    });

    setIsDrawerOpen(false);
    setEditingClient(null);
    editForm.resetFields();
  };

  const handleDeleteClient = (clientId: number) => {
    setClients(clients.filter(c => c.id !== clientId));
    notification.success({
      message: 'Success',
      description: 'Client deleted successfully!',
      placement: 'topRight',
    });
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setEditingClient(null);
    editForm.resetFields();
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Client) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEditClient(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Client"
            description="Are you sure you want to delete this client?"
            onConfirm={() => handleDeleteClient(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Title level={2} className="!mb-0">Clients</Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showModal}
              size="large"
            >
              Add Client
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={clients}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </div>

        <Modal
          title="Add New Client"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          keyboard={true}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleAddClient}
            className="mt-4"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please enter client name' }]}
            >
              <Input placeholder="Enter client name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input placeholder="client@example.com" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please enter phone number' }]}
            >
              <Input placeholder="+1 234 567 8900" />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please enter address' }]}
            >
              <Input.TextArea rows={3} placeholder="Enter client address" />
            </Form.Item>

            <Form.Item className="mb-0">
              <div className="flex justify-end gap-2">
                <Button onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Add Client
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>

        <Drawer
          title="Edit Client"
          open={isDrawerOpen}
          onClose={handleCloseDrawer}
          width={400}
        >
          <Form
            form={editForm}
            layout="vertical"
            onFinish={handleUpdateClient}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please enter client name' }]}
            >
              <Input placeholder="Enter client name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input placeholder="client@example.com" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please enter phone number' }]}
            >
              <Input placeholder="+1 234 567 8900" />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please enter address' }]}
            >
              <Input.TextArea rows={3} placeholder="Enter client address" />
            </Form.Item>

            <Form.Item className="mb-0">
              <div className="flex justify-end gap-2">
                <Button onClick={handleCloseDrawer}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Update Client
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Drawer>
      </Content>
    </Layout>
  );
};

export default Clients;
