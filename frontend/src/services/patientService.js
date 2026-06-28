import axios from "axios";

const BASE_URL = "http://localhost:8080/patients";

export const getAllPatients = () => {
    return axios.get(BASE_URL);
};

export const createPatient = (patient) => {
    return axios.post(BASE_URL, patient);
};

export const updatePatient = (id, patient) => {
    return axios.put(`${BASE_URL}/${id}`, patient);
};

export const deletePatient = (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
};