import { useCallback, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { Layout } from "../../components";
import AddCard from "../../pages/AddCard";
import Card from "../../pages/Card";
import Cards from "../../pages/Cards";
import Edit from "../../pages/Edit";
import Signin from "../../pages/SignIn";
import Signout from "../../pages/SignOut";
import Signup from "../../pages/SignUp";

import { RequireAuth } from "./RequireAuth";
import {
    GET_ALL_CARDS,
    ADD_CARD,
    getCardRoute,
    SIGNUP,
    SIGNIN,
    SIGNOUT,
    getEditRoute,
} from "./routes";

const routesConfig = [
    {
        path: GET_ALL_CARDS,
        component: <Cards />,
    },
    {
        path: ADD_CARD,
        component: <AddCard />,
        authOnly: true,
    },
    {
        path: getCardRoute(":id"),
        component: <Card />,
    },
    {
        path: SIGNUP,
        component: <Signup />,
    },
    {
        path: SIGNIN,
        component: <Signin />,
    },
    {
        path: SIGNOUT,
        component: <Signout />,
        authOnly: true,
    },
    {
        path: getEditRoute(":id"),
        component: <Edit />,
        authOnly: true,
    },
];

type routesConfigType = (typeof routesConfig)[number];

export const AppRouter = () => {
    const renderWithWrapper = useCallback((route: routesConfigType) => {
        const element = (
            <Suspense fallback={"loading"}>{route.component}</Suspense>
        );
        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly ? (
                        <RequireAuth>{element}</RequireAuth>
                    ) : (
                        element
                    )
                }
            />
        );
    }, []);

    return (
        <Routes>
            <Route element={<Layout />}>
                {routesConfig.map(renderWithWrapper)}
            </Route>
        </Routes>
    );
};
