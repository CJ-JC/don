import React, { useEffect, useState } from "react";

const FormatHour = ({ masterclass }) => {
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (!masterclass?.startDate) return; // Vérifier si startDate est défini

        const isoDate = masterclass.startDate;
        const date = new Date(isoDate);

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

        setResult(formattedTime);
    }, [masterclass.startDate]); // Ajout de la dépendance

    return <>{result}</>;
};

export default FormatHour;
