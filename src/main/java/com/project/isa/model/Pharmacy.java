package com.project.isa.model;

import javax.persistence.*;

@Entity
@Table(name="PHARMACIES")
public class Pharmacy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;




}
