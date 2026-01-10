
import React from 'react';
import styles from "../EmployeeProfileComponet/EmployeeProfileMiddle.module.css";

const EmployeeProfileMiddle = ({ data }) => {
    return (
        <div>
            <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                    <p className={styles.label}>Date Of Birth</p>
                    {/* Displays date directly. Use a formatter library if you need a specific look */}
                    <p className={styles.value}>{data?.dateOfBirth}</p>
                </div>

                {/* <div className={styles.infoItem}>
                    <p className={styles.label}>Campus</p>
                    <p className={styles.value}>{data?.campusName}</p>
                </div> */}

<div className={styles.infoItem}>
  <p className={styles.label}>Campus</p>
  <p
    className={`${styles.value} ${styles.ellipsis}`}
    title={data?.campusName}
  >
    {data?.campusName}
  </p>
</div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Campus ID</p>
                    <p className={styles.value}>{data?.campusId}</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Payroll ID</p>
                    <p className={styles.value}>{data?.payrollId}</p>
                </div>

                {/* <div className={styles.infoItem}>
                    <p className={styles.label}>Payroll Company</p>
                    <p className={styles.value}>{data?.payrollCompany}</p>
                </div> */}

                <div className={styles.infoItem}>
  <p className={styles.label}>Payroll Company</p>
  <p
    className={`${styles.value} ${styles.ellipsis}`}
    title={data?.payrollCompany}
  >
    {data?.payrollCompany}
  </p>
</div>

            

                <div className={styles.infoItem}>
                    <p className={styles.label}>Department</p>
                    <p className={styles.value}>{data?.departmentName}</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Contract period</p>
                    {/* Assuming contractPeriod is a number (e.g. 12), we add "Months" */}
                    <p className={styles.value}>{data?.contractPeriod} Months</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Reporting Manager</p>
                    <p className={styles.value}>{data?.reportingManagerName}</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Blood Group</p>
                    <p className={styles.value}>{data?.bloodGroupName}</p>
                </div>
            </div>
        </div>
    );
}
export default EmployeeProfileMiddle;