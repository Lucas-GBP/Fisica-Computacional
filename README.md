# Listas de Física Computacional
### Aluno: Lucas Gabriel Bitencourte Pedroso

## Instalação
Para acessar esse projeto você deve ter o [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) instalado e executar os seguintes comandos:

```bash
npm install

npm start
```

Isso irá criar um servidor local, por padrão na porta :3000. É possivel acessar o site usando o endereço [http://localhost:3000](http://localhost:3000) no navegador.

## Organização do Projeto
Aqui será citado os diretorios mais relevantes para esse projeto.
### src/scripts
São arquivos typescript com função variadas mas que, muitas vezes, são usandas em multiplas páginas, e não tem relação com a renderização das paginas. Esses são, possivelmente, os arquivos mais criticos da aplicação.
### src/pages
Todos os arquivos são page.client.tsx e eles são as paginas tendo em mente que esse projeto usa React para renderizar as páginas. A estrutura dessa pasta tambem determina as rotas do site.