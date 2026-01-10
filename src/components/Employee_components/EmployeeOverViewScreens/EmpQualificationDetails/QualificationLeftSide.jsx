import React, { useEffect, useMemo } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import GenericNavTabs from '../../../../widgets/Employee_widgets/NavTabs/GenericNavTabs';
import styles from "./QualificationLeftSide.module.css";
import tab_icon from "../../../../assets/Employee_asserts/EmployeeQu/tab_icon.svg";

import { useEmployeeQualifications } from "../../../../queries/Employee_queries/OverViewsScreens/QualificationDetails";

// Child Components
import EmpBachelorsInfo from "./Bachelors/EmpBachelorsInfo";
import EmpIntermediateInfo from "./Intermediate/EmpIntermediateInfo";
import EmpSchoolInfo from "./School/EmpSchoolInfo";

const QualificationLeftSide = ({ employeeId }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch qualifications data
  const { data: qualifications, isLoading, isError } = useEmployeeQualifications(employeeId);

  // Find specific qualifications by type (Case-insensitive matching)
  const findQual = (keywords) => {
    if (!qualifications || !Array.isArray(qualifications)) return null;

    return qualifications.find(q => {
      const name = (q.qualificationName || "").toUpperCase();
      const degree = (q.qualificationDegree || "").toUpperCase();

      return keywords.some(key =>
        name.includes(key.toUpperCase()) || degree.includes(key.toUpperCase())
      );
    });
  };

  const bachelorQual = findQual(["UNDER GRADUATE", "BACHELOR", "B.TECH", "B.E", "DEGREE"]);
  const intermediateQual = findQual(["INTERMEDIATE", "PUC", "+2", "12TH"]);
  const schoolQual = findQual(["10TH", "SSC", "MATRICULATION", "SCHOOL"]);

  // Debugging logs (View these in browser console)
  console.log(`Qualifications for ${employeeId}:`, qualifications);
  console.log("Filtered Results:", { bachelorQual, intermediateQual, schoolQual });

  // 🛠️ CRITICAL FIX: Force clean base path
  // Split at the known segment name to remove any trailing sub-routes
  const basePath = location.pathname.split("/qualificationDetails")[0] + "/qualificationDetails";

  const qualificationTabs = useMemo(() => [
    { id: "bachelors", label: "Bachelors", path: `${basePath}/bachelors` },
    { id: "intermediate", label: "Intermediate", path: `${basePath}/intermediate` },
    { id: "school", label: "10Th Class", path: `${basePath}/school` },
  ], [basePath]);

  useEffect(() => {
    // If we are exactly at the parent route, redirect to first tab
    if (location.pathname === basePath || location.pathname === basePath + '/') {
      navigate(`${basePath}/bachelors`, { replace: true });
    }
  }, [location.pathname, navigate, basePath]);

  if (isLoading) {
    return (
      <div className={styles.qualificationLeftTop}>
        <p>Loading qualification details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.qualificationLeftTop}>
        <p>Error loading qualification details.</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.qualificationLeftTop}>
        <div className={styles.qualificationIconHeading}>
          <figure><img src={tab_icon} alt="tab_icon" /></figure>
          <div className={styles.qualificationTabHeading}>
            <p className={styles.heading}>Qualification Details</p>
            <p className={styles.description}>Analytics And Growth Rate</p>
          </div>
        </div>
      </div>
      <div className={styles.qualificationNavTabNContent}>
        <div className={styles.qualificationNavTabs}>
          <GenericNavTabs tabs={qualificationTabs} />
        </div>
        <Routes>
          <Route index element={<EmpBachelorsInfo qualification={bachelorQual} />} />
          <Route path="bachelors" element={<EmpBachelorsInfo qualification={bachelorQual} />} />
          <Route path="intermediate" element={<EmpIntermediateInfo qualification={intermediateQual} />} />
          <Route path="school" element={<EmpSchoolInfo qualification={schoolQual} />} />
        </Routes>
      </div>
    </>
  );
};

export default QualificationLeftSide;