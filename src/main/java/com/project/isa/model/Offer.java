package com.project.isa.model;

import org.hibernate.annotations.ValueGenerationType;

import javax.persistence.*;
import java.util.Date;

//Svaki dobavljac moze da daje ponudu za svaku porudzbenicu ciji sadrzaj ima na stanju-navodi cenu i rok isporuke
@Entity
@Table(name="OFFERS")
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    private Order order;


    /*@ManyToOne
    private Supplier supplier;
    */

    @Column(name="PRIECE")
    private Integer price;

    @Column(name="DELIVERY_DATE")
    private Date deliveryDate;
}
