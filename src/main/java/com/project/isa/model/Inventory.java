package com.project.isa.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import com.project.isa.model.auth.Supplier;
import com.project.isa.model.pk.InventoryPK;

@Entity
@Table(name="inventories")
public class Inventory implements Serializable {

    private static final long serialVersionUID = 7441071296316209069L;

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
