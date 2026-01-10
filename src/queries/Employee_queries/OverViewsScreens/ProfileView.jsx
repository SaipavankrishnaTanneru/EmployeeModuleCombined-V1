import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// API Call: http://localhost:8080/empDetails/HR/EmpProfileView/{employeeId}

export const useEmployeeProfileView = (employeeId) =>
  useQuery({
    queryKey: ["employeeProfileView", employeeId],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:8080/empDetails/HR/EmpProfileView/${employeeId}`
      );
      return data;
    },
    // Only run the query if employeeId exists
    enabled: !!employeeId,
    retry: false,
  });