import React from "react";
import styles from "./CampusFlowProfileContanier.module.css";

import CampusFlowProfileLeft from "../../../components/Employee_components/CampusFlow/CampusFlowProfileComponent/CampusFlowProfleLeft";
import CamnpusFlowImage from "../../../components/Employee_components/CampusFlow/CampusFlowProfileComponent/CamnpusFlowImage";

const CampusFlowProfileContainer = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className={styles.Campus_profile_container}>
      <CamnpusFlowImage profile={profile} />
      <CampusFlowProfileLeft profile={profile} />
    </div>
  );
};


export default CampusFlowProfileContainer;
