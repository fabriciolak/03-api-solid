# App

Gympass style app

## RFs (Requisitos funcionais)
### Funcionalidades da aplicação
- [ x ] Deve ser possível se cadastrar;
- [ x ] Deve ser possível se autenticar;
- [ x ] Deve ser possível obter o perfil de um usuário logado;
- [ x ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ x ] Deve ser possível o usuário obter o histórico de check-ins;
- [ x ] Deve ser possível buscar academias próximas (até 10km);
- [ x ] Deve ser possível o usuário buscar academias pelo nome;
- [ x ] Deve ser possível o usuário realizar check-in em uma academia;
- [ x ] Deve ser possível validar o check-in de um usuário;
- [ x ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)
### Condições que são aplicadas aos RFs.

- [ x ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ x ] O usuário não pode fazer dois check-ins no mesmo dia;
- [ x ] O usuário só pode fazer check-in dentro de uma área de 100 metros da academia;
- [  ] O check-in só pode ser validado após 20 minutos criado;
- [  ] O check-in só pode ser validado por administradores;
- [  ] A academia só pode ser cadastrado por administradores;

## RFNs (Requisitos Não funcionais)
### Não tem relação com funcionalidade / Determinar banco de dados, paginação, etc.

- [ x ] A senha do usuário precisa está criptografada;
- [ x ] Os dados da aplicação precisam está persistidos em um banco PostgreSQL
- [ x ] Todas as listas de dados precisam estar paginadas com 20 itens por páginas;
- [  ] O usuário identificado por um JWT (Json Web Token);
