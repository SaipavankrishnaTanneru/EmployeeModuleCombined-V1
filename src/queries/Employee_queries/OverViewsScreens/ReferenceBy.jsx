import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useEmployeeReferenceBy = (employeeId) => {
    return useQuery({
        queryKey: ["employeeReferenceBy", employeeId],
        queryFn: async () => {
            const response = await axios.get(
                `http://localhost:8080/empDetails/HR/reference/${employeeId}`
            );
            // The API returns a single object based on the user's snippet
            return response.data;
        },
        enabled: !!employeeId,
        retry: false,
    });
};
