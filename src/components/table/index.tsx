const Table = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => (
  <div className="max-h-64 overflow-y-auto border border-neutral rounded-xl">
    <table className="table table-lg table-pin-rows">{children}</table>
  </div>
);

export default Table;
