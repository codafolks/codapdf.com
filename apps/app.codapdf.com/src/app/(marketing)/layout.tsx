import { Footer } from "@/app/(marketing)/_components/Footer";
import { Header } from "@/app/(marketing)/_components/Header";

type MarketingLayoutProps = {
  children: React.ReactNode;
};
export const fetchCache = "force-cache";
export const dynamic = "force-static";
const MarketingLayout = ({ children }: MarketingLayoutProps) => (
  <div
    className="flex flex-col bg-primary relative h-screen overflow-y-auto"
    id="marketing-layout"
  >
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default MarketingLayout;
