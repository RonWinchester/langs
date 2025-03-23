import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { trpc } from "../trpc";

type User = {
    name: string;
    id: number;
};

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    isError: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AppContext = ({ children }: { children: ReactNode }) => {
    const { data, isLoading, isError } = trpc.getUser.useQuery();

    const [authState, setAuthState] = useState<AuthContextType>({
        user: null,
        isLoading: true,
        isError: false,
    });

    useEffect(() => {
        if (!isLoading) {
            setAuthState({
                user: data?.user || null,
                isLoading: false,
                isError,
            });
        }
    }, [data, isLoading, isError]);

    return (
        <AuthContext.Provider value={authState}>
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
