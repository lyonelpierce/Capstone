const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="h-16 flex w-full bg-gray-100 relative">
      <nav className="flex flex-center items-center text-black w-full gap-1">
        <div>
          <span className="font-semibold">
            &copy; Copyright {currentYear} -{" "}
            <a
              href="https://lyonelpierce.com"
              target="_blank"
              className="text-orange-600"
            >
              Lyonel Pierce
            </a>
          </span>
        </div>
      </nav>
    </div>
  );
};

export default Footer;