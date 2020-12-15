package com.project.isa.model.auth;

import javax.persistence.Entity;
import javax.persistence.Table;

import javax.validation.constraints.*;



@Entity
@Table(name = "supplier")
public class Supplier extends User{



    public Supplier() {
        super();
    }

    /*
     @OneToMany(mappedBy = "supplier")
    private Set<Inventory> inventories=new HashSet<Inventory>();
    */
}
