"use client";

import { useState } from "react";

import Link from "next/link";

import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { NavigationItem } from "@/data/navbarItems";

import Button from "./button";

interface NavbarProps {
  items: NavigationItem[];
}

const NavbarDesktop: React.FC<NavbarProps> = ({ items }) => {
  const buttonHref = "#";
  const buttonText = "Napište nám";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      {/* ------ DESKTOP MENU */}
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-20"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">MEDI HELIX s.r.o.,</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src="/img/logo.svg" className="h-10 w-auto" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-light bg-sky hover:bg-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky"
          >
            <span className="sr-only">Otevřít menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex justify-start gap-5">
          {items.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm/6 font-semibold text-dark menu-link hover:text-steel-600 transition duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button label={buttonText} href={buttonHref} />
        </div>
      </nav>

      {/* ------ MOBILE MENU */}

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel
          className={`fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-dark px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-light/10 transition-all duration-300 ease-in-out transform ${
            mobileMenuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">MEDI HELIX s.r.o.,</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src="/img/logo.svg" className="h-12 w-auto" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-light"
            >
              <span className="sr-only">Zavřít menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {items.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-light"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6 ">
                <Button label={buttonText} href={buttonHref} />
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default NavbarDesktop;
