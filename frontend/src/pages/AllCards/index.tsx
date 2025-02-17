import { Link } from "react-router-dom";

import { getCardRoute } from "../../lib/routes";
import { trpc } from "../../lib/trpc";
const AllCardsPage = () => {
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
                <Link to={getCardRoute(lang.id)} key={lang.id}>{lang.name}</Link>
            ))}
        </div>
    );
};

export default AllCardsPage;
