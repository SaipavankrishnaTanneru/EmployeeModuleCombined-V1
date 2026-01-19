// components/EmployeeOnBoardingForms/FormsEmployee/AgreementInfoForm/AgreementInfoForm.jsx

import React, { forwardRef, useImperativeHandle, useState } from "react";
import { FieldArray, FormikProvider } from "formik";
import styles from "./AgreementInfoForm.module.css";

// Assets & Widgets
import dividerline from "../../../../../assets/Employee_asserts/Qualification/border.svg";
import Dropdown from "../../../../../widgets/Employee_widgets/Dropdown/Dropdown";
import Inputbox from "../../../../..//widgets/Employee_widgets/Inputbox/InputBox";
import FormCheckbox from "../../../../../widgets/Employee_widgets/FormCheckBox/FormCheckBox";
import AddFieldWidget from "../../../../../widgets/Employee_widgets/AddFieldWidget/AddFieldWidget";

// Upload Assets
import UploadBeforeImg from '../../../../../assets/Employee_asserts/EmployeeOnBoarding/UploadBeforeImg.svg';
import UploadAfterImg from '../../../../../assets/Employee_asserts/EmployeeOnBoarding/UploadAfterImg.svg';
import SuccessUploadedImg from '../../../../../assets/Employee_asserts/EmployeeOnBoarding/SuccessUploadTick.svg';
import BeforeUploadedImg from '../../../../../assets/Employee_asserts/EmployeeOnBoarding/BeforeUploadEmptyC.svg';
import AgreementDocumentModal from "./AgreementDocumentModal";

// Logic & API Hooks
import { useAgreementInfoFormik } from "../../../../../hooks/Employee_hooks/useAgreementInfoFormik";
import { useActiveOrganizations } from "../../../../../queries/Employee_queries/onBoardingForms/postApi/useAgreementQueries";

const AgreementInfoForm = forwardRef(({ tempId, onSuccess }, ref) => {

  // 1. Init Formik Logic
  const { formik, initialCheque } = useAgreementInfoFormik({ tempId, onSuccess });
  const { values, handleChange, setFieldValue } = formik;

  // New State for Modal
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null, // "AGREEMENT" or "CHEQUE"
    itemIndex: null, // For cheque index
  });

  const openModal = (type, index = null) => {
    setModalState({ isOpen: true, type, itemIndex: index });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null, itemIndex: null });
  };

  // 2. Expose Submit
  useImperativeHandle(ref, () => ({
    submitForm: () => formik.submitForm(),
  }));

  // 3. Fetch Organizations
  const { data: organizations = [] } = useActiveOrganizations();

  // Handlers
  const handleOrgChange = (e) => {
    const name = e.target.value;
    const item = organizations.find((x) => (x.organizationName || x.name) === name);
    setFieldValue("agreementOrgId", item ? (item.organizationId || item.id) : "");
  };

  const handleCheckbox = (e) => {
    const isChecked = e?.target ? e.target.checked : e;
    setFieldValue("isCheckSubmit", isChecked);
  };

  const getOrgName = (id) => {
    if (!id) return "";
    const normalizedId = Number(id);
    const item = organizations.find(
      x => Number(x.organizationId || x.id) === normalizedId
    );
    return item ? (item.organizationName || item.name) : "";
  };

  // Helper to Render Upload Button
  const renderUploadButton = (documents, onClick) => {
    const hasFiles = Object.values(documents || {}).some(
      (files) => files && files.length > 0
    );

    return (
      <div className={styles.uploadDocumentsContainer}>
        <label className={styles.fieldLabel}><span>Upload Documents</span></label>
        <button
          type="button"
          className={`${styles.uploadDocumentsButton} ${hasFiles ? styles.uploadDocumentsButtonSuccess : ''}`}
          onClick={onClick}
        >
          {hasFiles ? (
            <>
              <div className={styles.uploadIconCircle}>
                <img src={UploadAfterImg} alt="upload" className={styles.uploadIcon} />
              </div>
              <span>Successfully Uploaded</span>
              <div className={styles.checkmarkCircle}>
                <img src={SuccessUploadedImg} alt="upload" className={styles.uploadIcon} />
              </div>
            </>
          ) : (
            <>
              <img src={UploadBeforeImg} alt="upload" className={styles.uploadIcon} />
              <span>Click Here To Upload </span>
              <div className={styles.checkmarkCircle}>
                <img src={BeforeUploadedImg} alt="upload" className={styles.uploadIcon} />
              </div>
            </>
          )}
        </button>
      </div>
    );
  };

  return (
    <div className={styles.formContainer}>
      <FormikProvider value={formik}>
        <form>

          {/* ================= AGREEMENT INFO ================= */}
          <div className={styles.section_header}>
            <h3 className={styles.section_title}>Agreement Info</h3>
            <img src={dividerline} alt="divider" className={styles.dividerImage} />
          </div>

          <div className={styles.formGridTwo}>
            {/* 1. Agreement Company */}
            <div className={styles.cell}>
              <Dropdown
                dropdownname="Agreement Company"
                name="agreementOrgId"
                results={organizations.map(x => x.organizationName || x.name)}
                value={getOrgName(values.agreementOrgId)}
                onChange={handleOrgChange}
              />
            </div>

            {/* 2. Agreement Type */}
            <div className={styles.cell}>
              <Inputbox
                label="Agreement Type"
                name="agreementType"
                value={values.agreementType}
                onChange={handleChange}
                placeholder="Enter Agreement Type"
              />
            </div>

            {/* 3. Upload Agreement Doc */}
            <div className={styles.cell}>
              {renderUploadButton(values.documents, () => openModal("AGREEMENT"))}
            </div>
          </div>


          {/* ================= CHEQUE INFO ================= */}
          <div className={styles.section_header}>
            <h3 className={styles.section_title}>Cheque Info</h3>
            <img src={dividerline} alt="divider" className={styles.dividerImage} />
          </div>

          <div className={styles.checkboxContainer}>
            <FormCheckbox
              name="isCheckSubmit"
              checked={values.isCheckSubmit}
              onChange={handleCheckbox}
            />
            <span className={styles.checkbox_label}>Provided Cheque?</span>
          </div>

          {/* DYNAMIC CHEQUES */}
          <FieldArray name="chequeDetails">
            {({ push, remove, replace }) => (
              <>
                {values.chequeDetails.map((cheque, index) => (
                  <AddFieldWidget
                    key={index}
                    index={index}
                    title={`Cheque ${index + 1}`}
                    enableFieldset={true}
                    showSimpleTitle={false}
                    onRemove={() => remove(index)}
                    onClear={() => replace(index, initialCheque)}
                  >
                    <div className={styles.formGridThree}>

                      <div className={styles.cell}>
                        <Inputbox
                          label="Cheque No"
                          name={`chequeDetails.${index}.chequeNo`}
                          value={cheque.chequeNo}
                          onChange={handleChange}
                          placeholder="Enter Cheque No"

                        />
                      </div>

                      <div className={styles.cell}>
                        <Inputbox
                          label="Bank Name"
                          name={`chequeDetails.${index}.chequeBankName`}
                          value={cheque.chequeBankName}
                          onChange={handleChange}
                          placeholder="Enter Bank Name"
                        />
                      </div>

                      <div className={styles.cell}>
                        <Inputbox
                          label="IFSC Code"
                          name={`chequeDetails.${index}.chequeBankIfscCode`}
                          value={cheque.chequeBankIfscCode}
                          onChange={handleChange}
                          placeholder="Enter IFSC Code"
                        />
                      </div>

                      {/* Upload Cheque Doc (New Row or in Grid?) 
                           Grid is grid-template-columns: repeat(3, 1fr). 
                           So 4th item wraps to next row.
                           Or user said "each cheque will have upload cheque".
                           Let's put it in the grid, it will wrap naturally.
                       */}
                      <div className={styles.cell}>
                        {renderUploadButton(cheque.documents, () => openModal("CHEQUE", index))}
                      </div>

                    </div>
                  </AddFieldWidget>
                ))}

                <div className={styles.addButtonContainer}>
                  <button
                    type="button"
                    className={styles.addButton}
                    onClick={() => push(initialCheque)}
                  >
                    + Add Cheque
                  </button>
                </div>
              </>
            )}
          </FieldArray>

        </form>
      </FormikProvider>

      {/* GLOBAL MODAL HANDLER */}
      <AgreementDocumentModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.type === "AGREEMENT" ? "Agreement Info" : `Cheque ${modalState.itemIndex + 1}`}
        subtitle="Upload Documents"
        documentTypes={
          modalState.type === "AGREEMENT"
            ? [{ id: 'agreementDoc', title: 'Agreement Document' }]
            : [{ id: 'chequeImage', title: 'Cheque Image' }]
        }
        documents={
          modalState.type === "AGREEMENT"
            ? (values.documents || {})
            : (values.chequeDetails[modalState.itemIndex]?.documents || {})
        }
        onDocumentsChange={(newDocuments) => {
          if (modalState.type === "AGREEMENT") {
            setFieldValue("documents", newDocuments);
          } else if (modalState.type === "CHEQUE") {
            setFieldValue(`chequeDetails.${modalState.itemIndex}.documents`, newDocuments);
          }
        }}
      />

    </div>
  );
});

export default AgreementInfoForm;