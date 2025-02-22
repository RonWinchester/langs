import { Link } from "react-router-dom";

import { classNames } from "../../../lib/classNames/classNames";
import { getAllCardsRoute } from "../../../lib/routes";

import style from "./Menu.module.scss";

const Menu = ({ isOpen, toggleMenu }: { isOpen: boolean; toggleMenu: () => void }) => {
    return (
        <aside className={classNames(style.aside, { [style.open]: isOpen })}>
            <button className={style.button} onClick={toggleMenu}>close</button>
            <Link to={getAllCardsRoute()}>На главную</Link>
        </aside>
    );
};

export default Menu;
