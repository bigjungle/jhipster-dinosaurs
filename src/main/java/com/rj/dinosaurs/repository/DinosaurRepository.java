package com.rj.dinosaurs.repository;

import com.rj.dinosaurs.domain.Dinosaur;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Dinosaur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DinosaurRepository extends JpaRepository<Dinosaur, Long> {

}
