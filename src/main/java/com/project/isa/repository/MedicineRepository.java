package com.project.isa.repository;

import com.project.isa.model.Medicine;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface MedicineRepository extends CrudRepository<Medicine,Long> {

    Medicine findOneById(Long id);

    List<Medicine> findAll();

    Medicine findByCode(Long code);

    List<Medicine> findAllByType(String type);

}
