import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * Custom hook to fetch employee family details
 * @param {string} employeeId - The employee ID (e.g., "HYD1111787")
 * @returns {object} React Query result with family details array
 */
export const useEmployeeFamilyDetails = (employeeId) => {
    return useQuery({
        queryKey: ["employeeFamilyDetails", employeeId],

        queryFn: async () => {
            const response = await axios.get(
                `http://localhost:8080/empDetails/HR/FamilyDetails/by-payroll/${employeeId}`
            );
            return response.data; // Returns array of family members
        },

        // Only fetch when employeeId is valid
        enabled: employeeId !== undefined && employeeId !== null,

        retry: false,
    });
};
