import { createContext } from "react";

interface IListContext {
  loading: boolean;
}

const ListContext = createContext<IListContext>({
  loading: true
});

export default ListContext;