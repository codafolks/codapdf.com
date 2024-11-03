const CardSkeleton = () => (
  <div className="border grid gap-2 p-4 rounded-md">
    <div className="animate-pulse w-10 h-5 bg-secondary" />
    <div className="animate-pulse w-20 h-2 " />
    <div className="animate-pulse w-6 h-4 bg-secondary" />

    <div className="w-full h-4  grid grid-cols-[20%,80%] gap-2">
      <div className="animate-pulse w-auto h-4  bg-secondary rounded-full" />
      <div className="animate-pulse w-auto h-4 bg-secondary" />
    </div>
    <div className="w-full h-4  grid grid-cols-[20%,80%] gap-2">
      <div className="animate-pulse w-auto h-4  bg-secondary rounded-full" />
      <div className="animate-pulse w-auto h-4 bg-secondary" />
    </div>
    <div className="w-full h-4  grid grid-cols-[20%,80%] gap-2">
      <div className="animate-pulse w-auto h-4 bg-secondary rounded-full" />
      <div className="animate-pulse w-auto h-4 bg-secondary" />
    </div>

    <div className="w-full h-4  grid grid-cols-[20%,80%] gap-2">
      <div className="animate-pulse w-auto h-4  bg-secondary rounded-full" />
      <div className="animate-pulse w-auto h-4 bg-secondary " />
    </div>
    <div className="w-full h-4  grid grid-cols-[20%,80%] gap-2">
      <div className="animate-pulse w-auto h-4  bg-secondary rounded-full" />
      <div className="animate-pulse w-auto h-4 bg-secondary " />
    </div>
    <div className="w-full h-4  grid grid-cols-[20%,80%] gap-2">
      <div className="animate-pulse w-auto h-4  bg-secondary rounded-full" />
      <div className="animate-pulse w-auto h-4 bg-secondary " />
    </div>
    <div className="w-full h-4  grid grid-cols-[20%,80%] gap-2">
      <div className="animate-pulse w-auto h-4 bg-secondary rounded-full" />
      <div className="animate-pulse w-auto h-4 bg-secondary " />
    </div>
  </div>
);

export const PricingTableSkeleton = () => (
  <div className="p-4 grid gap-4 ">
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 ">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
    <div className="grid gap-2">
      <div className="animate-pulse w-10 h-5 bg-secondary" />
      <div className="animate-pulse w-10 h-5 bg-secondary" />
      <div className="animate-pulse w-28 h-5 bg-secondary" />
    </div>
  </div>
);
