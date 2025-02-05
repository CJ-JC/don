import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import CourseProgress from "@/widgets/utils/Course-progress.jsx";

const CourseCard = ({ id, title, imageUrl, chaptersLength, chapters, price, slug, discountedPrice, category }) => {
    const BASE_URL = process.env.REACT_APP_SERVER_URL;

    const [color, setColor] = useState("#FF6C02");
    const [hasPurchasedCourse, setHasPurchasedCourse] = useState(false);
    const [progress, setProgress] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkPurchase = async () => {
            try {
                if (id) {
                    const response = await axios.get(`/api/payment/check-purchase?id=${id}`, { withCredentials: true });

                    setHasPurchasedCourse(response.data.hasPurchasedCourse);
                }
            } catch (error) {
                setError("Erreur lors de la vérification de l'achat.");
            }
        };

        const fetchProgress = async () => {
            try {
                const response = await axios.get(`/api/user-progress/${id}`, {
                    withCredentials: true,
                });
                setProgress(response.data.progress);
            } catch (error) {
                if (error.response?.status === 401) {
                    setProgress(null);
                } else {
                    setError("Erreur lors de la récupération de la progression.");
                }
            }
        };

        checkPurchase();
        fetchProgress();
    }, [id]);

    useEffect(() => {
        if (category === "Piano") {
            setColor("crimson");
        } else if (category === "Guitare") {
            setColor("#023047");
        } else if (category === "Batterie") {
            setColor("#2d6a4f");
        } else {
            setColor("#FF6C02");
        }
    }, [category]);

    // Je veux récupérer l'url de la page user/account
    const linkUserAccount = window.location.href;

    return (
        <>
            <Link to={linkUserAccount.includes("user/account") ? `/course-player/course/${id}/chapters/${chapters[0].id}` : `/detail/slug/${slug}`} key={id}>
                <article className="flex isolate overflow-hidden relative flex-col justify-end px-4 pb-4 mx-auto max-w-sm h-72 rounded-2xl border transition duration-500 ease-in-out pt-30 hover:scale-105 dark:border-white/30">
                    <img alt={title} src={`${BASE_URL}${imageUrl}`} className="object-cover absolute inset-0 w-full h-full" />
                    {progress === 100 && (
                        <div className="flex absolute top-3 right-3 z-10 justify-center items-center w-10 h-10 bg-white rounded-full">
                            <Trophy className="text-xl text-[#ffd700]" />
                        </div>
                    )}
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-gray-900 bg-black/50"></div> */}
                    <div className="absolute inset-0 bg-black/70"></div>
                    <h3 className="z-10 text-xl font-medium text-white">{title}</h3>
                    <div className="flex z-10 items-center my-2 space-x-2">
                        <div className="flex justify-center items-center p-1 bg-light-blue-50 rounded-full">
                            <BookOpen className="text-green-500" />
                        </div>
                        <span className="text-white">{chaptersLength > 1 ? `${chaptersLength} Chapitres` : `${chaptersLength} Chapitre`}</span>
                    </div>
                    {hasPurchasedCourse ? (
                        <CourseProgress size="sm" value={progress} />
                    ) : (
                        <p className="z-10 font-medium text-white text-md md:text-sm">
                            {!hasPurchasedCourse &&
                                (discountedPrice && discountedPrice < price ? (
                                    <>
                                        <span className="text-lg text-gray-300 line-through">{price}€</span>
                                        <span className="ml-2 text-lg text-white">{discountedPrice}€</span>
                                    </>
                                ) : (
                                    <span className="text-lg text-white">{price}€</span>
                                ))}
                        </p>
                    )}
                    <span style={{ backgroundColor: color, display: "block" }} className={`absolute right-0 bottom-5 px-2 py-1 mt-3 mr-3 text-sm font-medium text-white rounded-full`}>
                        {category}
                    </span>
                </article>
            </Link>
        </>
    );
};

export default CourseCard;
