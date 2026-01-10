import Styles from "../EmployeeBasicInformation/EmployeeBasicInfoContent.module.css";
import dividerline from "../../../../assets/Employee_asserts/EmployeeOnBoarding/dividerline.svg";
import { useEmployeeBasicInfo } from "../../../../queries/Employee_queries/OverViewsScreens/BasicInfo";

const EmployeeBasicInfoContent = ({ employeeId }) => {
  const { data, isLoading, isError } = useEmployeeBasicInfo(employeeId);

  // 🔍 Debug (optional)
  console.log("Employee ID in BasicInfo:", employeeId);
  console.log("Basic Info data:", data);

  if (!employeeId) {
    return <div className={Styles.container}>Employee ID not found.</div>;
  }

  if (isLoading) {
    return <div className={Styles.container}>Loading Basic Info...</div>;
  }

  if (isError) {
    return <div className={Styles.container}>Error loading Basic Info.</div>;
  }

  if (!data) {
    return <div className={Styles.container}>No Basic Info found.</div>;
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <h3>Basic Info</h3>
        <img src={dividerline} alt="divider" />
      </div>

      <div className={Styles.infoGrid}>
        {/* Column 1 */}
        <div className={Styles.column}>
          <div className={Styles.item}>
            <label>Aadhaar No</label>
            <p className={Styles.value}>{data.adhaarNo || "N/A"}</p>
          </div>

          <div className={Styles.item}>
            <label>Category</label>
            <p className={Styles.value}>{data.categoryName || "N/A"}</p>
          </div>

          <div className={Styles.item}>
            <label>Total Experience</label>
            <p className={Styles.value}>{data.totalExperience ?? "0"}</p>
          </div>

          <div className={Styles.item}>
            <label>Previous Chaitanya ID</label>
            <p className={Styles.value}>{data.preChaitanyaId || "N/A"}</p>
          </div>
        </div>

        {/* Column 2 */}
        <div className={Styles.column}>
          <div className={Styles.item}>
            <label>Aadhaar Enrolment No</label>
            <p className={Styles.value}>{data.adhaarEnrolmentNo || "N/A"}</p>
          </div>

          <div className={Styles.item}>
            <label>Father Name</label>
            <p className={Styles.value}>{data.fatherName || "N/A"}</p>
          </div>

          <div className={Styles.item}>
            <label>Highest Qualification</label>
            <p className={Styles.value}>{data.qualificationName || "N/A"}</p>
          </div>
        </div>

        {/* Column 3 */}
        <div className={Styles.column}>
          <div className={Styles.item}>
            <label>PAN Number</label>
            <p className={Styles.value}>{data.pancardNo || "N/A"}</p>
          </div>

          <div className={Styles.item}>
            <label>Previous UAN No</label>
            <p className={Styles.value}>{data.uanNo || "N/A"}</p>
          </div>

          <div className={Styles.item}>
            <label>Previous ESI No</label>
            <p className={Styles.value}>{data.preEsiNo || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeBasicInfoContent;
