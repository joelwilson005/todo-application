import { useState, useEffect } from "react";

const Footer = () => {
  const [year, setYear] = useState(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, [year]);

  return (
    <>
      <footer className="min-w-full p-8 max-h-fit bg-main font-secondary text-neutralBackground">
        <p className="text-xl font-bold text-center ">
          &copy;{year} Joel Wilson
        </p>
        <p className="mt-4 text-lg text-center font-secondary">
          Made with ❤️ in &#x1F1EF;&#x1F1F2;
        </p>
      </footer>
    </>
  );
};

export default Footer;
