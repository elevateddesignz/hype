import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Class of 2025 Graduation Chain',
    image: '/graduation-chain-2025.jpg',
    price: '$49.99',
    description: 'Custom 3D-printed graduation chain with black and red design',
  },
  {
    id: 2,
    name: 'MVP Sports Chain',
    price: '$44.99',
    image: 'https://images.pexels.com/photos/3755440/pexels-photo-3755440.jpeg',
    description: 'Celebrate athletic achievements with our custom sports chains',
  },
  {
    id: 3,
    name: 'Birthday Champion Chain',
    price: '$39.99',
    image: 'https://images.pexels.com/photos/6205513/pexels-photo-6205513.jpeg',
    description: 'Make their special day unforgettable with a custom birthday chain',
  },
];

export function FeaturedProducts() {
  const swiperRef = useRef(null);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary mb-8">Featured Chains</h2>
        <div className="relative">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-primary">{product.name}</h3>
                    <p className="text-gray-600 mt-1">{product.description}</p>
                    <p className="text-secondary font-bold mt-2">{product.price}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md">
            <ChevronLeft className="h-6 w-6 text-primary" />
          </button>
          <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md">
            <ChevronRight className="h-6 w-6 text-primary" />
          </button>
        </div>
      </div>
    </section>
  );
}