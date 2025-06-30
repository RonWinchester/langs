import { Menu as MenuIcon } from "lucide-react";
import React from "react";

const Header = React.memo(({ toggleMenu }: { toggleMenu: () => void }) => {
    return (
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
    );
});

export default Header;
