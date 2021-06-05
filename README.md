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

## Video uputstvo koriscenja aplikacije

Video klipovi se nalaze na Google Drive-u na [linku](https://drive.google.com/drive/folders/1NRJ668fUAeZKRTFkIO6hQ8IX-Op6kTdJ?usp=sharing)

### Dump SQL baze

Dump SQL baze se nalazi na [linku]( https://drive.google.com/drive/u/1/folders/1aOOK3CV7BB5vG-ntpBgifMQkrUB8Nkv0)


Za formiranje i popunjavanje tabela u bazi koristiti sledecu komandu u terminalu
```
psql -U isa_super -d isa_super < dump.sql
```
Prilikom akcija koje generisu e-mail, adresa na koju je mail poslat se pojavljuje u konzoli.
Potrebno je kopirati tu adresu u address bar browsera.

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
