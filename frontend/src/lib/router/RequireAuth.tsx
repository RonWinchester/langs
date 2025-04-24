import { JSX } from "react";
import { useLocation, Navigate } from "react-router-dom";

import { useAuth } from "../context/AppContext";

import { GET_ALL_CARDS } from "./routes";

interface RequireAuthProps {
    children: JSX.Element;
}

export function RequireAuth({ children }: RequireAuthProps) {
    const location = useLocation();
    const { user } = useAuth();

    if (!user) {
        return (
            <Navigate to={GET_ALL_CARDS} state={{ from: location }} replace />
        );
    }

    return children;
}
