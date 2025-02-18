import { Link } from "react-router-dom";

import { getCardRoute } from "../../lib/routes";
import { trpc } from "../../lib/trpc";
const AllCardsPage = () => {
    const { data, isError, isLoading } = trpc.getCards.useQuery();

    if (isError) {
        return <div>Error</div>;
    }

    if (isLoading) {
        return <div>Loading</div>;
    }
    return (
        <div>
            {data.cards.map((card) => (
                <Link to={getCardRoute(card.id)} key={card.id}>{card.theme}</Link>
            ))}
        </div>
    );
};

export default AllCardsPage;
