import { HeaderLogo } from "@/components/header-logo";
import { Navigation } from "@/components/navigation";

import { Loader2 } from "lucide-react";
import { UserButton, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";

export const Header = () => {
  return (
    <header className="bg-gradient-to-b from-violet-700 to-violet-500 px-4 py-8 lg:px-14">
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <ClerkLoaded>
            <UserButton />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="size-8 animate-spin text-slate-400" />
          </ClerkLoading>
        </div>
      </div>
    </header>
  );
};
