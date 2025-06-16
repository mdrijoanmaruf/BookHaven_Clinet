import { createBrowserRouter } from "react-router-dom";
import Root from "../Components/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import AllBooks from "../Pages/AllBooks/AllBooks";
import AddBook from "../Pages/AddBook/AddBook";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import PrivacyPolicy from "../Pages/Legal/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "../Pages/Legal/TermsConditions/TermsConditions";
import UpdateBook from "../Pages/UpdateBook/UpdateBook";
import BookDetails from "../Pages/BookDetails/BookDetails";
import AllUsers from "../Pages/AllUsers/AllUsers";
import CategoryBooks from "../Pages/CategoryBooks/CategoryBooks";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        errorElement: <PageNotFound />,
        children:[
            {
                index: true,
                Component: Home
            },
            {
                path: "about",
                Component: About
            },
            {
                path: "contact",
                Component: Contact
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
                path: "book-details/:id",
                element: <PrivateRoute><BookDetails /></PrivateRoute>
            },
            {
                path: "add-book",
                element: <PrivateRoute><AddBook /></PrivateRoute>
            },
            {
                path: "update-book/:id",
                element: <PrivateRoute><UpdateBook /></PrivateRoute>
            },
            {
                path: "all-users",
                element: <PrivateRoute>
                    <AllUsers></AllUsers>
                </PrivateRoute>
            },
            {
                path: "category/:category",
                Component: CategoryBooks
            },
            // {
            //     path: "borrowed-books",
            //     element: <PrivateRoute><BorrowedBooks /></PrivateRoute>
            // },
            {
                path: "legal/privacy-policy",
                Component: PrivacyPolicy
            },
            {
                path: "legal/terms-conditions",
                Component: TermsConditions
            },
        ]
    }
])

export default router;