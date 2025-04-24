import { TrpcRouterOutput } from "@langs/backend/src/router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { trpc } from "../trpc";

export type AppContext = {
    user: TrpcRouterOutput["getUser"]["user"] | null;
}

const AuthContext = createContext<AppContext>({
    user: null
});

const AppContext = ({ children }: { children: ReactNode }) => {
    const { data, isLoading, isError, isFetching } = trpc.getUser.useQuery();

    if (isLoading || isFetching) {
        return <div>Loading</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <AuthContext.Provider value={{ user: data?.user || null }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AppContext Provider");
    }
    return context;
};

export default AppContext;
