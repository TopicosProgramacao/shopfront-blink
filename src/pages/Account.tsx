import { Layout, Typography, Card, Avatar, Button } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import Header from '@/components/Header';

const { Content } = Layout;
const { Title, Text } = Typography;

const Account = () => {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="p-8">
        <div className="max-w-4xl mx-auto">
          <Title level={2} className="!mb-8">My Account</Title>
          
          <Card className="mb-6">
            <div className="flex items-center gap-6 mb-6">
              <Avatar size={80} icon={<UserOutlined />} className="bg-primary" />
              <div>
                <Title level={4} className="!mb-1">John Doe</Title>
                <Text type="secondary">john.doe@example.com</Text>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button icon={<SettingOutlined />}>
                Edit Profile
              </Button>
              <Button icon={<LogoutOutlined />} danger>
                Logout
              </Button>
            </div>
          </Card>

          <Card title="Account Information">
            <div className="space-y-4">
              <div>
                <Text strong>Full Name:</Text>
                <br />
                <Text>John Doe</Text>
              </div>
              <div>
                <Text strong>Email:</Text>
                <br />
                <Text>john.doe@example.com</Text>
              </div>
              <div>
                <Text strong>Member Since:</Text>
                <br />
                <Text>January 2025</Text>
              </div>
            </div>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default Account;
