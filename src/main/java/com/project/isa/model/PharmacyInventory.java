package com.project.isa.model;

import com.project.isa.model.auth.Supplier;
import com.project.isa.model.pk.InventoryPK;
import com.project.isa.model.pk.PharmacyInventoryPK;

import javax.persistence.*;

@Entity
@Table(name="pharmacy_inventories")
public class PharmacyInventory {

    @EmbeddedId
    private PharmacyInventoryPK id;

    @ManyToOne
    @MapsId("pharmacy_id")
    @JoinColumn(name="pharmacy_id")
    private Pharmacy pharmacy;

    @ManyToOne
    @MapsId("medicine_id")
    @JoinColumn(name="medicine_id")
    private Medicine medicine;

    @Column(name="amount", nullable = false)
    private Long quantity;

    @Column(name="price")
    private Long price;
}
