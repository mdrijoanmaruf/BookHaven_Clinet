import { createBrowserRouter } from "react-router-dom";
import Root from "../Components/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import { Component } from "react";
import Register from "../Pages/Register/Register";

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
            }
        ]
    }
])

export default router;