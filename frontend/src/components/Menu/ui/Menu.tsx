import { Link } from "react-router-dom";

import { classNames } from "../../../lib/classNames/classNames";
import { ADD_CARD, GET_ALL_CARDS, SIGNUP } from "../../../lib/routes";

import style from "./Menu.module.scss";

const Menu = ({
    isOpen,
    toggleMenu,
}: {
    isOpen: boolean;
    toggleMenu: () => void;
}) => {
    return (
        <aside className={classNames(style.aside, { [style.open]: isOpen })}>
            <button className={style.button} onClick={toggleMenu}>
                close
            </button>
            <Link to={GET_ALL_CARDS}>На главную</Link>
            <Link to={ADD_CARD}>Добавить карточку</Link>
            <Link to={SIGNUP}>Регистрация</Link>
        </aside>
    );
};

export default Menu;
