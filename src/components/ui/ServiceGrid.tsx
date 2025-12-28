type ServiceGridProps = {
    items: string[];
  };
  
  export function ServiceGrid({ items }: ServiceGridProps) {
    return (
      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-xl border border-slate-200 bg-white px-5 py-4 text-slate-800 shadow-sm transition hover:shadow-md"
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }