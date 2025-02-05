import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar as MTNavbar, Button, IconButton, Collapse } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { checkAuthStatus } from "../utils/CheckAuthStatus";
import { useDispatch, useSelector } from "react-redux";
import { loggedOut } from "../../reducer/auth";
import Loading from "../utils/Loading.jsx";
import { MoonIcon, SunIcon } from "lucide-react";

export function Navbar({ toggleTheme, theme }) {
    const [openNav, setOpenNav] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector((state) => state.auth);

    useEffect(() => {
        window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
    }, []);

    const handleLinkClick = () => {
        setOpenNav(false);
    };

    useEffect(() => {
        checkAuthStatus(dispatch, setAuthLoading);
    }, [dispatch]);

    if (authLoading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    const logout = () => {
        axios.post("/api/user/logout");
        dispatch(loggedOut());
        window.location.reload();
    };

    const navList = (
        <ul className="flex flex-col gap-2 mt-2 mb-4 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <NavLink to="/" onClick={handleLinkClick} className={({ isActive }) => `group flex items-center rounded-lg p-1 px-2 ${isActive ? "border-b border-gray-500 font-medium text-gray-800 dark:border-white dark:bg-white dark:text-black" : "bg-white font-medium text-gray-600 hover:bg-gray-100 dark:border-b dark:bg-transparent dark:text-white dark:hover:bg-gray-800"}`}>
                Accueil
            </NavLink>

            <NavLink to="/courses" onClick={handleLinkClick} className={({ isActive }) => `group flex items-center rounded-lg p-1 px-2 ${isActive ? "border-b border-gray-500 font-medium text-gray-800 dark:border-white dark:bg-white dark:text-black" : "bg-white font-medium text-gray-600 hover:bg-gray-100 dark:border-b dark:bg-transparent dark:text-white dark:hover:bg-gray-800"}`}>
                Nos formations
            </NavLink>
            <NavLink to="/masterclass" onClick={handleLinkClick} className={({ isActive }) => `group flex items-center rounded-lg p-1 px-2 ${isActive ? "border-b border-gray-500 font-medium text-gray-800 dark:border-white dark:bg-white dark:text-black" : "bg-white font-medium text-gray-600 hover:bg-gray-100 dark:border-b dark:bg-transparent dark:text-white dark:hover:bg-gray-800"}`}>
                Masterclass
            </NavLink>
        </ul>
    );

    return (
        <MTNavbar color="transparent" className="p-3 mx-auto max-w-screen-xl rounded-none border-b">
            <div className="container flex justify-between items-center mx-auto text-black">
                <Link to="/" onClick={handleLinkClick}>
                    {theme === "dark" ? <img src="/img/logo-night.svg" width={200} alt="logo donymusic" /> : <img src="/img/logo-day.svg" width={200} alt="logo donymusic" />}
                </Link>
                <div className="hidden lg:block">{navList}</div>
                <div className="hidden gap-2 lg:flex">
                    {isLoggedIn && user ? (
                        <>
                            {/* <AccountDropdown user={user} logout={logout} /> */}
                            <Link to={user.role === "admin" ? "/administrator" : "/user/account"}>
                                <Button variant="outlined" className="font-medium text-gray-800 dark:bg-white dark:text-black" size="sm">
                                    Mon compte
                                </Button>
                            </Link>
                            <Link to={"#"}>
                                <Button variant="gradient" color="red" className="font-medium border border-red-500 dark:bg-black dark:text-white" size="sm" onClick={logout}>
                                    Déconnexion
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/sign-in">
                                <Button variant="outlined" size="sm" className="font-medium text-gray-800 dark:bg-white dark:text-black">
                                    Connexion
                                </Button>
                            </Link>
                            <Link to="/sign-up">
                                <Button variant="gradient" size="sm" fullWidth className="font-medium border border-black dark:bg-black dark:text-white">
                                    S'inscrire
                                </Button>
                            </Link>
                        </>
                    )}
                    <button onClick={toggleTheme} className="rounded-md theme-toggle hover:bg-gray-200">
                        {theme === "dark" ? <SunIcon className="p-1 w-8 h-8 text-white text- dark:hover:text-black" /> : <MoonIcon className="p-1 w-8 h-8" />}
                    </button>
                </div>
                <IconButton variant="text" size="sm" color="white" className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden" onClick={() => setOpenNav(!openNav)}>
                    {openNav ? <XMarkIcon strokeWidth={2} className="w-6 h-6" /> : <Bars3Icon strokeWidth={2} className="w-6 h-6" />}
                </IconButton>
            </div>
            <Collapse className="absolute left-2/4 z-10 w-[350px] -translate-x-2/4 rounded-xl text-blue-gray-900" open={openNav}>
                <div className="container px-4 pt-2 pb-4 mx-auto bg-white border">
                    {navList}
                    {isLoggedIn && user ? (
                        <>
                            <Link to={user.role === "admin" ? "/administrator" : "/user/account"}>
                                <Button variant="outlined" size="sm">
                                    Mon compte
                                </Button>
                            </Link>
                            <Link to={"#"}>
                                <Button variant="gradient" size="sm" onClick={logout}>
                                    Déconnexion
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/sign-in">
                                <Button variant="outlined" size="sm" fullWidth className="my-2">
                                    Connexion
                                </Button>
                            </Link>
                            <Link to="/sign-up">
                                <Button variant="gradient" size="sm" fullWidth>
                                    S'inscrire
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </Collapse>
        </MTNavbar>
    );
}

export default Navbar;
