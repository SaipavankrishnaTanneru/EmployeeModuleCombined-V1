import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CampusFlowPageHeader.module.css";
import backArrow from "../../../assets/Employee_asserts/campusFlowIcons/BackArrow.svg";

const CampusFlowPageHeader = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <img
        src={backArrow}
        alt="Back"
        className={styles.backIcon}
        onClick={() => navigate(-1)}
      />

      <h2 className={styles.title}>Campus Flow</h2>
    </div>
  );
};

export default CampusFlowPageHeader;