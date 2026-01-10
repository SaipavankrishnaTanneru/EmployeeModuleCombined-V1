import React from 'react';
import styles from './SalaryDetailsContainer.module.css'


import SalaryDetailsLeftInfo from '../../../components/Employee_components/EmployeeOverViewScreens/EmpSalaryInfoOverview/SalaryDetailsLeftInfo';
import AgreementsGeneralInfoContainer from '../AgreementsConatiner/AgreementsGeneralInfoContainer';



const SalaryDetailsContainer = ({ employeeId }) => {
  return (
    <div className={styles.salary_details_info_container}>
      <div className={styles.salary_details_left_component}>
        <SalaryDetailsLeftInfo employeeId={employeeId} />
      </div>
      <div className={styles.salary_details_right_component}>
        <AgreementsGeneralInfoContainer employeeId={employeeId} />
      </div>
    </div>
  );
};

export default SalaryDetailsContainer;