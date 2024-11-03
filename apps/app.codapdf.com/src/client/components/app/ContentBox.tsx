type ContentBoxProps = {
  title?: string;
  children: React.ReactNode;
  isLoading?: boolean;
};
const ContentBox = ({ title, isLoading, children }: ContentBoxProps) => (
  <div className={"relative overflow-hidden rounded-sm border text-foreground"}>
    {title && (
      <div className=" border-b px-4 py-2">
        <h4 className="font-semibold">{title}</h4>
      </div>
    )}
    {isLoading && (
      <div className="absolute w-full">
        <div className="h-1.5 w-full overflow-hidden bg-slate-400">
          <div className="progress left-right h-full w-full bg-slate-600" />
        </div>
      </div>
    )}
    <div className="p-4">{children}</div>
  </div>
);

export { ContentBox };
