import React from "react";
import { Routes, Route, useNavigate, useParams, Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../useAuth"; 

// --- 🧩 Components ---
import EmployeeOnboardingHeader from "../../../components/Employee_components/EmployeeModuleHeaderComponent/EmployeeOnboardingHeader";
import OnBoardingEmployeeNav from "../../../components/Employee_components/OnBoardingStatus/OnBoardingEmployeeNav/OnBoardingEmployeeNav";
import AddSalaryDetails from "../../../components/Employee_components/OnBoardingStatus/EmployeeNavOverview/AddSalaryDetails";
import EmployeeChecklist from "../../../components/Employee_components/OnBoardingStatus/DOChecklist/EmployeeChecklist";
import EmployeeProfileContainer from "../EmployeeProfileContainer/EmployeeProfileConytainer";
import OnBoardingStatusLayout from "../../../components/Employee_components/OnBoardingStatus/EmployeeonBoardingTable/OnBoardingStatusLayout";
import SkillTestApprovalHeader from "../../../components/Employee_components/SkillTestProfileCard/SkillTestApprovalHeader";
import SkillTestView from "../../../components/Employee_components/SkillTestProfileCard/SkillTestView";

import SalaryDetailsView from "../../../components/Employee_components/OnBoardingStatus/EmployeeNavOverview/SalaryInfo";

import Styles from "./EmployeeModuleConatiner.module.css";

const useIsSchoolDO = (role) => {
  const { user } = useAuth();
  
  if (role !== "DO") return false;

  // ⚠️ LOGIC: Check your backend User Object for 'SCHOOL' identifier
  // Example: user.category, user.department, or user.subRole
  const category = user?.category || user?.department || "";
  return category.toUpperCase() === "SCHOOL";
};

// ============================================================================
// 1. DETAIL LAYOUT WRAPPER
// ============================================================================
const EmployeeDetailLayout = ({ role }) => {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const location = useLocation();
  const isSchoolDO = useIsSchoolDO(role);

  const isSkillTest = location.pathname.includes("skill-test");
  const isChecklist = location.pathname.includes("checklist");
  const isAddSalaryPage = location.pathname.endsWith("/salary"); 

  const isOnboarding = location.pathname.includes("onboarding") && !isAddSalaryPage && !isChecklist;

  const getStep = () => {
    if (isSkillTest) return 0;
    if (isOnboarding) return 1; 
    if (isAddSalaryPage) return 2;
    if (isChecklist) return role === "DO" ? 3 : 2;
    return 0;
  };

  const getSubHeading = () => {
    if (isSkillTest) return "Skill Test Approval";
    if (isAddSalaryPage) {
        // Show "Preview" for School DO or CO, "Add" for College DO
        return (isSchoolDO || role === "CO") ? "Salary Details Preview" : "Add Salary Details";
    }
    if (isChecklist) return "CheckList";
    return "Employee Preview"; 
  };

  const getBaseScopeUrl = () => {
    if (role === "HR") return "/scopes/employee/hr-review";
    if (role === "CO") return "/scopes/employee/co-review";
    if (role === "ADMIN") return "/scopes/employee/admin-review";
    return "/scopes/employee/do-review";
  };

  const handleBack = () => {
    const baseUrl = getBaseScopeUrl();
    if (isAddSalaryPage || isChecklist) {
      navigate(`${baseUrl}/${employeeId}/onboarding/working-info`);
    } else {
      navigate(`${baseUrl}/onboarding`);
    }
  };

  return (
    <div className={Styles.widthpp}>
      <div className={Styles.moduleWrapper}>
        {isSkillTest ? (
          <SkillTestApprovalHeader 
             onBack={() => navigate(`${getBaseScopeUrl()}/skillTest`)} 
          />
        ) : (
          <EmployeeOnboardingHeader
            step={getStep()}
            totalSteps={role === "DO" ? 3 : 2}
            subHeading={getSubHeading()}
            onBack={handleBack}
          />
        )}
        <div className={Styles.mainContainer}>
          {!isSkillTest && <EmployeeProfileContainer employeeId={employeeId} />}
          <div className={Styles.navSection}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 2. MAIN CONTAINER
// ============================================================================
const EmployeeModuleContainer = ({ role }) => {
  const navigate = useNavigate();

  const getBasePath = () => {
    if (role === "HR") return "/scopes/employee/hr-review";
    if (role === "CO") return "/scopes/employee/co-review";
    if (role === "ADMIN") return "/scopes/employee/admin-review";
    return "/scopes/employee/do-review";
  };

  const handleEmployeeSelect = (employee) => {
    const empId = employee.tempPayroll || employee.id || employee._id;
    if (!empId) return;

    const status = (employee.status || "").toLowerCase().trim();
    const basePath = getBasePath();
    const rolePrefix = role ? role.toLowerCase() : 'do';

    if (status.includes("skill test") || employee.skillTest === true) {
      navigate(`${basePath}/${empId}/skill-test`);
      return;
    }
    if (status === "incompleted" || status === "incomplete") {
        navigate(`/scopes/employee/${rolePrefix}-new-employee-onboarding/basic-info`, { 
            state: { tempId: empId, isEditMode: true } 
        });
        return;
    }
    // Default flow
    navigate(`${basePath}/${empId}/onboarding/working-info`);
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="onboarding" replace />} />

      <Route 
        path="onboarding" 
        element={<div className={Styles.widthpptable}><OnBoardingStatusLayout role={role} onEmployeeSelect={handleEmployeeSelect} /></div>} 
      />
      <Route 
        path="skillTest" 
        element={<div className={Styles.widthpptable}><OnBoardingStatusLayout role={role} onEmployeeSelect={handleEmployeeSelect} /></div>} 
      />

      <Route path=":employeeId" element={<EmployeeDetailLayout role={role} />}>
        <Route index element={<Navigate to="onboarding/working-info" replace />} />

        {/* 1. Salary Route (Conditional Wrapper) */}
        <Route 
          path="onboarding/salary" 
          element={<WrapperSalary role={role} />} 
        />

        {/* 2. Checklist Route */}
        <Route 
          path="onboarding/checklist" 
          element={<EmployeeChecklist role={role} onBack={() => navigate(-1)}/>} 
        />

        <Route 
          path="onboarding/:stepId" 
          element={<WrapperOnboarding role={role} />} 
        />

        <Route 
           path="skill-test" 
           element={<SkillTestView />} 
        />
      </Route>
    </Routes>
  );
};

// ============================================================================
// 3. HELPER WRAPPERS
// ============================================================================

const WrapperOnboarding = ({ role }) => {
  const navigate = useNavigate();
  return (
    <OnBoardingEmployeeNav
      role={role}
      onFinish={() => role === 'DO' ? navigate("../onboarding/salary") : navigate("../onboarding/checklist")}
    />
  );
};

// 🔴 CONDITIONAL SALARY COMPONENT 
const WrapperSalary = ({ role }) => {
  const navigate = useNavigate();
  const isSchoolDO = useIsSchoolDO(role);

  // If it's CO or a School DO, show the Read-Only View
  const showReadOnlyView = role === "CO" || (role === "DO" && isSchoolDO);

  if (showReadOnlyView) {
    return (
      <SalaryDetailsView
        onNext={() => navigate("../onboarding/checklist")} 
        onBack={() => navigate("../onboarding/working-info")}
      />
    );
  }

  // If it's College DO, show the Editable Form
  return (
    <AddSalaryDetails
      role={role}
      onBack={() => navigate("../onboarding/account-info")} 
      onSubmitComplete={(salaryData) => {
          // Pass salary data to Checklist (for College DO API call)
          navigate("../onboarding/checklist", { state: { salaryData } });
      }}    
    />
  );
};

export default EmployeeModuleContainer;