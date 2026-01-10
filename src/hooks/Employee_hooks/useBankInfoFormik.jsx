// // hooks/useBankInfoFormik.js

// import { useFormik } from "formik";
// import { useAuth } from "../../../src/useAuth"; 
// import * as Yup from "yup";
// import { postBankInfo } from "../../queries/Employee_queries/onBoardingForms/postApi/useBankQueries";
// import { useBankInfo } from "../../queries/Employee_queries/do/getpapis/useBankQueries";
// import { useEffect, useState } from "react";

// const initialValues = {
//   paymentTypeId: "", 
//   bankId: "",      
//   bankBranchId: "", 
//   bankBranchName: "", 
//   salaryLessThan40000: false,

//   personalAccount: {
//     bankName: "",
//     accountNo: "",
//     accountHolderName: "",
//     ifscCode: "",
//     bankManagerName: "",
//     bankManagerContactNo: "",
//     bankManagerEmail: "",
//     customerRelationshipOfficerName: "",
//     customerRelationshipOfficerContactNo: "",
//     customerRelationshipOfficerEmail: ""
//   },
  
//   salaryAccount: {
//     bankId: "", 
//     ifscCode: "",
//     accountNo: "",
//     accountHolderName: "",
//     payableAt: "",
//     bankManagerName: "",
//     bankManagerContactNo: "",
//     bankManagerEmail: "",
//     customerRelationshipOfficerName: "",
//     customerRelationshipOfficerContactNo: "",
//     customerRelationshipOfficerEmail: ""
//   }
// };

// // 2. DEFINE VALIDATION SCHEMA
// const validationSchema = Yup.object().shape({
//   // Root Level Mandatory Fields
//   paymentTypeId: Yup.string().required("Payment Type is required"),
//   bankId: Yup.string().required("Bank Name is required"),
//   bankBranchId: Yup.string().required("Bank Branch is required"),

//   // Salary Account Mandatory Fields (Always Required per prompt)
//   salaryAccount: Yup.object().shape({
//     accountNo: Yup.string().required("Account Number is required"),
//     ifscCode: Yup.string().required("IFSC Code is required"),
//     payableAt: Yup.string().required("Payable At is required"),
//     // Other fields optional
//   }),

//   // Conditional Logic: Salary Less Than 40000
//   salaryLessThan40000: Yup.boolean(),
  
//   personalAccount: Yup.object().when("salaryLessThan40000", {
//     is: true, // If Checkbox is CHECKED
//     then: () => Yup.object().shape({
//       bankName: Yup.string().required("Personal Bank Name is required"),
//       accountHolderName: Yup.string().required("Holder Name is required"),
//       accountNo: Yup.string().required("Personal Account No is required"),
//       ifscCode: Yup.string().required("Personal IFSC is required"),
//     }),
//     otherwise: () => Yup.object().shape({
//       // If unchecked, fields are optional
//       bankName: Yup.string().nullable(),
//       accountHolderName: Yup.string().nullable(),
//       accountNo: Yup.string().nullable(),
//       ifscCode: Yup.string().nullable(),
//     }),
//   }),
// });

// export const useBankInfoFormik = ({ tempId, onSuccess, dropdownData }) => {
//   const { user } = useAuth();
//   const hrEmployeeId = user?.employeeId || 5109;

//   const { data: savedData } = useBankInfo(tempId);
//   const [isDataPopulated, setIsDataPopulated] = useState(false);

//   useEffect(() => { setIsDataPopulated(false); }, [tempId]);

//   const formik = useFormik({
//     initialValues,
//     validationSchema, // 3. Attach Schema
//     enableReinitialize: true,
//     validateOnBlur: true,
//     validateOnChange: true,
//     onSubmit: async (values) => {
//       if (!tempId) return console.error("Missing ID");
//       console.log("🚀 Submitting Bank Info...", values);

//       const branchId = Number(values.bankBranchId);
//       const hasValidBranchId = branchId > 0;

//       const apiPayload = {
//         paymentTypeId: Number(values.paymentTypeId) || 0,
//         bankId: Number(values.bankId) || 0,
//         bankBranchId: hasValidBranchId ? branchId : null,
//         bankBranchName: hasValidBranchId ? null : (values.bankBranchName || ""), 
//         salaryLessThan40000: Boolean(values.salaryLessThan40000),

//         personalAccount: {
//           ...values.personalAccount,
//           bankManagerContactNo: Number(values.personalAccount.bankManagerContactNo) || 0,
//           customerRelationshipOfficerContactNo: Number(values.personalAccount.customerRelationshipOfficerContactNo) || 0,
//         },

//         salaryAccount: {
//           ...values.salaryAccount,
//           bankId: Number(values.bankId), 
//           bankManagerContactNo: Number(values.salaryAccount.bankManagerContactNo) || 0,
//           customerRelationshipOfficerContactNo: Number(values.salaryAccount.customerRelationshipOfficerContactNo) || 0,
//         },

//         createdBy: hrEmployeeId,
//         updatedBy: hrEmployeeId
//       };

//       try {
//         await postBankInfo(tempId, apiPayload);
//         if (onSuccess) onSuccess();
//       } catch (error) {
//         console.error("❌ Failed to save bank info:", error);
//       }
//     },
//   });

//   const { setValues } = formik;

//   // Auto-populate logic (Existing logic preserved)
//   useEffect(() => {
//     if (!isDataPopulated && savedData && dropdownData?.banks?.length > 0) {
//       console.log("✅ Auto-populating Bank Info...");
//       const sInfo = savedData.salaryAccount || savedData.salaryAccountInfo || {};
//       const pInfo = savedData.personalAccount || savedData.personalBankInfo || {};

//       let foundBankId = savedData.bankId || sInfo.bankId;
//       if (!foundBankId && sInfo.bankName) {
//         const bankObj = dropdownData.banks.find(b => b.name === sInfo.bankName);
//         if (bankObj) foundBankId = bankObj.id;
//       }

//       setValues({
//         paymentTypeId: savedData.paymentTypeId || "", 
//         bankId: foundBankId || "",      
//         bankBranchId: savedData.bankBranchId || "",
//         bankBranchName: savedData.bankBranchName || "",
//         salaryLessThan40000: !!savedData.salaryLessThan40000,

//         personalAccount: {
//           bankName: pInfo.bankName || pInfo.personalBankName || "",
//           accountNo: pInfo.accountNo || pInfo.personalAccountNumber || "",
//           accountHolderName: pInfo.accountHolderName || pInfo.personalAccountHolderName || "",
//           ifscCode: pInfo.ifscCode || pInfo.personalIfscCode || "",
//           bankManagerName: pInfo.bankManagerName || "",
//           bankManagerContactNo: pInfo.bankManagerContactNo || "",
//           bankManagerEmail: pInfo.bankManagerEmail || "",
//           customerRelationshipOfficerName: pInfo.customerRelationshipOfficerName || "",
//           customerRelationshipOfficerContactNo: pInfo.customerRelationshipOfficerContactNo || "",
//           customerRelationshipOfficerEmail: pInfo.customerRelationshipOfficerEmail || ""
//         },

//         salaryAccount: {
//           bankId: foundBankId || "",
//           accountNo: sInfo.accountNo || sInfo.salaryAccountNumber || "",
//           ifscCode: sInfo.ifscCode || "",
//           payableAt: sInfo.payableAt || "",
//           accountHolderName: sInfo.accountHolderName || sInfo.salaryAccountHolderName || "",
//           bankManagerName: sInfo.bankManagerName || "",
//           bankManagerContactNo: sInfo.bankManagerContactNo || "",
//           bankManagerEmail: sInfo.bankManagerEmail || "",
//           customerRelationshipOfficerName: sInfo.customerRelationshipOfficerName || "",
//           customerRelationshipOfficerContactNo: sInfo.customerRelationshipOfficerContactNo || "",
//           customerRelationshipOfficerEmail: sInfo.customerRelationshipOfficerEmail || ""
//         }
//       });
//       setIsDataPopulated(true);
//     }
//   }, [savedData, dropdownData, setValues, isDataPopulated]);

//   return { formik, savedData };
// };

// hooks/useBankInfoFormik.js

import { useFormik } from "formik";
import { useAuth } from "../../../src/useAuth";
import * as Yup from "yup";
import { postBankInfo } from "../../queries/Employee_queries/onBoardingForms/postApi/useBankQueries";
import { useBankInfo } from "../../queries/Employee_queries/do/getpapis/useBankQueries";
import { useEffect, useState } from "react";

/* -------------------- UTILITIES -------------------- */

// "sai pavan krishna" → "Sai Pavan Krishna"
const toTitleCase = (value = "") =>
  value
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

const normalizePersonalAccount = (acc) => ({
  ...acc,
  bankName: toTitleCase(acc.bankName),
  accountHolderName: toTitleCase(acc.accountHolderName),
  bankManagerName: toTitleCase(acc.bankManagerName),
  customerRelationshipOfficerName: toTitleCase(
    acc.customerRelationshipOfficerName
  ),
  ifscCode: acc.ifscCode?.toUpperCase() || "",
});

const normalizeSalaryAccount = (acc) => ({
  ...acc,
  accountHolderName: toTitleCase(acc.accountHolderName),
  payableAt: toTitleCase(acc.payableAt),
  bankManagerName: toTitleCase(acc.bankManagerName),
  customerRelationshipOfficerName: toTitleCase(
    acc.customerRelationshipOfficerName
  ),
  ifscCode: acc.ifscCode?.toUpperCase() || "",
});

/* -------------------- INITIAL VALUES -------------------- */

const initialValues = {
  paymentTypeId: "",
  bankId: "",
  bankBranchId: "",
  bankBranchName: "",
  salaryLessThan40000: false,

  personalAccount: {
    bankName: "",
    accountNo: "",
    accountHolderName: "",
    ifscCode: "",
    bankManagerName: "",
    bankManagerContactNo: "",
    bankManagerEmail: "",
    customerRelationshipOfficerName: "",
    customerRelationshipOfficerContactNo: "",
    customerRelationshipOfficerEmail: "",
  },

  salaryAccount: {
    bankId: "",
    ifscCode: "",
    accountNo: "",
    accountHolderName: "",
    payableAt: "",
    bankManagerName: "",
    bankManagerContactNo: "",
    bankManagerEmail: "",
    customerRelationshipOfficerName: "",
    customerRelationshipOfficerContactNo: "",
    customerRelationshipOfficerEmail: "",
  },
};

/* -------------------- VALIDATION -------------------- */

const validationSchema = Yup.object().shape({
  paymentTypeId: Yup.string().required("Payment Type is required"),
  bankId: Yup.string().required("Bank Name is required"),
  bankBranchId: Yup.string().required("Bank Branch is required"),

  salaryAccount: Yup.object().shape({
    accountNo: Yup.string().required("Account Number is required"),
    ifscCode: Yup.string().required("IFSC Code is required"),
    payableAt: Yup.string().required("Payable At is required"),
  }),

  salaryLessThan40000: Yup.boolean(),

  personalAccount: Yup.object().when("salaryLessThan40000", {
    is: true,
    then: () =>
      Yup.object().shape({
        bankName: Yup.string().required("Personal Bank Name is required"),
        accountHolderName: Yup.string().required("Holder Name is required"),
        accountNo: Yup.string().required("Personal Account No is required"),
        ifscCode: Yup.string().required("Personal IFSC is required"),
      }),
    otherwise: () =>
      Yup.object().shape({
        bankName: Yup.string().nullable(),
        accountHolderName: Yup.string().nullable(),
        accountNo: Yup.string().nullable(),
        ifscCode: Yup.string().nullable(),
      }),
  }),
});

/* -------------------- HOOK -------------------- */

export const useBankInfoFormik = ({ tempId, onSuccess, dropdownData }) => {
  const { user } = useAuth();
  const hrEmployeeId = user?.employeeId || 5109;

  const { data: savedData } = useBankInfo(tempId);
  const [isDataPopulated, setIsDataPopulated] = useState(false);

  useEffect(() => {
    setIsDataPopulated(false);
  }, [tempId]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,

    onSubmit: async (values) => {
      if (!tempId) return console.error("Missing ID");
      console.log("🚀 Submitting Bank Info...", values);

      const branchId = Number(values.bankBranchId);
      const hasValidBranchId = branchId > 0;

      // ✅ Normalize text fields ONLY here
      const personalAccount = normalizePersonalAccount(
        values.personalAccount
      );
      const salaryAccount = normalizeSalaryAccount(values.salaryAccount);

      const apiPayload = {
        paymentTypeId: Number(values.paymentTypeId) || 0,
        bankId: Number(values.bankId) || 0,
        bankBranchId: hasValidBranchId ? branchId : null,
        bankBranchName: hasValidBranchId
          ? null
          : toTitleCase(values.bankBranchName || ""),
        salaryLessThan40000: Boolean(values.salaryLessThan40000),

        personalAccount: {
          ...personalAccount,
          bankManagerContactNo:
            Number(personalAccount.bankManagerContactNo) || 0,
          customerRelationshipOfficerContactNo:
            Number(
              personalAccount.customerRelationshipOfficerContactNo
            ) || 0,
        },

        salaryAccount: {
          ...salaryAccount,
          bankId: Number(values.bankId),
          bankManagerContactNo:
            Number(salaryAccount.bankManagerContactNo) || 0,
          customerRelationshipOfficerContactNo:
            Number(
              salaryAccount.customerRelationshipOfficerContactNo
            ) || 0,
        },

        createdBy: hrEmployeeId,
        updatedBy: hrEmployeeId,
      };

      try {
        await postBankInfo(tempId, apiPayload);
        onSuccess?.();
      } catch (error) {
        console.error("❌ Failed to save bank info:", error);
      }
    },
  });

  const { setValues } = formik;

  /* -------------------- AUTO POPULATE (UNCHANGED LOGIC) -------------------- */

  useEffect(() => {
    if (!isDataPopulated && savedData && dropdownData?.banks?.length > 0) {
      const sInfo = savedData.salaryAccount || {};
      const pInfo = savedData.personalAccount || {};

      let foundBankId = savedData.bankId || sInfo.bankId;
      if (!foundBankId && sInfo.bankName) {
        const bankObj = dropdownData.banks.find(
          (b) => b.name === sInfo.bankName
        );
        if (bankObj) foundBankId = bankObj.id;
      }

      setValues({
        paymentTypeId: savedData.paymentTypeId || "",
        bankId: foundBankId || "",
        bankBranchId: savedData.bankBranchId || "",
        bankBranchName: savedData.bankBranchName || "",
        salaryLessThan40000: !!savedData.salaryLessThan40000,

        personalAccount: {
          bankName: pInfo.bankName || "",
          accountNo: pInfo.accountNo || "",
          accountHolderName: pInfo.accountHolderName || "",
          ifscCode: pInfo.ifscCode || "",
          bankManagerName: pInfo.bankManagerName || "",
          bankManagerContactNo: pInfo.bankManagerContactNo || "",
          bankManagerEmail: pInfo.bankManagerEmail || "",
          customerRelationshipOfficerName:
            pInfo.customerRelationshipOfficerName || "",
          customerRelationshipOfficerContactNo:
            pInfo.customerRelationshipOfficerContactNo || "",
          customerRelationshipOfficerEmail:
            pInfo.customerRelationshipOfficerEmail || "",
        },

        salaryAccount: {
          bankId: foundBankId || "",
          accountNo: sInfo.accountNo || "",
          ifscCode: sInfo.ifscCode || "",
          payableAt: sInfo.payableAt || "",
          accountHolderName: sInfo.accountHolderName || "",
          bankManagerName: sInfo.bankManagerName || "",
          bankManagerContactNo: sInfo.bankManagerContactNo || "",
          bankManagerEmail: sInfo.bankManagerEmail || "",
          customerRelationshipOfficerName:
            sInfo.customerRelationshipOfficerName || "",
          customerRelationshipOfficerContactNo:
            sInfo.customerRelationshipOfficerContactNo || "",
          customerRelationshipOfficerEmail:
            sInfo.customerRelationshipOfficerEmail || "",
        },
      });

      setIsDataPopulated(true);
    }
  }, [savedData, dropdownData, setValues, isDataPopulated]);

  return { formik, savedData };
};
