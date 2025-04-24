import { Link } from "react-router-dom";

import { classNames } from "../../../lib/classNames/classNames";
import { useAuth } from "../../../lib/context/AppContext";
import {
    ADD_CARD,
    GET_ALL_CARDS,
    SIGNIN,
    SIGNOUT,
    SIGNUP,
} from "../../../lib/router/routes";

import style from "./Menu.module.scss";

const Menu = ({
    isOpen,
    toggleMenu,
}: {
    isOpen: boolean;
    toggleMenu: () => void;
}) => {
    const { user } = useAuth();

    return (
        <aside className={classNames(style.aside, { [style.open]: isOpen })}>
            <button className={style.button} onClick={toggleMenu}>
                close
            </button>
            <Link to={GET_ALL_CARDS}>На главную</Link>
            {user ? (
                <>
                    <Link to={ADD_CARD}>Добавить карточку {user.name}</Link>
                    <Link to={SIGNOUT}>Выйти</Link>
                </>
            ) : (
                <>
                    <Link to={SIGNUP}>Регистрация</Link>
                    <Link to={SIGNIN}>Войти</Link>
                </>
            )}
        </aside>
    );
};

export default Menu;
