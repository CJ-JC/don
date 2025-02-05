import { Button } from "@material-tailwind/react";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchInput from "@/components/search/Search-input.jsx";
import { Typography } from "@material-tailwind/react";
import axios from "axios";
import Loading from "@/widgets/utils/Loading.jsx";

const Users = () => {
    // Changed to "Users"
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const UsersPerPage = 10;
    const [searchQuery, setSearchQuery] = useState("");
    const [purchases, setPurchases] = useState([]);
    const [totalBenefits, setTotalBenefits] = useState(0); // Defined setTotalBenefits state

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/api/user");
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError("Erreur lors de la récupération des utilisateurs");
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const response = await axios.get("/api/payment/get-purchases");
                setPurchases(response.data);
                const completedPurchases = response.data.filter((purchase) => purchase.status === "completed");

                const total = completedPurchases.reduce((acc, purchase) => acc + purchase.amount, 0);

                setTotalBenefits(total); // Using the state to store total benefits
            } catch (error) {
                setError("Erreur lors de la récupération des achats :", error);
            }
        };

        fetchPurchases();
    }, []);

    // Filtrer les utilisateurs en fonction de la recherche
    const filteredUsers = users.filter((user) => {
        const firstname = user.firstName || "";
        return firstname.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Utilisateurs paginés
    const indexOfLastUser = currentPage * UsersPerPage;
    const indexOfFirstUser = indexOfLastUser - UsersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Gérer la saisie dans la barre de recherche
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    // Changer de page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            {/* Tableau des utilisateurs */}
            <div className="relative flex w-full flex-col overflow-scroll rounded-lg border bg-white bg-clip-border p-4 text-gray-700 shadow-md dark:bg-[#25303F]">
                <Typography variant="h3" className="mb-3 text-xl font-bold dark:text-white md:text-3xl" color="blue-gray">
                    Liste des utilisateurs
                </Typography>
                <div className="flex flex-wrap justify-center items-center mb-4 space-y-4 flex-column sm:flex-row sm:space-y-4 md:justify-between">
                    <SearchInput handleSearch={handleSearch} searchQuery={searchQuery} />
                </div>
                <table className="w-full min-w-max text-left table-auto">
                    <thead className="bg-[#F9FAFB] font-medium text-gray-700 dark:bg-blue-gray-700 dark:text-white">
                        <tr>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-sm font-normal leading-none text-slate-500">Nom</p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-sm font-normal leading-none text-slate-500">Prénom</p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-sm font-normal leading-none text-slate-500">Email</p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-sm font-normal leading-none text-slate-500">Rôle</p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-sm font-normal leading-none text-slate-500">Action</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user, index) => (
                            <tr className="border-b hover:bg-slate-50 border-slate-200 dark:text-white" key={index}>
                                <td className="p-4 py-5">
                                    <p className="block text-sm font-semibold text-slate-800">{user.firstName}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="block text-sm font-semibold text-slate-800">{user.lastName}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="block text-sm text-slate-800">{user.email}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">{user.role && user.role === "admin" ? "Admin" : "Client"}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <Link to={`/administrator/instructor/delete/${user.id}`}>
                                        <Button size="sm" className="flex items-center text-white bg-red-600 focus:outline-none">
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-between items-center px-4 py-3">
                    <div className="text-sm text-slate-500 dark:text-white">
                        Afficher{" "}
                        <b>
                            {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsers.length)}
                        </b>{" "}
                        sur <b>{filteredUsers.length}</b>
                    </div>
                    <div className="flex space-x-1">
                        <button disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)} className={`min-w-9 min-h-9 ease rounded border px-3 py-1 text-sm font-normal transition duration-200 ${currentPage === 1 ? "border-gray-200 bg-gray-100 text-gray-300" : "border-gray-200 bg-white text-gray-500 hover:border-gray-400 hover:bg-gray-50"}`}>
                            Précédent
                        </button>
                        {[...Array(Math.ceil(filteredUsers.length / UsersPerPage)).keys()].map((page) => (
                            <button key={page + 1} onClick={() => paginate(page + 1)} className={`min-w-9 min-h-9 ease rounded border px-3 py-1 text-sm font-normal transition duration-200 ${currentPage === page + 1 ? "border-gray-800 bg-gray-800 text-white" : "border-gray-200 bg-white text-gray-500 hover:border-gray-400 hover:bg-gray-50"}`}>
                                {page + 1}
                            </button>
                        ))}
                        <button disabled={currentPage === Math.ceil(filteredUsers.length / UsersPerPage)} onClick={() => paginate(currentPage + 1)} className={`min-w-9 min-h-9 ease rounded border px-3 py-1 text-sm font-normal transition duration-200 ${currentPage === Math.ceil(filteredUsers.length / UsersPerPage) ? "border-gray-200 bg-gray-100 text-gray-300" : "border-gray-200 bg-white text-gray-500 hover:border-gray-400 hover:bg-gray-50"}`}>
                            Suivant
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Users;
