import { Footer } from "@/app/(marketing)/_components/Footer";
import { Header } from "@/app/(marketing)/_components/Header";

type MarketingLayoutProps = {
  children: React.ReactNode;
};

const MarketingLayout = ({ children }: MarketingLayoutProps) => (
  <div className="relative flex h-screen flex-col overflow-y-auto bg-primary" id="marketing-layout">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default MarketingLayout;
