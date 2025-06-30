import { Menu as MenuIcon } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Menu from "../../Menu";
const Layout = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">

            <Menu isOpen={isOpen} toggleMenu={toggleMenu} />
            <main className="flex-1 max-w-md mx-auto w-full px-4 py-6">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
