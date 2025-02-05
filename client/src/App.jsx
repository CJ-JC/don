import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Footer, Navbar } from "@/widgets/layout/index.js";
import Loading from "@/widgets/utils/Loading.jsx";
import ScrollToTop from "@/widgets/utils/ScrollToTop.jsx";
import axios from "axios";

import Home from "@/pages/home.jsx";

import Admin from "@/pages/admin/admin.jsx";

// Courses
import CoursePlayer from "@/dashboard/CoursePlayer.jsx";
import Courses from "@/pages/courses.jsx";
import ShowCourses from "@/pages/admin/course/show-courses.jsx";
import Coursedetail from "@/components/Course-detail.jsx";
import CreateCourse from "@/pages/admin/course/create-course.jsx";
import EditCourse from "@/pages/admin/course/edit-course.jsx";

// Chapters
import CreateChapter from "@/pages/admin/course/create-chapter.jsx";
import EditChapter from "@/pages/admin/course/edit-chapter.jsx";

// Auth
import SignIn from "@/pages/auth/sign-in.jsx";
import SignUp from "@/pages/auth/sign-up.jsx";
import ForgotPassword from "@/pages/auth/forgot-password.jsx";
import ResetPassword from "@/pages/auth/reset-password.jsx";

import Remise from "@/pages/admin/Remise.jsx";

// Masterclass
import Masterclass from "@/pages/admin/masterclass/ShowMasterclass.jsx";
import EditMasterclass from "@/pages/admin/masterclass/EditMasterclass.jsx";
import MasterClass from "@/components/Masterclass.jsx";
import MasterclassDetail from "@/components/Masterclass-detail.jsx";
import CreateMasterclass from "@/pages/admin/masterclass/CreateMasterclass.jsx";

// Instructors
import CreateInstructor from "@/pages/admin/instructor/create-instructor.jsx";
import Instructors from "@/pages/admin/instructor/instructors.jsx";
import EditInstructor from "@/pages/admin/instructor/edit-instructor.jsx";

// Users
import Users from "@/pages/admin/users/users.jsx";
import AccountAdmin from "@/pages/admin/users/account-admin.jsx";
import Account from "@/pages/user/account.jsx";

import Settings from "@/pages/user/settings.jsx";
import Success from "@/pages/success.jsx";
import InvoicePdf from "@/pages/user/invoice-pdf.jsx";
import Politique from "@/pages/politique.jsx";
import Cgu from "@/pages/cgu.jsx";
import Cgv from "@/pages/cgv.jsx";
import NotFound from "@/pages/404.jsx";

const Layout = ({ globalDiscount, discountPercentage, isExpired, toggleTheme, theme, timeLeft }) => (
    <>
        {!isExpired && globalDiscount && (
            <div className="flex justify-center items-center p-4 w-full text-md bg-orange-700/60">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 w-4 h-4 lucide lucide-triangle-alert">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                    <path d="M12 9v4"></path>
                    <path d="M12 17h.01"></path>
                </svg>
                Bénéficiez de {discountPercentage}% de réductions sur les cours de votre choix. <span className="ml-1 font-bold">⏳ Offre expire dans : {timeLeft}</span>
            </div>
        )}
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        <Outlet />
        <Footer toggleTheme={toggleTheme} theme={theme} />
    </>
);

function App() {
    const [globalDiscount, setGlobalDiscount] = useState(false);
    const [discountPercentage, setDiscountPercentage] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isExpired, setIsExpired] = useState(false);
    const [expirationDate, setExpirationDate] = useState(null);
    const [timeLeft, setTimeLeft] = useState("");

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === "light" ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            return newTheme;
        });
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    // Fonction pour calculer le temps restant
    const calculateTimeLeft = (expiryDate) => {
        const now = new Date();
        const difference = expiryDate - now;

        if (difference <= 0) {
            setIsExpired(true);
            return "Expiré";
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        return days > 0 ? `${days}j ${hours}h ${minutes}m ${seconds}s` : `${hours}h ${minutes}m ${seconds}s`;
    };

    useEffect(() => {
        const fetchRemises = async () => {
            try {
                const response = await axios.get("/api/remise");
                const remises = response.data;

                if (!remises || remises.length === 0) {
                    setGlobalDiscount(false);
                    setDiscountPercentage(0);
                    setIsExpired(false);
                    setAuthLoading(false);
                    return;
                }

                const globalRemise = remises.find((remise) => remise.isGlobal);

                if (globalRemise) {
                    const expirationDate = new Date(globalRemise.expirationDate);
                    const now = new Date();

                    if (expirationDate > now) {
                        setGlobalDiscount(true);
                        setDiscountPercentage(globalRemise.discountPercentage);
                        setIsExpired(false);
                        setExpirationDate(expirationDate);
                        setTimeLeft(calculateTimeLeft(expirationDate));
                    } else {
                        setGlobalDiscount(false);
                        setDiscountPercentage(0);
                        setIsExpired(true);
                    }
                } else {
                    setGlobalDiscount(false);
                    setDiscountPercentage(0);
                    setIsExpired(false);
                }

                setAuthLoading(false);
            } catch (error) {
                setError("Erreur lors de la récupération des remises :", error);
                setAuthLoading(false);
            }
        };

        fetchRemises();
    }, []);

    // Mise à jour du countdown toutes les secondes
    useEffect(() => {
        if (!expirationDate || isExpired) return;

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(expirationDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [expirationDate, isExpired]);

    if (authLoading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    return (
        <div className="mx-auto h-auto md:h-screen">
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Layout globalDiscount={globalDiscount} discountPercentage={discountPercentage} isExpired={isExpired} toggleTheme={toggleTheme} theme={theme} timeLeft={timeLeft} />}>
                    <Route index element={<Home />} />
                    <Route path="courses" element={<Courses />} />
                    <Route path="detail/slug/:id" element={<Coursedetail />} />
                    <Route path="masterclass" element={<MasterClass />} />
                    <Route path="masterclass/slug/:slug" element={<MasterclassDetail />} />
                    <Route path="/invoice-pdf" element={<InvoicePdf />} />

                    {/* compte */}
                    <Route path="user/account" element={<Account />} />
                    <Route path="user/account/settings" element={<Settings />} />

                    {/* s'authentifier */}
                    <Route path="sign-in" element={<SignIn />} />
                    <Route path="sign-up" element={<SignUp />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="reset-password" element={<ResetPassword />} />

                    {/* payment */}
                    <Route path="success" element={<Success />} />
                </Route>

                {/* Routes admin */}
                <Route path="/administrator" element={<Admin toggleTheme={toggleTheme} theme={theme} />}>
                    {/* Chapters */}
                    <Route path="create-chapter/:courseId" element={<CreateChapter />} />
                    <Route path="course/:courseId/edit-chapter/:id" element={<EditChapter />} />

                    {/* Courses */}
                    <Route path="create-course" element={<CreateCourse />} />
                    <Route path="edit-course/:id" element={<EditCourse />} />
                    <Route path="courses" element={<ShowCourses />} />

                    {/* Masterclass */}
                    <Route path="masterclass" element={<Masterclass />} />
                    <Route path="create-masterclass" element={<CreateMasterclass />} />
                    <Route path="edit-masterclass/:id" element={<EditMasterclass />} />

                    {/* instructors */}
                    <Route path="instructors" element={<Instructors />} />
                    <Route path="instructor/create" element={<CreateInstructor />} />
                    <Route path="instructor/edit/:id" element={<EditInstructor />} />

                    {/* users */}
                    <Route path="users" element={<Users />} />
                    <Route path="profile" element={<AccountAdmin />} />

                    {/* remise */}
                    <Route path="remise" element={<Remise />} />
                </Route>

                {/* Autres routes */}
                <Route path="/course-player/course/:courseId/chapters/:chapterId" element={<CoursePlayer toggleTheme={toggleTheme} theme={theme} />} />

                <Route path="*" element={<NotFound />} />

                {/* footer */}
                <Route path="politique" element={<Politique />} />
                <Route path="cgu" element={<Cgu />} />
                <Route path="cgv" element={<Cgv />} />
            </Routes>
        </div>
    );
}

export default App;
