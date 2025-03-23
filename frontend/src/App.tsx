import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./components";
import {
    GET_ALL_CARDS,
    getCardRoute,
    ADD_CARD,
    SIGNUP,
    SIGNIN,
} from "./lib/routes";
import AddCard from "./pages/AddCard";
import Card from "./pages/Card/";
import Cards from "./pages/Cards";
import Signin from "./pages/SignIn";
import Signup from "./pages/SignUp";

const routesConfig = [
    {
        path: GET_ALL_CARDS,
        component: Cards,
    },
    {
        path: ADD_CARD,
        component: AddCard,
    },
    {
        path: getCardRoute(":id"),
        component: Card,
    },
    {
        path: SIGNUP,
        component: Signup,
    },
    {
        path: SIGNIN,
        component: Signin,
    },
];

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    {routesConfig.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <Suspense fallback={"loading"}>
                                    <route.component />
                                </Suspense>
                            }
                        />
                    ))}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
