import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "./App";
import ErrorPage from "./components/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />
    },
    // new paths
    // {
    //     path: "/path",
    //     element: <component />,
    // },
]);

const MyRoutes = () => <RouterProvider router={router} />

export default MyRoutes