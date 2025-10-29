import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EyeFilled } from '@ant-design/icons';
import { notification } from 'antd';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const handleViewDetails = () => {
    notification.error({
      message: 'No Description Available',
      description: 'This product does not have a description yet.',
      placement: 'topRight',
      duration: 3,
    });
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
          onClick={handleViewDetails}
        >
          <EyeFilled className="text-lg" />
        </Button>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-card-foreground line-clamp-2 min-h-[3rem]">
          {product.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs text-muted-foreground capitalize bg-secondary px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
