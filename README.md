## Project for the course "Internet Software Architectures"
Tim 9
- Dušan Urošević IN16/2017
- Nikola Selić IN43/2017

## Deployed Website

- API:  [api.selich.me](https://api.selich.me)
- WEB-APP:  [selich.me](https://selich.me)


## Tehnologije  
- Frontend - React.js

- Backend - Node.js, Express, ApolloServer, GraphQL

- Baza Podataka - PostgreSQL

## Dependencies for dev
1) Instalirati node.js
2) Instalirati yarn
[link](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
3) Instalirati postgres
[link](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

4) Instalirati sve neophodne bibiloteke
```bash
cd <Naziv Projekta>
yarn install
```

## Testiranje

- Testiranje se vrsi koriscenjem [Jest](https://jestjs.io/)

Testovi se nalaze na putanji
```
/api/tests/
```

Pokretanje se vrsi pomocu
```
  npm run test
```

## Database dump

Potrebno je prvo u pgAdminu napraviti Server i Bazu sa sledecim kredencijalima
```
username: isa_super
password: pass
database: isa_super
port: 5432
```

Dump SQL baze se nalazi na [linku]( https://drive.google.com/drive/u/1/folders/1aOOK3CV7BB5vG-ntpBgifMQkrUB8Nkv0)


Za formiranje i popunjavanje tabela u bazi koristiti sledecu komandu u terminalu
```
psql -U isa_super -d isa_super < dump.sql
```

## Konkurentni pristup bazi
Dokumentacija za resenja konfliktnih situacija pri konkurentnim pristupima bazi se nalazi na [linku](https://docs.google.com/document/d/1W29tMjwFOUvmU5z-Gb3UjlViXFlqz7KZYtTrfUqkf3s/edit)


## Video uputstvo koriscenja aplikacije

Video klipovi se nalaze na Google Drive-u na [linku](https://drive.google.com/drive/folders/1NRJ668fUAeZKRTFkIO6hQ8IX-Op6kTdJ?usp=sharing)

## Proof of Concept

Predlog arhitekture se nalazi na [linku](https://github.com/Selich/ISA-2020/blob/master/docs/Proof%20of%20Concept.pdf)

Prilikom akcija koje generisu e-mail, adresa na koju je mail poslat se pojavljuje u konzoli.
Potrebno je kopirati tu adresu u address bar browsera.



### Run scripts
Pozivanje:
- api dev
```bash
./run_api.sh
```
- web frontend dev
```bash
./run_web.sh
```
- zajedno
```bash
./run_all.sh
```
Da bi generisao nove zahteve potrebno je generisati nove graphql upite

```bash
yarn gen
```
### Mail servis
Za slanje e-mail-a koriscen je [Nodemailer](https://nodemailer.com/about/)
Kredencijali:
```
user: 'barry85@ethereal.email'
pass: '4GK92dcVH8byXMht53'
```
