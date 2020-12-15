package com.project.isa.model;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //Rok dokle se moze dati ponuda
    @Column(name="deadline")
    private Date deadline;

    @OneToMany(mappedBy = "order")
    private Set<Offer> offers= new HashSet<Offer>();

    @OneToMany(mappedBy = "order")
    private Set<OrderedMedicine> orderedMedicine=new HashSet<OrderedMedicine>();
}
