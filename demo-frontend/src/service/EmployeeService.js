import axios from "axios";

const BASE_URL = "http://localhost:8981/api/employee";

export const listEmployees = () => {
    return axios.get(`${BASE_URL}/get-all`);
};

export const createEmployee = (employee) => {
    return axios.post(`${BASE_URL}/create`, employee);
};

// Fetch employee by id
export const getEmployeeById = (id) => {
    return axios.get(`${BASE_URL}/get-by/${id}`);
};

// Update employee
export const updateEmployee = (id, employee) => {
    return axios.put(`${BASE_URL}/update-by/${id}`, employee);
};

// Corrected delete function with DELETE method
export const deleteEmployee = (id) => {
    return axios.delete(`${BASE_URL}/delete-by/${id}`);
};
