export const logger = (store: any) => (next: any) => (action: any) => {
  console.log("dispatching", action);
  console.log("before next", store.getState());
  let res = next(action);
  console.log("next", store.getState());
  console.log("result", res);
  return res;
};
