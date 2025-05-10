import { Burger } from "@mantine/core";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import AppContext from "../../../lib/context/AppContext";
import Menu from "../../Menu";

import style from "./Layout.module.scss";

const Layout = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <AppContext>
            <div className={style.wrapper}>
                <Burger className={style.button} opened={isOpen} onClick={toggleMenu} />
                <Menu isOpen={isOpen} toggleMenu={toggleMenu} />
                <main className={style.main}>
                    <Outlet />
                </main>
            </div>
        </AppContext>
    );
};

export default Layout;
