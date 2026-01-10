import React from "react";
import styles from "./AgreementsDetails.module.css";

import dividerline from "../../../../assets/Employee_asserts/Family/dividerline.svg";
import pdficon from "../../../../assets/Employee_asserts/EmployeeQu/pdf_icon.svg";
import downloadicon from "../../../../assets/Employee_asserts/EmployeeQu/downloadblueicon.svg";

import { useEmployeeAgreementDetails } from "../../../../queries/Employee_queries/OverViewsScreens/AgreementDetails";


const AgreementsDetails = ({ employeeId }) => {
  const { data, isLoading, isError } = useEmployeeAgreementDetails(employeeId);

  // Helper to get ordinal suffix (1st, 2nd, 3rd, etc.)
  const getOrdinalSuffix = (i) => {
    const j = i % 10, k = i % 100;
    if (j === 1 && k !== 11) return "st";
    if (j === 2 && k !== 12) return "nd";
    if (j === 3 && k !== 13) return "rd";
    return "th";
  };

  if (isLoading) return <div className={styles.agreementsContainer}><p>Loading agreement details...</p></div>;
  if (isError) return <div className={styles.agreementsContainer}><p>Error loading agreement details.</p></div>;
  if (!data) return null;

  return (
    <div className={styles.agreementsContainer}>
      {/* Agreements Header */}
      <div className={styles.headerRow}>
        <h4 className={styles.title}>Agreements</h4>
        <img src={dividerline} alt="divider" className={styles.dividerImage} />
      </div>

      {/* Agreements Info */}
      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <p className={styles.label}>Agreement Company</p>
          <p className={styles.value}>{data.agreementCompany || "N/A"}</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>Agreement Type</p>
          <p className={styles.valueBold}>{data.agreementType || "N/A"}</p>
        </div>
      </div>

      {/* Cheque Details Header */}
      {data.cheques && data.cheques.length > 0 && (
        <>
          <div className={`${styles.headerRow} ${styles.chequeHeader}`}>
            <h4 className={styles.title}>Cheque Details</h4>
            <img src={dividerline} alt="divider" className={styles.dividerImage} />
          </div>

          {data.cheques.map((cheque, index) => (
            <React.Fragment key={index}>
              <div className={styles.subSectionTitle}>
                {index + 1}<sup>{getOrdinalSuffix(index + 1)}</sup> Cheque
              </div>

              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <p className={styles.label}>Cheque No</p>
                  <p className={styles.value}>{cheque.chequeNo || "N/A"}</p>
                </div>

                <div className={styles.infoItem}>
                  <p className={styles.label}>Cheque Bank Name</p>
                  <p className={styles.value}>{cheque.chequeBank || "N/A"}</p>
                </div>

                <div className={styles.infoItem}>
                  <p className={styles.label}>Cheque Bank IFSC Code</p>
                  <p className={styles.valueBold}>{cheque.ifscCode || "N/A"}</p>
                </div>

                <div className={styles.infoItem}>
                  <p className={styles.label}>Cheque Document File</p>
                  <div className={styles.icons}>
                    <img src={pdficon} alt="PDF" className={styles.pdfImage} />
                    <img src={downloadicon} alt="Download" className={styles.downloadImage} />
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
};

export default AgreementsDetails;