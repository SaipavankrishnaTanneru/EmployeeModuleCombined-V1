import React from "react";
// import FamilyAddressInfoHeader from './BankDetailsInfoHeader';
// import MainInfo from '../../containers/acoordian-container/BankLeftInfoContainer';

import styles from './BankDetailsLeftInfo.module.css';
import BankDetailsInfoHeader from "./BankDetailsInfoHeader";
import BankLeftInfoContainer from "../../../../containers/Employee_containers/acoordian-container/BankLeftInfoContainer";
const BankDetailsLeftInfo = ({ employeeId }) => {

  return (
    <div className={styles.whole_medical_container}>
      <BankDetailsInfoHeader />
      <BankLeftInfoContainer employeeId={employeeId} />
    </div>
  )
}
export default BankDetailsLeftInfo;