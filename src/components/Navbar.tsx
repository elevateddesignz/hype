import { Link } from 'react-router-dom';
import { Menu, ShoppingCart, User } from 'lucide-react';
import { Button } from './ui/Button';
import { Logo } from './Logo';

export function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Logo />
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link to="/shop" className="text-gray-700 hover:text-primary">
              Shop
            </Link>
            <Link to="/builder" className="text-gray-700 hover:text-primary">
              Chain Builder
            </Link>
            <Link to="/gallery" className="text-gray-700 hover:text-primary">
              Gallery
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="secondary" size="sm">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm">
              <User className="h-5 w-5" />
            </Button>
            <button className="sm:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}