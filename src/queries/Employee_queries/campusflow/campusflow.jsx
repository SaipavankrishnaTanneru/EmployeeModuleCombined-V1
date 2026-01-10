import axios from "axios";

const BASE_URL = "http://localhost:8080/api/campus-flow";
const COMMON_BASE = "http://localhost:9000";

export const campusFlowApi = {
  getAllBusinessTypes: async () => {
    try {
      const res = await axios.get(`${BASE_URL}/getallbusineestype`);
      return res;
    } catch (err) {
      throw err;
    }
  },

  getCities: async () => {
    try {
      const res = await axios.get(`${COMMON_BASE}/common/get/cities`);
      return res;
    } catch (err) {
      throw err;
    }
  },

  getCampuses: async (cityId, businessTypeId) => {
    try {
      const res = await axios.get(`${BASE_URL}/getcampus/${cityId}/${businessTypeId}`);
      return res;
    } catch (err) {
      throw err;
    }
  },

  getCampusProfile: async (campusId) => {
    const res = await axios.get(
      `${BASE_URL}/campus-profile/${campusId}`
    );
    return res;
  },

  getManagedByEmployees: async (campusId) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/byCampus/${campusId}`
    );
    return res;
  } catch (err) {
    throw err;
  }
},

getAllDepartments: async () => {
  return axios.get(`${BASE_URL}/alldepartments`);
},

getEmployeesByDepartment: async (departmentId, campusId) => {
  return axios.get(
    `${BASE_URL}/getemployees/${departmentId}/${campusId}`
  );
},


};