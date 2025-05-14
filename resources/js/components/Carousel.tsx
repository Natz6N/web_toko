import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { router } from '@inertiajs/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface CarouselProps {
  items: {
    id: number;
    image: string;
    title?: string;
    description?: string;
    url?: string;
  }[];
  autoplay?: boolean;
  loop?: boolean;
  effect?: 'slide' | 'fade';
}

interface ProductCarouselProps {
  products: {
    id: number;
    image: string;
    name: string;
    price: string | number;
    discountPrice?: string | number;
    url?: string;
  }[];
  title?: string;
}

interface TestimonialProps {
  testimonials: {
    id: number;
    image: string;
    name: string;
    role: string;
    content: string;
    rating?: number;
  }[];
  title?: string;
}

interface CardProps {
  image?: string;
  title: string;
  subtitle?: string;
  description?: string;
  footer?: React.ReactNode;
  onClick?: () => void;
  url?: string;
  className?: string;
}

function Card({ image, title, subtitle, description, footer, onClick, url, className = '' }: CardProps) {
  const cardContent = (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg ${className}`}>
      {image && (
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <div className="p-4">
        {title && <h3 className="font-medium text-lg mb-1 text-gray-900 dark:text-white">{title}</h3>}
        {subtitle && <h4 className="text-sm text-gray-600 dark:text-gray-300 mb-2">{subtitle}</h4>}
        {description && <p className="text-gray-700 dark:text-gray-400 text-sm">{description}</p>}
      </div>
      {footer && <div className="border-t border-gray-200 dark:border-gray-700 p-4">{footer}</div>}
    </div>
  );

  if (url) {
    return (
      <a href={url} className="block" onClick={(e) => onClick && (e.preventDefault(), onClick())}>
        {cardContent}
      </a>
    );
  }

  if (onClick) {
    return <div onClick={onClick} className="cursor-pointer">{cardContent}</div>;
  }

  return cardContent;
}

function SectionCarousel({ items, autoplay = true, loop = true, effect = 'slide' }: CarouselProps) {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={loop}
        effect={effect === 'fade' ? 'fade' : 'slide'}
        autoplay={autoplay ? {
          delay: 5000,
          disableOnInteraction: false,
        } : false}
        breakpoints={{
          640: {
            slidesPerView: effect === 'fade' ? 1 : 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: effect === 'fade' ? 1 : 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: effect === 'fade' ? 1 : 4,
            spaceBetween: 40,
          },
        }}
        className="mySwiper"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="rounded-lg overflow-hidden shadow-md">
            <div className="relative">
              <img
                src={item.image}
                alt={item.title || 'Carousel image'}
                className="w-full h-64 object-cover"
              />
              {(item.title || item.description) && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                  {item.title && <h3 className="text-lg font-semibold">{item.title}</h3>}
                  {item.description && <p className="text-sm mt-1">{item.description}</p>}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function ProductCarousel({ products, title }: ProductCarouselProps) {
  return (
    <div className="w-full">
      {title && <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{title}</h2>}

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={2}
        navigation
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          480: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 24,
          },
        }}
        className="product-swiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Card
              image={product.image}
              title={product.name}
              url={product.url}
              footer={
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    {product.discountPrice ? (
                      <>
                        <span className="font-bold text-red-600">${product.discountPrice}</span>
                        <span className="ml-2 text-gray-500 line-through text-sm">${product.price}</span>
                      </>
                    ) : (
                      <span className="font-bold">${product.price}</span>
                    )}
                  </div>
                  <button onClick={() => router.visit(product.url)} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors duration-200">
                    show product
                  </button>
                </div>
              }
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function TestimonialCarousel({ testimonials, title }: TestimonialProps) {
  return (
    <div className="w-full">
      {title && <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{title}</h2>}

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="testimonial-swiper"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <Card
              image={testimonial.image}
              title={testimonial.name}
              subtitle={testimonial.role}
              description={testimonial.content}
              footer={
                <div className="flex text-yellow-400">
                  {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              }
              className="h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export { SectionCarousel, ProductCarousel, TestimonialCarousel, Card };
