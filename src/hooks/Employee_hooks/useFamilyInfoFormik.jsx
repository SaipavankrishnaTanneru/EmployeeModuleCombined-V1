import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useAuth } from "../../useAuth";
import { postFamilyInfo } from "../../queries/Employee_queries/onBoardingForms/postApi/useFamilyQueries";
import { useFamilyInfo } from "../../queries/Employee_queries/do/getpapis/useFamilyInfo";
import { familyFormSchema } from "../../utils/Employee_utils/OnboardingSchemas";

/* -------------------- UTIL -------------------- */

// "sai pavan krishna" → "Sai Pavan Krishna"
const toTitleCase = (value = "") =>
  value
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

/* -------------------- DEFAULTS -------------------- */

const memberDefaults = {
  fullName: "",
  adhaarNo: "",
  isLate: false,
  occupation: "",
  genderId: "",
  bloodGroupId: "",
  email: "",
  nationality: "Indian",
  phoneNumber: "",
  relationId: "",
  dateOfBirth: "",
  isDependent: false,
  isSriChaitanyaEmp: false,
  parentEmpId: "",
};

/* -------------------- HOOK -------------------- */

export const useFamilyInfoFormik = ({ tempId, onSuccess, dropdownData }) => {
  const { user } = useAuth();
  const hrEmployeeId = user?.employeeId || 5109;

  const { data: familyData } = useFamilyInfo(tempId);
  const [isDataPopulated, setIsDataPopulated] = useState(false);

  useEffect(() => {
    setIsDataPopulated(false);
  }, [tempId]);

  const formik = useFormik({
    initialValues: {
      father: { ...memberDefaults, relationId: 1, genderId: 1 },
      mother: { ...memberDefaults, relationId: 2, genderId: 2 },
      otherMembers: [],
      familyGroupPhotoFile: null,
    },

    validationSchema: familyFormSchema,
    validateOnBlur: true,
    validateOnChange: true,

    onSubmit: async (values) => {
      if (!tempId) return alert("Temporary ID is missing.");
      console.log("🚀 Submitting Family Info...", values);

      const getBloodGroupId = (value) => {
        if (!value) return 0;
        if (typeof value === "number") return value;

        const found = dropdownData?.bloodGroups?.find(
          bg => bg.name.toLowerCase() === value.toLowerCase()
        );
        return found ? found.id : 0;
      };

      const sanitizeMember = (member) => {
        // Date handling
        let formattedDOB = null;
        if (member.dateOfBirth) {
          const dateObj = new Date(member.dateOfBirth);
          if (!isNaN(dateObj.getTime())) {
            formattedDOB = dateObj.toISOString();
          }
        }

        return {
          fullName: toTitleCase(member.fullName),
          adhaarNo: member.adhaarNo ? Number(member.adhaarNo) : 0,
          isLate: Boolean(member.isLate),
          occupationId: 0,
          occupation: toTitleCase(member.occupation),
          genderId: Number(member.genderId) || 0,
          bloodGroupId: getBloodGroupId(member.bloodGroupId),
          email: member.email || "",
          nationality: toTitleCase(member.nationality || "Indian"),
          phoneNumber: member.phoneNumber ? String(member.phoneNumber) : "",
          relationId: Number(member.relationId) || 0,
          dateOfBirth: formattedDOB,
          isDependent: Boolean(member.isDependent),
          isSriChaitanyaEmp: Boolean(member.isSriChaitanyaEmp),
          parentEmpId:
            member.isSriChaitanyaEmp && member.parentEmpId
              ? Number(member.parentEmpId)
              : 0,
        };
      };

      const allMembers = [];

      if (values.father.fullName) allMembers.push(sanitizeMember(values.father));
      if (values.mother.fullName) allMembers.push(sanitizeMember(values.mother));
      values.otherMembers.forEach(mem => {
        if (mem.fullName) allMembers.push(sanitizeMember(mem));
      });

      const apiPayload = {
        familyMembers: allMembers,
        familyGroupPhotoPath: "string",
        createdBy: hrEmployeeId,
        updatedBy: hrEmployeeId,
      };

      try {
        await postFamilyInfo(tempId, apiPayload);
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error("❌ Failed to save family info:", error);
      }
    },
  });

  const { setValues } = formik;

  /* -------------------- EDIT MODE POPULATION -------------------- */

  useEffect(() => {
    if (
      !isDataPopulated &&
      Array.isArray(familyData) &&
      familyData.length > 0 &&
      dropdownData
    ) {
      const findBgId = (bgName) =>
        dropdownData.bloodGroups?.find(b => b.name === bgName)?.id || "";

      const findRelId = (relName) =>
        dropdownData.emergencyRelations?.find(r => r.name === relName)?.id || "";

      const formatDate = (dateStr) =>
        dateStr?.includes("T") ? dateStr.split("T")[0] : dateStr || "";

      const mapToForm = (apiMem) => ({
        ...memberDefaults,
        fullName: apiMem.name || "",
        email: apiMem.emailId || "",
        phoneNumber: apiMem.phoneNumber || "",
        occupation: apiMem.occupation || "",
        nationality: apiMem.nationality || "Indian",
        adhaarNo: apiMem.adhaarNo || "",
        bloodGroupId: findBgId(apiMem.bloodGroup),
        dateOfBirth: formatDate(apiMem.dateOfBirth),
        isLate: !!apiMem.isLate,
        isSriChaitanyaEmp: !!apiMem.isSriChaitanyaEmp,
        parentEmpId: apiMem.parentEmpId || "",
      });

      const fatherData = familyData.find(m => m.relation === "Father");
      const motherData = familyData.find(m => m.relation === "Mother");
      const otherData = familyData.filter(
        m => m.relation !== "Father" && m.relation !== "Mother"
      );

      setValues({
        father: fatherData
          ? { ...mapToForm(fatherData), relationId: 1, genderId: 1 }
          : { ...memberDefaults, relationId: 1, genderId: 1 },

        mother: motherData
          ? { ...mapToForm(motherData), relationId: 2, genderId: 2 }
          : { ...memberDefaults, relationId: 2, genderId: 2 },

        otherMembers: otherData.map(mem => ({
          ...mapToForm(mem),
          relationId: findRelId(mem.relation),
        })),

        familyGroupPhotoFile: null,
      });

      setIsDataPopulated(true);
    }
  }, [familyData, dropdownData, setValues, isDataPopulated]);

  return { formik };
};
