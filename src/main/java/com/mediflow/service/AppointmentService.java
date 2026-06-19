package com.mediflow.service;

import com.mediflow.entity.Doctor;
import com.mediflow.entity.Patient;
import com.mediflow.exception.DoctorNotFoundException;
import com.mediflow.exception.PatientNotFoundException;
import com.mediflow.repository.AppointmentRepository;
import com.mediflow.repository.PatientRepository;
import com.mediflow.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mediflow.dto.AppointmentRequest;
import com.mediflow.entity.Appointment;


@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    public Appointment createAppointment(
            AppointmentRequest request) {

        Patient patient = patientRepository.findById(
                        request.getPatientId())
                .orElseThrow(() ->
                        new PatientNotFoundException(
                                "Patient not found with id "
                                        + request.getPatientId()));

        Doctor doctor = doctorRepository.findById(
                        request.getDoctorId())
                .orElseThrow(() ->
                        new DoctorNotFoundException(
                                "Doctor not found with id "
                                        + request.getDoctorId()));

        return null;
    }
}
