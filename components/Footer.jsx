const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-auto h-16 flex items-center w-full footer">
      <nav className="flex flex-center items-center text-black w-full gap-1">
        <div>
          <span className="font-semibold">
            <a
              href="https://lyonelpierce.com"
              target="_blank"
              className="text-orange-600"
            >
              Lyonel Pierce
            </a>
          </span>
        </div>
        <span className="font-semibold">- {currentYear}</span>
      </nav>
    </div>
  );
};

export default Footer;
