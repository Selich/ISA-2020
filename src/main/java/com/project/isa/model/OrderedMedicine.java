package com.project.isa.model;

import javax.persistence.*;

import com.project.isa.model.pk.OrderedMedicinePK;

import java.io.Serializable;

@Entity
@Table(name="ordered_medicine")
public class OrderedMedicine implements Serializable {

    private static final long serialVersionUID = 468913487073588994L;

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
