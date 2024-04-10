import React, { useState, useEffect, useRef } from "react";

import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import close from "../../assets/svg/closeicon.svg";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ImageDetails({ property }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [_, setInit] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const openModal = (index) => {
    setCurrentImage(index);
    setModalIsOpen(true);
  };

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalIsOpen]);

  return (
    <>
      {property.Image && property.Image.length > 0 ? (
        <div className="flex justify-between w-full h-[550px] rounded-2xl overflow-hidden">
          <div
            className="w-[50%] image-overlay "
            style={{
              backgroundImage: `url(${
                property.Image && property.Image.length > 0
                  ? property.Image[0].url
                  : "defaultImageUrl"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "50%",
              height: "100%",
            }}
            onClick={() => openModal(0)}
          ></div>
          <div className="w-[49%] flex flex-col justify-between">
            <div
              className="w-full h-[45%]"
              style={{
                backgroundImage: `url(${
                  property.Image && property.Image.length > 0
                    ? property.Image[1].url
                    : "defaultImageUrl"
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "49%",
              }}
              onClick={() => openModal(1)}
            ></div>

            <div
              className="w-full h-[49%]"
              style={{
                backgroundImage: `url(${
                  property.Image && property.Image.length > 0
                    ? property.Image[2].url
                    : "defaultImageUrl"
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "49%",
              }}
              onClick={() => openModal(2)}
            ></div>
          </div>
        </div>
      ) : (
        ""
      )}

      {modalIsOpen && (
        <div
          className="overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex justify-center items-center cursor-pointer"
          onClick={() => setModalIsOpen(false)}
        >
          <div className="absolute top-2 right-5">
            <img src={close} className="rounded-full z-50 h-[50px] w-[50px]" />
          </div>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            // loop={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            onInit={() => setInit(true)}
            className="mySwiper w-[100%] h-[100vh]"
            slidesPerGroupSkip={1}
            onSlideChange={(val) => {
              setCurrentIndex(val.activeIndex);
            }}
          >
            {property.Image.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="flex h-full relative bg-title justify-center items-center">
                  <img
                    src={image.url}
                    alt={`property ${index}`}
                    className="cursor-pointer h-full w-auto object-contain"
                    width={1440}
                    height={900}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
}
