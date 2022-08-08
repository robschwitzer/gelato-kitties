import type { QueryData } from "./types";
import type { Category } from "./categories";

export async function getKitties(
  offset: number = 0,
  limit: number = 10
): Promise<QueryData> {
  const response = await fetch(
    `https://api.cryptokitties.co/v2/kitties/recommend?offset=${offset}&limit=${limit}`
  );
  if (!response.ok) throw new Error("This kitty can scratch 😾");
  return await response.json();
}

export function formatCategories(categories: Category[]) {
  const formatted = categories.map(
    (item) => {
      item.name = item.name[0].toUpperCase() + item.name.substring(1);
      if (item.name === 'All') item.active = true;
      return item;
    }
  );
  return formatted;
}

export function debounce(method: any, delay: number) {
  clearTimeout(method.id);
  method.id = setTimeout(function() {
    method();
  }, delay);
}