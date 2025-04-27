import { useCallback, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { Layout } from "../../components";
import Cards from "../../pages/Cards";
import Edit from "../../pages/Edit";

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
        component: lazy(() => import("../../pages/Cards")),
    },
    {
        path: ADD_CARD,
        component: lazy(() => import("../../pages/AddCard")),
        authOnly: true,
    },
    {
        path: getCardRoute(":id"),
        component: lazy(() => import("../../pages/Cards")),
    },
    {
        path: SIGNUP,
        component: lazy(() => import("../../pages/SignUp")),
    },
    {
        path: SIGNIN,
        component: lazy(() => import("../../pages/SignIn")),
    },
    {
        path: SIGNOUT,
        component: lazy(() => import("../../pages/SignOut")),
        authOnly: true,
    },
    {
        path: getEditRoute(":id"),
        component: lazy(() => import("../../pages/Edit")),
        authOnly: true,
    },
];

type routesConfigType = (typeof routesConfig)[number];

export const AppRouter = () => {
    const renderWithWrapper = useCallback((route: routesConfigType) => {
        const Component = route.component;
        const element = (
            <Suspense fallback={"loading"}>
                <Component />
            </Suspense>
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
