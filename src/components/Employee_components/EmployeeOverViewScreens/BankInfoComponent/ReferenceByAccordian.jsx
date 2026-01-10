import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Chip,
} from "@mui/material";

import { ReactComponent as ExpandIcon } from "../../../../assets/Employee_asserts/Family/expandIcon.svg";
import styles from "./ReferenceByAccordian.module.css";
import accordionheadericon from "../../../../assets/Employee_asserts/Family/accordionheadericon.svg";
import EmployeeDetailsCard from '../../../../widgets/Employee_widgets/EmployeeDetailsCard/EmployeeDetailsCard';
import rightDividerIcon from "../../../../assets/Employee_asserts/Family/dividerRightImg.svg";
import leftDividerIcon from "../../../../assets/Employee_asserts/Family/dividerLeftImg.svg";
import profileIcon from "../../../../assets/Employee_asserts/Family/profile.svg";



const ReferenceBy = ({ expanded, onChange, referenceData, isLoading, isError }) => {
  // Show loading/error states instead of hiding
  if (isLoading) return <p style={{ padding: '16px' }}>Loading reference details...</p>;
  if (isError) return <p style={{ padding: '16px' }}>Error loading reference details.</p>;

  return (
    <Accordion
      expanded={expanded}
      onChange={onChange}
      sx={{
        "& .MuiAccordionDetails-root ": { padding: "0px 16px 16px" },
        "&&": {
          "--Paper-shadow": "none",
          boxShadow: "none",
          borderRadius: "10px",
          border: "1px solid #E6E4F0",
          background: "rgba(255, 255, 255, 0.40)",
          backdropFilter: "blur(9.1px)",
          boxShadow:
            "0 8px 16px 0 rgba(0, 0, 0, 0.14), 0 0 2px 0 rgba(0, 0, 0, 0.12)",
        },
        "&::before": { display: "none" },
        "& .MuiButtonBase-root": {
          alignItems: "start",
          padding: "15px 18px",
          minHeight: "unset",
        },
        "&.Mui-expanded": {
          borderRadius: "10px",
          border: "1px solid #B4BCFF",
          background: "rgba(255, 255, 255, 0.30)",
          boxShadow:
            "0 8px 16px 0 rgba(0, 0, 0, 0.14), 0 0 2px 0 rgba(0, 0, 0, 0.12)",
          backdropFilter: "blur(9.1px)",
          margin: "0px",
        },

      }}
    >
      <AccordionSummary
        expandIcon={<ExpandIcon />}
        aria-controls="driver-content"
        id="driver-content"
        sx={{
          "& .MuiAccordionSummary-content": { margin: "0px !important", alignItems: "center", },
          "&.Mui-expanded .MuiAccordionSummary-content": {
            margin: "0px !important",
          },
        }}
      >
        <Typography component="span" sx={{ width: '100%' }}>
          <figure className={styles.header_figure}>
            <div className={styles.header_left}>
              <img src={accordionheadericon} alt="accordion icon" />
              <p className={styles.header_text}>
                Reference By
              </p>
            </div>
            <div className={styles.header_right}>
              {!expanded && referenceData && (
                <Chip
                  label="+1 member"
                  size="small"
                  sx={{
                    marginLeft: 1,
                    backgroundColor: "#E8E6FF",
                    color: "#3425FF",
                    border: "1px solid #3425FF",
                    fontSize: "0.75rem",
                    height: "28px",
                    borderRadius: "16px",
                    "& .MuiChip-label": {
                      paddingLeft: "8px",
                      paddingRight: "8px",
                    },
                  }}
                />
              )}
            </div>
          </figure>
        </Typography>
      </AccordionSummary>
      <AccordionDetails id="driver-content">
        <Typography component="div" className="divider_content">
          <div className={styles.driver_cards_wrapper}>
            {referenceData ? (
              <div className={styles.driver_cards}>
                <EmployeeDetailsCard
                  name={referenceData.name || "N/A"}
                  emp_id={referenceData.payrollId ? `EMP ID:${referenceData.payrollId}` : "N/A"}
                  leftDividerIcon={leftDividerIcon}
                  rightDividerIcon={rightDividerIcon}
                  profileIcon={profileIcon}
                  titleLable={"Employee Name"}
                  role={referenceData.designation || "N/A"}
                  phoneNumber={referenceData.contactNo || "N/A"}
                  email={referenceData.email || "N/A"}
                  dividerColor="#3425ff"
                />
              </div>
            ) : (
              <p style={{ textAlign: 'center', padding: '10px', color: '#666' }}>No reference details available.</p>
            )}
          </div>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default ReferenceBy;