# Discord Messenger

Este código é uma aplicação web em Node.js que cria um servidor Express e fornece endpoints para diferentes rotas. Ele usa o pacote cors para lidar com as políticas de compartilhamento de recursos do navegador e o pacote swagger-ui-express para exibir a documentação do Swagger.

## Para executar este código, siga estas etapas

1. Clone o repositório para sua máquina local.
2. Certifique-se de ter o Node.js instalado em sua máquina.
3. Na pasta raiz do projeto, execute o comando npm install para instalar as dependências.
4. Crie um arquivo .env na pasta raiz do projeto e adicione as seguintes linhas:

```bash
DB = 'URL do banco de dados MongoDB'
URL_WEBHOOK = 'Link do webhook gerado no discord'
PORT = 3000 # Se deseja iniciar o servidor em uma porta diferente da 4000
```

Isso define as variáveis ​​de ambiente que a aplicação usará para iniciar o servidor na porta 3000 e no host local.

Execute o comando npm start para iniciar o servidor.
Rotas
A aplicação possui duas rotas:

A rota raiz / retorna a mensagem "Bem-vindo!" quando uma solicitação GET é feita.

A rota /api lida com as solicitações que lidam com mensagens. É aqui que estão as rotas que interagem com o banco de dados.

### As rotas de mensagem presentes no código são:

- POST /message: rota que cria uma nova mensagem, enviando-a para o Discord e salvando-a no banco de dados.
- GET /messages: rota que lista todas as mensagens salvas no banco de dados.
- GET /message/:id: rota que busca uma mensagem pelo ID da mensagem Fenviada ao discord.
- PUT /message/:id: rota que edita uma mensagem enviada previamente, tanto no Discord quanto no banco de dados, com base no ID da mensagem enviada ao discord.
- DELETE /message/:id: rota que deleta uma mensagem previamente enviada do Discord e remove sua entrada no banco de dados, com base no ID da mensagem Fenviada ao discord.
