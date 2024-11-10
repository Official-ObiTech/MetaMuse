
const { useState, useEffect } = require("react");
const { FaArrowUp } = require("react-icons/fa6");

const ScrollToTop = () => {
  const [isvisible, setIsvisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  
  const handleScroll = () => {
    if (window.scrollY >= 600) {
      setIsvisible(true);
    } else {
      setIsvisible(false);
    }
  };


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
        window.removeEventListener("scroll", handleScroll);
    }
  }, [])

  return (
    <>
      <button className={`scrollToTop ${isvisible ? "show" : "hide"}`} onClick={scrollToTop}> 
        <FaArrowUp />
      </button>
    </>
  );
};

export default ScrollToTop;
