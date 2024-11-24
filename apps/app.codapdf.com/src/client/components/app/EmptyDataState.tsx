import NoData from "@/assets/illustrations/no-data.svg";
import Image from "next/image";
const EmptyDataState = () => (
  <div className="flex flex-col items-center">
    <Image src={NoData} alt="No Data" />
    <h2 className="font-bold text-2xl text-black">Oh no! you haven't to save anything yet 😢</h2>
  </div>
);

export { EmptyDataState };
