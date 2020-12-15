package com.project.isa.model.pk;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class OrderedMedicinePK implements Serializable {

    private static final long serialVersionUID = -5341344959858163305L;

    @Column(name = "order_id")
    private Long order_id;

    @Column(name="medicine_id")
    private Long medicine_id;
}
