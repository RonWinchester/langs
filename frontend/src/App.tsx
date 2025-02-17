import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { getAllCardsRoute, getCardRoute } from "./lib/routes";
import AllCardsPage from "./pages/AllCards";
import Card from "./pages/Card";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={getAllCardsRoute()} element={<AllCardsPage />} />
                <Route path={getCardRoute(":id")} element={<Card />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
