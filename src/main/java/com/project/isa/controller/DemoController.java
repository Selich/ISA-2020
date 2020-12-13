package com.project.isa.controller;

@RestController
@RequestMapping(value = "/api/demo")
public class DemoController {

    private KupacService kupacService;
    private DostavljacService dostavljacService;

    @Autowired
    public KorisnikController(KupacService kupacService, DostavljacService dostavljacService) {
        this.kupacService = kupacService;
        this.dostavljacService = dostavljacService;
    }

    // ! get list
    @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<KorisnikAdresaDAO>> getAll() {
        List<Kupac> list = this.kupacService.findAll();
        List<Dostavljac> list2 = this.dostavljacService.findAll();
        List<KorisnikAdresaDAO> newList = new ArrayList<>();
        for (Kupac k : list) {
            KorisnikAdresaDAO nov = new KorisnikAdresaDAO(k.getId(), k.getKorisnickoIme(), k.getLozinka(), k.getIme(),
                k.getPrezime(), k.getUloga(), k.getTelefon(), k.getEmail(), k.getAdresa());
            newList.add(nov);
        }
        for (Dostavljac k : list2) {
            KorisnikAdresaDAO nov = new KorisnikAdresaDAO(k.getId(), k.getKorisnickoIme(), k.getLozinka(), k.getIme(),
                k.getPrezime(), k.getUloga(), k.getTelefon(), k.getEmail(), k.getAdresa());
            newList.add(nov);
        }
        return new ResponseEntity<>(newList, HttpStatus.OK);
    }

    // // get one :: id -> korisnik
    // @GetMapping(
    // value = "/{id}",
    // produces = MediaType.APPLICATION_JSON_UTF8_VALUE
    // )
    // public ResponseEntity<KorisnikAdresaDAO> getOne(@PathVariable(name = "id")
    // Long id){
    // Korisnik korisnik = this.korisnikService.findOne(id);
    // KorisnikAdresaDAO newKorisnik = new KorisnikAdresaDAO(
    // korisnik.getId(),
    // korisnik.getKorisnickoIme(),
    // korisnik.getLozinka(),
    // korisnik.getIme(),
    // korisnik.getPrezime(),
    // korisnik.getUloga(),
    // korisnik.getTelefon(),
    // korisnik.getEmail(),
    // korisnik.getAdresa()
    // );

    // return new ResponseEntity<>(newKorisnik, HttpStatus.OK);
    // }

    // // create :: korisnik -> korisnik
    @PostMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity create(@RequestBody KorisnikAdresaDAO kaDAO) throws Exception {
        if (kaDAO.getUloga().equals("KUPAC")) {
            Kupac korisnik = new Kupac(null, kaDAO.getKorisnickoIme(), kaDAO.getLozinka(), kaDAO.getIme(),
                kaDAO.getPrezime(), null, kaDAO.getTelefon(), kaDAO.getEmail(), kaDAO.getAdresa());
            Kupac newKorisnik = kupacService.create(korisnik);
            return new ResponseEntity<>(HttpStatus.OK);
        } else if (kaDAO.getUloga().equals("DOSTAVLJAC")) {
            Dostavljac dostavljac = new Dostavljac(null, kaDAO.getKorisnickoIme(), kaDAO.getLozinka(), kaDAO.getIme(),
                kaDAO.getPrezime(), null, kaDAO.getTelefon(), kaDAO.getEmail(), kaDAO.getAdresa(), null);
            Dostavljac newKorisnik = dostavljacService.create(dostavljac);
            return new ResponseEntity<>(HttpStatus.OK);

        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    // ! PUT
    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<KorisnikAdresaDAO> update(@PathVariable Long id, @RequestBody KorisnikAdresaDAO changedUser)
        throws Exception {

        Kupac kupacOld = kupacService.findOne(id);
        if (kupacOld == null) {
            Dostavljac dostavljacOld = dostavljacService.findOne(id);
            if (dostavljacOld == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            if (changedUser.getUloga().equals("KUPAC") || changedUser.getUloga().equals("ADMIN")) {
                dostavljacService.delete(id);
                kupacService.create(new Kupac(changedUser));
            } else {
                dostavljacService.update(new Dostavljac(changedUser));
            }
            return new ResponseEntity<>(changedUser, HttpStatus.OK);
        } else {
            if (changedUser.getUloga().equals("DOSTAVLJAC")) {
                kupacService.delete(id);
                dostavljacService.create(new Dostavljac(changedUser));
            } else {
                kupacService.update(new Kupac(changedUser));
            }
            return new ResponseEntity<>(changedUser, HttpStatus.OK);
        }
    }

    // ! DELETE
    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Korisnik> delete(@PathVariable(name = "id") Long id) {
        Kupac korisnik = kupacService.delete(id);
        Dostavljac dostavljac = dostavljacService.delete(id);
        return new ResponseEntity<Korisnik>(korisnik, HttpStatus.OK);
    }
}


