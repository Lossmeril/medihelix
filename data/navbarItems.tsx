export type NavigationItem = {
  name: string;
  href: string;
};

export const navigationItems: NavigationItem[] = [
  { name: "Domů", href: "/" },

  // { name: "Reagencie a spotřební materiál", href: "#" },
  // { name: "Přístroje", href: "/instruments" },
  // { name: "Rychlé diagnostické testy", href: "/quick-tests" },

  // { name: "Produkty podle firem", href: "/companies" },
  // { name: "Akce", href: "#" },

  { name: "Aktuality", href: "#blog" },
  // { name: "O nás", href: "#" },
  { name: "Kontakt", href: "#kontakt" },
];
