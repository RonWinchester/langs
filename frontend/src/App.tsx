import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./components";
import { getAllCardsRoute, getCardRoute } from "./lib/routes";
import Card from "./pages/Card/ui/Card";
import Cards from "./pages/Cards";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route
                        path={getAllCardsRoute()}
                        element={<Cards />}
                    />
                    <Route path={getCardRoute(":id")} element={<Card />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
