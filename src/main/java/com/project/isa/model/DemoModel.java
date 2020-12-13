//package selic.web.online_prodavnica.model;
//
//import javax.persistence.*;
//
//import selic.web.online_prodavnica.controller.KorisnikAdresaDAO;
//
//import java.util.HashSet;
//import java.util.Objects;
//import java.util.Set;
//
//@Entity(name = "kupac")
//public class Kupac extends Korisnik {
//
//    @ManyToMany
//    @JoinTable(name = "ranije_kupljeni", joinColumns = @JoinColumn(name = "kupac_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "korpa_id", referencedColumnName = "id"))
//    private Set<Korpa> ranijeKupljeni = new HashSet<>();
//    @OneToOne
//    private Korpa korpa;
//    @Column(name = "poeni")
//    private Long poeni;
//    @ManyToMany
//    @JoinTable(name = "omiljeni", joinColumns = @JoinColumn(name = "kupac_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "artikal_id", referencedColumnName = "id"))
//    private Set<Artikl> omiljeni = new HashSet<>();
//
//    public Kupac() {
//    }
//
//    public Kupac(Kupac kupac) {
//        super(kupac.getId(),kupac.getKorisnickoIme(), kupac.getLozinka(), kupac.getIme(), kupac.getPrezime(), "KUPAC",
//            kupac.getTelefon(), kupac.getEmail(), kupac.getAdresa());
//        this.poeni = kupac.getPoeni();
//        this.omiljeni = kupac.getOmiljeni();
//        this.ranijeKupljeni = kupac.getRanijeKupljeni();
//    }
//    public Kupac(KorisnikAdresaDAO kupac) {
//        super(kupac.getId(), kupac.getKorisnickoIme(), kupac.getLozinka(), kupac.getIme(), kupac.getPrezime(), kupac.getUloga(),
//            kupac.getTelefon(), kupac.getEmail(), kupac.getAdresa());
//    }
//
//    public Kupac(Long id, String korisnickoIme, String lozinka, String ime, String prezime, Uloga uloga, String telefon,
//                 String email, String adresa) {
//        super(id,korisnickoIme, lozinka, ime, prezime, "KUPAC", telefon, email, adresa);
//    }
//
//    public Set<Korpa> getRanijeKupljeni() {
//        return this.ranijeKupljeni;
//    }
//
//    public void setRanijeKupljeni(Set<Korpa> ranijeKupljeni) {
//        this.ranijeKupljeni = ranijeKupljeni;
//    }
//
//    public Korpa getKorpa() {
//        return this.korpa;
//    }
//
//    public void setKorpa(Korpa korpa) {
//        this.korpa = korpa;
//    }
//
//    public Long getPoeni() {
//        return this.poeni;
//    }
//
//    public void setPoeni(Long poeni) {
//        this.poeni = poeni;
//    }
//
//    public Set<Artikl> getOmiljeni() {
//        return this.omiljeni;
//    }
//
//    public void setOmiljeni(Set<Artikl> omiljeni) {
//        this.omiljeni = omiljeni;
//    }
//
//    public Kupac ranijeKupljeni(Set<Korpa> ranijeKupljeni) {
//        this.ranijeKupljeni = ranijeKupljeni;
//        return this;
//    }
//
//    public Kupac korpa(Korpa korpa) {
//        this.korpa = korpa;
//        return this;
//    }
//
//    public Kupac poeni(Long poeni) {
//        this.poeni = poeni;
//        return this;
//    }
//
//    public Kupac omiljeni(Set<Artikl> omiljeni) {
//        this.omiljeni = omiljeni;
//        return this;
//    }
//
//    @Override
//    public boolean equals(Object o) {
//        if (o == this)
//            return true;
//        if (!(o instanceof Kupac)) {
//            return false;
//        }
//        Kupac kupac = (Kupac) o;
//        return Objects.equals(ranijeKupljeni, kupac.ranijeKupljeni) && Objects.equals(korpa, kupac.korpa)
//            && Objects.equals(poeni, kupac.poeni) && Objects.equals(omiljeni, kupac.omiljeni);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(ranijeKupljeni, korpa, poeni, omiljeni);
//    }
//
//    @Override
//    public String toString() {
//        return "{" + " ranijeKupljeni='" + getRanijeKupljeni() + "'" + ", korpa='" + getKorpa() + "'" + ", poeni='"
//            + getPoeni() + "'" + ", omiljeni='" + getOmiljeni() + "'" + "}";
//    }
//
//}
