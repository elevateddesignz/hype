import { Button } from './ui/Button';

export function Hero() {
  return (
    <div className="relative bg-primary">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Level Up Your Achievements
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Custom 3D-printed chains that celebrate your kid's biggest moments.
            From graduation to sports MVPs, make their victories unforgettable.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button variant="secondary" size="lg">
              Build Your Chain
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
              View Gallery
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}