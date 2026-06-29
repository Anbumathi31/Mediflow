import axios from "axios";

const BASE_URL = "http://localhost:8080/doctors";

export const getAllDoctors = () => {
    return axios.get(BASE_URL);
};

export const createDoctor = (doctor) => {
    return axios.post(BASE_URL, doctor);
};

export const updateDoctor = (id, doctor) => {
    return axios.put(`${BASE_URL}/${id}`, doctor);
};

export const deleteDoctor  = (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
};