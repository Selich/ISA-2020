## Project for the course "Internet Software Architectures"
Tim 9
- Dušan Urošević IN16/2017
- Nikola Selić IN43/2017

Baza-PostgreSQL
Backup file **dump.sql**.

Potrebno je prvo u pgAdminu napraviti Server i Bazu sa sledecim kredencijalima
```
username: isa_super
password: pass
database: isa_super
port: 5432
```

Za formiranje i popunjavanje tabela koristiti sledecu komandu u terminalu
```
psql -U isa_super -d isa_super < dump.sql
```

## Frontend app, web -> AWS ElasticBean,
## Backend app, api -> Digital Ocean, dokku

### Run scripts
Pozivanje:
- api dev
```bash
./run_api.sh
```
- web frontend dev
```bash
./run_api.sh
```
- zajedno
```bash
./run_api.sh
```
Da bi generisao nove zahteve potrebno je generisati nove graphql upite

```bash
yarn gen
```

### Dependencies for dev
1) Instalirati node.js
2) Instalirati yarn
[link](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
3) Instalirati postgres
[link](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

3) Instaliraj windows terminal
[link](https://www.microsoft.com/en-us/p/windows-terminal/9n0dx20hk701)
4) Instalirace sve neophodne bibiloteke
```bash
cd <Naziv Projekta>
yarn install
```

### Potrebno
- [ ] Kesiranje
- [ ] Message queue obradjivanje zahteva
- [ ] Validation 
- [ ] Auth
- [ ] Mail confirm
- [ ] Forgot password
- [ ] Travis CI
- [ ] Employee posle ulogovanja sa nekom sifrom koju je admin dodao u bazu, salje notifikaciju, employee menja sifru
- [ ] Async
- [ ] Transactions ( upis u bazu ) ( 2 situacije )


### Pitanja
- Da li mogu farmaceuti i dermatolozi u istoj tabeli
Activating the environment
### Frontend
- React 
- Redux
- Next.js
- Chakra UI
- Jest
### Backend
- Express.js
- Redis
- Azure
### Slanje e-maila
Za slanje emaila nije obezbeđen poseban servis. Možete koristiti sopstveni email nalog. Opciono, slanje notifikacija u vidu emaila možete da odradite korišćenjem message queue-a.

Konkurentni pristup resursima u bazi
Prilikom implementacije, potrebno je adekvatno rešiti sledeće konfliktne situacije: ● više istovremenih korisnika aplikacije ne može da rezerviše lek koji je u međuvremenu postao nedostupan,

lock thread ● količina leka na stanju se mora ispravno ažurirati nakon rezervacije leka od strane pacijenta, otkazivanja rezervacije leka, izdavanja leka preko eRecepta, prihvatanja ponude za narudžbenicu itd,

izmena se loguje ● jedan dermatolog ne može istovremeno da bude prisutan na više različitih pregleda,

flag nije dostupan ● jedan farmaceut ne može istovremeno da bude prisutan na više različitih savetovanja,

flag nije dostupan ● pregledi koji su unapred definisani ne smeju biti rezervisani od strane više različitih korisnika,

flag rezervisan ● više istovremenih korisnika aplikacije ne može da zakaže savetovanje u istom terminu kod istog farmaceuta (termini se ne smeju ni preklapati),

flag rezervisan ● prilikom izdavanja eRecepta se izdaju ili svi ili ni jedan lek i stanje leka u apoteci se ažurira,

nema parcijalna izdavanja ● na jednu žalbu može da odgovori samo jedan administrator sistema.

zalba -> handle ko odgovara

Napomena: Smatra se da student nije uspešno ispunio ovaj zahtev ukoliko pored navedenih ograničenja ne pronađe i adekvatno ne reši bar još jednu konfliktnu situaciju za svoj deo funkcionalnosti propisanih specifikacijom.
