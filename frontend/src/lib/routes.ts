const getCardRoute = (id: string | number) => {
    return `/cards/${id}`;
};

const GET_ALL_CARDS = "/";
const ADD_CARD = "/add";

export { getCardRoute, GET_ALL_CARDS, ADD_CARD };
