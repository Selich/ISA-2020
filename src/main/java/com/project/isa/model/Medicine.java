package com.project.isa.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="MEDICINE")
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="NAME")
    private String name;

    //Mozda napraviti enum- Antibiotik,anestetik...
    @Column(name="TYPE")
    private String type;

    //Oblik-prasak,pilula...
    @Column(name="FORM")
    private String form;

    @Column(name="CONTENTS")
    private String contents;

    @Column(name="PRODUCER")
    private String producer;

    //Da li je potreban recept da bi dobio ovaj lek
    @Column(name="NEED_PERSCRIPTION")
    private Boolean needPerscription;

    //Napomena
    @Column(name="INFO")
    private String info;

    //Alternativni lek
    @ManyToMany
    @JoinTable(name = "ALTERNATIVES",
            joinColumns =
            @JoinColumn(name = "MEDICINE", referencedColumnName = "id"),
            inverseJoinColumns =
            @JoinColumn(name = "ALTERNATIVE", referencedColumnName = "id"))
    private Set<Medicine> alternatives= new HashSet<Medicine>();

    @OneToMany(mappedBy = "order")
    private Set<OrderedMedicine> orderedMedicine=new HashSet<OrderedMedicine>();

}
