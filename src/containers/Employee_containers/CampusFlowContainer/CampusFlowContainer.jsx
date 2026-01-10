import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Styles from "../CampusFlowContainer/CampusFlowContainer.module.css";

import { campusFlowApi } from "../../../queries/Employee_queries/campusflow/campusflow";

import CampusFlowProfileContainer from "../CampusFlowProfileContainer/CampusFlowProfileContainer";
import CampusFlowMiddle from "../../../components/Employee_components/CampusFlow/CampusFlowMiddlePart/CampusFlowMiddle";
import CampusFlowBottomNavTab from "../../../components/Employee_components/CampusFlow/CampusFlowBottomPart/CampusFlowBottomNavTab";
import CampusFlowPageHeader from "../../../components/Employee_components/CampusFlow/CampusFlowPageHeader";

const CampusFlowContainer = () => {
  const location = useLocation();
  const campusId =
  location.state?.campusId || sessionStorage.getItem("campusId");


  const [campusProfile, setCampusProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileError, setProfileError] = useState(null);

  useEffect(() => {
    if (!campusId) {
      setCampusProfile(null);
      return;
    }

    const fetchProfile = async () => {
      setLoadingProfile(true);
      setProfileError(null);
      try {
        const res = await campusFlowApi.getCampusProfile(campusId);
        console.log("✅ getCampusProfile response:", res);

        // Accept either:
        // - res.data is an array [ { ... } ]
        // - res.data is a single object { ... }
        const data = res?.data;
        let profile = null;

        if (Array.isArray(data) && data.length > 0) profile = data[0];
        else if (data && typeof data === "object") profile = data;
        else profile = null;

        setCampusProfile(profile);
      } catch (err) {
        console.error("❌ Campus Profile API error", err?.response?.data ?? err?.message ?? err);
        setProfileError(err?.response?.data ?? err?.message ?? "Failed to load campus profile");
        setCampusProfile(null);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [campusId]);

  return (
    <div className={Styles.CampusFlowContainer}>
      {/* FIXED SECTIONS */}
      <CampusFlowPageHeader/>
      <CampusFlowProfileContainer profile={campusProfile} />
      <CampusFlowMiddle />

      {/* SUB-TABS */}
      <CampusFlowBottomNavTab />

      {/* 🔥 ONLY THIS AREA CHANGES */}
      <div className={Styles.contentArea}>
        {loadingProfile && <div>Loading campus profile…</div>}
        {profileError && <div style={{ color: 'red' }}>Error loading profile</div>}
        <Outlet />
      </div>
    </div>
  );
};

export default CampusFlowContainer;