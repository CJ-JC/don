import React from "react";
import Loading from "../../widgets/utils/Loading.jsx";
import CourseList from "../../components/Course-list.jsx";
import { Typography } from "@material-tailwind/react";

const Dashboard = ({ courseData, loading }) => {
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto p-0 md:p-2">
      <Typography variant="h4" className="dark:text-white">
        Vos formations
      </Typography>
      <p className="text-gray-600 dark:text-white">
        Les formations que vous avez souscrit sont affichées ci-dessous.
      </p>
      <CourseList courses={courseData} />
    </div>
  );
};
export default Dashboard;
