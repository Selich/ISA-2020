package com.project.isa.model;

import javax.persistence.*;

import com.project.isa.model.auth.Supplier;

import java.util.Date;

//Svaki dobavljac moze da daje ponudu za svaku porudzbenicu ciji sadrzaj ima na stanju-navodi cenu i rok isporuke
@Entity
@Table(name="offers")
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Order order;

    @ManyToOne
    private Supplier supplier;

    @Column(name="price")
    private Integer price;

    @Column(name="delivery_date")
    private Date deliveryDate;
}
