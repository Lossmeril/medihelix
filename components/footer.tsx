const FooterMenu = () => {
  return (
    <nav className="flex justify-evenly py-8">
      <a href="#" className="-m-1.5 p-1.5">
        <span className="sr-only">ANTIKOR</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src="/img/logos/logo-long-mono-light.png"
          className="h-16 w-auto"
        />
      </a>
      <div className="flex flex-col gap-2">
        <p className="font-bold text-sm">Zdeněk Maixner - ANTIKOR s.r.o</p>
        <p className="text-sm">Kunčice 26</p>
        <p className="text-sm">561 51 Letohrad</p>
      </div>
      <div className="flex flex-col gap-2">
        <a href="#" className="text-sm">
          O nás
        </a>
        <a href="#" className="text-sm">
          Služby
        </a>
        <a href="#" className="text-sm">
          Kontakt
        </a>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-dark text-light border-t border-light/10">
      <FooterMenu />

      <div className="container mx-auto text-center">
        <p className="text-sm py-4 bg-light/10">
          &copy; {new Date().getFullYear()}, coalmarketing & Michal Špitálský
        </p>
      </div>
    </footer>
  );
};

export default Footer;
