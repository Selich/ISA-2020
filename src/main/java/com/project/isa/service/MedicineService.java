package com.project.isa.service;

import com.project.isa.model.Medicine;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MedicineService {

    List<Medicine> findAll();

    Medicine findOne(Long id);

    Medicine findOneByCode(Long code);
    List<Medicine> findAllByType(String type);

    public Medicine create(Medicine medicine);

    public Medicine update(Medicine medicine) throws Exception;

    public Medicine delete(Long id);

}
