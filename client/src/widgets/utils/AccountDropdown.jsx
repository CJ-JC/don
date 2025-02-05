import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { LogOut } from "lucide-react";

function AccountDropdown({ user, logout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outlined"
        size="sm"
        onClick={toggleDropdown}
        className="flex items-center gap-2"
      >
        Mon profil
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </Button>
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <ul className="py-1">
            <li>
              <Link
                to={user.role === "admin" ? "/administrator" : "/user/account"}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={closeDropdown} // Ferme le menu
              >
                {user.role === "admin" ? "Administrateur" : "Mon Compte"}
              </Link>
            </li>
            <li>
              <Link
                to="user/account/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={closeDropdown} // Ferme le menu
              >
                Paramètres
              </Link>
            </li>
            <li className="border-t border-gray-200">
              <button
                onClick={() => {
                  logout(); // Déconnexion
                  closeDropdown(); // Ferme le menu
                }}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="mr-1 h-4 w-4" /> Déconnexion
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default AccountDropdown;
