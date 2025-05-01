# NodeStream

NodeStream é um pequeno projeto em Node.js que implementa um servidor HTTP capaz de transmitir um vídeo em pedaços (_chunks_) usando o cabeçalho `Range` para suportar _streaming_ progressivo e retomada de reprodução.

## Funcionalidades

- Transmissão de vídeo por pedaços (chunked streaming) com suporte a cabeçalho `Range` (HTTP 206).  
- Retorno completo do arquivo quando não é fornecido `Range`.  
- Uso de módulos ES (com `import`/`export`).  
- Demonstração simples com página HTML (`playVideo.html`).  

## Pré-requisitos

- Node.js v20.11.0 ou superior (para suporte a `import.meta.dirname`).  
- npm ou yarn instalado.  

## Instalação

```bash
git clone <URL_do_repositório>
cd nodestream
```

Instale as dependências (nenhuma adicional além do próprio Node.js):

```bash
npm install
# ou com yarn
yarn install
```

## Uso

1. Coloque o arquivo de vídeo **`cap.america.mp4`** na raiz do projeto (já incluído no `.gitignore`).  
2. Inicie o servidor:

   ```bash
   npm start
   ```

3. Abra o navegador e carregue o frontend de demonstração:

   ```
   open playVideo.html
   ```

4. O vídeo será servido por `http://localhost:3000` e reproduzido na página HTML.  

## Estrutura de arquivos

```
nodestream/
├── .gitignore          # Ignora o vídeo grande
├── app.js              # Servidor HTTP de streaming
├── cap.america.mp4     # Vídeo de demonstração (no .gitignore)
├── package.json        # Configuração do projeto e scripts
└── playVideo.html      # Página de teste com <video> HTML
```

## Detalhes Técnicos

- **app.js**: utiliza `node:http` para criar o servidor, `fs.promises.stat` para obter o tamanho do vídeo de forma assíncrona e `fs.createReadStream` para ler o arquivo em pedaços.  
- **Suporte a Range**:  
  - Se não houver cabeçalho `Range`, retorna todo o vídeo com status `200`.  
  - Se houver `Range`, calcula `start` e `end` (pedaços de 1 MB por padrão) e responde com status `206` e cabeçalhos adequados (`Content-Range`, `Accept-Ranges`, etc.).  

## Scripts

- `npm start`: executa `node --watch app.js`, reiniciando o servidor em alterações.  

## Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para usar, modificar e distribuir.
