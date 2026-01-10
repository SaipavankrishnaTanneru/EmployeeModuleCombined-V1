import EmployeeImage from "../../../components/Employee_components/EmployeeOverViewScreens/EmployeeProfileComponet/EmployeeImage";
import EmployeeProfileMiddle from "../../../components/Employee_components/EmployeeOverViewScreens/EmployeeProfileComponet/EmployeeProfileMiddle";
import EmployeeViewButton from "../../../components/Employee_components/EmployeeOverViewScreens/EmployeeProfileComponet/EmployeeViewButton";
import Styles from "../EmployeeProfileContainer/EmployeeProfileContainer.module.css";

import { useParams } from "react-router-dom"; // 1. Import useParams to get ID from URL
import { useEmployeeProfileView } from "../../../queries/Employee_queries/OverViewsScreens/ProfileView"; 


const EmployeeProfileContainer = () => {
    // 2. Get the 'employeeId' automatically from your URL
    // This assumes your Route is set up like: path="/view-profile/:employeeId"
    const { employeeId } = useParams(); 

    // 3. Pass the dynamic 'employeeId' to your API hook
    const { data, isLoading, isError } = useEmployeeProfileView(employeeId);

    // 4. Handle Loading and Error states
    if (isLoading) {
        return <div className={Styles.emp_profile_container}>Loading Profile...</div>;
    }

    if (isError) {
        return <div className={Styles.emp_profile_container}>Error loading profile data.</div>;
    }

    return (
        <div className={Styles.emp_profile_container}>
            {/* 5. Pass the fetched 'data' down to the child components */}
            <EmployeeImage data={data} />
            <EmployeeProfileMiddle data={data} />
            <EmployeeViewButton /> 
        </div>
    );
};

export default EmployeeProfileContainer;