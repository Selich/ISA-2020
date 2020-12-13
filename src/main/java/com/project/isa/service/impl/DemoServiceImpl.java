//package project.isa.service.impl;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//
//import selic.web.online_prodavnica.model.Kupac;
//import selic.web.online_prodavnica.repository.KupacRepository;
//import selic.web.online_prodavnica.service.KupacService;
//
//import java.util.List;
//
//@Service
//public class KupacServiceImpl implements KupacService {
//
//    @Autowired
//    private KupacRepository kupacRepository;
//
//    @Override
//    public Kupac findByKorisnickoIme(String korisnickoIme) throws Exception {
//        Kupac korisnik = this.kupacRepository.findByKorisnickoIme(korisnickoIme);
//        return korisnik;
//    }
//    @Override
//    public List<Kupac> findAll() {
//        return kupacRepository.findAll();
//    }
//
//    @Override
//    public Kupac create(Kupac korisnik) { return kupacRepository.save(korisnik); }
//
//    @Override
//    public Kupac findOne(Long id) { return kupacRepository.findOneById(id); }
//
//    @Override
//    public Kupac update(Kupac kupac) throws Exception {
//        return kupacRepository.save(kupac);
//    }
//
//    @Override
//    public Kupac delete(Long id) {
//        Kupac kupac = kupacRepository.getOne(id);
//        kupacRepository.delete(kupac);
//        return kupac;
//    }
//
//
//}
