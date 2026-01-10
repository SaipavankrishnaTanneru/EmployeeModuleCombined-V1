// components/EmployeeFilter/EmployeeFilter.js
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Dropdown from "../../../../widgets/Employee_widgets/Dropdown/Dropdown";
import styles from "./EmployeeFilter.module.css";


// 1. Fetch Cities
const useCities = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:9000/common/get/cities");
      return data;
    },
    refetchOnWindowFocus: false,
  });
};

// 2. Fetch Employee Types
const useEmployeeTypes = () => {
  return useQuery({
    queryKey: ["employeeTypes"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:8080/api/employeeModule/employee-type"
      );
      return data;
    },
    refetchOnWindowFocus: false,
  });
};

// 3. Fetch Campuses (depends on cityId)
const useCampuses = (cityId) => {
  return useQuery({
    queryKey: ["campuses", cityId],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/employeeModule/campuses/${cityId}`
      );
      return data;
    },
    enabled: !!cityId, // only call when cityId exists
    retry: false,
  });
};


/* ------------------- COMPONENT ------------------- */

const EmployeeFilter = ({ onSearch }) => {
  // UI VALUES (names)
  const [filters, setFilters] = useState({
    city: "",
    employeeType: "",
    campus: "",
  });

  // INTERNAL IDS (IMPORTANT)
  const [ids, setIds] = useState({
    cityId: null,
    employeeTypeId: null,
    campusId: null,
  });

  // --- Call Hooks ---
  const { data: citiesData = [] } = useCities();
  const { data: employeeTypesData = [] } = useEmployeeTypes();
  const { data: campusesData = [] } = useCampuses(ids.cityId);

  // --- Safe Name Mapping ---
  const getNames = (data, priorityKey) => {
    if (!Array.isArray(data)) return [];
    return data.map((item) =>
      item[priorityKey] ||
      item.name ||
      item.typeName ||
      item.value ||
      item.description ||
      item
    );
  };

  const cityNames = getNames(citiesData, "cityName");
  const typeNames = getNames(employeeTypesData, "typeName");
  const campusNames = getNames(campusesData, "campusName");

  // --- Handlers ---
  const handleDropdownChange = (e) => {
    const { name, value } = e.target;

    // update UI value
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    // CITY
    if (name === "city") {
      const cityObj = citiesData.find(
        (c) => (c.cityName || c.name) === value
      );

      setIds({
        cityId: cityObj?.id || null,
        employeeTypeId: null,
        campusId: null,
      });

      setFilters((prev) => ({
        ...prev,
        campus: "",
      }));
    }

    // EMPLOYEE TYPE
    if (name === "employeeType") {
      const typeObj = employeeTypesData.find(
        (t) => (t.typeName || t.name) === value
      );

      setIds((prev) => ({
        ...prev,
        employeeTypeId: typeObj?.id || null,
      }));
    }

    // CAMPUS
    if (name === "campus") {
      const campusObj = campusesData.find(
        (c) => (c.campusName || c.name) === value
      );

      setIds((prev) => ({
        ...prev,
        campusId: campusObj?.id || null,
      }));
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        cityId: ids.cityId,
        employeeTypeId: ids.employeeTypeId,
        campusId: ids.campusId,
      });
    }
  };

  return (
    <div className={styles.filterWrapper}>
      <h4 className={styles.title}>Filter</h4>

      {/* City */}
      <div className={styles.field}>
        <Dropdown
          dropdownname="City"
          name="city"
          results={cityNames}
          value={filters.city}
          onChange={handleDropdownChange}
        />
      </div>

      {/* Employee Type */}
      <div className={styles.field}>
        <Dropdown
          dropdownname="Employee Type"
          name="employeeType"
          results={typeNames}
          value={filters.employeeType}
          onChange={handleDropdownChange}
        />
      </div>

      {/* Campus */}
      <div className={styles.field}>
        <Dropdown
          dropdownname="Campus"
          name="campus"
          results={campusNames}
          value={filters.campus}
          onChange={handleDropdownChange}
        />
      </div>

      <button className={styles.searchBtn} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default EmployeeFilter;