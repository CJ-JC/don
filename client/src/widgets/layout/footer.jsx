import { Link } from "react-router-dom";

const year = new Date().getFullYear();

export function Footer({ theme }) {
    return (
        <footer className="p-4 mx-auto w-full max-w-screen-xl border-t md:p-0 md:py-4">
            <div className="container mx-auto">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="https://donymusic.com/" className="flex items-center mb-4 space-x-3 rtl:space-x-reverse sm:mb-0">
                        {theme === "dark" ? <img src="/img/logo-night.svg" width={200} alt="logo donymusic" /> : <img src="/img/logo-day.svg" width={200} alt="logo donymusic" />}
                    </a>
                    <ul className="flex flex-wrap justify-center items-center mb-6 text-sm text-blue-gray-500 dark:text-white sm:mb-0">
                        <Link to={"/cgv"} className="me-4 hover:underline md:me-6">
                            CGV
                        </Link>
                        <Link to={"/cgu"} className="me-4 hover:underline md:me-6">
                            CGU
                        </Link>
                        <Link to={"/politique"} className="me-4 hover:underline md:me-6">
                            Politique de confidentialité
                        </Link>
                    </ul>
                </div>

                <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-4" />
                <span className="block text-sm text-center text-blue-gray-500 dark:text-white">
                    © {year} {""}
                    <a href="https://www.donymusic.fr" className="hover:underline">
                        Donymusic
                    </a>
                    . Tous droits réservés.
                </span>
            </div>
        </footer>
    );
}

export default Footer;
