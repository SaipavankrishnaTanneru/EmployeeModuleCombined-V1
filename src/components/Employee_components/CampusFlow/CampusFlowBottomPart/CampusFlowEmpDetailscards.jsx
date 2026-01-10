import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "../CampusFlowBottomPart/CampusFlowEmpDetailsCard.module.css";

import rightDividerIcon from "../../../../assets/Employee_asserts/Family/dividerRightImg.svg";
import leftDividerIcon from "../../../../assets/Employee_asserts/Family/dividerLeftImg.svg";
import profileIcon from "../../../../assets/Employee_asserts/Family/profile.svg";
import EmployeeDetailsCard from "../../../../widgets/Employee_widgets/EmployeeDetailsCard/EmployeeDetailsCard";


import { campusFlowApi } from "../../../../queries/Employee_queries/campusflow/campusflow";
import noemployeeicon from "../../../../assets/Employee_asserts/campusFlowIcons/noemployeeicon.svg";

/* 🔹 PAGINATION CONFIG */
const PAGE_SIZE = 8;

const CampusFlowBioDataCard = () => {
  const { department } = useParams();
  const location = useLocation();
  const campusId = location.state?.campusId || sessionStorage.getItem("campusId");

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

const departmentName =
  location.state?.departmentName || "This";


  useEffect(() => {
    if (!department || !campusId) return;

    const fetchEmployees = async () => {
      setLoading(true);
      setPage(1);
      try {
        const res = await campusFlowApi.getEmployeesByDepartment(department, campusId);
        setEmployees(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("❌ Employees API error", err);
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [department, campusId]);

  const totalEntries = employees.length;
  const totalPages = Math.ceil(totalEntries / PAGE_SIZE) || 1;

  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, totalEntries);

  const fromEntry = totalEntries === 0 ? 0 : startIndex + 1;
  const toEntry = endIndex;

  const pageData = employees.slice(startIndex, endIndex);

  const hasEmployees = totalEntries > 0;
  const showPagination = hasEmployees && !loading;

  const pageDisplay = `${fromEntry}-${toEntry} of ${totalPages}`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.cardGrid} aria-live="polite">
        {loading ? (
          Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={`skeleton-${i}`} className={styles.skeletonCard} />
          ))
        ) : pageData.length === 0 && !loading ? (
          <div className={styles.noData}>
    <div className={styles.noDataIllustration}>
      <img 
        src={noemployeeicon} 
        alt={`No employees in ${departmentName} department`} 
      />
    </div>

    <div className={styles.noDataText}>
      <div className={styles.noDataLine}>No Employees found in</div>
      <div className={styles.departmentHighlight}>
        {departmentName}
      </div>
    </div>
  </div>
        ) : (
          pageData.map((emp) => (
            <EmployeeDetailsCard
              key={emp.empId}
              titleLable="Employee Name"
              name={emp.empName || "—"}
              emp_id={`EMP ID: ${emp.empId || "—"}`}
              role={emp.designationName || "—"}
              profileIcon={profileIcon}
              leftDividerIcon={leftDividerIcon}
              rightDividerIcon={rightDividerIcon}
              phoneNumber={emp.mobileNo}
              email={emp.email}
            />
          ))
        )}
      </div>

      {/* Pagination - only shown when there are employees */}
      {showPagination && (
        <div className={styles.footer}>
          <span className={styles.entryInfo}>
            Showing <strong>{fromEntry}</strong> to <strong>{toEntry}</strong> of{" "}
            <strong>{totalEntries}</strong> Entries
          </span>

          <div className={styles.paginationContainer}>
            <span className={styles.pageInfo}>{pageDisplay}</span>

            <div className={styles.pagination}>
              <button
                className={styles.prev}
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
              >
                Prev
              </button>
              <button
                className={styles.next}
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampusFlowBioDataCard;