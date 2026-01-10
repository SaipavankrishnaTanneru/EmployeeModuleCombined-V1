import React from "react";
import styles from "./AgreementsDetailsContainer.module.css";

import AgreementsDetailsLeftInfo from "../../../components/Employee_components//EmployeeOverViewScreens/AgreementsDetailsOverview/AgreementsDetailsLeftInfo";
import AgreementsGeneralInfoContainer from "./AgreementsGeneralInfoContainer";



const AgreementsDetailsContainer = ({ employeeId }) => {
  return (
    <div className={styles.agreements_details_info_container}>
      <div className={styles.agreements_left_component}>
        <AgreementsDetailsLeftInfo employeeId={employeeId} />
      </div>

      <div className={styles.agreements_right_component}>
        <AgreementsGeneralInfoContainer employeeId={employeeId} />
      </div>
    </div>
  );
};

export default AgreementsDetailsContainer;
