package com.project.isa.model.auth;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "suppliers")
public class Supplier extends User{



    public Supplier() {
        super();
    }

    /*
    @OneToMany(mappedBy = "supplier")
    private Set<Inventory> inventories=new HashSet<Inventory>();
    */
}
