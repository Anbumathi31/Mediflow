package com.mediflow.service;

import com.mediflow.entity.Patient;
import com.mediflow.exception.PatientNotFoundException;
import com.mediflow.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public Patient getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new PatientNotFoundException(
                        "Patient not found with id " + id));
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient updatePatient(Long id, Patient updatedPatient) {

        Patient patient = patientRepository.findById(id)
                .orElse(null);

        if (patient != null) {
            patient.setName(updatedPatient.getName());
            patient.setAge(updatedPatient.getAge());
            patient.setGender(updatedPatient.getGender());

            return patientRepository.save(patient);
        }

        return null;
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}
