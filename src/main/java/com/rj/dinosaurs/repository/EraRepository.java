package com.rj.dinosaurs.repository;

import com.rj.dinosaurs.domain.Era;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Era entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EraRepository extends JpaRepository<Era, Long> {

}
