"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Video, MessageCircle } from "lucide-react";

const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

const footerLinks = {
  links: [
    { name: "Home", href: "/", scrollTo: "hero" },
    { name: "Destinations", href: "/", scrollTo: "destinations" },
    { name: "Portfolio", href: "/", scrollTo: "portfolio" },
    { name: "Register Interest", href: "/", scrollTo: "register-interest" },
  ],
  projects: [
    { name: "Mazarine Hub", href: "/", scrollTo: "portfolio" },
    { name: "Mazarine Boulevard", href: "/", scrollTo: "portfolio" },
    { name: "Mamsha Vista", href: "/", scrollTo: "portfolio" },
    { name: "Jade Park", href: "/", scrollTo: "portfolio" },
    { name: "Maspero Mall", href: "/", scrollTo: "portfolio" },
    { name: "Maspero Nile Heights", href: "/", scrollTo: "portfolio" },
    { name: "Maspero Business Towers", href: "/", scrollTo: "portfolio" },
    { name: "V40", href: "/", scrollTo: "portfolio" },
  ],
  contact: [
    { name: phoneNumber, href: `tel:${phoneNumber}`, icon: Phone },
    {
      name: "Schedule Meeting",
      href: "/",
      icon: Video,
      scrollTo: "register-interest",
    },
    {
      name: "Contact via WhatsApp",
      href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`,
      icon: MessageCircle,
    },
  ],
};

export default function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    scrollTo?: string,
  ) => {
    if (scrollTo) {
      e.preventDefault();
      const element = document.getElementById(scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* Logo and Contact Info */}
          <div className="space-y-8">
            <Link href="/" className="block">
              <Image
                src="/assets/images/logos/main-logo.svg"
                alt="Cityedge Developments Logo"
                width={180}
                height={70}
                className="h-14 w-auto brightness-0 invert"
              />
            </Link>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="text-lg font-serif mb-8 tracking-wider">Links</h4>
            <ul className="space-y-4">
              {footerLinks.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={(e) =>
                      isHomePage && handleSmoothScroll(e, link.scrollTo)
                    }
                    className="text-sm text-gray-400 hover:text-white transition-colors font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects Column */}
          <div>
            <h4 className="text-lg font-serif mb-8 tracking-wider">
              Our Projects
            </h4>
            <ul className="space-y-4">
              {footerLinks.projects.map((project) => (
                <li key={project.name}>
                  <Link
                    href={project.href}
                    onClick={(e) =>
                      isHomePage && handleSmoothScroll(e, project.scrollTo)
                    }
                    className="text-sm text-gray-400 hover:text-white transition-colors font-light"
                  >
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Call Us Column */}
          <div>
            <h4 className="text-lg font-serif mb-8 tracking-wider">Call Us</h4>
            <ul className="space-y-6">
              {footerLinks.contact.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (item.scrollTo && isHomePage) {
                        handleSmoothScroll(
                          e as unknown as React.MouseEvent<HTMLAnchorElement>,
                          item.scrollTo,
                        );
                      }
                    }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-[#b89156]/10 transition-colors">
                      <item.icon className="w-5 h-5 text-[#b89156]" />
                    </div>
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors font-light">
                      {item.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-500 font-light text-center mx-auto">
            © 2026 Cityedge Dvelopments
          </p>
        </div>
      </div>
    </footer>
  );
}
