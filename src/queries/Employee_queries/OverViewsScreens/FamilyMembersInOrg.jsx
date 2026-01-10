import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFamilyMembersInOrg = (employeeId) => {
    return useQuery({
        queryKey: ["familyMembersInOrg", employeeId],
        queryFn: async () => {
            const response = await axios.get(
                `http://localhost:8080/empDetails/HR/family-members-in-org/${employeeId}`
            );
            return response.data;
        },
        enabled: !!employeeId,
        retry: false,
    });
};
