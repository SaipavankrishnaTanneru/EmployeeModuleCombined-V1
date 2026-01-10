import axios from "axios";

/**
 * Reusable employee search API
 * Accepts:
 *  - { payrollId }
 *  - { cityId, employeeTypeId, campusId }
 */
export const searchEmployee = (params) => {
  return axios.get(
    "http://localhost:8080/api/employee/search/list",
    { params }
  );
};