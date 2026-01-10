import { useQuery } from "@tanstack/react-query"; // ✅ REQUIRED
import axios from "axios"; // ✅ REQUIRED




export const useEmployeeBasicInfo = (payrollId) =>
  useQuery({
    queryKey: ["employeeBasicInfo", payrollId],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:8080/empDetails/HR/basicInfo/${payrollId}`
      );
      return data;
    },
    enabled: !!payrollId,
    retry: false,
  });
