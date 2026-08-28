export const SITE_HEADER_NAV = [
  { href: "/contact", label: "Contact" },
] as const;

export const SITE_FOOTER_NAV = [
  { label: "Services" },
  { label: "Clients" },
  { href: "/contact", label: "Contact" },
] as const;

export const SITE_SERVICE_LINKS = [
  { label: "Site web", href: "/options/site-web" },
  { label: "Infrastructure ", href: "/options/site-web" },
  { label: "Gestion", href: "/options/site-web" },
  { label: "Interface", href: "/options/site-web" },
] as const;

export const SITE_SERVICE_MENU_LINKS = [
  { label: "Tous nos services", href: "/services" },
  ...SITE_SERVICE_LINKS,
] as const;
