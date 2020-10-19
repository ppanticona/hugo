package com.ppanticona.repository;

import com.ppanticona.domain.HistoricoCaja;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the HistoricoCaja entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HistoricoCajaRepository extends MongoRepository<HistoricoCaja, String> {
}
