import React from "react";
import FamilyAddressInfoHeader from './FamilyAddressInfoHeader';
import MainInfo from '../../../../containers/Employee_containers/acoordian-container/MainInfoContainer'

import styles from './FamilyAddressInfoFormLeft.module.css'

const FamilyAddressInfoFormLeft = ({ employeeId }) => {
  return (
    <div className={styles.whole_medical_container}>
      <FamilyAddressInfoHeader />
      <MainInfo employeeId={employeeId} />
    </div>
  )
}

export default FamilyAddressInfoFormLeft;