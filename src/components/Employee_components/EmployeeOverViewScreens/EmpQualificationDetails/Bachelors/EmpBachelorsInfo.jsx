import styles from "./EmpBachelorsInfo.module.css";
import certificate_download_icon from "../../../../../assets/Employee_asserts/EmployeeQu/certificate_download_icon.svg";
import pdf_icon from "../../../../../assets/Employee_asserts/EmployeeQu/pdf_icon.svg";

const EmpBachelorsInfo = ({ qualification = {} }) => {
  return (
    <div className={styles.empBachelorsInfoNavContent}>
      <div className={styles.bachelorsYear_Spec}>
        <div className={styles.bachelors_year}>
          <p className={styles.bachelors_heading}>Passed Out Year</p>
          <p className={styles.bachelors_value}>{qualification.passedoutYear || "N/A"}</p>
        </div>
        <div className={styles.bachelors_spec}>
          <p className={styles.bachelors_heading}>Specification</p>
          <p className={styles.bachelors_value} title={qualification.specialization || "N/A"}>
            {qualification.specialization || "N/A"}
          </p>
        </div>
      </div>
      <div className={styles.bachelorsInstitute_Uni_Cer}>
        <div className={styles.bachelors_institute}>
          <p className={styles.bachelors_heading}>Institute</p>
          <p
            className={styles.bachelors_value}
            title={qualification.institute || "N/A"}
          >
            {qualification.institute || "N/A"}
          </p>
        </div>
        <div className={styles.bachelors_uni}>
          <p className={styles.bachelors_heading}>University</p>
          <p className={styles.bachelors_value} title={qualification.university || "N/A"}>
            {qualification.university || "N/A"}
          </p>
        </div>
        <div className={styles.bachelors_certificates}>
          <p className={styles.bachelors_heading}>Certificates</p>
          <div className={styles.icons}>
            <figure>
              <img src={pdf_icon} alt="pdf_icon" />
            </figure>
            <figure>
              <img src={certificate_download_icon} alt="certificate_download_icon" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpBachelorsInfo;
