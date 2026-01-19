import { Field, getIn } from "formik";
import Asterisk from "../../../assets/Employee_asserts/SkillTest/Asterisk";
import FormError from "../FormikError/FormError";
import styles from "./GenderSelection.module.css";

const GenderSelection = ({
  values,
  setFieldValue,
  setFieldTouched,
  touched,
  errors,
  genderOptions = [],
  isSubmitted,
  externalErrors = {},
  onClearFieldError,
  name = "genderId", // Default to "genderId" for backward compatibility
}) => {
  return (
    <div className={styles.gender_selection_form_field}>
      <div className={styles.gender_selection_container}>
        {/* ================= LABEL ================= */}
        <div className={styles.gender_selection_field_label_wrapper}>
          <span className={styles.gender_selection_field_label}>
            Gender
            <Asterisk style={{ marginLeft: "4px" }} />
          </span>
        </div>

        {/* ================= OPTIONS ================= */}
        <div className={styles.gender_selection_options}>
          {genderOptions.map((option) => {
            const currentValue = getIn(values, name);
            const isActive = Number(currentValue) === Number(option.value);

            return (
              <label
                key={option.value}
                className={styles.gender_selection_label_wrapper}
              >
                {/* Hidden radio for accessibility */}
                <Field
                  type="radio"
                  name={name}
                  value={String(option.value)}
                  className={styles.gender_selection_radio}
                />

                <span
                  className={`${styles.gender_selection_label} ${isActive ? styles.gender_selection_active : ""
                    }`}
                  onClick={() => {
                    console.log("🟣 Gender selected:", option.value);

                    // Clear external backend error if exists
                    if (onClearFieldError && externalErrors[name]) {
                      onClearFieldError(name);
                    }

                    setFieldValue(name, Number(option.value));
                    setFieldTouched(name, true, false);
                  }}
                >
                  <span className={styles.gender_selection_text_with_icon}>
                    {option.label}
                  </span>
                </span>
              </label>
            );
          })}
        </div>

        {/* ================= ERROR ================= */}
        <FormError
          name={name}
          touched={touched}
          errors={errors}
          className={styles.gender_selection_error}
          showOnChange
          isSubmitted={isSubmitted}
          externalErrors={externalErrors}
        />
      </div>
    </div>
  );
};

export default GenderSelection;
