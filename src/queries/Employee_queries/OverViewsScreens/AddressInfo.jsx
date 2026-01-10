import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * Custom hook to fetch employee address information
 * @param {string} employeeId - The employee ID (e.g., "HYD1111787")
 * @returns {object} React Query result with address data (PERM and CURR arrays)
 */
export const useEmployeeAddressInfo = (employeeId) => {
  return useQuery({
    queryKey: ["employeeAddressInfo", employeeId],

    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:8080/empDetails/HR/AddressDetl/${employeeId}`
      );
      return response.data; // Returns { PERM: [...], CURR: [...] }
    },

    // Only fetch when employeeId is valid
    enabled: employeeId !== undefined && employeeId !== null,

    retry: false,
  });
};
