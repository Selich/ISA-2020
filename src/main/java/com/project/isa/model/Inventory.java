package com.project.isa.model;

import javax.persistence.*;

import com.project.isa.model.auth.Supplier;

import java.io.Serializable;

@Entity
@Table(name="inventories")
public class Inventory implements Serializable {

    @EmbeddedId
    private InventoryPK id;

    @ManyToOne
    @MapsId("supplier_id")
    @JoinColumn(name="supplier_id")
    private Supplier supplier;

    @ManyToOne
    @MapsId("medicine_id")
    @JoinColumn(name="medicine_id")
    private Medicine medicine;

    @Column(name="amount", nullable = false)
    private Long quantity;
}
