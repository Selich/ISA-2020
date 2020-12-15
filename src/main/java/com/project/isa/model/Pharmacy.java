package com.project.isa.model;

import com.project.isa.model.auth.Dermatologist;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="pharmacies")
public class Pharmacy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    //Mozda poseban address Objekat
    @Column(name="address")
    private String address;

    @Column(name="description")
    private String description;


    @OneToMany(mappedBy = "pharmacy")
    private Set<PharmacyInventory> medicines= new HashSet<PharmacyInventory>();

    /*
    * Dodati Listu Ocena Apoteke
    * Dodati Listu Zalbi Apoteke
    * */


    /*
    * Dodati OneToMany sa terminima za dermatologe
    * private Set<TimeSlot> freeTimeSlots= new Hashset<TimeSlot>();
    *  */

    /*
    Dodati vezu sa zaposlenim dermatolozima-Svaki radi u tacno jednoj
    @OneToMany(mappedBy = "pharmacy")
    private Set<Dermatologist> dermatologists= new HashSet<Dermatologist>();
    */

    /*
    Dodati vezu sa zaposlenim farmaceutima-FARMACEUT MOZE DA RADI NA VISE MESTA
    Za svako mesto gde radi ima posebno radno vreme-Moguce da treba medjutabela umesto
    ManyToMany
    @ManyToMany
    @JoinTable(
            name = "pharmacy_pharmacists",
            joinColumns = @JoinColumn(name = "pharmacy_id",referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "pharmacyst_id",referencedColumnName = "id"))
    Set<Pharmacist> pharmacists= new HashSet<Pharmacist>();
    * */


}
