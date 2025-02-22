import { useState } from "react";
import { Outlet } from "react-router-dom";

import Menu from "../../Menu";

import style from "./Layout.module.scss";

const Layout = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={style.wrapper}>
            <button className={style.button} onClick={toggleMenu}>menu</button>
            <Menu isOpen={isOpen} toggleMenu={toggleMenu} />
            <main className={style.main}>
                <Outlet />
            </main>
        </div>
    );
};
export default Layout;
