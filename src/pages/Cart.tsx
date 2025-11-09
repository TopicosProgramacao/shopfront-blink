import { Layout, Typography, Card, Button, Empty, Modal, InputNumber } from 'antd';
import { ShoppingCartOutlined, DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import Header from '@/components/Header';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

const { Content } = Layout;
const { Title, Text } = Typography;

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, getTotalAmount, addToCart } = useCart();
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const handleCheckout = () => {
    setCheckoutModalOpen(true);
  };

  const handleConfirmCheckout = () => {
    clearCart();
    setCheckoutModalOpen(false);
    Modal.success({
      title: 'Purchase Complete!',
      content: 'Thank you for your purchase. Your order has been confirmed.',
    });
  };

  const totalAmount = getTotalAmount();

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
                        <div className="mt-2">
                          <Text strong>${(item.price * item.quantity).toFixed(2)}</Text>
                        </div>
                      </div>
                      <div className="text-right">
                        <Title level={4} className="!mb-2">${item.price.toFixed(2)}</Title>
                        <Button 
                          danger 
                          size="small" 
                          icon={<DeleteOutlined />}
                          onClick={() => removeFromCart(item.id)}
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
                <div className="flex gap-2">
                  <Button 
                    danger 
                    size="large" 
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                  <Button 
                    type="primary" 
                    size="large" 
                    block
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                </div>
              </Card>
            </>
          )}

          <Modal
            title="Confirm Purchase"
            open={checkoutModalOpen}
            onOk={handleConfirmCheckout}
            onCancel={() => setCheckoutModalOpen(false)}
            okText="Confirm Purchase"
            cancelText="Cancel"
          >
            <p>Are you sure you want to complete this purchase?</p>
            <p className="font-semibold mt-2">Total: ${totalAmount.toFixed(2)}</p>
          </Modal>
        </div>
      </Content>
    </Layout>
  );
};

export default Cart;
