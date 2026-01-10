import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useEmployeeAgreementDetails = (employeeId) => {
    return useQuery({
        queryKey: ["employeeAgreementDetails", employeeId],
        queryFn: async () => {
            const response = await axios.get(
                `http://localhost:8080/empDetails/HR/AgreementDetails/${employeeId}`
            );
            return response.data;
        },
        enabled: !!employeeId,
        retry: false,
    });
};
