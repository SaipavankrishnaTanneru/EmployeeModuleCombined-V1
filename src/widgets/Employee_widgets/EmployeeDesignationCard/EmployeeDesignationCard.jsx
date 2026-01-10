// import React from "react";
// import styles from "./EmployeeDesignationCard.module.css";
// import CallIcon from "../../assets/campusFlowIcons/callIcon.svg";
// import MailIcon from "../../assets/campusFlowIcons/SmsIcon.svg";

// const EmployeeDesignationCard = ({
//   image,
//   employeeId,
//   name,
//   gender,
//   age,
//   designation,
//   designationIcon,
//   subject,
//   onCall,
//   onMail,
// }) => {
//   return (
//     <div className={styles.card}>
//       {/* Top */}
//       <div className={styles.top}>
//         <img src={image} alt={name} className={styles.avatar} />

//         <div className={styles.info}>
//           <div className={styles.empId}>
//             <span>Employee ID:<br></br></span>
//             <strong>{employeeId}</strong>
//           </div>

//           <div className={styles.name}>{name}</div>

//           <div className={styles.meta}>
//             <span className={styles.genderIcon}>
//               {gender === "Male" ? "♂" : "♀"}
//             </span>
//             <span>{gender}</span>
//             <span className={styles.dot}>•</span>
//             <span>{age} Yrs</span>
//           </div>
//         </div>
//       </div>

//       <div className={styles.divider} />

//       {/* Bottom */}
//       <div className={styles.bottom}>
//         <div className={styles.badges}>
//           {/* Always show designation */}
//           <span className={styles.designation}>
//             {designationIcon && (
//               <img
//                 src={designationIcon}
//                 alt={designation}
//                 className={styles.designationIcon}
//               />
//             )}
//             {designation}
//           </span>
//           {/* Show subject only if it exists */}
//           {subject && (
//             <span className={styles.subject}>{subject}</span>
//           )}
//         </div>

//         <div className={styles.actions}>
//           <button onClick={onCall} className={styles.iconBtn}>
//             <img src={CallIcon} alt="Call" />
//           </button>

//           <button onClick={onMail} className={styles.iconBtn}>
//             <img src={MailIcon} alt="Mail" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default EmployeeDesignationCard;


import React from "react";
import styles from "./EmployeeDesignationCard.module.css";

import CallIcon from "../../../assets/Employee_asserts/campusFlowIcons/callIcon.svg";
import MailIcon from "../../../assets/Employee_asserts/campusFlowIcons/SmsIcon.svg";

import callIconOutLine from "../../../assets/Employee_asserts/RightSideInformation Icons/callIconOutLine.svg";
import mailIconOutline from "../../../assets/Employee_asserts/RightSideInformation Icons/MailIconOutLine.svg";
import maleicon from "../../../assets/Employee_asserts/campusFlowIcons/maleicon.svg";
import femaleicon from "../../../assets/Employee_asserts/campusFlowIcons/femaleicon.svg";

import { Tooltip } from "@mui/material";

const EmployeeDesignationCard = ({
  image,
  employeeId,
  name,
  gender,
  age,
  designation,
  designationIcon,
  subject,
  phoneNumber,
  email,
  onCall,
  onMail,
  borderColor,
}) => {
  return (
    <div
      className={styles.card}
      style={{ borderRight: `7px solid ${borderColor}` }} // ✅ HERE
    >
      {/* TOP */}
      <div className={styles.top}>
        <img src={image} alt={name} className={styles.avatar} />

        <div className={styles.info}>
          <div className={styles.empId}>
            <span>
              Employee ID:
              <br />
            </span>
            <strong>{employeeId}</strong>
          </div>

          <div className={styles.name}>{name}</div>

          <div className={styles.meta}>
            <span className={styles.genderIcon}>
              {gender === "Male" ? <img src={maleicon} alt="Male" /> : <img src={femaleicon} alt="Female" /> }
            </span>
            <span>{gender}</span>

            {age && (
              <>
                <span className={styles.dot}>•</span>
                <span>{age} Yrs</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      {/* BOTTOM */}
      <div className={styles.bottom}>
        <div className={styles.badges}>
          <span className={styles.designation}>
            {designationIcon && (
              <img
                src={designationIcon}
                alt={designation}
                className={styles.designationIcon}
              />
            )}
            {designation}
          </span>

          {subject && <span className={styles.subject}>{subject}</span>}
        </div>

<div className={styles.actions}>
  {/* PHONE TOOLTIP (FIRST) */}
  <Tooltip
    title={
      phoneNumber ? (
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <img
            src={callIconOutLine}
            alt="Phone"
            style={{ width: "14px", height: "14px" }}
          />
          <span>{phoneNumber}</span>
        </div>
      ) : (
        "No number available"
      )
    }
    arrow
    placement="top"
    componentsProps={{
      tooltip: {
        sx: {
          backgroundColor: "#FFF",
          color: "#3425FF",
          fontSize: "0.75rem",
          fontWeight: 500,
          padding: "6px 10px",
          borderRadius: "6px",
          border: "1px solid #3425FF",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
        },
      },
      arrow: {
        sx: {
          color: "#FFF",
          "&::before": {
            border: "1px solid #3425FF",
          },
        },
      },
    }}
  >
    <figure
      onClick={onCall}
      style={{ cursor: phoneNumber ? "pointer" : "default" }}
    >
      <img src={CallIcon} alt="Call" />
    </figure>
  </Tooltip>

  {/* EMAIL TOOLTIP (SECOND) */}
  <Tooltip
    title={
      email ? (
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <img
            src={mailIconOutline}
            alt="email"
            style={{ width: "14px", height: "14px" }}
          />
          <span>{email}</span>
        </div>
      ) : (
        "No email available"
      )
    }
    arrow
    placement="top"
    componentsProps={{
      tooltip: {
        sx: {
          backgroundColor: "#FFF",
          color: "#3425FF",
          fontSize: "0.75rem",
          fontWeight: 500,
          padding: "6px 10px",
          borderRadius: "6px",
          border: "1px solid #3425FF",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
        },
      },
      arrow: {
        sx: {
          color: "#FFF",
          "&::before": {
            border: "1px solid #3425FF",
          },
        },
      },
    }}
  >
    <figure
      onClick={onMail}
      style={{ cursor: email ? "pointer" : "default" }}
    >
      <img src={MailIcon} alt="Mail" />
    </figure>
  </Tooltip>
</div>

      </div>
    </div>
  );
};

export default EmployeeDesignationCard;