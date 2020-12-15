package com.project.isa.model.pk;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class PharmacyInventoryPK {

    @Column(name = "pharmacy_id")
    private Long pharmacy_id;

    @Column(name="medicine_id")
    private Long medicine_id;
}
