const GET_ALL_CARDS = "/";
const ADD_CARD = "/add";
const SIGNUP = "/signup";
const SIGNIN = "/signin";
const SIGNOUT = "/signout";
const getCardRoute = (id: string | number) => {
    return `/cards/${id}`;
};

export { getCardRoute, GET_ALL_CARDS, ADD_CARD, SIGNUP, SIGNIN, SIGNOUT };
