import { Link } from "react-router-dom";

import { classNames } from "../../../lib/classNames/classNames";
import {
    ADD_CARD,
    GET_ALL_CARDS,
    SIGNIN,
    SIGNOUT,
    SIGNUP,
} from "../../../lib/routes";
import { trpc } from "../../../lib/trpc";

import style from "./Menu.module.scss";

const Menu = ({
    isOpen,
    toggleMenu,
}: {
    isOpen: boolean;
    toggleMenu: () => void;
}) => {
    const { data, isLoading, isError, isFetching } = trpc.getUser.useQuery();
    return (
        <aside className={classNames(style.aside, { [style.open]: isOpen })}>
            <button className={style.button} onClick={toggleMenu}>
                close
            </button>
            <Link to={GET_ALL_CARDS}>На главную</Link>
            {isLoading || isFetching || isError ? null : data.user ? (
                <>
                    <Link to={ADD_CARD}>Добавить карточку</Link>
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
