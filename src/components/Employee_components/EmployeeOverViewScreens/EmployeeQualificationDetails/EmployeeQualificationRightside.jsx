import styles from "../EmployeeQualificationDetails/EmployeeQualificationRightside.module.css";
import EmployeeRightSideHeader from "../EmployeeRightInformation/EmployeeRightInformationHeader";
import ReferredBy from "./ReferredBy";
import SameInstutionEmployees from "./SameInstutionEmployees";
import React, { useState } from "react";
import endline from "../../../../assets/Employee_asserts/RightSideInformation Icons/endline.svg";
import { useEmployeeReferenceBy } from "../../../../queries/Employee_queries/OverViewsScreens/ReferenceBy";


const EmployeeQualificationRightside = ({ employeeId }) => {
  const [expanded, setExpanded] = useState(null);
  const { data: referenceData, isLoading, isError } = useEmployeeReferenceBy(employeeId);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <div className={styles.rightsidedetailscontainer}>
      <EmployeeRightSideHeader />

      <SameInstutionEmployees
        expanded={expanded === "SameInstutionEmployees"}
        onChange={handleChange("SameInstutionEmployees")}
      />

      <ReferredBy
        expanded={expanded === "ReferedBy"}
        onChange={handleChange("ReferedBy")}
        referenceData={referenceData}
        isLoading={isLoading}
        isError={isError}
      />

      <img src={endline} alt="Example" />
    </div>
  );
};

export default EmployeeQualificationRightside;