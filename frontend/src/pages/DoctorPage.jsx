import { useEffect, useState } from "react";
import { getAllDoctors, createDoctor, updateDoctor, deleteDoctor} from "../services/doctorService";

function DoctorPage() {
const [doctors, setDoctors] = useState([]);

const [name, setName] = useState("");
const [specialization, setSpecialization] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");

const [editingId, setEditingId] = useState(null);

const fetchDoctors = async () => {
    const response = await getAllDoctors();
    setDoctors(response.data);
};

const saveDoctor = async () => {
    try {

        const doctor = {
            name,
            specialization,
            phoneNumber
        };

        await createDoctor(doctor);

        fetchDoctors();

        setName("");
        setSpecialization("");
        setPhoneNumber("");

    } catch (error) {
        console.error(error);
    }
};

const editDoctor = (doctor) => {
    setName(doctor.name);
    setSpecialization(doctor.specialization);
    setPhoneNumber(doctor.phoneNumber);

    setEditingId(doctor.doctorId);
}

const updateDoctorData = async () => {
    const doctor = { name,specialization,phoneNumber};
    await updateDoctor(editingId, doctor);
    fetchDoctors();

    setEditingId(null);

    setName("");
    setSpecialization("");
    setPhoneNumber("");
}

const deleteDoctorData = async (id) => {
    await deleteDoctor(id);
    fetchDoctors();
}

useEffect(() => {
    fetchDoctors();
}, []);

console.log(doctors);

return (
    <div>
        <h1>Doctor Management</h1>

        <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />

        <input
            type="text"
            placeholder="Enter Specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
        />
        <input
            type="text"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
        />

        {editingId ? (
    <button onClick={updateDoctorData}>Update Doctor</button>
) : (
    <button onClick={saveDoctor}>Save Doctor</button>
)}

        <h2>Doctor List</h2>

        <table border="1" cellPadding="10">
            <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Specialization</th>
            <th>Phone Number</th>
            <th>Actions</th>
        </tr>
    </thead>

            <tbody>
                {doctors.map((doctor) => (
                    <tr key={doctor.doctorId}>
                        <td>{doctor.doctorId}</td>
                        <td>{doctor.name}</td>
                        <td>{doctor.specialization}</td>
                        <td>{doctor.phoneNumber}</td>
                        <td>
                            <button onClick={() => editDoctor(doctor)}>Edit</button>
                            <button onClick={() => deleteDoctorData(doctor.doctorId)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <p>Name: {name}</p>
    <p>Specialization: {specialization}</p>
    <p>Phone Number: {phoneNumber}</p>
</div>
)}

export default DoctorPage;
