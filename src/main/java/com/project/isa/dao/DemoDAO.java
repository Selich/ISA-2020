// package com.project.isa.dao;

// import java.util.ArrayList;
// import java.util.HashSet;
// import java.util.List;
// import java.util.Objects;
// import java.util.Set;

// public class KupacDAO extends KorisnikAdresaDAO {

//     private Set<KorpaDTO> ranijeKupljeni = new HashSet<>();
// //    private KorpaDTO korpa;
//     private Long poeni;

//     public KupacDAO() { }

// //    public KupacDAO(KorisnikAdresaDAO kaDAO) {
// //        super(kaDAO.getId(), kaDAO.getKorisnickoIme(), kaDAO.getLozinka(), kaDAO.getIme(), kaDAO.getPrezime(), "KUPAC",
// //            kaDAO.getTelefon(), kaDAO.getEmail(), kaDAO.getAdresa());
// //    }
// //
// //    public KupacDAO(Korisnik kaDAO, Korpa k, Set<Korpa> rk, Long poeni) {
// //        super(kaDAO.getId(), kaDAO.getKorisnickoIme(), kaDAO.getLozinka(), kaDAO.getIme(), kaDAO.getPrezime(), "KUPAC",
// //            kaDAO.getTelefon(), kaDAO.getEmail(), kaDAO.getAdresa());
// //        this.korpa = new KorpaDTO(k);
// //        this.poeni = poeni;
// //        Set<KorpaDTO> arr = new HashSet<>();
// //        for (Korpa korpa : rk) {
// //            arr.add(new KorpaDTO(korpa));
// //        }
// //        this.ranijeKupljeni = arr;
// //
// //    }

// //    public KupacDAO(Kupac k) {
// //        super(k.getId(), k.getKorisnickoIme(), k.getLozinka(), k.getIme(), k.getPrezime(), k.getUloga(), k.getTelefon(),
// //            k.getEmail(), k.getAdresa());
// //        this.poeni = k.getPoeni();
// //        if (k.getKorpa() != null) {
// //            this.korpa = new KorpaDTO(k.getKorpa());
// //        } else {
// //            this.korpa = new KorpaDTO();
// //        }
// //        if (k.getRanijeKupljeni() != null) {
// //            Set<KorpaDTO> arr = new HashSet<>();
// //            for (Korpa korpa : k.getRanijeKupljeni()) {
// //                arr.add(new KorpaDTO(korpa));
// //            }
// //            this.ranijeKupljeni = arr;
// //        } else {
// //            this.ranijeKupljeni = new HashSet<>();
// //        }
// //
// //    }

// //    public Set<KorpaDTO> getRanijeKupljeni() {
// //        return this.ranijeKupljeni;
// //    }
// //
// //    public void setRanijeKupljeni(Set<KorpaDTO> ranijeKupljeni) {
// //        this.ranijeKupljeni = ranijeKupljeni;
// //    }
// //
// //    public KorpaDTO getKorpa() {
// //        return this.korpa;
// //    }
// //
// //    public void setKorpa(KorpaDTO korpa) {
// //        this.korpa = korpa;
// //    }
// //
// //    public Long getPoeni() {
// //        return this.poeni;
// //    }
// //
// //    public void setPoeni(Long poeni) {
// //        this.poeni = poeni;
// //    }
// //
// //    public Set<ArtiklDAO> getOmiljeni() {
// //        return this.omiljeni;
// //    }
// //
// //    public void setOmiljeni(Set<ArtiklDAO> omiljeni) {
// //        this.omiljeni = omiljeni;
// //    }
// //
// //    public KupacDAO ranijeKupljeni(Set<KorpaDTO> ranijeKupljeni) {
// //        this.ranijeKupljeni = ranijeKupljeni;
// //        return this;
// //    }
// //
// //    public KupacDAO korpa(KorpaDTO korpa) {
// //        this.korpa = korpa;
// //        return this;
// //    }
// //
// //    public KupacDAO poeni(Long poeni) {
// //        this.poeni = poeni;
// //        return this;
// //    }
// //
// //    public KupacDAO omiljeni(Set<ArtiklDAO> omiljeni) {
// //        this.omiljeni = omiljeni;
// //        return this;
// //    }
// //
// //    @Override
// //    public boolean equals(Object o) {
// //        if (o == this)
// //            return true;
// //        if (!(o instanceof KupacDAO)) {
// //            return false;
// //        }
// //        KupacDAO kupacDAO = (KupacDAO) o;
// //        return Objects.equals(ranijeKupljeni, kupacDAO.ranijeKupljeni) && Objects.equals(korpa, kupacDAO.korpa)
// //            && Objects.equals(poeni, kupacDAO.poeni) && Objects.equals(omiljeni, kupacDAO.omiljeni);
// //    }
// //
// //    @Override
// //    public int hashCode() {
// //        return Objects.hash(ranijeKupljeni, korpa, poeni, omiljeni);
// //    }
// //
// //    @Override
// //    public String toString() {
// //        return "{" + " ranijeKupljeni='" + getRanijeKupljeni() + "'" + ", korpa='" + getKorpa() + "'" + ", poeni='"
// //            + getPoeni() + "'" + ", omiljeni='" + getOmiljeni() + "'" + "}";
// //    }
// //
// //    private Set<ArtiklDAO> omiljeni = new HashSet<>();

// }
