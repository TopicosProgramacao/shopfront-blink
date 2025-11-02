import { Layout, Typography, Card, Button, Empty } from 'antd';
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';
import Header from '@/components/Header';

const { Content } = Layout;
const { Title, Text } = Typography;

const Cart = () => {
  const cartItems: any[] = []; // Empty cart for now

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <ShoppingCartOutlined className="text-3xl text-primary" />
            <Title level={2} className="!mb-0">Shopping Cart</Title>
          </div>
          
          {cartItems.length === 0 ? (
            <Card>
              <Empty
                description="Your cart is empty"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              >
                <Button type="primary" href="/products">
                  Start Shopping
                </Button>
              </Empty>
            </Card>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <Card key={item.id}>
                    <div className="flex items-center gap-6">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-24 h-24 object-contain"
                      />
                      <div className="flex-1">
                        <Title level={5} className="!mb-2">{item.title}</Title>
                        <Text type="secondary">Quantity: {item.quantity}</Text>
                      </div>
                      <div className="text-right">
                        <Title level={4} className="!mb-2">${item.price}</Title>
                        <Button 
                          danger 
                          size="small" 
                          icon={<DeleteOutlined />}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card>
                <div className="flex justify-between items-center mb-4">
                  <Title level={4} className="!mb-0">Total:</Title>
                  <Title level={3} className="!mb-0 text-primary">
                    ${totalAmount.toFixed(2)}
                  </Title>
                </div>
                <Button type="primary" size="large" block>
                  Proceed to Checkout
                </Button>
              </Card>
            </>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default Cart;
