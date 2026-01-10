import EmpQualificationDetails from "../../../components/Employee_components/EmployeeOverViewScreens/EmpQualificationDetails/EmpQualificationDetails"
import EmployeeQualificationRightside from "../../../components/Employee_components/EmployeeOverViewScreens/EmployeeQualificationDetails/EmployeeQualificationRightside";
import styles from "../EmployeeQualificationDetails/EmployeeQualificationDetailsContainer.module.css";
const EmployeeQualificationDetailsContainer = ({ employeeId }) => {
    return (
        <div className={styles.EmployeeQualificationDetailsContainer}>
            <EmpQualificationDetails employeeId={employeeId} />
            <EmployeeQualificationRightside employeeId={employeeId} />

        </div>
    );
};
export default EmployeeQualificationDetailsContainer;