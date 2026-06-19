package com.mediflow.dto;

import lombok.Data;

@Data
public class AppointmentRequest {

    private String appointmentDate;
    private Long patientId;
    private Long doctorId;
}