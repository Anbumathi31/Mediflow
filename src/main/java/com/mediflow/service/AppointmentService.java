package com.mediflow.service;

import com.mediflow.repository.AppointmentRepository;
import com.mediflow.repository.PatientRepository;
import com.mediflow.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;
}
