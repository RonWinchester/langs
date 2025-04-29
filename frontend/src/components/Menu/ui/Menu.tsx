import { Drawer } from "@mantine/core";
import { Link } from "react-router-dom";

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
        <Drawer
            opened={isOpen}
            onClose={toggleMenu}
            position="left"
            classNames={{
                body: style.menu,
            }}
        >
            <Link to={GET_ALL_CARDS} onClick={toggleMenu}>На главную</Link>
            {user ? (
                <>
                    <Link to={ADD_CARD} onClick={toggleMenu}>Добавить карточку {user.name}</Link>
                    <Link to={SIGNOUT} onClick={toggleMenu}>Выйти</Link>
                </>
            ) : (
                <>
                    <Link to={SIGNUP} onClick={toggleMenu}>Регистрация</Link>
                    <Link to={SIGNIN} onClick={toggleMenu}>Войти</Link>
                </>
            )}
        </Drawer>
    );
};

export default Menu;
