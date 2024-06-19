"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useMedia } from "react-use";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { NavButton } from "@/components/nav-button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

let routes = [
  {
    href: "/",
    label: "Recipes",
  },
  {
    href: "/publications",
    label: "Publications",
  },
  {
    href: "/new-recipe",
    label: "New Recipe",
  },
];

export const Navigation = () => {
  let [isOpen, setIsOpen] = useState(false);

  let router = useRouter();
  let pathname = usePathname();
  let isMobile = useMedia("(max-width: 1024px)", false);

  let onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button
            variant="outline"
            size="sm"
            className="border-none bg-white/10 font-normal text-white outline-none transition hover:bg-white/20 hover:text-white focus:bg-white/30 focus-visible:ring-transparent focus-visible:ring-offset-0"
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-2">
          <nav className="flex flex-col gap-y-2 pt-6">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.href === pathname ? "secondary" : "ghost"}
                onClick={() => onClick(route.href)}
                className="w-full justify-start"
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="hidden items-center gap-x-2 overflow-x-auto lg:flex">
      {routes.map((route) => (
        <NavButton
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={pathname === route.href}
        />
      ))}
    </nav>
  );
};
