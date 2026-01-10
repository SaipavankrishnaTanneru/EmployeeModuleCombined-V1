// AccordianContainer.jsx
import { useState } from "react";
import styles from "./BankLeftInfo.module.css";
import PersonalAccountInfo from "../../../components/Employee_components/EmployeeOverViewScreens/BankInfoComponent/PersonalAccountInfo";
import SalaryAccountInfo from "../../../components/Employee_components/EmployeeOverViewScreens/BankInfoComponent/SalaryAccountInfo";
import { useEmployeeBankDetails } from "../../../queries/Employee_queries/OverViewsScreens/BankDetails";

const BankLeftInfoContainer = ({ employeeId }) => {
  const [expanded, setExpanded] = useState(null);
  const { data, isLoading, isError } = useEmployeeBankDetails(employeeId);

  if (isLoading) return <div className={styles.accordian_container}><p>Loading bank details...</p></div>;
  if (isError) return <div className={styles.accordian_container}><p>Error loading bank details.</p></div>;

  return (
    <div className={styles.accordian_container}>
      <div className={styles.accordians}>
        <PersonalAccountInfo data={data?.personalBankInfo} />
        <SalaryAccountInfo data={data?.salaryAccountInfo} />
      </div>
    </div>
  );
};

export default BankLeftInfoContainer;