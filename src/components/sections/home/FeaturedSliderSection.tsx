"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules'; 
import SwiperCard from './SwiperCard'; 

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { IArticle } from '@/models/Article'; 


interface FeaturedSliderSectionProps {
  articles: IArticle[];
}

const FeaturedSliderSection: React.FC<FeaturedSliderSectionProps> = ({ articles }) => { 
  return (

    <section className="mb-24 py-12 text-gray-800 ">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30} 
          slidesPerView={1} 
          pagination={{ clickable: true }} 
          autoplay={{
            delay: 5000, // 5 seconds
            disableOnInteraction: false,
          }}
          loop={true} 
          className="blog-slider rounded-xl" 
          breakpoints={{
            768: {
              slidesPerView: 1, 
              spaceBetween: 30,
            },
          }}
        >
          {articles.map((article) => ( 
            <SwiperSlide key={article._id}>
              <SwiperCard article={article} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div> 
 
      <div className="border-t border-gray-200  mt-12 pt-8"></div> 
    </section>
  );
};

export default FeaturedSliderSection;