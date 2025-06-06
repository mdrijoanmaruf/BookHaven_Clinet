import { createBrowserRouter } from "react-router-dom";
import Root from "../Components/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import AllBooks from "../Pages/AllBooks/AllBooks";
import AddBook from "../Pages/AddBook/AddBook";
import BorrowedBooks from "../Pages/BorrowedBooks/BorrowedBooks";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children:[
            {
                index: true,
                Component: Home
            },
            {
                path: "login",
                Component: Login
            },
            {
                path: "register",
                Component: Register
            },
            {
                path: "all-books",
                element: <PrivateRoute><AllBooks /></PrivateRoute>
            },
            {
                path: "add-book",
                element: <PrivateRoute><AddBook /></PrivateRoute>
            },
            {
                path: "borrowed-books",
                element: <PrivateRoute><BorrowedBooks /></PrivateRoute>
            }
        ]
    }
])

export default router;