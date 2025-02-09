import { trpc } from "../../lib/trpc";
const LangsPage = () => {
    const { data, isError, isLoading } = trpc.getLangs.useQuery();

    if (isError) {
        return <div>Error</div>;
    }

    if (isLoading) {
        return <div>Loading</div>;
    }
    return (
        <div>
            {data.map((lang) => (
                <span key={lang.id}>{lang.name}</span>
            ))}
        </div>
    );
};

export default LangsPage;
