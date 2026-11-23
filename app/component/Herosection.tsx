'use client'

import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';

function CarouselFadeExample() {
    return (
        <Carousel fade>
            <Carousel.Item>
                <Image
                    src="/brownies.jpg"
                    alt="brownies"
                    width={1800}
                    height={700}
                    priority
                    style={{
                        objectFit: "cover",
                        display: "block",
                    }}
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <Image
                    src="/cookies.jpg"
                    alt="cookies"
                    width={1800}
                    height={700}
                    priority
                    style={{
                        objectFit: "cover",
                        display: "block",
                    }}
                />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <Image
                    src="/cookiesncream.jpg"
                    alt="cookies"
                    width={1800}
                    height={700}
                    priority
                    style={{
                        objectFit: "cover",
                        display: "block",
                    }}
                />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselFadeExample;