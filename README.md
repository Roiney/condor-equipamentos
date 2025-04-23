# **Sleep Diary API**

Aplicação de backend para o Diário do Sono, desenvolvida para permitir que pacientes registrem dados de sono e médicos acompanhem a evolução.
<br>
### Tecnologias

Python 3.10
Flask + Flask-RESTX
PostgreSQL (via Docker)
Pandas (para análise estatística)
Docker + Docker Compose
<br>
### Subindo a aplicação

Pré-requisitos:
<br>
```
Docker
Docker Compose
```

Clone o projeto:
<br>
```
git clone <repo-url>
cd app
```
<br>
<br>
Rode os containers:

<br>
```
docker-compose up --build
```

Acesse a documentação da API:

<br>
<br>
```
[http://localhost:3035/docs](http://localhost:3035/docs)
```

###  Endpoints disponíveis

#### Paciente

POST /patient/ – Registrar entrada no diário

Exemplo de payload:
<br>
```
{
"patient_id": 1,
"sleep_duration": 7.5,
"bedtime": "22:30",
"awakenings": 1,
"medication": false
}
```

#### Médico

GET /doctor/patients – Listar IDs de pacientes com entradas

GET /doctor/patient//entries – Listar entradas de um paciente

<br>
GET /doctor/patient//stats – Estatísticas de sono e despertares

<br>
### Banco de dados

Postgres está rodando no container diario\_sono\_postgres

Porta externa: 6543

Credenciais padrão:
<br>
```
DB: diario_sono
User: postgres
Password: postgres
```
<br>
📁 Estrutura resumida
<br>
```
app/
├── backend/
│   ├── app/
│   │   ├── domain/
│   │   ├── infra/
│   │   ├── application/
│   │   ├── interface/
│   │   └── main.py
│   ├── requirements.txt
│   └── run.py
├── docker-compose.yml
```