package com.mediflow.controller;

import com.mediflow.dto.AppointmentRequest;
import com.mediflow.entity.Appointment;
import com.mediflow.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping
    public Appointment createAppointment(
            @RequestBody AppointmentRequest request) {

        return appointmentService.createAppointment(request);
    }
}
