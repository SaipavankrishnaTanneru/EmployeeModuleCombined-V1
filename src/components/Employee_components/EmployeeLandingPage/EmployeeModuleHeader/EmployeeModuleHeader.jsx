import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeModuleHeaderIcon from "../EmployeeModuleHeaderIcon/EmployeeModuleHeaderIcon";
import styles from "./EmployeeModuleHeader.module.css";
import blueLine from "../../../../assets/Employee_asserts/application-analytics/blue_arrow_line.png";

import Searchbox from "../../Searchbox/Searchbox";
import EmployeeFilter from "../EmployeeFilter/EmployeeFilter";

const SearchIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <path
      d="M7.79 13.46c3.13 0 5.67-2.54 5.67-5.67 0-3.13-2.54-5.67-5.67-5.67-3.13 0-5.67 2.54-5.67 5.67 0 3.13 2.54 5.67 5.67 5.67z"
      stroke="#0A0A0A"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.87 14.88l-3.05-3.05"
      stroke="#0A0A0A"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EmployeeModuleHeader = ({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
  onFilterSearch,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

  // 🔑 EMP ID SEARCH → CLOSE FILTER
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearchSubmit) {
      onSearchSubmit();
      setIsFilterOpen(false); // ✅ CLOSE FILTER
    }
  };

  // Close filter on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isFilterOpen]);

  return (
    <>
      {/* BLUR OVERLAY */}
      {isFilterOpen && (
        <div
          className={styles.blurOverlay}
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* HEADER */}
      <div className={styles.search_header_wrapper}>
        <div className={styles.headerTop}>
          <EmployeeModuleHeaderIcon height="54" width="54" />

          <div className={styles.application_header_text}>
            <h2 className={styles.application_search_header}>
              Employee Module
            </h2>
            <p className={styles.application_sub_text}>
              Access and manage employee onboarding, status, and comprehensive
              details seamlessly.
            </p>
          </div>
        </div>

        <figure className={styles.blueLine}>
          <img src={blueLine} alt="decorative line" />
        </figure>

        {/* SEARCH */}
        <div
          className={styles.searchContainer}
          onClick={(e) => {
            // ✅ Open filter ONLY if search box is empty
            if (!searchTerm) {
              e.stopPropagation();
              setIsFilterOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
        >
          <Searchbox
            icon={<SearchIcon />}
            placeholderText="Search with employee code, full name"
            onValueChange={(val) => {
              onSearchChange(val);
              setIsFilterOpen(false); // ✅ typing closes filter
            }}
            value={searchTerm}
          />
        </div>
      </div>

      {/* FILTER */}
      {isFilterOpen && (
        <div
          ref={filterRef}
          className={styles.filterWrapper}
          onClick={(e) => e.stopPropagation()}
        >
          <EmployeeFilter
            onSearch={(filters) => {
              setIsFilterOpen(false); // ✅ CLOSE AFTER FILTER SEARCH
              onFilterSearch(filters);
            }}
          />
        </div>
      )}
    </>
  );
};

export default EmployeeModuleHeader;