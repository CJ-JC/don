import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { PageTitle } from "@/widgets/layout";
import CourseList from "@/components/Course-list.jsx";
import useCourses from "@/widgets/utils/UseCourses";
import Countdown from "@/widgets/utils/Countdown.jsx";
import Loading from "@/widgets/utils/Loading.jsx";
import axios from "axios";
import ReactQuill from "react-quill";
import { motion } from "framer-motion";
import { Monitor, Rocket, UsersRound } from "lucide-react";
import Contact from "@/components/Contact.jsx";
import { useSelector } from "react-redux";

export function Home() {
    const { discountedCourses, globalDiscount, availableRemises } = useCourses();
    const { isLoggedIn, user } = useSelector((state) => state.auth);

    const [masterclasses, setMasterclasses] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMasterclass = async () => {
            try {
                const response = await axios.get(`/api/masterclass`);
                setMasterclasses(response.data);
            } catch (error) {
                setError("Erreur lors de la récupération de la masterclass");
            } finally {
                setIsLoading(false);
            }
        };
        fetchMasterclass();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    const firstMasterclass = masterclasses[0];

    return (
        <>
            <div className="relative flex h-[700px] content-center items-center justify-center pb-32 pt-16">
                <video className="object-cover absolute top-0 w-full h-full" autoPlay muted loop playsInline>
                    <source src="/img/dony-music.mov" type="video/mp4" />
                </video>
                <div className="absolute top-0 w-full h-full bg-center bg-cover bg-black/80" />
                <div className="container relative mx-auto max-w-8xl">
                    <div className="flex flex-wrap items-center">
                        <div className="px-4 mr-auto ml-auto w-full text-center lg:w-8/10">
                            <Typography variant="h1" color="white" className="font-black">
                                Laissez la musique vous inspirer.
                            </Typography>
                            <Typography variant="lead" color="white" className="opacity-80">
                                Avec DonyMusic, découvrez une nouvelle façon d'apprendre à jouer de vos instruments préférés. <br /> Suivez des cours interactifs, progressez à votre rythme et réalisez vos rêves musicaux.
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>

            <section className="px-4 pb-20 mx-auto -mt-24 max-w-screen-xl">
                <div className="container mx-auto">
                    {firstMasterclass && (
                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
                            <Card className="rounded-lg shadow-lg shadow-gray-500/10 dark:bg-white/90">
                                <CardBody className="px-4 py-6">
                                    <div className="flex flex-col gap-x-10 justify-between items-center md:flex-row">
                                        <div>
                                            <Typography variant="h5" className="px-2 font-bold text-blue-gray-900">
                                                {firstMasterclass?.title}
                                            </Typography>
                                            <div className="text-sm text-blue-gray-500 dark:text-black">
                                                <ReactQuill value={firstMasterclass?.description?.length > 200 ? firstMasterclass?.description.substring(0, firstMasterclass?.description.lastIndexOf(" ", 200)) + "..." : firstMasterclass?.description} readOnly={true} theme="bubble" />
                                            </div>
                                        </div>
                                        <div>
                                            <Typography variant="h6" className="text-blue-gray-500 dark:text-black">
                                                Début dans :
                                            </Typography>
                                            <Countdown targetDate={firstMasterclass?.startDate} startDate={firstMasterclass?.startDate} endDate={firstMasterclass?.endDate} />
                                        </div>
                                    </div>
                                    <div className="flex justify-center w-full">
                                        <Link to="/masterclass">
                                            <Button size="md" className="mt-4">
                                                En savoir plus
                                            </Button>
                                        </Link>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    )}
                    <section className="flex flex-wrap items-center mt-32">
                        <div className="container mx-auto dark:text-white">
                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
                                <PageTitle section="Explorez Nos Cours" heading="Maîtrisez Votre Instrument">
                                    Découvrez nos formations et perfectionnez vos compétences musicales
                                </PageTitle>

                                <CourseList courses={discountedCourses.slice(0, 4)} globalDiscount={globalDiscount} availableRemises={availableRemises} />

                                <div className="flex justify-center my-24">
                                    <Link to={`/courses`} className="rounded-full">
                                        <Button className="dark:bg-white dark:text-black dark:hover:bg-gray-400">Voir tous les cours</Button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                </div>
            </section>
            {/* About */}
            <section className="px-4 py-20 mx-auto -mt-28 max-w-screen-xl">
                <div className="container mx-auto">
                    <PageTitle section="À propos du formateur" heading="Découvrez votre formateur">
                        Apprenez à connaître votre formateur
                    </PageTitle>

                    <div className="grid gap-12 items-center mt-12 md:grid-cols-2">
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
                            <div className="flex items-center mt-4 space-x-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-blue-gray-900 dark:text-white">Jean Dupont</h3>
                                    <p className="text-blue-gray-500 dark:text-white">Pianiste expert, passionné par la musique et la transmission de son art. Avec plus de 10 ans d'expérience, il a donné des concerts à travers le monde et formé de nombreux élèves, les accompagnant dans leur parcours musical avec patience et expertise.</p>

                                    <div className="flex mt-2 space-x-4">
                                        <a href="https://www.linkedin.com/in/jeandupont" target="_blank" rel="noopener noreferrer">
                                            <motion.i whileHover={{ scale: 1.2 }} className="text-2xl text-blue-600 fab fa-facebook"></motion.i>
                                        </a>
                                        <a href="https://www.youtube.com/@donymusic0" target="_blank" rel="noopener noreferrer">
                                            <motion.i whileHover={{ scale: 1.2 }} className="text-2xl text-red-500 fab fa-youtube"></motion.i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.03 }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="relative">
                            <img src="/img/formateur.png" alt="Formateur en action" className="rounded-lg shadow-lg" />
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="relative mx-auto my-10 flex h-96 items-center bg-[url(http://localhost:3000/img/bg-home-2.jpg)] bg-cover bg-scroll bg-center bg-no-repeat px-4 py-20">
                <div className="absolute inset-0 bg-black/80" />

                <div className="container relative z-10 mx-auto max-w-screen-xl">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="text-center">
                        <h2 className="mb-4 text-3xl font-bold text-white">Transformez votre avenir dès aujourd'hui !</h2>
                        <p className="mb-6 text-lg text-gray-200">
                            Rejoignez notre communauté et accédez à des formations exclusives pour développer vos compétences et réaliser vos ambitions. <br /> {!isLoggedIn && !user && <>Inscrivez-vous dès maintenant et commencez votre parcours vers le succès.</>} {isLoggedIn && user && <>Commencez votre parcours vers le succès.</>}
                        </p>
                        {!isLoggedIn && !user && (
                            <div className="flex justify-center">
                                <Button size="md" onClick={() => navigate("/sign-up")} className="px-6 py-3 text-black bg-white hover:bg-gray-300">
                                    Rejoignez-nous aujourd'hui
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            <section className="px-4 py-20 mx-auto -mt-28 max-w-screen-xl">
                <div className="container mx-auto">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-16 text-center">
                        <PageTitle section="Nos Services" heading="Ce que propose Donymusic">
                            Découvrez une plateforme de formation pour développer vos compétences musicales et professionnelles.
                        </PageTitle>
                        <div className="grid gap-8 mt-8 sm:grid-cols-1 md:grid-cols-3">
                            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                                <div className="flex flex-col justify-center items-center text-blue-gray-500">
                                    <div className="p-2 text-white bg-blue-gray-900 rounded-full">
                                        <Monitor className="w-8 h-8" />
                                    </div>
                                    <p className="mt-2 text-blue-gray-500 dark:text-white">
                                        <strong>Formation en ligne</strong> : Accédez à des cours interactifs et flexibles, disponibles 24/7 pour s'adapter à votre emploi du temps.
                                    </p>
                                </div>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                                <div className="flex flex-col justify-center items-center text-blue-gray-500">
                                    <div className="p-2 text-white bg-blue-gray-900 rounded-full">
                                        <UsersRound className="w-8 h-8" />
                                    </div>
                                    <p className="mt-2 text-blue-gray-500 dark:text-white">
                                        <strong>Communauté dynamique</strong> : Rejoignez une communauté d'apprenants et partagez vos expériences.
                                    </p>
                                </div>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                                <div className="flex flex-col justify-center items-center text-blue-gray-500">
                                    <div className="p-2 text-white bg-blue-gray-900 rounded-full">
                                        <Rocket className="w-8 h-8" />
                                    </div>
                                    <p className="mt-2 text-blue-gray-500 dark:text-white">
                                        <strong>Atteignez de nouveaux sommets</strong> : Progresser n'a jamais été aussi simple. Développez vos compétences et avancez vers vos ambitions.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
            {/* bg-[#F9FAFB] */}

            <section className="px-4 py-20 mx-auto">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
                    <Contact />
                </motion.div>
            </section>
        </>
    );
}

export default Home;
