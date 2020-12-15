package com.project.isa.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="ordered_medicine")
public class OrderedMedicine implements Serializable {

    @EmbeddedId
    private OrderedMedicinePK id;

    @ManyToOne
    @MapsId("order_id")
    @JoinColumn(name="order_id")
    private Order order;

    @ManyToOne
    @MapsId("medicine_id")
    @JoinColumn(name="medicine_id")
    private Medicine medicine;

    @Column(name="amount", nullable = false)
    private Long amount;


}
