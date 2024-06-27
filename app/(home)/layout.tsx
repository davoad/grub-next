import { Header } from "@/components/header";
import { QueryProvider } from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provider";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <QueryProvider>
      <Header />
      <SheetProvider />
      <main className="px-3">{children}</main>
    </QueryProvider>
  );
};

export default DashboardLayout;
