import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
            <Package className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Online Shop</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="/" 
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Home
          </a>
          <a 
            href="/shop" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Shop
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <UserOutlined className="text-lg" />
          </Button>
          <Button variant="default" size="icon" className="relative">
            <ShoppingCartOutlined className="text-lg" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-medium text-accent-foreground">
              0
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
