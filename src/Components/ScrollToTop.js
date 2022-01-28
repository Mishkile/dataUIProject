import React, { useEffect, useState } from "react";
import topArrow from "../assets/image/top-arrow.png";

export default function ScrollToTop() {
  const [isVisibleTop, setIsVisibleTop] = useState(false);

  // Show button when page is scorlled upto given distance
  const toggleVisibility = () => {
    let limit = getMax();
    if (window.pageYOffset > 300) {
      setIsVisibleTop(true);
    } else {
      setIsVisibleTop(false);
    }
  };

  const getMax = () => {
    return Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: getMax(),
      behavior: "smooth",
    });
  };

  const styles = {
    top: {
      width: "20px",
      heigth: "20px",
      paddingBottom: "15px",
      position: "fixed",
      zIndex: "10",
      top: "3%",
      left: "95%",
      cursor: "pointer",
    },
    bottom: {
      width: "20px",
      heigth: "20px",
      paddingBottom: "15px",
      position: "fixed",
      zIndex: "10",
      top: "93%",
      left: "95%",
      cursor: "pointer",
    },
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {};
  }, []);

  return (
    <>
      <div>
        {isVisibleTop && (
          <div onClick={scrollToTop}>
            <img src={topArrow} alt="Go to top" style={styles.top} className="not-select"/>
          </div>
        )}
      </div>
      <div>
        <div onClick={scrollToBottom}>
          <img
            src={topArrow}
            alt="Go to bottom"
            className="rotateimg180 not-select"
            style={styles.bottom}
          />
        </div>
      </div>
    </>
  );
}
