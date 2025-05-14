import React from 'react';
import { SectionCarousel, ProductCarousel, TestimonialCarousel } from '../Carousel';
import Card from '../Card';

export default function CarouselExample() {
  // Sample data for carousel
  const bannerItems = [
    {
      id: 1,
      image: '/images/banner1.jpg',
      title: 'Summer Collection',
      description: 'Discover our new summer collection with up to 50% off',
      url: '/collections/summer',
    },
    {
      id: 2,
      image: '/images/banner2.jpg',
      title: 'New Arrivals',
      description: 'Check out the latest products in our store',
      url: '/new-arrivals',
    },
    {
      id: 3,
      image: '/images/banner3.jpg',
      title: 'Special Offers',
      description: 'Limited time deals on selected items',
      url: '/special-offers',
    },
  ];

  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Modern Desk Lamp',
      image: '/images/product1.jpg',
      price: 89.99,
      discountPrice: 69.99,
      url: '/products/modern-desk-lamp',
    },
    {
      id: 2,
      name: 'Wireless Bluetooth Headphones',
      image: '/images/product2.jpg',
      price: 129.99,
      url: '/products/wireless-headphones',
    },
    {
      id: 3,
      name: 'Smart Watch Series 5',
      image: '/images/product3.jpg',
      price: 249.99,
      discountPrice: 199.99,
      url: '/products/smart-watch-5',
    },
    {
      id: 4,
      name: 'Portable Bluetooth Speaker',
      image: '/images/product4.jpg',
      price: 79.99,
      url: '/products/bluetooth-speaker',
    },
    {
      id: 5,
      name: 'Ergonomic Office Chair',
      image: '/images/product5.jpg',
      price: 199.99,
      discountPrice: 159.99,
      url: '/products/office-chair',
    },
    {
      id: 6,
      name: 'HD Webcam with Microphone',
      image: '/images/product6.jpg',
      price: 69.99,
      url: '/products/hd-webcam',
    },
  ];

  // Sample testimonial data
  const testimonials = [
    {
      id: 1,
      name: 'John Smith',
      role: 'Regular Customer',
      image: '/images/testimonial1.jpg',
      content: 'I\'ve been shopping here for years. The product quality and customer service are always excellent. Highly recommended!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'New Customer',
      image: '/images/testimonial2.jpg',
      content: 'My first order arrived quickly and was exactly as described. The packaging was also environmentally friendly which I appreciated.',
      rating: 4,
    },
    {
      id: 3,
      name: 'Michael Brown',
      role: 'Tech Enthusiast',
      image: '/images/testimonial3.jpg',
      content: 'The tech products I\'ve purchased from this store have all been high quality. Their prices are competitive and the delivery is fast.',
      rating: 5,
    },
    {
      id: 4,
      name: 'Emily Davis',
      role: 'Interior Designer',
      image: '/images/testimonial4.jpg',
      content: 'As an interior designer, I often recommend this store to my clients. Their home decor items are stylish and well-crafted.',
      rating: 4,
    },
  ];

  return (
    <div className="space-y-12 py-8">
      {/* Main Banner Carousel */}
      <section>
        <SectionCarousel items={bannerItems} effect="fade" />
      </section>

      {/* Featured Products Carousel */}
      <section>
        <ProductCarousel products={products} title="Featured Products" />
      </section>

      {/* Individual Card Examples */}
      <section className="px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Card Examples</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Basic Card */}
          <Card
            title="Basic Card"
            description="This is a simple card with just a title and description."
          />

          {/* Card with Image */}
          <Card
            image="/images/card-image.jpg"
            title="Card with Image"
            description="This card includes an image at the top."
          />

          {/* Card with Badge */}
          <Card
            image="/images/sale-item.jpg"
            title="Special Offer"
            description="Limited time deal on this exclusive product."
            badge="SALE"
            badgeColor="danger"
          />

          {/* Horizontal Card */}
          <Card
            image="/images/horizontal-card.jpg"
            title="Horizontal Layout"
            description="This card uses a horizontal layout on larger screens."
            horizontal={true}
            className="md:col-span-2"
          />

          {/* Card with Footer */}
          <Card
            title="Card with Actions"
            description="This card includes action buttons in the footer area."
            footer={
              <div className="flex justify-end space-x-2">
                <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-800 transition-colors">
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition-colors">
                  Save
                </button>
              </div>
            }
          />

          {/* Card with Custom Content */}
          <Card>
            <div className="text-center">
              <div className="inline-flex rounded-full bg-green-100 p-3 mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Success Card</h3>
              <p className="text-gray-600 dark:text-gray-400">Your action has been completed successfully.</p>
              <button className="mt-4 w-full py-2 bg-green-600 hover:bg-green-700 rounded text-white transition-colors">
                Continue
              </button>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section>
        <TestimonialCarousel testimonials={testimonials} title="Customer Testimonials" />
      </section>
    </div>
  );
}
