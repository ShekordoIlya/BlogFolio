import { switchTheme } from "../themeSlice";

export const incrementMiddleWare =
  (store: any) => (next: any) => (action: any) => {
    if (action.type == "counter/increment") {
      store.dispatch(switchTheme("light"));
      return next({ type: "counter/increment", payload: -5 });
    }
    return next(action);
  };
