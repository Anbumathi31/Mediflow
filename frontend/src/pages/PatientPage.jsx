import { useEffect, useState } from "react";
import { getAllPatients, createPatient, updatePatient, deletePatient} from "../services/patientService";

function PatientPage() {
    const [patients, setPatients] = useState([]);

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");

    const [editingId, setEditingId] = useState(null);

    const fetchPatients = async () => {
      const response = await getAllPatients();
      setPatients(response.data);
    }; 

    const deletePatientData = async (id) => {

    await deletePatient(id);

    fetchPatients();

};

    const savePatient = async () => {
    try {
        const patient = {
            name,
            age,
            gender
        };

        await createPatient(patient);

        fetchPatients();

        setName("");
        setAge("");
        setGender("");
    } catch (error) {
        console.error(error);
    }
};

const editPatient = (patient) => {
    setName(patient.name);
    setAge(patient.age);
    setGender(patient.gender);

    setEditingId(patient.patientId);
}

const updatePatientData = async () => {

    const patient = {
        name,
        age,
        gender
    };

    await updatePatient(editingId, patient);

    fetchPatients();

    setEditingId(null);

    setName("");
    setAge("");
    setGender("");
};

    useEffect(() => {
    fetchPatients();
}, []);

    console.log(patients);

    return (
    <div>
        <h2>Add Patient</h2>

        <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />

        <input
            type="number"
            placeholder="Enter Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
/>
        <input
            type="text"
            placeholder="Enter Gender   "
            value={gender}
            onChange={(e) => setGender(e.target.value)}
        />

        {editingId ? (
    <button onClick={updatePatientData}>Update Patient</button>
) : (
    <button onClick={savePatient}>Save Patient</button>
)}

        <h1>Patient List</h1>

        <table border="1" cellPadding="10">
            <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Actions</th>
        </tr>
    </thead>

            <tbody>
                {patients.map((patient) => (
                    <tr key={patient.patientId}>
                        <td>{patient.patientId}</td>
                        <td>{patient.name}</td>
                        <td>{patient.age}</td>
                        <td>{patient.gender}</td>
                        <td>
                            <button onClick={() => editPatient(patient)}>Edit</button>
                            <button onClick={() => deletePatientData(patient.patientId)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <p>Name: {name}</p>
<p>Age: {age}</p>
<p>Gender: {gender}</p>

    </div>
);
}

export default PatientPage;