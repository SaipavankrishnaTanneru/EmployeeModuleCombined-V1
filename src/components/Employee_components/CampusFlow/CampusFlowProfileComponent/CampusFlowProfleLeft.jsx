import React from "react";
import styles from "../CampusFlowProfileComponent/CampusFlowMiddle.module.css";

const CampusFlowProfileLeft = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className={styles.infoGrid}>
      <div className={styles.infoItem}>
        <p className={styles.label}>Payroll Code</p>
        <p className={styles.value}>{profile.payrollCode ?? "-"}</p>
      </div>

      <div className={styles.infoItem}>
        <p className={styles.label}>Year of Established</p>
        <p className={styles.value}>
          {profile.yearOfEstablished ?? "-"}
        </p>
      </div>

      <div className={styles.infoItem}>
        <p className={styles.label}>Zone</p>
        <p className={styles.value}>{profile.zoneName ?? "-"}</p>
      </div>

      <div className={styles.infoItem}>
        <p className={styles.label}>No Of Employees</p>
        <p className={styles.value}>
          {profile.numberOfEmployees ?? 0}
        </p>
      </div>

      <div className={styles.infoItem}>
        <p className={styles.label}>Organization</p>
        <p className={styles.value}>
          {profile.orgName ?? "-"}
        </p>
      </div>

      <div className={styles.infoItem}>
        <p className={styles.label}>Campus Managed By</p>
        <p className={styles.value}>
          {profile.campusManagedBy ?? "-"}
        </p>
      </div>

      <div className={styles.infoItem}>
        <p className={styles.label}>Board Code</p>
        <p className={styles.value}>
          {profile.boardCode ?? "-"}
        </p>
      </div>
    </div>
  );
};

export default CampusFlowProfileLeft;