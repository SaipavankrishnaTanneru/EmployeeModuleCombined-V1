import React from "react";
import styles from "./SideLowerTabs.module.css";

import helpLineIcon from '../../../../assets/Employee_asserts/sidebaricons/helpline_icon.svg';
import verticalLine from '../../../../assets/Employee_asserts/sidebaricons/vertical_line.svg';
import documentationIcon from '../../../../assets/Employee_asserts/sidebaricons/documentation_icon.svg';
import bookOutlineicon from '../../../../assets/Employee_asserts/sidebaricons/bookoutline_icon.svg';

const SideLowerTabs = () => {
  return (
    <div className={styles.lower_tabs}>
      <figure>
        <img src={bookOutlineicon} />
      </figure>

      <figure>
        <img src={verticalLine} />
      </figure>

      <figure>
        <img src={documentationIcon} />
      </figure>

      <figure>
        <img src={verticalLine} />
      </figure>

      <figure>
        <img src={helpLineIcon} />
      </figure>
    </div>
  );
};

export default SideLowerTabs;
