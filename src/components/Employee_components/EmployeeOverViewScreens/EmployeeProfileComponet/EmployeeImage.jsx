import React from "react";
import styles from "./EmployeeImage.module.css";
import phoneIcon from '../../../../assets/Employee_asserts/EmployeeProfileCrad/phoneIcon.svg';
import dotsIcon from '../../../../assets/Employee_asserts/EmployeeProfileCrad/dotsicon.svg';
import emp_image from '../../../../assets/Employee_asserts/EmployeeProfileCrad/emp_image.jpg';
import callIconOutLine from "../../../../assets/Employee_asserts/RightSideInformation Icons/callIconOutLine.svg";
import mailIconOutline from "../../../../assets/Employee_asserts/RightSideInformation Icons/MailIconOutLine.svg";
import gendericon from "../../../../assets/Employee_asserts/EmployeeProfileCrad/Gendericon.svg";
import {

  Tooltip
} from "@mui/material";

const EmployeeImage = ({ data }) => {
  
  // Helper to calculate Age from DOB
  const getAge = (dobString) => {
      if(!dobString) return "--";
      const birthDate = new Date(dobString);
      const ageDifMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDifMs); 
      return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div className={styles.employeeprofileContainer}>
      <figure className={styles.employeeProfile}>
        {/* Use profile image from API or fallback to local default */}
        <img 
          className={styles.emp_img}
          src={data?.profileImage || emp_image}
          alt="Profile"
        />
      </figure>

      <div className={styles.infoSection}>
        <p className={styles.empId}>Employee ID:<br /><span>{data?.empId}</span></p>
        <h3 className={styles.name}>{data?.fullName}</h3>

        <div className={styles.details}>
          <span className={styles.detail}>
            <img src={gendericon} alt="Gender icon" className={styles.icon} /> {data?.genderName}
          </span>
          <span className={styles.detail}>• {getAge(data?.dateOfBirth)} Yrs</span>
          <span className={styles.detail}>• {data?.maritalStatusType}</span>
        </div>

        <div className={styles.actions}>
          <button className={styles.designation}>{data?.designationName}</button>
           
           {/* Phone Tooltip */}
           <Tooltip title={data?.primaryMobileNo || "No Number"}>
             <figure style={{ cursor: "pointer" }}>
               <img src={phoneIcon} alt="Call" />
             </figure>
           </Tooltip>

           {/* Email Tooltip */}
           <Tooltip title={data?.email || "No Email"}>
             <figure style={{ cursor: "pointer" }}>
               <img src={dotsIcon} alt="Mail" />
             </figure>
           </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default EmployeeImage;
