package com.project.isa.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.project.isa.model.auth.User;

@Entity
@Table(name="timeslot")
public class TimeSlot {



    private Long id;
    private String type;

    private User patient;
    private User doctor;
    private Pharmacy pharmacy;

    private Date start;
    private Date end;

    // 1, 'derm',  1, 4, 2, 12-12-2020 13:12, 12-12-2020 14:12,
    // derm
    // SELECT * FROM timeslots WHERE type='derm' AND patient=NULL AND doctor='$1';
    // sysadmin new term
    // INSERT INTO timeslot VALUES ('derm', NULL, $1, $2, $3, $3 + delta$4)


    //
    // 'pharm', 1, 4

}
