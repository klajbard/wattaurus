import { useEffect } from "react";

const useScript = (url, options = {}) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = true;
    script.defer = true;
    script.crossOrigin = options.crossOrigin;
    script.nonce = options.nonce;
    options.callbackFn &&
      script.addEventListener("load", () => {
        options.callbackFn();
      });

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export default useScript;
