import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * Custom hook to fetch employee salary details
 * @param {string} employeeId - The employee ID (e.g., "HYD1111790")
 * @returns {object} React Query result with salary info
 */
export const useEmployeeSalaryDetails = (employeeId) => {
    return useQuery({
        queryKey: ["employeeSalaryDetails", employeeId],
        queryFn: async () => {
            const response = await axios.get(
                `http://localhost:8080/empDetails/HR/salary-info/${employeeId}`
            );
            return response.data;
        },
        enabled: !!employeeId,
        retry: false,
    });
};
