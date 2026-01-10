import React from 'react';
import styles from "../EmployeeProfileComponet/EmployeeViewButton.module.css";
import ArrowIcon from "../../../assets/Employee_asserts/EmployeeProfileCrad/ButtonArrow.svg";

const EmployeeViewButton = () => {
  return (
    <div className={styles.viewButtonContainer}>
      <button className={styles.viewProfileBtn}>

        <img
          src={ArrowIcon}
          alt="Arrow icon"
          className={styles.icon}
        />
        View full Profile
      </button>
    </div>


  );
};
export default EmployeeViewButton;