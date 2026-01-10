import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import styles from "./CampusFlowBottomNavTab.module.css";
import { campusFlowApi } from "../../../../queries/Employee_queries/campusflow/campusflow";

import SearchBox from "../../../../widgets/Employee_widgets/Searchbox/Searchbox";
import { searchicon } from "../../../../assets/Employee_asserts/onboarding_status_table/searchicon";
import { formatLabel } from "../../../../utils/Employee_utils/textUtils";

const CampusFlowBottomNavTab = () => {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const didAutoNavigateRef = useRef(false);

  useEffect(() => {
    campusFlowApi
      .getAllDepartments()
      .then((res) => {
        const data = res.data || [];
        setDepartments(data);

        // Auto-navigate to first department only once if URL doesn't already contain a department id
        if (data.length > 0 && !didAutoNavigateRef.current) {
          const pathname = location.pathname || "";
          // check whether any department id is present at the end of the pathname
          const hasDeptInPath = data.some((d) =>
            pathname.endsWith(`/${d.id}`) || pathname.endsWith(`/${d.id}/`)
          );

          if (!hasDeptInPath) {
            const firstDeptId = data[0].id?.toString() ?? String(data[0].id);
            const campusId = location.state?.campusId;
            navigate(firstDeptId, { replace: true, state: campusId ? { campusId } : undefined });
          }

          didAutoNavigateRef.current = true;
        }
      })
      .catch((err) => {
        console.error("❌ Department API error", err);
      });
  }, [navigate, location]);

  // 🔍 filter tabs by search text (compare normalized display)
  const filteredDepartments = departments.filter((dept) =>
    formatLabel(dept.name).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      {/* 🔹 TOP BAR */}
      <div className={styles.topBar}>
        <h3>Departments</h3>

        <SearchBox
          searchicon={searchicon}
          placeholder="Search for anything"
          type="rectangle"
          width="331px"
          value={search}
          onValueChange={setSearch}
        />
      </div>

      {/* 🔹 TABS */}
      <div className={styles.tabs}>
        {filteredDepartments.map((dept) => (
          <NavLink
  key={dept.id}
  to={dept.id.toString()}
  state={{
    ...location.state,
    departmentName: formatLabel(dept.name), // ✅ ADD THIS
  }}
  className={({ isActive }) =>
    `${styles.tab} ${isActive ? styles.activeTab : ""}`
  }
>
  {formatLabel(dept.name)}
</NavLink>

        ))}
      </div>
    </div>
  );
};

export default CampusFlowBottomNavTab;