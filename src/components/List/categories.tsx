import { useMemo } from "react";

export interface Category { name: string; active: boolean };

interface Props {
  categories: Category[];
  onClick: (category: string) => void;
}

function Categories({ categories, onClick }: Props) {
  const children = useMemo(() => {
    if (!categories?.length) {
      return new Array(7).fill(0).map((_, i) => {
        return (
          <li
            key={i}
            className="w-16 h-4 mx-2 lg:mx-6 mb-4 first:ml-0 last:mr-0 rounded-md bg-gray-200 animate-pulse"
          ></li>
        );
      });
    }

    return categories.map(({ name, active }, i) => (
      <li
        key={name}
        className={listItemStyle}
        onClick={() => onClick(name)}
        tabIndex={i}
        style={{ borderBottom: active ? '2px solid #9ca3af' : 'none' }}
      >
        {name}
      </li>
    ));
  }, [categories, onClick]);

  return (
    <ul className="flex flex-row overflow-auto border-b-[1px] mb-8 border-gray-200 dark:border-gray-600">
      {children}
    </ul>
  );
}

export default Categories;

const listItemStyle =
  "h-8 mx-6 mb-0 first:ml-0 last:mr-0 cursor-pointer font-bold whitespace-nowrap text-gray-500 focus:text-black hover:text-black dark:hover:text-gray-200 dark:focus:text-gray-200 transition-all";
