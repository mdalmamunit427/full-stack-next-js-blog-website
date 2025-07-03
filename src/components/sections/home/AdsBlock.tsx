// components/ads/AdsBlock.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Define the specific props this AdsBlock component now expects
interface AdsBlockProps {
  bottomImageUrl: string;
  bottomImageAlt: string;
  adLink: string; // The link for the ad
}

const AdsBlock: React.FC<AdsBlockProps> = ({ bottomImageUrl, bottomImageAlt, adLink }) => {
  return (

    <div className="flex justify-center items-center"> 
      <Link href={adLink} className="block  overflow-hidden">
        <Image
          src={bottomImageUrl}
          alt={bottomImageAlt}
          width={166} 
          height={346}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </Link>
    </div>
  );
};

export default AdsBlock;