package com.mediflow.service;

import com.mediflow.entity.Doctor;
import com.mediflow.entity.Patient;
import com.mediflow.exception.AppointmentNotFoundException;
import com.mediflow.exception.DoctorNotFoundException;
import com.mediflow.exception.PatientNotFoundException;
import com.mediflow.repository.AppointmentRepository;
import com.mediflow.repository.PatientRepository;
import com.mediflow.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mediflow.dto.AppointmentRequest;
import com.mediflow.entity.Appointment;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.*;



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

        Appointment appointment = new Appointment();

        appointment.setAppointmentDate(
                request.getAppointmentDate());

        appointment.setStatus("BOOKED");

        appointment.setPatient(patient);

        appointment.setDoctor(doctor);

        appointment.setSymptoms(
                request.getSymptoms());
        appointment.setStatus("BOOKED");


        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment getAppointmentById(Long id){
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new AppointmentNotFoundException(
                        "Appointment not found with id " + id));
    }

    public Appointment updateAppointment(
            Long id,
            AppointmentRequest request) {

        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() ->
                        new AppointmentNotFoundException(
                                "Appointment not found with id " + id));

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

        appointment.setAppointmentDate(
                request.getAppointmentDate());

        appointment.setPatient(patient);

        appointment.setDoctor(doctor);

        appointment.setSymptoms(
                request.getSymptoms());

        return appointmentRepository.save(appointment);
    }

    public void deleteAppointment(Long id) {

        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() ->
                        new AppointmentNotFoundException(
                                "Appointment not found with id " + id));

        appointmentRepository.delete(appointment);
    }

    public Appointment updateStatus(
            Long id,
            String status) {

        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() ->
                        new AppointmentNotFoundException(
                                "Appointment not found with id " + id));

        appointment.setStatus(status);

        return appointmentRepository.save(appointment);
    }
}
