import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { getRoutes } from "./router"
import { Provider } from "react-redux";
import { store } from "./store";

const router = createBrowserRouter(getRoutes);

export const CalendarApp = () => {
  return (
    <>
        <Provider store={store}>
          <RouterProvider router={router}/>
        </Provider>
    </>
  )
}
