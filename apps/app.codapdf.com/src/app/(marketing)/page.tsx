import { HomePage } from "@/app/(marketing)/_pages/home";
import { serverApi } from "@/server/trpc/trpcServer";
import { use } from "react";

const Page = () => {
  const plans = use(serverApi.stripe.getPlans());
  return <HomePage plans={plans} />;
};

export default Page;
