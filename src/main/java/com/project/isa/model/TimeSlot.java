package com.project.isa.model;

import java.util.Date;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.project.isa.model.auth.User;

@Entity
@Table(name="timeslots")
public class TimeSlot {


    private Long id;
    private String type;

    private User patient;
    private User doctor;
    private Pharmacy pharmacy;

    private Date start;
    private Date end;


    public TimeSlot() {
    }

    public TimeSlot(Long id, String type, User patient, User doctor, Pharmacy pharmacy, Date start, Date end) {
        this.id = id;
        this.type = type;
        this.patient = patient;
        this.doctor = doctor;
        this.pharmacy = pharmacy;
        this.start = start;
        this.end = end;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public User getPatient() {
        return this.patient;
    }

    public void setPatient(User patient) {
        this.patient = patient;
    }

    public User getDoctor() {
        return this.doctor;
    }

    public void setDoctor(User doctor) {
        this.doctor = doctor;
    }

    public Pharmacy getPharmacy() {
        return this.pharmacy;
    }

    public void setPharmacy(Pharmacy pharmacy) {
        this.pharmacy = pharmacy;
    }

    public Date getStart() {
        return this.start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEnd() {
        return this.end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    public TimeSlot id(Long id) {
        this.id = id;
        return this;
    }

    public TimeSlot type(String type) {
        this.type = type;
        return this;
    }

    public TimeSlot patient(User patient) {
        this.patient = patient;
        return this;
    }

    public TimeSlot doctor(User doctor) {
        this.doctor = doctor;
        return this;
    }

    public TimeSlot pharmacy(Pharmacy pharmacy) {
        this.pharmacy = pharmacy;
        return this;
    }

    public TimeSlot start(Date start) {
        this.start = start;
        return this;
    }

    public TimeSlot end(Date end) {
        this.end = end;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof TimeSlot)) {
            return false;
        }
        TimeSlot timeSlot = (TimeSlot) o;
        return Objects.equals(id, timeSlot.id) && Objects.equals(type, timeSlot.type) && Objects.equals(patient, timeSlot.patient) && Objects.equals(doctor, timeSlot.doctor) && Objects.equals(pharmacy, timeSlot.pharmacy) && Objects.equals(start, timeSlot.start) && Objects.equals(end, timeSlot.end);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, type, patient, doctor, pharmacy, start, end);
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", type='" + getType() + "'" +
            ", patient='" + getPatient() + "'" +
            ", doctor='" + getDoctor() + "'" +
            ", pharmacy='" + getPharmacy() + "'" +
            ", start='" + getStart() + "'" +
            ", end='" + getEnd() + "'" +
            "}";
    }


    // 1, 'derm',  1, 4, 2, 12-12-2020 13:12, 12-12-2020 14:12,
    // derm
    // SELECT * FROM timeslots WHERE type='derm' AND patient=NULL AND doctor='$1';
    // sysadmin new term
    // INSERT INTO timeslot VALUES ('derm', NULL, $1, $2, $3, $3 + delta$4)


    //
    // 'pharm', 1, 4

}
