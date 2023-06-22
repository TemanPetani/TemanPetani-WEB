import { FC, useState, useEffect } from 'react';
import { FaChevronUp } from 'react-icons/fa';

interface ScrollTopType {
  first: string;
  second: string;
}

const ScrollToTopButton: FC<ScrollTopType> = ({ first, second }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const firstSection = document.getElementById(first);
      const secondSection = document.getElementById(second);
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;

      if (secondSection) {
        const secondSectionOffset = secondSection.offsetTop;

        setShowButton(!firstSection || scrollPosition > secondSectionOffset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [first, second]);

  const handleClickScroll = (x: string) => {
    const element = document.getElementById(x);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <button
      className={`fixed bottom-4 right-4 p-3 rounded-full btn btn-circle bg-primary text-lg text-primary-content hover:bg-primary-focus flex justify-center items-center ${
        showButton ? 'block' : 'hidden'
      }`}
      onClick={() => handleClickScroll(first)}
    >
      <FaChevronUp />
    </button>
  );
};

export default ScrollToTopButton;
