import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import styles from "./Slider.module.scss";
export default function SimpleSlider(props) {
  const venue = props.venue;
  console.log("Tralalala", venue);

  const showImages = () => {
    // if (venue.media && venue.media.length > 0)
    if (venue && venue.media && venue.media.length > 0)
      return venue.media.map((image, i) => {
        return (
          <div className={styles.slide} key={i}>
            <img src={image.url} alt="" />
          </div>
        );
      });
  };

  return <Carousel className={styles.carousel}>{showImages()}</Carousel>;
}
