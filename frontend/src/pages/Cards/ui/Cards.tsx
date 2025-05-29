import { TrpcRouterOutput } from "@langs/backend/src/router";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../../lib/context/AppContext";
import { getCardRoute } from "../../../lib/router/routes";
import { trpc } from "../../../lib/trpc";

interface CardProps {
    card: TrpcRouterOutput["getCards"]["cards"][number];
}

const Card: React.FC<CardProps> = ({ card }) => {
    return (
        <Link
            key={card.id}
            to={getCardRoute(card.id)}
            className="block card-hover"
        >
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* {card.img && <div className="h-40 overflow-hidden">
                <img 
                  src={card.imageUrl} 
                  alt={card.title} 
                  className="w-full h-full object-cover"
                />
              </div>} */}
                <div className="p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            {/* <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-2">
                                {card.theme} тег
                            </span> */}
                            <h3 className="text-lg font-semibold">
                                {card.theme}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                                {card.description}
                            </p>
                        </div>
                        <div className="flex items-center text-blue-600">
                            <ChevronRight size={20} />
                        </div>
                    </div>
                    {/* <div className="mt-3 text-sm text-gray-500">
                                    {card.wordCount} слов
                                </div> */}
                </div>
            </div>
        </Link>
    );
};

const Cards = () => {
    const { data, isError, isLoading } = trpc.getCards.useQuery();
    const { user } = useAuth();

    const [myCards, setMyCards] = useState(false);

    if (isError) {
        return <div>Error</div>;
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-600">Загрузка...</p>
            </div>
        );
    }
    return (
        <div className="fade-in">
            <h2 className="text-xl font-semibold mb-6">
                Доступные наборы слов
            </h2>
            {user ? (
                <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
                    <button
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                            !myCards
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                        }`}
                        onClick={() => setMyCards(false)}
                    >
                        Все карточки
                    </button>
                    <button
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                            myCards
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                        }`}
                        onClick={() => setMyCards(true)}
                    >
                        Мои карточки
                    </button>
                </div>
            ) : null}
            <div className="space-y-4">
                {!myCards
                    ? data.cards.map((card) => (
                          <Card key={card.id} card={card} />
                      ))
                    : data.cards.map((card) => {
                          if (card.author.id === user?.id) {
                              return <Card key={card.id} card={card} />;
                          }
                      })}
            </div>
        </div>
    );
};

export default Cards;
