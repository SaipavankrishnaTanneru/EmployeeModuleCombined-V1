import styles from "./QualificationRightSideInfo.module.css";
import rightSideIcon from "../../../../assets/Employee_asserts/EmployeeQu/rightsideheadingicon.svg";
import rightSideBottomIcon from "../../../../assets/Employee_asserts/EmployeeQu/rightSideBottomIcon.svg";

const QualificationRightSideInfo = () => {
  return (
    <>
      <div className={styles.rightSideTop}>
        <img src={rightSideIcon} alt="right_side_icon" />
        <p className={styles.rightSideHeading}>General Information</p>
      </div>
      <div className={styles.qualificationAcardions}>
        <img src={rightSideBottomIcon} alt="right_side_bottom_icon" />
      </div>
    </>
  );
};

export default QualificationRightSideInfo;
