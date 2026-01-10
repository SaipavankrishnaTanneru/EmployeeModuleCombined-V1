import Styles from "../EmployeeBasicInfoContainer/EmployeeBasicInfoContainer.module.css";
import { useParams } from "react-router-dom";
import BasicInfoHeader from "../../../components/Employee_components/EmployeeOverViewScreens/EmployeeBasicInformation/EmployeeBasicInfoHeader";
import EmployeeBasicInfoContent from "../../../components/Employee_components/EmployeeOverViewScreens/EmployeeBasicInformation/EmployeeBasicInfoContent";
import EmployeeCurrentInfo from "../../../components/Employee_components/EmployeeOverViewScreens/EmployeeBasicInformation/EmployeeCurrentInfo";

const EmployeeBasicInfoContainer = () => {
  const { employeeId } = useParams();

  return (
    <div className={Styles.container}>
      <BasicInfoHeader />
      <div className={Styles.content}>
        <EmployeeBasicInfoContent employeeId={employeeId} />
        <EmployeeCurrentInfo employeeId={employeeId} />
      </div>
    </div>
  );
};

export default EmployeeBasicInfoContainer;
