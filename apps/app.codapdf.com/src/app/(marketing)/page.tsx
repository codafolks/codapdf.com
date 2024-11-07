import { Features } from "@/app/(marketing)/_containers/Features";
import dynamic from "next/dynamic";
const Home = dynamic(() => import("@/app/(marketing)/_containers/Home").then((m) => m.Home), {
  loading: () => <p>Loading...</p>,
  ssr: true,
});
const Pricing = dynamic(() => import("@/app/(marketing)/_containers/Pricing").then((m) => m.Pricing), {
  loading: () => <p>Loading...</p>,
  ssr: true,
});

const Contact = dynamic(() => import("@/app/(marketing)/_containers/Contact").then((m) => m.Contact), {
  loading: () => <p>Loading...</p>,
  ssr: true,
});

export const fetchCache = "force-cache";
const Page = () => {
  return (
    <>
      <Home />
      <Features />
      <Pricing />
      <Contact />
    </>
  );
};

export default Page;
