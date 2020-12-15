package com.project.isa.model;

import javax.persistence.Column;
import java.io.Serializable;

public class OrderedMedicinePK implements Serializable {

    @Column(name="ORDER_ID")
    private Long order_id;

    @Column(name="MEDICINE_ID")
    private Long medicine_id;
}
