// AccordianContainer.jsx
import { useState } from "react";
import styles from "./GeneralInfo.module.css";
import FamilyMembersInOrganization from "../../../components/Employee_components/EmployeeOverViewScreens/FamilyAddressInfoComponets/accordiansFamily&Address/FamilyMembersIn Organization";
// import PreviousMedicalRecordAccordian from "../../components/accordians/FamilyMembersIn Organization";
import generalInformationIcon from "../../../assets/Employee_asserts/RightSideInformation Icons/General Information.svg";
import bottomdecoration from '../../../assets/Employee_asserts/RightSideInformation Icons/endline.svg'
import ReferenceDetails from "../../../components/Employee_components/EmployeeOverViewScreens/FamilyAddressInfoComponets/accordiansFamily&Address/Referencedetails";
import FamilyDetails from "../../../components/Employee_components/EmployeeOverViewScreens/FamilyAddressInfoComponets/accordiansFamily&Address/FamilyDetails";

import { useEmployeeFamilyDetails } from "../../../queries/Employee_queries/OverViewsScreens/FamilyDetails";
import { useEmployeeReferenceBy } from "../../../queries/Employee_queries/OverViewsScreens/ReferenceBy";
import { useFamilyMembersInOrg } from "../../../queries/Employee_queries/OverViewsScreens/FamilyMembersInOrg";

const GeneralInfoContainer = ({ employeeId }) => {
  const [expanded, setExpanded] = useState(null);

  // Fetch details using API hooks
  const { data: familyData, isLoading: isFamilyLoading, isError: isFamilyError } = useEmployeeFamilyDetails(employeeId);
  const { data: referenceData, isLoading: isRefLoading, isError: isRefError } = useEmployeeReferenceBy(employeeId);
  const { data: familyInOrgData, isLoading: isOrgLoading, isError: isOrgError } = useFamilyMembersInOrg(employeeId);

  return (
    <div className={styles.accordian_container}>
      <figure>
        <img src={generalInformationIcon} alt="Accordion header" />
        <p className={styles.accordian_header_text}>General Information</p>
      </figure>

      <div className={styles.accordians}>
        <FamilyDetails
          expanded={expanded === "familyDetails"}
          onChange={(e, isOpen) => setExpanded(isOpen ? "familyDetails" : null)}
          familyMembers={familyData}
          isLoading={isFamilyLoading}
          isError={isFamilyError}
        />

        <FamilyMembersInOrganization
          expanded={expanded === "lastvisited"}
          onChange={(e, isOpen) => setExpanded(isOpen ? "lastvisited" : null)}
          familyMembers={familyInOrgData}
          isLoading={isOrgLoading}
          isError={isOrgError}
        />
        <ReferenceDetails
          expanded={expanded === "previousrecord"}
          onChange={(e, isOpen) => setExpanded(isOpen ? "previousrecord" : null)}
          referenceData={referenceData}
          isLoading={isRefLoading}
          isError={isRefError}
        />

      </div>
      <figure className={styles.bottom_decoration}>
        <img src={bottomdecoration} alt="Bottom Decoration" />
      </figure>
    </div>
  );
};

export default GeneralInfoContainer;