package com.mediflow.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.mediflow.entity.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {

}
