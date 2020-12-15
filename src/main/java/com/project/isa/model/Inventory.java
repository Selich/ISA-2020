package com.project.isa.model;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.project.isa.model.auth.Supplier;

@Entity
@Table(name="inventories")
public class Inventory {

    private Supplier supplier;
    private Medicine medicine;
    private Long quantity;

}
