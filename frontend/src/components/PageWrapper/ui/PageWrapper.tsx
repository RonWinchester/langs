import { UseQueryResult } from "@tanstack/react-query";

interface PageWrapperProps<TData, TError> {
    useQuery: () => UseQueryResult<TData, TError>;
}

type WrappedComponentProps<TData> = {
    data: TData;
} & Record<string, unknown>;

export function PageWrapper<
    TData,
    TError,
    P extends WrappedComponentProps<TData> = WrappedComponentProps<TData>,
>(WrappedComponent: React.ComponentType<P>) {
    const PageWrapperComponent: React.FC<
        PageWrapperProps<TData, TError> & Omit<P, "data">
    > = ({ useQuery, ...restProps }) => {
        const { data, isLoading, isError, error } = useQuery();

        if (isLoading) return <div>Loading...</div>;
        if (isError && error instanceof Error)
            return <div>{error.message}</div>;
        if (!data) return <div>Card not found</div>;

        return <WrappedComponent {...({ ...restProps, data } as unknown as P)} />;
    };

    return PageWrapperComponent;
}

export default PageWrapper;