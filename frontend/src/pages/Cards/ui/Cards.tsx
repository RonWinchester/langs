import { Tabs } from "@mantine/core";
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
            {user ? (
                <Tabs defaultValue="first">
                    <Tabs.List grow justify="space-between">
                        <Tabs.Tab value="first" onClick={() => setMyCards(false)}>Все карточки</Tabs.Tab>
                        <Tabs.Tab value="second" onClick={() => setMyCards(true)}>Мои карточки</Tabs.Tab>
                    </Tabs.List>
                </Tabs>
            ) : null}
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
