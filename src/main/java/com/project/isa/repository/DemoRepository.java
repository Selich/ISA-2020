//package selic.web.online_prodavnica.repository;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//
//import selic.web.online_prodavnica.model.Korisnik;
//import selic.web.online_prodavnica.model.Kupac;
//
//import java.util.List;
//
//public interface KupacRepository extends JpaRepository<Kupac, Long> {
//
//
//    List<Kupac> findByImeOrPrezime(String ime, String prezime);
//
//    List<Kupac> findAll();
//
//    List<Kupac> findAllByIme(String name);
//
//    Kupac findOneById(Long Id);
//
//    Kupac findByKorisnickoIme(String korisnickoIme);
//
//}
