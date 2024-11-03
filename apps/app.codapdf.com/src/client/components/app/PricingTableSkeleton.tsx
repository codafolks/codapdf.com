const CardSkeleton = () => (
  <div className="grid gap-2 rounded-md border p-4">
    <div className="h-5 w-10 animate-pulse bg-secondary" />
    <div className="h-2 w-20 animate-pulse " />
    <div className="h-4 w-6 animate-pulse bg-secondary" />

    <div className="grid h-4 w-full grid-cols-[20%,80%] gap-2">
      <div className="h-4 w-auto animate-pulse rounded-full bg-secondary" />
      <div className="h-4 w-auto animate-pulse bg-secondary" />
    </div>
    <div className="grid h-4 w-full grid-cols-[20%,80%] gap-2">
      <div className="h-4 w-auto animate-pulse rounded-full bg-secondary" />
      <div className="h-4 w-auto animate-pulse bg-secondary" />
    </div>
    <div className="grid h-4 w-full grid-cols-[20%,80%] gap-2">
      <div className="h-4 w-auto animate-pulse rounded-full bg-secondary" />
      <div className="h-4 w-auto animate-pulse bg-secondary" />
    </div>

    <div className="grid h-4 w-full grid-cols-[20%,80%] gap-2">
      <div className="h-4 w-auto animate-pulse rounded-full bg-secondary" />
      <div className="h-4 w-auto animate-pulse bg-secondary " />
    </div>
    <div className="grid h-4 w-full grid-cols-[20%,80%] gap-2">
      <div className="h-4 w-auto animate-pulse rounded-full bg-secondary" />
      <div className="h-4 w-auto animate-pulse bg-secondary " />
    </div>
    <div className="grid h-4 w-full grid-cols-[20%,80%] gap-2">
      <div className="h-4 w-auto animate-pulse rounded-full bg-secondary" />
      <div className="h-4 w-auto animate-pulse bg-secondary " />
    </div>
    <div className="grid h-4 w-full grid-cols-[20%,80%] gap-2">
      <div className="h-4 w-auto animate-pulse rounded-full bg-secondary" />
      <div className="h-4 w-auto animate-pulse bg-secondary " />
    </div>
  </div>
);

export const PricingTableSkeleton = () => (
  <div className="grid gap-4 p-4 ">
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 ">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
    <div className="grid gap-2">
      <div className="h-5 w-10 animate-pulse bg-secondary" />
      <div className="h-5 w-10 animate-pulse bg-secondary" />
      <div className="h-5 w-28 animate-pulse bg-secondary" />
    </div>
  </div>
);
