'use client'

import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';

function CarouselFadeExample() {
  const slides = [
    {
      src: "/brownies.jpg",
      alt: "Brownies cokelat lezat",
      title: "Brownies Cokelat",
      description: "Manis, lembut, dan penuh rasa cokelat premium.",
    },
    {
      src: "/cookies.jpg",
      alt: "Cookies renyah",
      title: "Cookies Renyah",
      description: "Cookies gurih-manis yang cocok untuk teman minum teh.",
    },
    {
      src: "/cookiesncream.jpg",
      alt: "Cookies and cream",
      title: "Cookies & Cream",
      description: "Perpaduan krim lembut dan remah cookies yang nikmat.",
    },
  ];

  return (
    <Carousel fade interval={5000} className="hero-carousel">
      {slides.map((slide, index) => (
        <Carousel.Item key={slide.src}>
          <div className="hero-slide">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              priority={index === 0}
              className="hero-image"
            />
            <div className="hero-overlay" />
            <Carousel.Caption className="hero-caption">
              <span className="hero-kicker">Dapurnya Manis</span>
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
              <a className="hero-button" href="#produk">
                Lihat Produk
              </a>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselFadeExample;