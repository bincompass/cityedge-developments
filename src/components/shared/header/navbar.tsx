"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Phone, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export const navLinks = [
  { title: "Home", href: "/", scrollTo: "hero" },
  { title: "Destinations", href: "/", scrollTo: "destinations" },
  { title: "Portfolio", href: "/", scrollTo: "portfolio" },
  { title: "Contact Us", href: "/", scrollTo: "register-interest" },
];

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

export default function Navbar({ className }: { className?: string }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for header

      for (const link of navLinks) {
        if (!link.scrollTo) continue;
        const element = document.getElementById(link.scrollTo);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(link.scrollTo);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <>
      {/* Desktop Navigation */}
      <div className={cn("hidden lg:block", className)}>
        <NavigationMenu viewport={false}>
          <NavigationMenuList className="gap-1">
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.title}>
                <NavigationMenuLink asChild>
                  <Link
                    href={link.href}
                    onClick={(e) =>
                      isHomePage && handleSmoothScroll(e, link.scrollTo)
                    }
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "h-8 px-2 xl:px-3 text-[10px] xl:text-[12px] transition-all rounded-full bg-transparent border-none shadow-none capitalize tracking-tight",
                      (
                        isHomePage
                          ? activeSection === link.scrollTo
                          : pathname === link.href
                      )
                        ? "text-primary font-bold"
                        : "text-foreground font-medium",
                      "hover:text-primary hover:font-bold hover:bg-transparent focus:text-primary focus:font-bold focus:bg-transparent",
                    )}
                  >
                    {link.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Call Action & Mobile Menu */}
      <div className="flex items-center gap-4">
        <a
          href={`tel:${phoneNumber}`}
          className="hidden lg:flex items-center gap-2 h-8 px-2 xl:px-3 text-[10px] xl:text-[12px] font-medium transition-all hover:text-primary hover:font-bold hover:bg-transparent rounded-full bg-transparent text-foreground focus:text-primary focus:font-bold focus:bg-transparent capitalize tracking-tight"
        >
          <Phone className="h-3 w-3 xl:h-4 xl:w-4" />
          <span>{phoneNumber}</span>
        </a>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] sm:w-[400px] p-8 transition-transform duration-300 ease-in-out overflow-y-auto"
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <nav className="flex flex-col gap-2 mt-10">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  onClick={(e) => {
                    if (isHomePage) handleSmoothScroll(e, link.scrollTo);
                    setOpen(false);
                  }}
                  className={cn(
                    "block text-base transition-colors capitalize tracking-wide py-3",
                    (
                      isHomePage
                        ? activeSection === link.scrollTo
                        : pathname === link.href
                    )
                      ? "text-primary font-bold"
                      : "text-foreground font-semibold",
                    "hover:text-primary hover:font-bold",
                  )}
                >
                  {link.title}
                </Link>
              ))}
              <div className="pt-6 mt-auto border-t">
                <Button asChild variant="default" size="lg" className="w-full">
                  <a
                    href={`tel:${phoneNumber}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3"
                  >
                    <Phone className="h-5 w-5" />
                    <span>{phoneNumber}</span>
                  </a>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
