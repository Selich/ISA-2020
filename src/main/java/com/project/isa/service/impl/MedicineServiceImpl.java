package com.project.isa.service.impl;


import com.project.isa.model.Medicine;
import com.project.isa.repository.MedicineRepository;
import com.project.isa.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineServiceImpl implements MedicineService {


    private MedicineRepository medicineRepository;

    @Override
    public List<Medicine> findAll() {
        return medicineRepository.findAll();
    }

    @Override
    public Medicine findOne(Long id) {
        return medicineRepository.findOneById(id);
    }

    @Override
    public Medicine findOneByCode(Long code) {
        return medicineRepository.findByCode(code);
    }

    @Override
    public List<Medicine> findAllByType(String type){
        return medicineRepository.findAllByType(type);
    }

    @Override
    public Medicine create(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    @Override
    public Medicine update(Medicine medicine) throws Exception {
        return medicineRepository.save(medicine);
    }

    @Override
    public Medicine delete(Long id) {
        Medicine medicine = medicineRepository.findOneById(id);
        medicineRepository.delete(medicine);
        return medicine;
    }
}
