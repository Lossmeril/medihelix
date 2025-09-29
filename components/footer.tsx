import Link from "next/link";

const FooterMenu = () => {
  return (
    <nav className="grid grid-cols-1 lg:grid-cols-3 mx-auto py-8">
      <div className="w-full h-full flex flex-col justify-center items-center lg:items-end">
        <Link href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">MEDI HELIX s.r.o.,</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src="/img/logo-white.png" className="h-10 w-auto" />
        </Link>
      </div>
      <div className="flex flex-col gap-2 w-full h-full justify-center items-center">
        <p className="font-bold text-sm">MEDI HELIX s.r.o.,</p>
        <p className="text-sm">Jasanová 2690</p>
        <p className="text-sm">250 01 Brandýs nad Labem</p>
      </div>
      <div className="flex flex-col gap-2 w-full h-full justify-center items-center lg:items-start">
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
    <footer className="w-full bg-dark text-light border-t border-light/10">
      <FooterMenu />

      <div className="w-full mx-auto text-center">
        <p className="text-sm py-4 bg-light/10">
          &copy; {new Date().getFullYear()}, Michal Špitálský
        </p>
      </div>
    </footer>
  );
};

export default Footer;
