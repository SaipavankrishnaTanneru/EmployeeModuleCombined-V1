import React from "react";
import styles from "./AgreementsDetailsLeftInfo.module.css";

import AgreementsDetailsInfoHeader from "./AgreementsDetailsInfoHeader";
import AgreementsDetails from "../../EmployeeOverViewScreens/AgreementsDetailsOverview/AgreementsDetails";
const AgreementsDetailsLeftInfo = ({ employeeId }) => {
  return (
    <div className={styles.whole_container}>
      <AgreementsDetailsInfoHeader />
      <AgreementsDetails employeeId={employeeId} />
    </div>
  );
};

export default AgreementsDetailsLeftInfo;
