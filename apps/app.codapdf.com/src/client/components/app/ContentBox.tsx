type ContentBoxProps = {
  title?: string;
  children: React.ReactNode;
  isLoading?: boolean;
};
const ContentBox = ({ title, isLoading, children }: ContentBoxProps) => (
  <div className={"rounded-sm overflow-hidden relative border text-foreground"}>
    {title && (
      <div className=" px-4 py-2 border-b">
        <h4 className="font-semibold">{title}</h4>
      </div>
    )}
    {isLoading && (
      <div className="w-full absolute">
        <div className="h-1.5 w-full bg-slate-400 overflow-hidden">
          <div className="progress w-full h-full bg-slate-600 left-right" />
        </div>
      </div>
    )}
    <div className="p-4">{children}</div>
  </div>
);

export { ContentBox };
