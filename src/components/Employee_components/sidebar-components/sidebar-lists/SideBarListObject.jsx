import assetsmanagement_icon from "../../../../assets/Employee_asserts/sidebaricons/assetsmanagement_icon.svg";
import dashboard_icon from "../../../../assets/Employee_asserts/sidebaricons/dashboard_icon.svg";
import cctv_icon from "../../../../assets/Employee_asserts/sidebaricons/cctv_icon.svg";
import employee_icon from "../../../../assets/Employee_asserts/sidebaricons/employee_icon.svg";
import fleet_icon from "../../../../assets/Employee_asserts/sidebaricons/fleet_icon.svg";
import hrms_icon from "../../../../assets/Employee_asserts/sidebaricons/hrms_icon.svg";
import master_icon from "../../../../assets/Employee_asserts/sidebaricons/master_icon.svg";
import paymentservice_icon from "../../../../assets/Employee_asserts/sidebaricons/paymentservice_icon.svg";
import questiobank_icon from "../../../../assets/Employee_asserts/sidebaricons/questionbank_icon.svg";
import sms_icon from "../../../../assets/Employee_asserts/sidebaricons/sms_icon.svg";
import student_icon from "../../../../assets/Employee_asserts/sidebaricons/student_icon.svg";
import warehouse_icon from "../../../../assets/Employee_asserts/sidebaricons/warehouse_icon.svg";
import application_icon from "../../../../assets/Employee_asserts/sidebaricons/application_icon.svg";

export const listData = [
  { icon: dashboard_icon, name: "Dashboard", route: "/scopes/dashboard" },
  { icon: student_icon, name: "Student", route: "/scopes/students" },
  { icon: application_icon, name: "Application", route: "/scopes/application" },
  { icon: employee_icon, name: "Employee", route: "/scopes/employee" },
  { icon: fleet_icon, name: "Fleet", route: "/scopes/fleet" },
  { icon: warehouse_icon, name: "Warehouse", route: "/scopes/warehouse" },
  { icon: sms_icon, name: "SMS", route: "/scopes/sms" },
  { icon: questiobank_icon, name: "Question Bank", route: "/scopes/question-bank" },
  {
    icon: assetsmanagement_icon,
    name: "Assets Management",
    route: "/scopes/assets-management",
  },
  {
    icon: paymentservice_icon,
    name: "Payment Service",
    route: "/scopes/payments-service",
  },
  { icon: cctv_icon, name: "CCTV", route: "/scopes/cctv" },
  { icon: hrms_icon, name: "HRMS", route: "/scopes/hrms" },
  { icon: master_icon, name: "Masters", route: "/scopes/masters" },
];
