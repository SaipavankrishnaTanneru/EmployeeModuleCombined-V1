// AccordianContainer.jsx
import { useState } from "react";
import styles from "./GeneralInformationContainer.module.css";
// import PreviousMedicalRecordAccordian from "../../components/accordians/FamilyMembersIn Organization";
import generalInformationIcon from '../../../assets/Employee_asserts/RightSideInformation Icons/General Information.svg';
import bottomdecoration from '../../../assets/Employee_asserts/RightSideInformation Icons/endline.svg';
import BankDetails from "../../../components/Employee_components/EmployeeOverViewScreens/BankInfoComponent/BankDetailsAccordian";
import ReferenceBy from "../../../components/Employee_components/EmployeeOverViewScreens/BankInfoComponent/ReferenceByAccordian";

import { useEmployeeReferenceBy } from "../../../queries/Employee_queries/OverViewsScreens/ReferenceBy";

const BankGeneralInfoContainer = ({ employeeId }) => {
  const [expanded, setExpanded] = useState(null);
  const { data: referenceData, isLoading, isError } = useEmployeeReferenceBy(employeeId);

  return (
    <div className={styles.accordian_container}>
      <figure>
        <img src={generalInformationIcon} alt="Accordion header" />
        <p className={styles.accordian_header_text}>General Information</p>
      </figure>

      <div className={styles.bankaccordians}>
        <BankDetails
          expanded={expanded === "bankDetails"}
          onChange={(e, isOpen) => setExpanded(isOpen ? "bankDetails" : null)}
        />

        <ReferenceBy
          expanded={expanded === "referenceBy"}
          onChange={(e, isOpen) => setExpanded(isOpen ? "referenceBy" : null)}
          referenceData={referenceData}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
      <figure className={styles.bottom_decoration}>
        <img src={bottomdecoration} alt="Bottom Decoration" />
      </figure>
    </div>
  );
};

export default BankGeneralInfoContainer;