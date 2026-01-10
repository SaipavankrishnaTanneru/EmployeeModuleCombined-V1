// AccordianContainer.jsx
import { useState } from "react";
import styles from "./GeneralInfo.module.css";

import PresentAddress from "../../../components/Employee_components/EmployeeOverViewScreens/FamilyAddressInfoComponets/accordiansFamily&Address/PresentAddress";
import PermanentAddress from "../../../components/Employee_components/EmployeeOverViewScreens/FamilyAddressInfoComponets/accordiansFamily&Address/PermanentAddress";
import FamilyInfoAccordion from "../../../components/Employee_components/EmployeeOverViewScreens/FamilyAddressInfoComponets/accordiansFamily&Address/FamilyInfoAccordion";

import { useEmployeeAddressInfo } from "../../../queries/Employee_queries/OverViewsScreens/AddressInfo";
import { useEmployeeFamilyDetails } from "../../../queries/Employee_queries/OverViewsScreens/FamilyDetails";

const MainInfo = ({ employeeId }) => {
  const [expanded, setExpanded] = useState(null);

  // Fetch address data using the API hook
  const { data, isLoading, isError } = useEmployeeAddressInfo(employeeId);

  // Fetch family details using the API hook
  const { data: familyData, isLoading: familyLoading, isError: familyError } = useEmployeeFamilyDetails(employeeId);

  // Transform API data to component props format
  const transformAddressData = (addressArray) => {
    if (!addressArray || addressArray.length === 0) return null;

    const addr = addressArray[0]; // Get first item from array
    return {
      addressData: {
        name: addr.name || "N/A",
        address: `${addr.houseNo || ""}${addr.landmark ? ", " + addr.landmark : ""}`.trim() || "N/A",
        pin: addr.postalCode || "N/A",
        city: addr.cityName || "N/A",
        state: addr.stateName || "N/A",
        country: addr.countryName || "N/A",
      },
      emergencyContact: {
        contactName: addr.contactName || "N/A",
        relationship: addr.relationship || "N/A",
        phoneNumber: addr.emrg_contact_no ? `+91 ${addr.emrg_contact_no}` : "N/A",
      }
    };
  };

  // Extract and transform CURR and PERM data
  const presentAddressData = data?.CURR ? transformAddressData(data.CURR) : null;
  const permanentAddressData = data?.PERM ? transformAddressData(data.PERM) : null;

  // Handle loading state
  if (isLoading) {
    return (
      <div className={styles.accordian_container}>
        <div className={styles.accordians}>
          <p>Loading address information...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className={styles.accordian_container}>
        <div className={styles.accordians}>
          <p>Error loading address information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.accordian_container}>
      <div className={styles.accordians}>
        {/* Only show Present Address if CURR data exists */}
        {data?.CURR && data.CURR.length > 0 && (
          <PresentAddress
            expanded={expanded === "presentAddress"}
            onChange={(e, isOpen) => setExpanded(isOpen ? "presentAddress" : null)}
            addressData={presentAddressData?.addressData}
            emergencyContact={presentAddressData?.emergencyContact}
          />
        )}

        {/* Only show Permanent Address if PERM data exists */}
        {data?.PERM && data.PERM.length > 0 && (
          <PermanentAddress
            expanded={expanded === "permanentAddress"}
            onChange={(e, isOpen) => setExpanded(isOpen ? "permanentAddress" : null)}
            addressData={permanentAddressData?.addressData}
            emergencyContact={permanentAddressData?.emergencyContact}
          />
        )}

        <FamilyInfoAccordion
          expanded={expanded === "familyInfo"}
          onChange={(e, isOpen) => setExpanded(isOpen ? "familyInfo" : null)}
          familyMembers={familyData}
          isLoading={familyLoading}
          isError={familyError}
        />
      </div>
    </div>
  );
};

export default MainInfo;