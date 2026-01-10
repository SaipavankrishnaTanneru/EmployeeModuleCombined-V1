import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import { ReactComponent as ExpandIcon } from "../../../../../assets/Employee_asserts/Family/expandIcon.svg";
import styles from "./FamilyDetails.module.css";
import accordionheadericon from "../../../../../assets/Employee_asserts/Family/accordionheadericon.svg";
import EmployeeDetailsCard from "../../../../../widgets/Employee_widgets/EmployeeDetailsCard/EmployeeDetailsCard";
import rightDividerIcon from "../../../../../assets/Employee_asserts/Family/dividerRightImg.svg";
import leftDividerIcon from "../../../../../assets/Employee_asserts/Family/dividerLeftImg.svg";
import profileIcon from "../../../../../assets/Employee_asserts/Family/profile.svg";

const FamilyDetails = ({ expanded, onChange, familyMembers = [], isLoading, isError }) => {
  // Calculate member count for the chip
  const memberCount = familyMembers?.length || 0;

  return (
    <div className={styles.family_container}>
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
            "& .MuiAccordionSummary-content": { margin: "0px !important" },
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
                  Family Members
                </p>
              </div>
              <div className={styles.header_right}>
                {!expanded && memberCount > 0 && (
                  <Chip
                    label={`+${memberCount} member${memberCount !== 1 ? 's' : ''}`}
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
            {isLoading && (
              <div style={{ padding: "20px", textAlign: "center" }}>
                Loading family details...
              </div>
            )}

            {isError && (
              <div style={{ padding: "20px", textAlign: "center", color: "#d32f2f" }}>
                Error loading family details.
              </div>
            )}

            {!isLoading && !isError && familyMembers && familyMembers.length > 0 && (
              <div className={styles.driver_cards_wrapper}>
                {familyMembers.map((member, index) => (
                  <div key={member.empFamilyDetlId || index} className={styles.driver_cards}>
                    <EmployeeDetailsCard
                      name={member.fullName || "N/A"}
                      emp_id={member.occupation || "N/A"}
                      leftDividerIcon={leftDividerIcon}
                      rightDividerIcon={rightDividerIcon}
                      profileIcon={profileIcon}
                      titleLable={"Full Name"}
                      role={member.relation || "N/A"}
                      phoneNumber={member.contactNumber ? `+91 ${member.contactNumber}` : "N/A"}
                      email={member.email || "N/A"}
                      dividerColor="#3EA9E3"
                    />
                  </div>
                ))}
              </div>
            )}

            {!isLoading && !isError && (!familyMembers || familyMembers.length === 0) && (
              <div style={{ padding: "20px", textAlign: "center" }}>
                No family members found.
              </div>
            )}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FamilyDetails;