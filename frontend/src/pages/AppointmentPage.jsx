import { useEffect, useState } from "react";
import {getAllAppointments,createAppointment,updateAppointment,deleteAppointment} from "../services/appointmentService";
import { getAllPatients } from "../services/patientService";
import { getAllDoctors } from "../services/doctorService";

function AppointmentPage() {
    const [appointments, setAppointments] = useState([]);

    const [patients, setPatients] = useState([]);

    const [doctors, setDoctors] = useState([]);

    const [appointmentDate, setAppointmentDate] = useState("");
    const [patientId, setPatientId] = useState("");
    const [doctorId, setDoctorId] = useState("");
    const [symptoms, setSymptoms] = useState("");

    const [editingId, setEditingId] = useState(null);

    const fetchAppointments = async () => {
    const response = await getAllAppointments();
    setAppointments(response.data);      
};

const fetchPatients = async () => {
    const response = await getAllPatients();
    setPatients(response.data);
};

const fetchDoctors = async () => {
    const response = await getAllDoctors();
    setDoctors(response.data);
};

const saveAppointment = async () => {
    try {

        const appointment = {
            appointmentDate,
            patientId,
            doctorId,
            symptoms
        };

        await createAppointment(appointment);

        fetchAppointments();

        setAppointmentDate("");
        setPatientId("");
        setDoctorId("");
        setSymptoms("");

    } catch (error) {
        console.error(error);
    }
};

const editAppointment = (appointment) => {

    setAppointmentDate(appointment.appointmentDate);

    setPatientId(appointment.patient.patientId);

    setDoctorId(appointment.doctor.doctorId);

    setSymptoms(appointment.symptoms);

    setEditingId(appointment.appointmentId);
};

const updateAppointmentData = async () => {

    const appointment = {
        appointmentDate,
        patientId,
        doctorId,
        symptoms
    };

    await updateAppointment(editingId, appointment);

    fetchAppointments();

    setEditingId(null);

    setAppointmentDate("");
    setPatientId("");
    setDoctorId("");
    setSymptoms("");
};

const deleteAppointmentData = async (id) => {

    await deleteAppointment(id);

    fetchAppointments();
};

    useEffect(() => {
    fetchAppointments();
    fetchPatients();
    fetchDoctors();
}, []);

console.log(appointments);

return(
    <div>
    <h2>Appointment List</h2>

    <input
    type="date"
    value={appointmentDate}
    onChange={(e) => setAppointmentDate(e.target.value)}
/>
    <select
    value={patientId}
    onChange={(e) => setPatientId(e.target.value)}
>
    <option value="">Select Patient</option>

    {patients.map((patient) => (
        <option
            key={patient.patientId}
            value={patient.patientId}
        >
            {patient.name}
        </option>
    ))}
</select>
    <select
    value={doctorId}
    onChange={(e) => setDoctorId(e.target.value)}
>
    <option value="">Select Doctor</option>

    {doctors.map((doctor) => (
        <option
            key={doctor.doctorId}
            value={doctor.doctorId}
        >
            {doctor.name}
        </option>
    ))}
</select>
    <input
    type="text"
    placeholder="Enter Symptoms"
    value={symptoms}
    onChange={(e) => setSymptoms(e.target.value)}
/>
    {editingId ? (
    <button onClick={updateAppointmentData}>
        Update Appointment
    </button>
) : (
    <button onClick={saveAppointment}>
        Save Appointment
    </button>
)}

<table border="1" cellPadding="10">
    <thead>
        <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Symptoms</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
    </thead>

    <tbody>
        {appointments.map((appointment) => (
            <tr key={appointment.appointmentId}>
                <td>{appointment.appointmentId}</td>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.patient.name}</td>
                <td>{appointment.doctor.name}</td>
                <td>{appointment.symptoms}</td>
                <td>{appointment.status}</td>
                <td>
                    <button onClick={() => editAppointment(appointment)}>
                        Edit
                    </button>
                    <button onClick={() => deleteAppointmentData(appointment.appointmentId)}>
                        Delete
                    </button>
                </td>
            </tr>
        ))}
    </tbody>
</table>
</div>
)
}

export default AppointmentPage;