package com.project.isa.model.pk;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class InventoryPK implements Serializable {

    private static final long serialVersionUID = 4233844029237427676L;

    @Column(name = "supplier_id")
    private Long supplier_id;

    @Column(name="medicine_id")
    private Long medicine_id;
}
