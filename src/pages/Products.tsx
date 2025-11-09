import { useState, useEffect, useMemo } from 'react';
import { Layout, Typography, Button, Modal, Input, Form, notification, Spin, Popconfirm, Drawer } from 'antd';
import { PlusOutlined, DeleteOutlined, SearchOutlined, EditOutlined } from '@ant-design/icons';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';

const { Content } = Layout;
const { Title } = Typography;

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  // Load products from API and LocalStorage on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Get API products
        const response = await fetch('https://fakestoreapi.com/products');
        const apiProducts = await response.json();

        // Get LocalStorage products
        const localProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');

        // Combine both sources
        setProducts([...apiProducts, ...localProducts]);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to load products',
          placement: 'topRight',
        });
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Save custom products to LocalStorage whenever products change
  useEffect(() => {
    const customProducts = products.filter(p => p.id > 1000);
    localStorage.setItem('customProducts', JSON.stringify(customProducts));
  }, [products]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleAddProduct = async (values: any) => {
    const newProduct: Product = {
      id: Date.now(), // Use timestamp as unique ID for custom products
      title: values.title,
      price: parseFloat(values.price),
      image: values.image || 'https://via.placeholder.com/300',
      description: values.description || '',
      category: values.category || 'custom',
    };

    setProducts([...products, newProduct]);
    
    notification.success({
      message: 'Success',
      description: 'Product added successfully!',
      placement: 'topRight',
    });

    handleCancel();
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter(p => p.id !== productId));
    notification.success({
      message: 'Success',
      description: 'Product deleted successfully!',
      placement: 'topRight',
    });
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    editForm.setFieldsValue({
      title: product.title,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
    });
    setIsDrawerOpen(true);
  };

  const handleUpdateProduct = async (values: any) => {
    if (!editingProduct) return;

    const updatedProduct: Product = {
      ...editingProduct,
      title: values.title,
      price: parseFloat(values.price),
      image: values.image || editingProduct.image,
      description: values.description || '',
      category: values.category || 'custom',
    };

    setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
    
    notification.success({
      message: 'Success',
      description: 'Product updated successfully!',
      placement: 'topRight',
    });

    setIsDrawerOpen(false);
    setEditingProduct(null);
    editForm.resetFields();
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setEditingProduct(null);
    editForm.resetFields();
  };

  const productsList = useMemo(() => {
    if (!searchQuery.trim()) return products;
    
    return products.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  return (
    <Layout className="min-h-screen bg-background">
      <Header />
      <Content className="p-8 bg-background text-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Title level={2} className="!mb-0">All Products</Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showModal}
              size="large"
            >
              Add Product
            </Button>
          </div>

          <div className="mb-8">
            <Input
              size="large"
              placeholder="Search products by name, description, or category..."
              prefix={<SearchOutlined />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              allowClear
            />
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Spin size="large" />
            </div>
          ) : productsList.length === 0 ? (
            <div className="text-center text-muted-foreground py-20">
              <p className="text-xl">No products available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productsList.map((product) => (
                <div key={product.id} className="relative">
                  <ProductCard product={product} />
                  <div className="absolute top-2 left-2 z-10 flex gap-2">
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      size="small"
                      onClick={() => handleEditProduct(product)}
                    />
                    <Popconfirm
                      title="Delete Product"
                      description="Are you sure you want to delete this product?"
                      onConfirm={() => handleDeleteProduct(product.id)}
                      okText="Yes"
                      cancelText="No"
                      placement="topRight"
                    >
                      <Button
                        danger
                        icon={<DeleteOutlined />}
                        size="small"
                      />
                    </Popconfirm>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Modal
          title="Add New Product"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          keyboard={true}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleAddProduct}
            className="mt-4"
          >
            <Form.Item
              label="Product Name"
              name="title"
              rules={[{ required: true, message: 'Please enter product name' }]}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                { required: true, message: 'Please enter price' },
                { pattern: /^\d+(\.\d{1,2})?$/, message: 'Please enter a valid price' }
              ]}
            >
              <Input placeholder="0.00" prefix="$" />
            </Form.Item>

            <Form.Item
              label="Image URL"
              name="image"
            >
              <Input placeholder="https://example.com/image.jpg" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
            >
              <Input.TextArea rows={4} placeholder="Enter product description" />
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
            >
              <Input placeholder="Enter category" />
            </Form.Item>

            <Form.Item className="mb-0">
              <div className="flex justify-end gap-2">
                <Button onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Add Product
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>

        <Drawer
          title="Edit Product"
          open={isDrawerOpen}
          onClose={handleCloseDrawer}
          width={400}
        >
          <Form
            form={editForm}
            layout="vertical"
            onFinish={handleUpdateProduct}
          >
            <Form.Item
              label="Product Name"
              name="title"
              rules={[{ required: true, message: 'Please enter product name' }]}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                { required: true, message: 'Please enter price' },
                { pattern: /^\d+(\.\d{1,2})?$/, message: 'Please enter a valid price' }
              ]}
            >
              <Input placeholder="0.00" prefix="$" />
            </Form.Item>

            <Form.Item
              label="Image URL"
              name="image"
            >
              <Input placeholder="https://example.com/image.jpg" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
            >
              <Input.TextArea rows={4} placeholder="Enter product description" />
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
            >
              <Input placeholder="Enter category" />
            </Form.Item>

            <Form.Item className="mb-0">
              <div className="flex justify-end gap-2">
                <Button onClick={handleCloseDrawer}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Update Product
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Drawer>
      </Content>
    </Layout>
  );
};

export default Products;
