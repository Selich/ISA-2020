package com.project.isa.repository;

import java.util.List;

import com.project.isa.model.Medicine;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicineRepository extends CrudRepository<Medicine,Long> {

    Medicine findOneById(Long id);

    List<Medicine> findAll();

    Medicine findByCode(Long code);

    List<Medicine> findAllByType(String type);

}
