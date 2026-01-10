import React from "react";
import styles from "./Personalinfo.module.css";
import dividerline from "../../../../assets/Employee_asserts/Family/dividerline.svg";
// import pdficon from "assets/EmployeeQu/pdf_icon.svg";
// import downloadicon from "assets/EmployeeQu/downloadblueicon.svg";
import { useParams } from "react-router-dom";
import { useEmployeeSalaryDetails } from "../../../../queries/Employee_queries/OverViewsScreens/SalaryDetails";

const PersonalInfo = () => {
    const { employeeId } = useParams();
    const { data, isLoading, isError } = useEmployeeSalaryDetails(employeeId);

    if (isLoading) return <p style={{ padding: '16px' }}>Loading salary info...</p>;
    if (isError) return <p style={{ padding: '16px' }}>Error loading salary info.</p>;
    if (!data) return <p style={{ padding: '16px' }}>No salary info available.</p>;

    return (
        <div className={styles.personalAccountContainer}>
            <div className={styles.headerRow}>
                <h4 className={styles.title}>Salary Info</h4>
                <img src={dividerline} alt="divider" className={styles.dividerImage} />
            </div>

            <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                    <p className={styles.label}>Monthly CTC</p>
                    <p className={styles.value}>{data.monthlyTakeHome?.toLocaleString() || "N/A"}</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>CTC in words</p>
                    <p className={styles.value}>{data.ctcWords || "N/A"}</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Yearly CTC</p>
                    <p className={styles.valueBold}>{data.yearlyCtc?.toLocaleString() || "N/A"}</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Structure</p>
                    <p className={styles.valueBold}>{data.empStructureId || "N/A"}</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Grade</p>
                    <p className={styles.valueBold}>{data.gradeId || "N/A"}</p>
                </div>


                <div className={styles.infoItem}>
                    <p className={styles.label}>PF Eligible</p>
                    <p className={styles.valueBold}>{data.isPfEligible ? "Yes" : "No"}</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>ESI Eligible</p>
                    <p className={styles.valueBold}>{data.isEsiEligible ? "Yes" : "No"}</p>
                </div>

                {/* <div className={styles.infoItem}>
          <p className={styles.label}>Bank Statement / Cheque</p>
          <div className={styles.icons}>
            <img src={pdficon} alt="PDF" className={styles.pdfImage} />
            <img src={downloadicon} alt="Download" className={styles.downloadImage} />
          </div>
        </div> */}
            </div>
        </div>
    );
};

export default PersonalInfo;

