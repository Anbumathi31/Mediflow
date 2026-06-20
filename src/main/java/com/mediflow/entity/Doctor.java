package com.mediflow.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long doctorId;

    @NotBlank(message = "Name cannot be empty")
    private String name;

    @NotBlank(message = "Specialization cannot be empty")
    private String specialization;

    @NotBlank(message = "Phone number cannot be empty")
    private String phoneNumber;
}
