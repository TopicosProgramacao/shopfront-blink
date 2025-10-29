import { useState, useEffect, useMemo } from 'react';
import { Spin } from 'antd';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products?limit=5');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const topProducts = useMemo(() => products.slice(0, 5), [products]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
            Welcome to the Shop
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            Discover our curated selection of premium products
          </p>
        </section>

        {/* Products Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Top 5 Products
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Spin size="large" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {topProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-border mt-20 py-8">
        <div className="container px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Online Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
