package com.project.isa.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class OrderedMedicinePK implements Serializable {

    @Column(name="order_id")
    private Long order_id;

    @Column(name="medicine_id")
    private Long medicine_id;
}
