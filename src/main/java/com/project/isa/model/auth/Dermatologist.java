package com.project.isa.model.auth;

import java.util.List;

import javax.persistence.Entity;

import com.project.isa.model.TimeSlot;

@Entity
public class Dermatologist extends User{

    List<TimeSlot> timeslots;
    //  term derm, flag prihvacena
    //  term pharm

}

