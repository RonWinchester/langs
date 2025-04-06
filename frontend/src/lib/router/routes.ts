const GET_ALL_CARDS = "/";
const ADD_CARD = "/add";
const SIGNUP = "/signup";
const SIGNIN = "/signin";
const SIGNOUT = "/signout";
const getEditRoute = (id: string | number) => {
    return `/edit/${id}`;
}
const getCardRoute = (id: string | number) => {
    return `/cards/${id}`;
};

export { getCardRoute, getEditRoute, GET_ALL_CARDS, ADD_CARD, SIGNUP, SIGNIN, SIGNOUT };
