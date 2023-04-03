# App

Gympass style app

## RFs (Requisitos funcionais)
### Funcionalidades da aplicação
- [  ] Deve ser possível se cadastrar;
- [  ] Deve ser possível se autenticar;
- [  ] Deve ser possível obter o perfil de um usuário logado;
- [  ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [  ] Deve ser possível o usuário obter o histórico de check-ins;
- [  ] Deve ser possível buscar academias próximas;
- [  ] Deve ser possível o usuário buscar academias pelo nome;
- [  ] Deve ser possível o usuário realizar check-in em uma academia;
- [  ] Deve ser possível validar o check-in de um usuário;
- [  ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)
### Condições que são aplicadas aos RFs.

- [  ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [  ] O usuário não pode fazer dois check-ins no mesmo dia;
- [  ] O usuário só pode fazer check-in dentro de uma área de 100 metros da academia;
- [  ] O check-in só pode ser validado após 20 minutos criado;
- [  ] O check-in só pode ser validado por administradores;
- [  ] A academia só pode ser cadastrado por administradores;

## RFNs (Requisitos Não funcionais)
### Não tem relação com funcionalidade / Determinar banco de dados, paginação, etc.

- [  ] A senha do usuário precisa está criptografada;
- [  ] Os dados da aplicação precisam está persistidos em um banco PostgreSQL
- [  ] Todas as listas de dados precisam estar paginadas com 20 itens por páginas;
- [  ] O usuário identificado por um JWT (Json Web Token);
