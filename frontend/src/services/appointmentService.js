import axios from "axios";

const BASE_URL = "http://localhost:8080/appointments";

export const getAllAppointments = () => {
    return axios.get(BASE_URL);
};

export const createAppointment = (appointment) => {
    return axios.post(BASE_URL, appointment);
};

export const updateAppointment = (id, appointment) => {
    return axios.put(`${BASE_URL}/${id}`, appointment);
};

export const deleteAppointment = (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
};