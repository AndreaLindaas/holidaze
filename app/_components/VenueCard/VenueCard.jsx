import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import styles from "./VenueCard.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-flip";
import Image from "next/image";

export default function VenueCard(props) {
  const { venue } = props;
  //console.log(venue);

  const getSwiperSlide = () => {
    return venue.media.map((image, i) => {
      return (
        <SwiperSlide className={styles.venueCard} key={i}>
          <img src={image} alt="" className={styles.image} />
        </SwiperSlide>
      );
    });
  };

  const renderSlider = () => {
    if (venue.media && venue.media.length > 0)
      return (
        <Swiper
          spaceBetween={50}
          pagination={{ clickable: true }}
          slidesPerView={1}
          modules={[Navigation, Pagination]}
        >
          {getSwiperSlide()}
        </Swiper>
      );
    // return venue.media.map((image, i) => {
    //   return <img src={image} alt="" key={i} />;
    // });
  };
  return (
    <div className={styles.venueCard}>
      <div>
        {venue.media && venue.media.length > 0 && (
          <img src={venue.media[0]} alt="" className={styles.image} />
        )}
      </div>
      <div className="bold">
        {venue.location.city}, {venue.location.country}
      </div>
      <div>{venue.price} kr night</div>
    </div>
  );
}
