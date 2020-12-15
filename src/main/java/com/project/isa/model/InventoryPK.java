package com.project.isa.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class InventoryPK implements Serializable {

    @Column(name="supplier_id")
    private Long supplier_id;

    @Column(name="medicine_id")
    private Long medicine_id;
}
