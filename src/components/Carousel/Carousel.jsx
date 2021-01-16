import React, { useState, useEffect, useRef } from "react";
import styles from "./Carousel.less";
import CarouselItem from "./CarouselItem";
import CarouselControl from "./CarouselControl";
import Link from "../../components/Link/Link";
import { HashLink } from "react-router-hash-link";
import { getRecents } from "../../data";

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [longTouch, setLongTouch] = useState(true);
  const [animationBlock, setAnimationBlock] = useState(false);
  const [movex, setMovex] = useState(0);
  const [touchStart, setTouchStart] = useState({});

  const carouselListRef = useRef();
  const carouselHolderRef = useRef();

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      (entries, _) => {
        entries.forEach((entry) => {
          setAnimationBlock(!entry.isIntersecting);
        });
      },
      {
        rootMargin: "0px 0px 100% 0px",
      }
    );

    function handleCLickOutside(event) {
      if (!carouselHolderRef.current.contains(event.target)) {
        setAnimate(true);
      }
    }

    carouselListRef.current && headerObserver.observe(carouselListRef.current);
    document.addEventListener("click", handleCLickOutside);

    return () => {
      carouselListRef.current &&
        headerObserver.unobserve(carouselListRef.current);
      document.removeEventListener("click", handleCLickOutside);
    };
  }, []);

  useEffect(() => {
    if (!animate) return () => {};
    const carouselLength = carouselListRef.current.children.length;
    const nextIndex = animationBlock
      ? 0
      : (carouselLength + (current + 1)) % carouselLength;

    const interval = setInterval(() => {
      setCurrent(nextIndex);
      setMovex(nextIndex * carouselHolderRef.current.scrollWidth);
    }, 5000);

    function onResize() {
      clearInterval(interval);
      updateCarousel(current);
    }

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearInterval(interval);
    };
  }, [animationBlock, animate, current]);

  const updateCarousel = (index) => {
    const carouselLength = carouselListRef.current.children.length;
    const sliderWidth = carouselHolderRef.current.scrollWidth;
    const currentIndex =
      index < 0 ? carouselLength - 1 : index % carouselLength;
    setMovex(currentIndex * sliderWidth);
    setCurrent(currentIndex);
  };

  const handleClick = ({ target: { id } }) => {
    updateCarousel(id);
  };

  const handleLeftClick = () => {
    updateCarousel(current - 1);
  };

  const handleRightClick = () => {
    updateCarousel(current + 1);
  };

  const handleKeyBoard = ({ key }) => {
    switch (key) {
      case "ArrowLeft":
      case "Left":
        handleLeftClick();
        event.preventDefault();
        break;
      case "ArrowRight":
      case "Right":
        handleRightClick();
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  const handleCarouselClick = () => {
    setAnimate(false);
  };

  const handleBlur = () => {
    setAnimate(true);
  };

  const handleTouchStart = ({ touches }) => {
    setTouchStart({ coordX: touches[0].pageX, coordY: touches[0].pageY });
    setAnimate(false);

    setLongTouch(false);
    setTimeout(function () {
      setLongTouch(true);
    }, 500);

    carouselListRef.current.classList.remove(styles.animate);
  };

  const handleTouchEnd = (_) => {
    const carouselLength = carouselListRef.current.children.length;
    const sliderWidth = carouselHolderRef.current.scrollWidth;
    const absMove = Math.abs(current * sliderWidth - movex);
    if (absMove > sliderWidth / carouselLength || longTouch === false) {
      if (movex > current * sliderWidth && current < carouselLength - 1) {
        updateCarousel(current + 1);
      } else if (movex < current * sliderWidth && current > 0) {
        updateCarousel(current - 1);
      }
    } else {
      setMovex(current * sliderWidth);
    }
    setAnimate(true);
    carouselListRef.current.classList.add(styles.animate);
  };

  const handleTouchMove = ({ touches }) => {
    const carouselLength = carouselListRef.current.children.length;
    const sliderWidth = carouselHolderRef.current.scrollWidth;
    const movedx =
      current * sliderWidth + (touchStart.coordX - touches[0].pageX);
    movedx <= (carouselLength - 1) * sliderWidth && setMovex(movedx);
  };

  const recentPosts = getRecents();

  return (
    <section
      className={styles.carousel}
      aria-labelledby="carouselheading"
      onKeyDown={handleKeyBoard}
    >
      <h3 id="carouselheading" className="hidden">
        Recent news
      </h3>
      <div className={styles.carouselHolder} ref={carouselHolderRef}>
        <div
          className={`${styles.carouselList} ${styles.animate}`}
          ref={carouselListRef}
          style={{ transform: `translate3d(-${movex}px, 0, 0)` }}
          onClick={handleCarouselClick}
          onBlur={handleBlur}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        >
          {recentPosts.map((post, index) => (
            <CarouselItem key={index} background={post.cover}>
              <Link to={`posts/${post.id}`} tagName={HashLink}>
                {post.title}
              </Link>
            </CarouselItem>
          ))}
        </div>
      </div>
      <CarouselControl
        onClick={handleClick}
        onLeftClick={handleLeftClick}
        onRightClick={handleRightClick}
        current={current}
      />
    </section>
  );
}
