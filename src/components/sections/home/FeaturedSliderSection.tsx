"use client"

import { IArticle } from '@/models/Article'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import SwiperCard from './SwiperCard';



interface FeaturedSliderSectionProps{
    articles: IArticle[]
}

const FeaturedSliderSection = ({articles}: FeaturedSliderSectionProps) => {
  return (
    <section className='mb-24 py-12 text-gray-800'>
        <div className='px-4 sm:px-6 lg:px-8'>
              <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
            delay: 5000,
            disableOnInteraction: false
        }}
        loop={true}
        breakpoints={{
          768: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="rounded-xl "
      >
       
        {
           articles.map((article) => (
             <SwiperSlide key={article._id}>
                <SwiperCard article={article}/>
             </SwiperSlide>
           )) 
        }
      </Swiper>
        </div>

        <div className='border-t border-gray-200 mt-12 pt-8'></div>
     
    </section>
  )
}

export default FeaturedSliderSection