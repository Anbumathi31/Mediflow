package com.mediflow.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appointmentId;

    private String appointmentDate;

    @ManyToOne
    private Patient patient;

    @ManyToOne
    private Doctor doctor;

    private String symptoms;

    private String status;
}
