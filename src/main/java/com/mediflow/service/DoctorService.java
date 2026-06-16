package com.mediflow.service;

import com.mediflow.entity.Doctor;
import com.mediflow.exception.DoctorNotFoundException;
import com.mediflow.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() ->
                        new DoctorNotFoundException(
                                "Doctor not found with id " + id));
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor updateDoctor(Long id, Doctor updatedDoctor) {

        Doctor doctor = doctorRepository.findById(id)
                .orElse(null);

        if (doctor != null) {
            doctor.setName(updatedDoctor.getName());
            doctor.setSpecialization(updatedDoctor.getSpecialization());
            doctor.setPhoneNumber(updatedDoctor.getPhoneNumber());

            return doctorRepository.save(doctor);
        }

        return null;
    }

    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }
}
