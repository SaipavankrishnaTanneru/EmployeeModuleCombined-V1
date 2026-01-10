import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// API: http://localhost:8080/empDetails/HR/current-info/{employeeId}
export const useEmployeeCurrentInfo = (employeeId) => {
  return useQuery({
    queryKey: ["employeeCurrentInfo", employeeId],

    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:8080/empDetails/HR/current-info/${employeeId}`
      );
      return response.data; // ✅ correct
    },

    // ✅ IMPORTANT FIX: allow valid ID only
    enabled: employeeId !== undefined && employeeId !== null,

    retry: false,
  });
};
