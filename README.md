## Project for the course "Internet Software Architectures"

- Student 2,4 ( Administrator apoteke, Administrator sistema/dobavljač/korisnik ) : Dušan Urošević
- Student 1,3 ( Neautentifikovan korisnik, Korisnik/pacijent, Farmaceut/Dermatolog ) : Nikola Selić
potrebno je u README.md napisati tačno uputstvo za pokretanje projekta i priložiti skriptu za popunu baze testnim podacima.


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

 Generisati PDF, Data flow, Opis Dodatno, potrebno je da svaki student za svoj deo funkcionalnosti okači PDF koji će sadržati sledeće: ● opis konfliktnih situacija koje su rešavane, ● crteže tokova svih zahteva klijenta i odgovora servera koji dovode do situacije koja je detektovana kao konfliktna na konkretnom primeru aplikacije koju je tim implementirao (potrebno je naznačiti koji endpoint se gađa u svakom zahtevu i koja metoda koje klase), ● opis načina na koji su rešavane uočene situacije (koji pristup se koristi, zašto je odabran taj pristup, kako je taj pristup implementiran konkretno u kodu).
Lokacijski servisi
Za prikazivanje lokacije mogu se koristiti servisi poput Google mapa, Yandex mapa, OpenLayers, itd.

Grafički prikaz grafika i radnog kalendara
Za grafički prikaz radnog kalendara i pravljenje različitih grafika mogu se koristiti third party biblioteke za iscrtavanje elemenata.

DevOps (micro) flow
Studenti u sklopu procesa razvoja aplikacije za potrebe polaganja predmeta trebaju da oforme (micro) DevOps tok isporuke softvera koristeći različite alate danas dostupne za izgradnju, testiranje i proveru kvaliteta. Na slici 1 je prikazan jedan takav tok. Studenti imaju pravo na proširenje toka i izbor alata u zavisnosti od tehnologije u kojoj razvijaju aplikaciju. Moraju se koristiti (bar) alati za izgradnju aplikacija (Maven, Gradle, za druge jezike koristiti ako je to potrebno), Git za kontrolu verzija, integracioni server (TravisCI, CircleCI, Jenkins, itd.), alati za analizu kvaliteta koda (SonarQube, SonarCloud, Codacy, itd.), platforma za deployment aplikacije (Heroku, Azure, AWS, itd.). Jedino ograničenje je da se mora koristiti Git i GitHub kao hosting servis za kontrolu verzija koda uz poštovanje Gitflow načina rada. Upotreba Gita treba da bude ispravna. Obratiti pažnju na pisanje log poruka, fokusiranost commit -a, upotrebu feature grana gde je potrebno. Na osnovu rezultata alata za analizu koda, potrebno je refaktorisati kod prema preporukama

Skalabilnost
Potrebno je pripremiti predlog kako će aplikacija koja se na ovom predmetu implementira funkcionisati kada broj istovremenih korisnika preraste mogućnosti jednog servera. Pretpostavke: ● ukupan broj korisnika aplikacije je 200 miliona, ● broj rezervacija lekova i zakazanih pregleda kod farmaceuta i dermatologa na mesečnom nivou je milion, ● sistem mora biti skalabilan i visoko dostupan. Potrebno je definisati Proof of Concept (PoC) arhitekturu i okačiti je u PDF formatu na GitHub repozitorijum projekta do datuma za predaju projekta koji će biti naknadno objavljen. Dokument treba da sadrži:

Dizajn šeme baze podataka (konceptualni, logički ili fizički)
Predlog strategije za particionisanje podataka
Predlog strategije za replikaciju baze i obezbeđivanje otpornosti na greške
Predlog strategije za keširanje podataka
Okvirna procena za hardverske resurse potrebne za skladištenje svih podataka u narednih 5 godina
Predlog strategije za postavljanje load balansera
Predlog koje operacije korisnika treba nadgledati u cilju poboljšanja sistema
Kompletan crtež dizajna predložene arhitekture (aplikativni serveri, serveri baza, serveri za keširanje, itd) Napomena : PDF ne treba da sadrži definicije šta je baza podataka, keš, replikacija, server, ostali alati koji će biti predloženi kao deo rešenja već razloge zašto ste se odlučili za određeni softver, algoritam, hardver, arhitekturu i koji problem njihovom upotrebom rešavate.
