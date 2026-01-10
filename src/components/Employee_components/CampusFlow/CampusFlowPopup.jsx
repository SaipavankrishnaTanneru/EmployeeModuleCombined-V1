import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CampusFlowPopup.module.css";
import backArrow from "../../../assets/Employee_asserts/campusFlowIcons/BackArrow.svg";
import Dropdown from "../../../widgets/Employee_widgets/Dropdown/Dropdown";
import Button from "../../../widgets/Employee_widgets/Button/Button";
import rightarrow from "../../../assets/Employee_asserts/managermappingsearch/rightarrow";
import { campusFlowApi } from "../../../queries/Employee_queries/campusflow/campusflow";
import { formatLabel } from "../../../utils/Employee_utils/textUtils";

const CampusFlowPopup = () => {
  const navigate = useNavigate();

  // -------------------- STATE --------------------
  const [selectedLocation, setSelectedLocation] = useState(""); // display name
  const [selectedLocationId, setSelectedLocationId] = useState(null); // city id (API)

  const [selectedBusinessType, setSelectedBusinessType] = useState(""); // businessTypeId (number/string)
  const [selectedBusinessTypeName, setSelectedBusinessTypeName] = useState(""); // display name

  const [selectedCampus, setSelectedCampus] = useState(""); // campus name (display)
  const [selectedCampusId, setSelectedCampusId] = useState(null); // campus id (API)

  const [businessTypes, setBusinessTypes] = useState([]);
  const [loadingBusinessTypes, setLoadingBusinessTypes] = useState(false);

  const [cities, setCities] = useState([]); // full city objects
  const [citiesError, setCitiesError] = useState(null);
  const [locationList, setLocationList] = useState([]); // array of formatted city names

  const [campuses, setCampuses] = useState([]); // full campus objects
  const [campusList, setCampusList] = useState([]); // array of formatted campus names
  const [loadingCampuses, setLoadingCampuses] = useState(false);

  // -------------------- API CALLS --------------------
  // Business types (on mount)
  useEffect(() => {
    const fetchBusinessTypes = async () => {
      setLoadingBusinessTypes(true);
      try {
        const res = await campusFlowApi.getAllBusinessTypes();
        console.log("getAllBusinessTypes - full response:", res);
        const data = res?.data ?? [];
        setBusinessTypes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching business types:", err?.response?.data ?? err?.message ?? err);
        setBusinessTypes([]);
      } finally {
        setLoadingBusinessTypes(false);
      }
    };

    fetchBusinessTypes();
  }, []);

  // Cities (on mount, with retry support)
  const fetchCities = async () => {
    setCitiesError(null);
    try {
      const res = await campusFlowApi.getCities();
      const data = res?.data ?? [];
      const cityObjects = Array.isArray(data) ? data : [];
      setCities(cityObjects);
      setLocationList(cityObjects.map((c) => formatLabel(c.name)));
      console.log("Fetched cities:", data);
    } catch (err) {
      const serverPayload = err?.response?.data ?? err?.message ?? err;
      console.error("Error fetching cities:", serverPayload);
      setCities([]);
      setLocationList([]);
      setCitiesError("Failed to load locations. Please retry.");
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  // Campuses (when both cityId and businessTypeId are present)
  useEffect(() => {
    const fetchCampuses = async () => {
      if (!selectedLocationId || !selectedBusinessType) {
        setCampuses([]);
        setCampusList([]);
        setSelectedCampus("");
        setSelectedCampusId(null);
        return;
      }

      setLoadingCampuses(true);
      try {
        const res = await campusFlowApi.getCampuses(selectedLocationId, selectedBusinessType);
        console.log("getCampuses - full response:", res);
        const data = res?.data ?? [];
        const items = Array.isArray(data) ? data : [];

        setCampuses(items);

        const names = items
          .map((c) => formatLabel(c.cmpsName ?? c.name ?? c.campusName ?? c.campus ?? ""))
          .filter(Boolean);
        setCampusList(names);
      } catch (err) {
        console.error("Error fetching campuses:", err?.response?.data ?? err?.message ?? err);
        setCampuses([]);
        setCampusList([]);
      } finally {
        setLoadingCampuses(false);
      }
    };

    fetchCampuses();
  }, [selectedLocationId, selectedBusinessType]);

  // -------------------- HANDLERS --------------------
  const handleLocationChange = (e) => {
    const displayName = e.target.value;
    setSelectedLocation(displayName);

    // find and store the city id using normalized label matching
    const city = cities.find((c) => formatLabel(c.name) === displayName);
    setSelectedLocationId(city ? city.id ?? city.cityId ?? null : null);

    // reset dependent selections
    setSelectedBusinessType("");
    setSelectedBusinessTypeName("");
    setSelectedCampus("");
    setSelectedCampusId(null);
    setCampuses([]);
    setCampusList([]);
  };

  const handleBusinessTypeChange = (e) => {
    const name = e.target.value;
    setSelectedBusinessTypeName(name);

    const bt = businessTypes.find((b) => formatLabel(b.businessTypeName) === name);
    const btId = bt ? (typeof bt.businessTypeId === "number" ? bt.businessTypeId : Number(bt.businessTypeId)) : "";
    setSelectedBusinessType(btId);

    // reset campus selection
    setSelectedCampus("");
    setSelectedCampusId(null);
    setCampuses([]);
    setCampusList([]);
  };

  const handleCampusChange = (e) => {
    const name = e.target.value;
    setSelectedCampus(name);

    // find campus object and set id by normalized matching
    const campusObj = campuses.find(
      (c) => formatLabel(c.cmpsName ?? c.name ?? c.campusName ?? c.campus ?? "") === name
    );
    setSelectedCampusId(campusObj ? (campusObj.cmpsId ?? campusObj.id ?? campusObj.campusId ?? null) : null);
  };

  const handleCheckEmployees = () => {
    // optional: persist campusId in sessionStorage for other areas
    if (selectedCampusId) sessionStorage.setItem("campusId", String(selectedCampusId));

    navigate("/scopes/employee/campus-flow-popup/campusflowpage", {
      state: {
        location: selectedLocation,           // name (display)
        locationId: selectedLocationId,       // city id
        businessType: selectedBusinessType,   // id
        businessTypeName: selectedBusinessTypeName,
        campus: selectedCampus,               // name
        campusId: selectedCampusId,           // id (CampusFlowContainer expects this)
      },
    });
  };

  // -------------------- UI --------------------
  return (
    <div className={styles.popupContainer}>
      {/* Header */}
      <div className={styles.header}>
        <img src={backArrow} alt="Back" className={styles.backIcon} onClick={() => navigate(-1)} />
        <h2 className={styles.title}>Campus Flow</h2>
      </div>

      {/* Body */}
      <div className={styles.content}>
        {/* Location */}
        <Dropdown dropdownname="Location" name="Location" results={locationList} value={selectedLocation} onChange={handleLocationChange} />
        {citiesError && (
          <div style={{ color: "#b00020", marginTop: 8 }}>
            {citiesError}{" "}
            <button type="button" onClick={() => fetchCities()} style={{ marginLeft: 8 }}>
              Retry
            </button>
          </div>
        )}

        {/* Business Type (API) */}
        <Dropdown
          dropdownname="Business Type"
          name="Business Type"
          results={businessTypes.map((bt) => formatLabel(bt.businessTypeName))}
          value={selectedBusinessTypeName}
          onChange={handleBusinessTypeChange}
          disabled={loadingBusinessTypes}
        />

        {/* Campus */}
        <Dropdown
          dropdownname="Campus"
          name="Campus"
          results={campusList}
          value={selectedCampus}
          onChange={handleCampusChange}
          disabled={loadingCampuses || campusList.length === 0}
        />

        {/* Button */}
        <div className={styles.buttonContainer}>
          <Button
            buttonname="Check Employees"
            righticon={rightarrow}
            onClick={handleCheckEmployees}
            variant="primary"
            width="199px"
            disabled={!selectedLocationId || !selectedBusinessType || !selectedCampusId}
          />
        </div>
      </div>
    </div>
  );
};

export default CampusFlowPopup;