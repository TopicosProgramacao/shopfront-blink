import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Package, Moon, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useState, useEffect } from 'react';

const Header = () => {
  const location = useLocation();
  const { getTotalItems } = useCart();
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

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
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/' 
                ? 'text-primary hover:text-primary/80' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/products' 
                ? 'text-primary hover:text-primary/80' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Shop
          </Link>
          <Link 
            to="/clients" 
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/clients' 
                ? 'text-primary hover:text-primary/80' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Clients
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <Switch checked={isDark} onCheckedChange={setIsDark} />
            <Moon className="h-4 w-4" />
          </div>
          <Link to="/account">
            <Button variant="ghost" size="icon" className="relative">
              <UserOutlined className="text-lg" />
            </Button>
          </Link>
          <Link to="/cart">
            <Button variant="default" size="icon" className="relative">
              <ShoppingCartOutlined className="text-lg" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-medium text-accent-foreground">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
