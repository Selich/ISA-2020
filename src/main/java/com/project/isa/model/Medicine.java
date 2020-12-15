package com.project.isa.model;

import com.project.isa.model.auth.Patient;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

//Pitanje-Da li veza LEK prepisan PACIJENTU je obican ManyToMany ili ima dodatna obelezja
//Razlika PREPORUKE i PREPISANOG LEKA

@Entity
@Table(name="medicine")
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="code",unique = true)
    private Long code;

    @Column(name="name")
    private String name;

    //Mozda napraviti enum- Antibiotik,anestetik...
    @Column(name="type")
    private String type;

    //Oblik-prasak,pilula...
    @Column(name="form")
    private String form;

    @Column(name="contents")
    private String contents;

    @Column(name="producer")
    private String producer;

    //Da li je potreban recept da bi dobio ovaj lek
    // TODO: Refactor name @Selich
    @Column(name="is_needed_prescription")
    private Boolean isNeededPrescription;

    //Napomena
    @Column(name="info")
    private String info;

    //Alternativni lek
    @ManyToMany
    @JoinTable(name = "alternatives",
            joinColumns =
            @JoinColumn(name = "medicine", referencedColumnName = "id"),
            inverseJoinColumns =
            @JoinColumn(name = "alternative", referencedColumnName = "id"))
    private Set<Medicine> alternatives= new HashSet<Medicine>();

    @OneToMany(mappedBy = "medicine")
    private Set<OrderedMedicine> orderedMedicine=new HashSet<OrderedMedicine>();

    @OneToMany(mappedBy = "medicine")
    private Set<Inventory> inventories=new HashSet<Inventory>();

    @ManyToMany
    @JoinTable(
            name = "alergic_to",
            joinColumns = @JoinColumn(name = "medicine_id",referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "patient_id",referencedColumnName = "id"))
    Set<Patient> patientsAlergicTo= new HashSet<Patient>();

}
