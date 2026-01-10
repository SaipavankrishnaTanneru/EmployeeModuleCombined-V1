import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * Custom hook to fetch employee qualification details
 * @param {string} employeeId - The employee ID (e.g., "HYD1111787")
 * @returns {object} React Query result with qualifications array
 */
export const useEmployeeQualifications = (employeeId) => {
    return useQuery({
        queryKey: ["employeeQualifications", employeeId],

        queryFn: async () => {
            const response = await axios.get(
                `http://localhost:8080/empDetails/HR/qualifications/${employeeId}`
            );
            return response.data; // Returns array of qualifications
        },

        // Only fetch when employeeId is valid
        enabled: employeeId !== undefined && employeeId !== null,

        retry: false,
    });
};
