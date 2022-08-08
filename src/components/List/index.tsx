import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { debounce, getKitties, formatCategories } from "./utils";
import ListContext from "../../context/listContext";
import Categories, { Category } from "./categories";
import Card from "../Card";

import type { QueryData } from "./types";
import type { CryptoKitty } from "../../../types";

function List() {
  const [offset, setOffset] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [kitties, setKitties] = useState<CryptoKitty[]>(new Array(10).fill({}));
  const [filteredKitties, setFilteredKitties] = useState<CryptoKitty[]>(
    new Array(10).fill({})
  );

  const { isLoading, data } = useQuery<QueryData>(
    ["kitties", offset],
    () => getKitties(offset, 10),
    { keepPreviousData: true }
  );

  useEffect(() => {
    const onScroll = (): void => {
      const issueQuery =
        Math.ceil(window.innerHeight + window.scrollY) >=
          document.documentElement.scrollHeight &&
        /* only issue query from the "All" tab, as otherwise the items wont be properly categorized */
        Boolean(
          categories.find(({ name, active }) => name === "All" && active)
        );

      if (issueQuery) {
        debounce(() => {
          /* add loading skeletons */
          setKitties((prev) => [...prev, ...new Array(10).fill({})]);
          setOffset((offset) => offset + 10);
        }, 250);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [categories]);

  useEffect(() => {
    if (data?.greatValues) {
      setKitties((prev) => {
        /* remove loading skeletons */
        const kitties = prev.filter((item) => Object.keys(item).length);
        return [
          ...kitties,
          ...data.greatValues.filter(
            ({ id }) =>
              id !== kitties.find((kitty) => kitty.id === id)?.id
          ),
        ];
      });

      const categories: Category[] = [
        { color: "all" },
        ...Object.values(data.greatValues),
      ].map(({ color }) => ({ name: color, active: false }));

      setCategories(
        formatCategories(
          categories.filter(
            (item, i, self) =>
              i === self.findIndex(({ name }) => name === item.name)
          )
        ).sort((a, b) => (a.name > b.name ? 1 : -1))
      );
    }
  }, [data?.greatValues]);

  function onClickCategory(category: string): void {
    const newCategories = categories;
    newCategories.forEach((c) => {
      c.active = c.name === category;
    });
    setCategories(newCategories);
    setFilteredKitties(
      kitties.filter(({ color }) => color === category.toLowerCase())
    );
  }

  const children = useMemo(() => {
    const item = categories.find((item) => item.active);
    return (
      item?.name && item.name !== "All" ? filteredKitties : kitties
    ).map((cat, i) => (
      <Card key={cat.id ?? i} item={cat} tabIndex={i + categories?.length} />
    ));
  }, [kitties, filteredKitties, categories]);

  return (
    <ListContext.Provider value={{ loading: isLoading }}>
      <div className="px-4 lg:px-8 pb-6">
        <h1 className="text-3xl lg:text-5xl my-14 font-extrabold">Explore kitties</h1>
        <Categories categories={categories} onClick={onClickCategory} />
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {children}
        </div>
      </div>
    </ListContext.Provider>
  );
}

export default List;
