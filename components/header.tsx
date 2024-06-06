import { HeaderLogo } from "@/components/header-logo";
import { Navigation } from "@/components/navigation";

export const Header = () => {
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14">
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
        </div>
      </div>
    </header>
  );
};
