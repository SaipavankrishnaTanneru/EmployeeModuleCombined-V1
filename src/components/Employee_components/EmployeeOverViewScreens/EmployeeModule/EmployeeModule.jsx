import Styles from "../EmployeeModule/EmployeeModule.module.css";
import EmployeeBasicInfoContainer from "../../../../containers/Employee_containers/EmployeeBasicInfoContainer/EmployeeBasicInfoContainer";
import RightInformation from "../EmployeeRightInformation/EmployeeRightInformation";


const EmployeModule = () => {
    return (
        <div className={Styles.container}>
            <EmployeeBasicInfoContainer />
            <RightInformation />
        </div>
    );
}
export default EmployeModule;