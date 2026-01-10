// src/components/EmployeeComponents/EmployeeNavtab.js

import React from "react";
import NavTabsWithIcons from '../../../../widgets/Employee_widgets/NavTabs/NavTabWithIcons';
// import { onboardingSteps } from "../../../config/onboardingTabs";
import { onboardingSteps } from "../../../../components/Employee_components/OnbardingTabs/onboardingTabs";
const EmployeeNavTabOnBoarding = ({ basePath, steps }) => {
  // Use the passed 'steps' prop (filtered list) if available.
  // Otherwise, fall back to the imported 'onboardingSteps'.
  const tabsToRender = steps || onboardingSteps;

  return <NavTabsWithIcons tabs={tabsToRender} basePath={basePath} />;
};

export default EmployeeNavTabOnBoarding;