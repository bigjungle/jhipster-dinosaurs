package com.rj.dinosaurs.repository;

import com.rj.dinosaurs.domain.Clade;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Clade entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CladeRepository extends JpaRepository<Clade, Long> {

}
