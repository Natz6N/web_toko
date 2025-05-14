import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CarouselProps {
  items: {
    id: number;
    image: string;
    title?: string;
    description?: string;
  }[];
}

interface ProductCarouselProps {
  products: {
    id: number;
    image: string;
    name: string;
    price: string | number;
    discountPrice?: string | number;
  }[];
}

interface TestimonialProps {
  testimonials: {
    id: number;
    image: string;
    name: string;
    role: string;
    content: string;
  }[];
}

function SectionCarousel({ items }: CarouselProps) {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
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

function ProductCarousel({ products }: ProductCarouselProps) {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={2}
        navigation
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
          <SwiperSlide key={product.id} className="rounded-lg overflow-hidden shadow-sm group">
            <div className="bg-white p-2 h-full flex flex-col">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 flex-grow flex flex-col">
                <h3 className="font-medium text-sm md:text-base line-clamp-2">{product.name}</h3>
                <div className="mt-2 flex items-center">
                  {product.discountPrice ? (
                    <>
                      <span className="font-bold text-red-600">${product.discountPrice}</span>
                      <span className="ml-2 text-gray-500 line-through text-sm">${product.price}</span>
                    </>
                  ) : (
                    <span className="font-bold">${product.price}</span>
                  )}
                </div>
                <button className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 text-sm rounded transition-colors duration-200 mt-3">
                  Add to Cart
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function TestimonialCarousel({ testimonials }: TestimonialProps) {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
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
          <SwiperSlide key={testimonial.id} className="rounded-lg overflow-hidden shadow-md p-6 bg-white">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
              <div className="flex-grow">
                <p className="text-gray-700 italic">{testimonial.content}</p>
              </div>
              <div className="mt-4 flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export { SectionCarousel, ProductCarousel, TestimonialCarousel };
