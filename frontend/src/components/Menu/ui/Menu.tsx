import {
    Home,
    LogInIcon,
    LogOut,
    Plus,
    User,
    UserRoundPlus,
    X,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "../../../lib/context/AppContext";
import {
    ADD_CARD,
    GET_ALL_CARDS,
    SIGNIN,
    SIGNOUT,
    SIGNUP,
    PROFILE,
} from "../../../lib/router/routes";

const NavItem = ({
    to,
    icon,
    text,
    toggleMenu,
}: {
    to: string;
    icon: React.ReactNode;
    text: string;
    toggleMenu?: () => void;
}) => (
    <Link
        to={to}
        className={`flex items-center p-4 hover:bg-blue-50 transition-colors ${
            location.pathname === to ? "bg-blue-100 text-blue-800" : ""
        }`}
        onClick={toggleMenu}
    >
        <span className="mr-3">{icon}</span>
        <span>{text}</span>
    </Link>
);

const Menu = ({
    isOpen,
    toggleMenu,
}: {
    isOpen: boolean;
    toggleMenu: () => void;
}) => {
    const { user } = useAuth();

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-opacity-50 z-20 backdrop-blur-md"
                    onClick={toggleMenu}
                ></div>
            )}

            <aside
                className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white z-30 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex justify-between items-center p-3 border-b">
                    <h2 className="text-xl font-semibold">Меню</h2>
                    <button
                        onClick={toggleMenu}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>
                </div>
                <nav className="flex flex-col">
                    <NavItem
                        to={GET_ALL_CARDS}
                        icon={<Home size={20} />}
                        text="Главная"
                        toggleMenu={toggleMenu}
                    />
                    {user ? (
                        <>
                            <NavItem
                                to={ADD_CARD}
                                text="Добавить карточку"
                                icon={<Plus size={20} />}
                                toggleMenu={toggleMenu}
                            />
                            <NavItem
                                to={PROFILE}
                                text="Профиль"
                                icon={<User size={20} />}
                                toggleMenu={toggleMenu}
                            />
                            <NavItem
                                to={SIGNOUT}
                                text="Выйти"
                                icon={<LogOut size={20} />}
                            />
                        </>
                    ) : (
                        <>
                            <NavItem
                                to={SIGNUP}
                                text="Регистрация"
                                icon={<UserRoundPlus size={20} />}
                                toggleMenu={toggleMenu}
                            />
                            <NavItem
                                to={SIGNIN}
                                text="Войти"
                                icon={<LogInIcon size={20} />}
                                toggleMenu={toggleMenu}
                            />
                        </>
                    )}
                </nav>
            </aside>
        </>
    );
};

export default Menu;
