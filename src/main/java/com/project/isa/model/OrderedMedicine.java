package com.project.isa.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="OREDERED_MEDICINE")
public class OrderedMedicine implements Serializable {

    @EmbeddedId
    private OrderedMedicinePK id;

    @ManyToOne
    @MapsId("order_id")
    @JoinColumn(name="ORDER_ID")
    private Order order;

    @ManyToOne
    @MapsId("medicine_id")
    @JoinColumn(name="MEDICINE_ID")
    private Medicine medicine;

    @Column(name="AMOUNT",nullable = false)
    private Long amount;


}
