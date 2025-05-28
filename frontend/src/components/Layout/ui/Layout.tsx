import { Menu as MenuIcon } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import AppContext from "../../../lib/context/AppContext";
import Menu from "../../Menu";
const Layout = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <AppContext>
            <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
                <header className="bg-white shadow-sm z-10">
                    <div className="max-w-md mx-auto px-4 py-3 flex justify-between items-center">
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Menu"
                        >
                            <MenuIcon size={24} />
                        </button>
                        <div className="w-10"></div>
                    </div>
                </header>
                <Menu isOpen={isOpen} toggleMenu={toggleMenu} />
                <main className="flex-1 max-w-md mx-auto w-full px-4 py-6">
                    <Outlet />
                </main>
            </div>
        </AppContext>
    );
};

export default Layout;
