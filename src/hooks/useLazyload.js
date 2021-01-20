import { useEffect, useRef, useCallback } from "react";
import styles from "./lazyload.less";

export default function useLazyLoad() {
  const classReplace = "replace",
    classPreview = styles.preview,
    classReveal = styles.reveal,
    timer = useRef(),
    imgLazyLoad = useRef();

  function throttle() {
    timer.current =
      timer.current ||
      setTimeout(function () {
        timer.current = null;
        checkImgInView();
      }, 300);
  }

  function loadFullImage(image, retryCount) {
    image.classList.remove(classReplace);
    const href = image.getAttribute("data-href") || image.href,
      pImg = image.querySelector("img." + classPreview);

    if (!href || !pImg) return;

    let img = new Image(),
      ds = image.dataset;

    if (ds) {
      if (ds.srcset) img.srcset = ds.srcset;
      if (ds.sizes) img.sizes = ds.sizes;
    }

    img.onload = function () {
      let imgClass = img.classList;
      img.className = pImg.className;
      imgClass.remove(classPreview);
      imgClass.add(classReveal);
      img.alt = pImg.alt || "";

      window.requestAnimationFrame(function () {
        image
          .insertBefore(img, pImg.nextSibling)
          .addEventListener("animationend", function () {
            image.removeChild(pImg);
            imgClass.remove(classReveal);
          });
      });
    };

    retryCount = 1 + (retryCount || 0);
    if (retryCount < 3)
      img.onerror = function () {
        setTimeout(function () {
          loadFullImage(image, retryCount);
        }, retryCount * 3000);
      };

    img.rel = "preconnect"
    img.src = href;
  }

  const checkImgInView = useCallback(() => {
    if (imgLazyLoad.current.length)
      window.requestAnimationFrame(function () {
        const wH = window.innerHeight;
        let cRect,
          cT,
          cH,
          p = 0;
        while (p < imgLazyLoad.current.length) {
          cRect = imgLazyLoad.current[p].getBoundingClientRect();
          cT = cRect.top;
          cH = cRect.height;

          if (0 < cT + cH && wH > cT) {
            loadFullImage(imgLazyLoad.current[p]);
          } else p++;
        }
      });
  });

  useEffect(() => {
    imgLazyLoad.current = document.getElementsByClassName(
      `${styles.progressive} ${classReplace}`
    );
    checkImgInView();
  }, []);

  useEffect(() => {
    if (window.MutationObserver) {
      const observer = new MutationObserver(throttle);
      observer.observe(document.body, {
        subtree: true,
        childList: true,
        attributes: true,
      });
      return function () {
        observer.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    const handlers = ["pageshow", "scroll", "resize"];
    handlers.forEach(function (handler) {
      window.addEventListener(handler, throttle, { passive: true });
    });

    return function () {
      handlers.forEach(function (handler) {
        window.removeEventListener(handler, throttle);
      });
    };
  }, [imgLazyLoad.length]);
}
