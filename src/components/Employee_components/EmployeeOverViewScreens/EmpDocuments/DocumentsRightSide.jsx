import { useState } from "react";
import styles from "./DocumentsRightSide.module.css";
import rightSideIcon from '../../../../assets/Employee_asserts/EmployeeQu/rightsideheadingicon.svg';
import rightSideBottomIcon from '../../../../assets/Employee_asserts/EmployeeQu/rightSideBottomIcon.svg';
import ReferenceDetailsDocuments from "./ReferencedBy";
import PendingDocuments from "./PendingDocuments";
import { useEmployeeReferenceBy } from "../../../../queries/Employee_queries/OverViewsScreens/ReferenceBy";

const DocumentsRightSide = ({ employeeId }) => {
  const [expandedPending, setExpandedPending] = useState(false);
  const [expandedReference, setExpandedReference] = useState(false);
  const { data: referenceData, isLoading, isError } = useEmployeeReferenceBy(employeeId);

  const handlePendingChange = (event, isExpanded) => {
    setExpandedPending(isExpanded);
  };

  const handleReferenceChange = (event, isExpanded) => {
    setExpandedReference(isExpanded);
  };

  return (
    <>
      <div className={styles.rightSideTop}>
        <img src={rightSideIcon} alt="right_side_icon" />
        <p className={styles.rightSideHeading}>General Information</p>
      </div>

      <div className={styles.documentsAcardions}>
        {/* ✅ Pending Documents (controlled) */}
        <PendingDocuments
          expanded={expandedPending}
          onChange={handlePendingChange}
        />

        {/* ✅ Reference Details (controlled) */}
        <ReferenceDetailsDocuments
          expanded={expandedReference}
          onChange={handleReferenceChange}
          referenceData={referenceData}
          isLoading={isLoading}
          isError={isError}
        />
      </div>

      <div className={styles.documentsAcardions}>
        <img
          src={rightSideBottomIcon}
          alt="right_side_bottom_icon"
        />
      </div>
    </>
  );
};

export default DocumentsRightSide;
