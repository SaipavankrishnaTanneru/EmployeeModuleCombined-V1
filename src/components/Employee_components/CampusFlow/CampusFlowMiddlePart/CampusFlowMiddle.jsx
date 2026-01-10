import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Styles from "../CampusFlowMiddlePart/CampusFlowMiddle.module.css";

import EmployeeProfile from "../../../../assets/Employee_asserts/campusFlowIcons/EmployeeDesignationProfile.svg";

import badge from "../../../../assets/Employee_asserts/campusFlowIcons/BadgeIcon.svg";

import EmployeeDesignationCard from "../../../../widgets/Employee_widgets/EmployeeDesignationCard/EmployeeDesignationCard";


import { campusFlowApi } from "../../../../queries/Employee_queries/campusflow/campusflow";

// 🔹 Utility to format designation nicely
const formatDesignation = (text = "") =>
  text
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const CampusFlowMiddle = () => {
  const location = useLocation();
  const campusId =
    location.state?.campusId || sessionStorage.getItem("campusId");

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!campusId) return;

    const fetchManagedBy = async () => {
      setLoading(true);
      try {
        const res = await campusFlowApi.getManagedByEmployees(campusId);
        console.log("✅ Managed By response:", res.data);

        setEmployees(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("❌ Managed By API error", err);
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };

    fetchManagedBy();
  }, [campusId]);

  const BORDER_COLORS = [
  "#FF7125", // orange
  "#70B228", // green
  "#AB28B2", // purple
  "#B27628", // pink
  "#B22874", // blue
  "#5A5D10", // yellow
  "#17709D", // teal
];


  return (
    <div className={Styles.CampusContainer}>
      <div className={Styles.heading}>Managed By</div>

      {/* 🔹 Horizontal Scroll Wrapper (NO CSS FILE CHANGE) */}
      <div className={Styles.scrollWrapper}>
        <div className={Styles.EmployeeCardContainer}>
          {loading && <p>Loading employees…</p>}

          {!loading && employees.length === 0 && (
            <p>No managed employees found</p>
          )}

{employees.map((emp, index) => (
  <div key={emp.empId} style={{ flexShrink: 0 }}>
    <EmployeeDesignationCard
      image={EmployeeProfile}
      employeeId={emp.empId}
      name={emp.empName}
      gender={emp.genderName}
      age={emp.age || ""}
      designation={formatDesignation(emp.designationName)}
      designationIcon={badge}
      subject={
        emp.subjectsTaught && emp.subjectsTaught.length > 0
          ? emp.subjectsTaught.join(", ")
          : ""
      }
      phoneNumber={emp.mobileNo}
      email={emp.email}
      onCall={() => console.log("📞 Call:", emp.mobileNo)}
      onMail={() => console.log("✉️ Mail:", emp.email)}
      borderColor={BORDER_COLORS[index % BORDER_COLORS.length]} // ✅ MAGIC
    />
  </div>
))}


        </div>
      </div>
    </div>
  );
};

export default CampusFlowMiddle;