// AccordianContainer.jsx
import { useState } from "react";
import styles from "./BankLeftInfo.module.css";
import PersonalAccountInfo from "../../../components/Employee_components/EmployeeOverViewScreens/BankInfoComponent/PersonalAccountInfo";
import SalaryAccountInfo from "../../../components/Employee_components/EmployeeOverViewScreens/BankInfoComponent/SalaryAccountInfo";

import PersonalInfo from "../../../components/Employee_components/EmployeeOverViewScreens/BankInfoComponent/PersonalInfo";
import SalaryInfo from "../../../components/Employee_components/EmployeeOverViewScreens/BankInfoComponent/SalaryInfo";

const SalaryLeftInfoConatiner = () => {
  const [expanded, setExpanded] = useState(null);
 
  return (
    <div className={styles.accordian_container}>
     
 
      <div className={styles.accordians}>
        <PersonalInfo/>
        <SalaryInfo/>
      </div>
   
    </div>
  );
};
 
export default SalaryLeftInfoConatiner;
 