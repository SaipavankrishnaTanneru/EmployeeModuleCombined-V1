import React from "react";
import { Card, CardContent, Avatar } from "@mui/material";
import styles from "./EmployeeCardWithoutCheckBox.module.css";

const EmployeeCardWithoutCheckBox = ({
  employee,
  id,
  name,
  dept,
  image,
  styleImg,
  level,
  status,
}) => {
  const data = employee || { id, name, dept, image, styleImg, level, status };

  const getStatusClass = (st) => {
    const normalized = st?.toLowerCase().trim();

    switch (normalized) {
      case "full time":
      case "permanent":
      case "full_time/regular":
        return styles.statusFullTime;

      case "contract":
        return styles.statusContract;

      case "left":
        return styles.statusLeft;

      default:
        return styles.statusDefault;
    }
  };

  return (
    <Card className={styles.studentCard}>
      <div className={styles.studentCardContainer}>
        {/* Avatar */}
        <Avatar
          alt={data.name}
          src={data.image}
          className={styles.studentAvatar}
        />

        <CardContent className={styles.studentCardContent}>
          {/* INFO */}
          <div className={styles.studentInfo}>
            <p
              className={`${styles.studentId} ${styles.ellipsis}`}
              title={data.id}
            >
              {data.id}
            </p>

            <p
              className={`${styles.studentName} ${styles.ellipsis}`}
              title={data.name}
            >
              {data.name}
            </p>

            <p
              className={`${styles.studentFather} ${styles.ellipsis}`}
              title={data.dept}
            >
              {data.dept}
            </p>
          </div>

          {/* Decorative Line */}
          {data.styleImg && (
            <figure className={styles.studentImageStyleContainer}>
              <img
                src={data.styleImg}
                className={styles.studentImageStyle}
                alt="decoration"
              />
            </figure>
          )}

          {/* CHIPS */}
          <div className={styles.studentChipContainer}>
            <span
              className={`${styles.studentCurrentClassBlue} ${styles.ellipsis}`}
              title={data.level}
            >
              {data.level}
            </span>

            <span
              className={`${getStatusClass(data.status)} ${styles.ellipsis}`}
              title={data.status}
            >
              {data.status}
            </span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default EmployeeCardWithoutCheckBox;