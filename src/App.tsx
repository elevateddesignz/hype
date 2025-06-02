import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedProducts } from './components/FeaturedProducts';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Hero />
          <FeaturedProducts />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;