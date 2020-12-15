package com.project.isa.model.auth;

import java.util.List;

import javax.persistence.Entity;

import com.project.isa.model.TimeSlot;

@Entity
public class Patient extends User{




    List<TimeSlot> timeslots;

    List<TimeSlot> history;

    /*
    @ManyToMany(mappedBy = "patientsAlergicTo")
    Set<Medicine> alergicTo=new HashSet<Medicine>();
    * */


}
