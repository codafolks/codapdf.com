import { HomePage } from "@/app/(marketing)/_pages/home";
import { serverApi } from "@/server/trpc/trpcServer";
import { use } from "react";
export const fetchCache = "force-cache";
export const dynamic = "force-static";
const Page = () => {
  const plans = use(serverApi.stripe.getPlans());
  return <HomePage plans={plans} />;
};

export default Page;
