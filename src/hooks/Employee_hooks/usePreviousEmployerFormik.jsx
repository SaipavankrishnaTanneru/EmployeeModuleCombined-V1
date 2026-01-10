// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { postPreviousEmployerInfo } from "../../queries/Employee_queries/onBoardingForms/postApi/usePreviousEmployerQueries";
// import { useAuth } from "../../useAuth"; 

// const initialEmployer = {
//   companyName: "",
//   designation: "",
//   fromDate: "",
//   toDate: "",
//   leavingReason: "",
//   companyAddressLine1: "",
//   companyAddressLine2: "",
//   companyAddressLine3: "", // Added as per requirement
//   natureOfDuties: "",
//   grossSalaryPerMonth: "",
//   ctc: "",
//   documents: {}, 
// };

// // 🔴 UPDATED VALIDATION SCHEMA
// const validationSchema = Yup.object().shape({
//   previousEmployers: Yup.array().of(
//     Yup.object().shape({
//       companyName: Yup.string().required("Company Name is required"),
//       designation: Yup.string().required("Designation is required"),
      
//       fromDate: Yup.date()
//         .max(new Date(), "From Date cannot be in the future")
//         .required("From Date is required"),
        
//       toDate: Yup.date()
//         .min(Yup.ref('fromDate'), "To Date must be after From Date")
//         .required("To Date is required"),
        
//       leavingReason: Yup.string().required("Leaving Reason is required"),
      
//       companyAddressLine1: Yup.string().required("Address Line 1 is required"),
//       // Address 2 & 3 are optional, so no validation needed
      
//       natureOfDuties: Yup.string().required("Nature of Duty is required"),
      
//       grossSalaryPerMonth: Yup.number()
//         .typeError("Must be a number")
//         .positive("Must be positive")
//         .required("Gross Salary is required"),
        
//       ctc: Yup.number()
//         .typeError("Must be a number")
//         .positive("Must be positive")
//         .required("CTC is required"),
//     })
//   ),
// });

// const DOC_TYPE_MAP = {
//   'payslips': 1,
//   'resignation': 2,
//   'offerLetter': 3,
//   'form12A': 4,
//   'gratuity': 5,
//   'pfMergerLetter': 6
// };

// export const usePreviousEmployerFormik = ({ tempId, onSuccess }) => {
//   const { user } = useAuth();
//   const hrEmployeeId = user?.employeeId || 5109;

//   const formik = useFormik({
//     initialValues: {
//       previousEmployers: [initialEmployer],
//     },
//     validationSchema, // <--- Connected Schema
//     validateOnBlur: true,
//     validateOnChange: true,
//     onSubmit: async (values) => {
//       // ... (Your existing submit logic remains same)
//       if (!tempId) { alert("Temporary ID is missing."); return; }

//       const formattedEmployers = values.previousEmployers.map((emp) => {
//         const docsArray = [];
//         if (emp.documents) {
//           Object.keys(emp.documents).forEach((key) => {
//             const files = emp.documents[key];
//             if (Array.isArray(files)) {
//               files.forEach((file) => {
//                 docsArray.push({
//                   docPath: file.url || "pending_path", 
//                   docTypeId: DOC_TYPE_MAP[key] || 0,
//                   description: file.name || key
//                 });
//               });
//             }
//           });
//         }

//         return {
//           companyName: emp.companyName,
//           designation: emp.designation,
//           fromDate: emp.fromDate ? new Date(emp.fromDate).toISOString() : null,
//           toDate: emp.toDate ? new Date(emp.toDate).toISOString() : null,
//           leavingReason: emp.leavingReason || "",
//           companyAddressLine1: emp.companyAddressLine1 || "",
//           companyAddressLine2: emp.companyAddressLine2 || "",
//           // Ensure extra fields are mapped if backend supports them
//           natureOfDuties: emp.natureOfDuties || "",
//           grossSalaryPerMonth: Number(emp.grossSalaryPerMonth) || 0,
//           ctc: Number(emp.ctc) || 0,
//           documents: docsArray 
//         };
//       });

//       const apiPayload = {
//         previousEmployers: formattedEmployers,
//         createdBy: hrEmployeeId,
//         updatedBy: hrEmployeeId,
//       };

//       try {
//         await postPreviousEmployerInfo(tempId, apiPayload);
//         if (onSuccess) onSuccess();
//       } catch (error) {
//         console.error(error);
//       }
//     },
//   });

//   return { formik, initialEmployer };
// };

import { useFormik } from "formik";
import * as Yup from "yup";
import { postPreviousEmployerInfo } from "../../queries/Employee_queries/onBoardingForms/postApi/usePreviousEmployerQueries";
import { useAuth } from "../../useAuth";

/* -------------------- UTIL -------------------- */

// "sai pavan krishna" → "Sai Pavan Krishna"
const toTitleCase = (value = "") =>
  value
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

/* -------------------- INITIAL VALUES -------------------- */

const initialEmployer = {
  companyName: "",
  designation: "",
  fromDate: "",
  toDate: "",
  leavingReason: "",
  companyAddressLine1: "",
  companyAddressLine2: "",
  companyAddressLine3: "",
  natureOfDuties: "",
  grossSalaryPerMonth: "",
  ctc: "",
  documents: {},
};

/* -------------------- VALIDATION -------------------- */

const validationSchema = Yup.object().shape({
  previousEmployers: Yup.array().of(
    Yup.object().shape({
      companyName: Yup.string().required("Company Name is required"),
      designation: Yup.string().required("Designation is required"),

      fromDate: Yup.date()
        .max(new Date(), "From Date cannot be in the future")
        .required("From Date is required"),

      toDate: Yup.date()
        .min(Yup.ref("fromDate"), "To Date must be after From Date")
        .required("To Date is required"),

      leavingReason: Yup.string().required("Leaving Reason is required"),
      companyAddressLine1: Yup.string().required("Address Line 1 is required"),
      natureOfDuties: Yup.string().required("Nature of Duty is required"),

      grossSalaryPerMonth: Yup.number()
        .typeError("Must be a number")
        .positive("Must be positive")
        .required("Gross Salary is required"),

      ctc: Yup.number()
        .typeError("Must be a number")
        .positive("Must be positive")
        .required("CTC is required"),
    })
  ),
});

/* -------------------- DOC TYPE MAP -------------------- */

const DOC_TYPE_MAP = {
  payslips: 1,
  resignation: 2,
  offerLetter: 3,
  form12A: 4,
  gratuity: 5,
  pfMergerLetter: 6,
};

/* -------------------- HOOK -------------------- */

export const usePreviousEmployerFormik = ({ tempId, onSuccess }) => {
  const { user } = useAuth();
  const hrEmployeeId = user?.employeeId || 5109;

  const formik = useFormik({
    initialValues: {
      previousEmployers: [initialEmployer],
    },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,

    onSubmit: async (values) => {
      if (!tempId) {
        alert("Temporary ID is missing.");
        return;
      }

      console.log("🚀 Submitting Previous Employer Info...", values);

      const formattedEmployers = values.previousEmployers.map((emp) => {
        const docsArray = [];

        if (emp.documents) {
          Object.keys(emp.documents).forEach((key) => {
            const files = emp.documents[key];
            if (Array.isArray(files)) {
              files.forEach((file) => {
                docsArray.push({
                  docPath: file.url || "pending_path",
                  docTypeId: DOC_TYPE_MAP[key] || 0,
                  description: file.name || key,
                });
              });
            }
          });
        }

        return {
          companyName: toTitleCase(emp.companyName),
          designation: toTitleCase(emp.designation),
          fromDate: emp.fromDate
            ? new Date(emp.fromDate).toISOString()
            : null,
          toDate: emp.toDate
            ? new Date(emp.toDate).toISOString()
            : null,
          leavingReason: toTitleCase(emp.leavingReason),
          companyAddressLine1: toTitleCase(emp.companyAddressLine1),
          companyAddressLine2: toTitleCase(emp.companyAddressLine2),
          companyAddressLine3: toTitleCase(emp.companyAddressLine3),
          natureOfDuties: toTitleCase(emp.natureOfDuties),
          grossSalaryPerMonth: Number(emp.grossSalaryPerMonth) || 0,
          ctc: Number(emp.ctc) || 0,
          documents: docsArray,
        };
      });

      const apiPayload = {
        previousEmployers: formattedEmployers,
        createdBy: hrEmployeeId,
        updatedBy: hrEmployeeId,
      };

      try {
        await postPreviousEmployerInfo(tempId, apiPayload);
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error("❌ Failed to save previous employer info:", error);
      }
    },
  });

  return { formik, initialEmployer };
};
