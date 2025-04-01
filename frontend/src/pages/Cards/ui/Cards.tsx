import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../../lib/context/AppContext";
import { getCardRoute } from "../../../lib/router/routes";
import { trpc } from "../../../lib/trpc";

import style from "./Cards.module.scss";

const Cards = () => {
    const { data, isError, isLoading } = trpc.getCards.useQuery();
    const { user } = useAuth();

    const [myCards, setMyCards] = useState(false);

    if (isError) {
        return <div>Error</div>;
    }

    if (isLoading) {
        return <div>Loading</div>;
    }
    return (
        <div className={style.wrapper}>
            {user ? <div className={style.radio}>
                <label>
                    <input
                        type="radio"
                        checked={!myCards}
                        onChange={() => setMyCards(false)}
                    />
                    Все карточки
                </label>
                <label>
                    <input
                        type="radio"
                        checked={myCards}
                        onChange={() => setMyCards(true)}
                    />
                    Мои карточки
                </label>
            </div> : null}
            <div className={style.cards}>
                {!myCards
                    ? data.cards.map((card) => (
                          <Link to={getCardRoute(card.id)} key={card.id}>
                              {card.theme}
                          </Link>
                      ))
                    : data.cards.map((card) => {
                          if (card.author.id === user?.id) {
                              return (
                                  <Link
                                      to={getCardRoute(card.id)}
                                      key={card.id}
                                  >
                                      {card.theme}
                                  </Link>
                              );
                          }
                      })}
            </div>
        </div>
    );
};

export default Cards;
