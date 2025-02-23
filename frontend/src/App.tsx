import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./components";
import { getAllCardsRoute, getCardRoute } from "./lib/routes";
import Card from "./pages/Card/";
import Cards from "./pages/Cards";

const routesConfig = [
    {
        path: getAllCardsRoute(),
        component: Cards,
    },
    {
        path: getCardRoute(":id"),
        component: Card,
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
