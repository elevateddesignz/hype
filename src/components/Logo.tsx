import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/4167DD24-3F86-4379-BE33-070CBD029E38.PNG" 
        alt="HypeEmUp Logo" 
        className="h-12 w-auto"
      />
    </Link>
  );
}