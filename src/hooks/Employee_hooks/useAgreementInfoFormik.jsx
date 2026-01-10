// // hooks/useAgreementInfoFormik.js

// import { useFormik } from "formik";
// import { useEffect, useState } from "react";
// import { useAuth } from "../../../src/useAuth";
// import * as Yup from "yup";
// import axios from "axios"; // Import Axios
// import { postAgreementInfo } from "../../queries/Employee_queries/onBoardingForms/postApi/useAgreementQueries";
// import { useAgreementChequeDetails } from "../../queries/Employee_queries/do/getpapis/useAgreementQueries"; 

// const initialCheque = { chequeNo: "", chequeBankName: "", chequeBankIfscCode: "" };

// // Added 'category' to initial values
// const initialValues = { 
//   agreementOrgId: "", 
//   agreementType: "", 
//   category: "", // Hidden field
//   isCheckSubmit: false, 
//   chequeDetails: [initialCheque] 
// };

// const validationSchema = Yup.object({
//   agreementType: Yup.string().required("Agreement Type is required"),
// });

// export const useAgreementInfoFormik = ({ tempId, onSuccess }) => {
//   const { user } = useAuth();
//   const hrEmployeeId = user?.employeeId || 5109;

//   const { data: savedData } = useAgreementChequeDetails(tempId);
//   const [isDataPopulated, setIsDataPopulated] = useState(false);

//   useEffect(() => { setIsDataPopulated(false); }, [tempId]);

//   // ---------------------------------------------------------
//   // 1. LOGIC TO FETCH CATEGORY FROM BASIC INFO
//   // ---------------------------------------------------------
//   const [derivedCategory, setDerivedCategory] = useState("");

//   useEffect(() => {
//     const fetchBasicInfoAndMapCategory = async () => {
//       if (!tempId) return;

//       try {
//         // A. Fetch Basic Info to get the categoryId
//         const basicInfoRes = await axios.get(
//           `http://localhost:8080/api/EmpDetailsFORCODO/employee/basic-info/${tempId}`
//         );
//         const categoryId = basicInfoRes.data?.categoryId;

//         if (categoryId) {
//           // B. Fetch Category List to map ID -> String Name
//           const categoryListRes = await axios.get(
//             `http://localhost:8080/api/employeeModule/categories/active`
//           );
          
//           const categories = categoryListRes.data || [];
//           const matchedCategory = categories.find(c => c.id === Number(categoryId));

//           if (matchedCategory) {
//             console.log("✅ Auto-detected Category:", matchedCategory.name);
//             setDerivedCategory(matchedCategory.name); // e.g., "College" or "School"
//           }
//         }
//       } catch (error) {
//         console.error("❌ Failed to fetch Basic Info for Category mapping:", error);
//       }
//     };

//     fetchBasicInfoAndMapCategory();
//   }, [tempId]);

//   // ---------------------------------------------------------
//   // FORMIK CONFIGURATION
//   // ---------------------------------------------------------
//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     enableReinitialize: true,
//     onSubmit: async (values) => {
//       console.log("🚀 Submitting Agreement Info...", values);

//       const formattedCheques = values.chequeDetails.map(chq => ({
//         chequeNo: Number(chq.chequeNo) || 0,
//         chequeBankName: chq.chequeBankName || "",     
//         chequeBankIfscCode: chq.chequeBankIfscCode || ""    
//       }));

//       const payload = {
//         agreementOrgId: Number(values.agreementOrgId) || 0,
//         agreementType: values.agreementType || "",
        
//         // 🔴 USE THE DERIVED CATEGORY (From Basic Info)
//         // If formik has it, use it, otherwise use the state, otherwise empty string
//         category: values.category || derivedCategory || "string", 

//         isCheckSubmit: Boolean(values.isCheckSubmit),
//         chequeDetails: values.isCheckSubmit ? formattedCheques : [], 
//         createdBy: hrEmployeeId,
//         updatedBy: hrEmployeeId
//       };

//       console.log("📡 Final Payload:", payload);

//       try {
//         await postAgreementInfo(tempId, payload);
//         if (onSuccess) onSuccess();
//       } catch (error) {
//         console.error("❌ Failed to save Agreement info:", error);
//       }
//     },
//   });

//   const { setValues } = formik;

//   // ---------------------------------------------------------
//   // POPULATE DATA (EDIT MODE) + SYNC CATEGORY
//   // ---------------------------------------------------------
//   useEffect(() => {
//     // Populate existing Agreement Data
//     if (!isDataPopulated && savedData) {
//       const backendCheques = savedData.cheques || savedData.chequeDetails || [];
//       const hasCheques = backendCheques.length > 0;
      
//       const mappedCheques = hasCheques
//         ? backendCheques.map(chq => ({
//             chequeNo: chq.chequeNo || "",
//             chequeBankName: chq.chequeBankName || chq.chequeBank || "", 
//             chequeBankIfscCode: chq.chequeBankIfscCode || chq.chequeIfscCode || chq.ifscCode || "" 
//           }))
//         : [initialCheque];

//       setValues({
//         agreementOrgId: savedData.agreementOrgId || "", 
//         agreementType: savedData.agreementType || "",
//         // Ensure category is set if available in saved data, else use derived
//         category: savedData.category || derivedCategory || "", 
//         isCheckSubmit: hasCheques,
//         chequeDetails: mappedCheques
//       });

//       setIsDataPopulated(true);
//     } 
//     // If Agreement data is not yet saved, but we found the category from Basic Info, update Formik
//     else if (derivedCategory && formik.values.category !== derivedCategory) {
//        formik.setFieldValue("category", derivedCategory);
//     }

//   }, [savedData, setValues, isDataPopulated, derivedCategory, formik.values.category]);

//   return { 
//     formik, 
//     values: formik.values, 
//     setFieldValue: formik.setFieldValue, 
//     handleChange: formik.handleChange, 
//     submitForm: formik.submitForm, 
//     initialCheque 
//   };
// };

// hooks/useAgreementInfoFormik.js

import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useAuth } from "../../../src/useAuth";
import * as Yup from "yup";
import axios from "axios";
import { postAgreementInfo } from "../../queries/Employee_queries/onBoardingForms/postApi/useAgreementQueries";
import { useAgreementChequeDetails } from "../../queries/Employee_queries/do/getpapis/useAgreementQueries";


const toTitleCase = (value = "") =>
  value
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

/* -------------------- INITIAL STATE -------------------- */

const initialCheque = {
  chequeNo: "",
  chequeBankName: "",
  chequeBankIfscCode: "",
};

const initialValues = {
  agreementOrgId: "",
  agreementType: "",
  category: "",
  isCheckSubmit: false,
  chequeDetails: [initialCheque],
};

const validationSchema = Yup.object({
  agreementType: Yup.string().required("Agreement Type is required"),
});

/* -------------------- HOOK -------------------- */

export const useAgreementInfoFormik = ({ tempId, onSuccess }) => {
  const { user } = useAuth();
  const hrEmployeeId = user?.employeeId || 5109;

  const { data: savedData } = useAgreementChequeDetails(tempId);
  const [isDataPopulated, setIsDataPopulated] = useState(false);

  useEffect(() => {
    setIsDataPopulated(false);
  }, [tempId]);

  /* -------------------- DERIVE CATEGORY -------------------- */

  const [derivedCategory, setDerivedCategory] = useState("");

  useEffect(() => {
    const fetchBasicInfoAndMapCategory = async () => {
      if (!tempId) return;

      try {
        const basicInfoRes = await axios.get(
          `http://localhost:8080/api/EmpDetailsFORCODO/employee/basic-info/${tempId}`
        );

        const categoryId = basicInfoRes.data?.categoryId;
        if (!categoryId) return;

        const categoryListRes = await axios.get(
          `http://localhost:8080/api/employeeModule/categories/active`
        );

        const categories = categoryListRes.data || [];
        const matchedCategory = categories.find(
          (c) => c.id === Number(categoryId)
        );

        if (matchedCategory) {
          setDerivedCategory(toTitleCase(matchedCategory.name));
        }
      } catch (error) {
        console.error(
          "❌ Failed to fetch Basic Info for Category mapping:",
          error
        );
      }
    };

    fetchBasicInfoAndMapCategory();
  }, [tempId]);

  /* -------------------- FORMIK -------------------- */

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,

    onSubmit: async (values) => {
      console.log("🚀 Submitting Agreement Info...", values);

      // ✅ Normalize cheque text fields
      const formattedCheques = values.chequeDetails.map((chq) => ({
        chequeNo: Number(chq.chequeNo) || 0,
        chequeBankName: toTitleCase(chq.chequeBankName),
        chequeBankIfscCode: chq.chequeBankIfscCode?.toUpperCase() || "",
      }));

      const payload = {
        agreementOrgId: Number(values.agreementOrgId) || 0,
        agreementType: toTitleCase(values.agreementType),

        // ✅ Always store clean Title Case category
        category: toTitleCase(
          values.category || derivedCategory || ""
        ),

        isCheckSubmit: Boolean(values.isCheckSubmit),
        chequeDetails: values.isCheckSubmit ? formattedCheques : [],
        createdBy: hrEmployeeId,
        updatedBy: hrEmployeeId,
      };

      console.log("📡 Final Payload:", payload);

      try {
        await postAgreementInfo(tempId, payload);
        onSuccess?.();
      } catch (error) {
        console.error("❌ Failed to save Agreement info:", error);
      }
    },
  });

  const { setValues } = formik;

  /* -------------------- POPULATE (EDIT MODE) -------------------- */

  useEffect(() => {
    if (!isDataPopulated && savedData) {
      const backendCheques =
        savedData.cheques || savedData.chequeDetails || [];

      const hasCheques = backendCheques.length > 0;

      const mappedCheques = hasCheques
        ? backendCheques.map((chq) => ({
            chequeNo: chq.chequeNo || "",
            chequeBankName:
              chq.chequeBankName || chq.chequeBank || "",
            chequeBankIfscCode:
              chq.chequeBankIfscCode ||
              chq.chequeIfscCode ||
              chq.ifscCode ||
              "",
          }))
        : [initialCheque];

      setValues({
        agreementOrgId: savedData.agreementOrgId || "",
        agreementType: savedData.agreementType || "",
        category: savedData.category || derivedCategory || "",
        isCheckSubmit: hasCheques,
        chequeDetails: mappedCheques,
      });

      setIsDataPopulated(true);
    } else if (
      derivedCategory &&
      formik.values.category !== derivedCategory
    ) {
      formik.setFieldValue("category", derivedCategory);
    }
  }, [savedData, setValues, isDataPopulated, derivedCategory, formik.values.category, formik]);

  /* -------------------- RETURN -------------------- */

  return {
    formik,
    values: formik.values,
    setFieldValue: formik.setFieldValue,
    handleChange: formik.handleChange,
    submitForm: formik.submitForm,
    initialCheque,
  };
};
