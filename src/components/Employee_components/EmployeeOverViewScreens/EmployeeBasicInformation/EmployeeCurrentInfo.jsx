import Styles from "../EmployeeBasicInformation/EmployeeCurrenInfo.module.css";
import dividerline from "../../../../assets/Employee_asserts/EmployeeOnBoarding/dividerline.svg";
import { useEmployeeCurrentInfo } from "../../../../queries/Employee_queries/OverViewsScreens/CurrentInfo";

const EmployeeCurrentInfo = ({ employeeId }) => {
  console.log("EmployeeCurrentInfo employeeId:", employeeId);

  const { data, isLoading, isError } = useEmployeeCurrentInfo(employeeId);

  if (isLoading) {
    return <div className={Styles.container}>Loading info...</div>;
  }

  if (isError) {
    return <div className={Styles.container}>Error loading info.</div>;
  }

  if (!data) {
    return <div className={Styles.container}>No data found.</div>;
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <h3>Current Info</h3>
        <img src={dividerline} alt="divider" />
      </div>

      <div className={Styles.infoGrid}>
        {/* Column 1 */}
        <div className={Styles.column}>
          <div className={Styles.item}>
            <label>Date Of Joining</label>
            <p className={Styles.value}>
              {data.dateOfJoining
                ? new Date(data.dateOfJoining).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          <div className={Styles.item}>
            <label>Hired By</label>
            <p className={Styles.value}>
              {data.hiredBy || "N/A"}
            </p>
          </div>
        </div>

        {/* Column 2 */}
        <div className={Styles.column}>
          <div className={Styles.item}>
            <label>Subject</label>
            <p className={Styles.value}>
              {data.subjectName || "N/A"}
            </p>
          </div>

          <div className={Styles.item}>
            <label>Referred By</label>
            <p className={Styles.value}>
              {data.referredBy || "N/A"}
            </p>
          </div>
        </div>

        {/* Column 3 */}
        <div className={Styles.column}>
          <div className={Styles.item}>
            <label>Agreed Periods Per Week</label>
            <p className={Styles.value}>
              {typeof data.agreedPerWeek === "number"
                ? `${data.agreedPerWeek} Periods`
                : "0 Periods"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCurrentInfo;
