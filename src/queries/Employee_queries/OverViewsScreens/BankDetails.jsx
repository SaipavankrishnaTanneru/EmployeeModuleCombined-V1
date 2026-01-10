import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useEmployeeBankDetails = (employeeId) => {
    return useQuery({
        queryKey: ["employeeBankDetails", employeeId],
        queryFn: async () => {
            const response = await axios.get(
                `http://localhost:8080/empDetails/HR/BankDetails/${employeeId}`
            );
            return response.data;
        },
        enabled: !!employeeId,
        retry: false,
    });
};
