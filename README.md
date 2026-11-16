# Currículo digital — João Pedro Oliveira Builcatti

Projeto de currículo digital desenvolvido com HTML, CSS e JavaScript puro.

## Funcionalidades
- Layout responsivo para celular e computador.
- Dados carregados do arquivo `data/cv.json`.
- Botão para exportar os dados em JSON.
- Botão para imprimir ou salvar o currículo em PDF.

## Como executar
Como o projeto usa `fetch()` para ler o JSON, abra com um servidor local (não diretamente pelo arquivo).

### Opção 1 — VS Code
1. Abra a pasta no Visual Studio Code.
2. Instale a extensão **Live Server**, se ainda não tiver.
3. Clique com o botão direito em `index.html`.
4. Escolha **Open with Live Server**.

### Opção 2 — Python
Na pasta do projeto, execute:
```bash
python -m http.server 8000
```
Depois acesse `http://localhost:8000`.

## Publicar no GitHub Pages
1. Crie um repositório público no GitHub.
2. Envie todos os arquivos e pastas deste projeto.
3. No repositório, entre em **Settings > Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/ (root)`, depois salve.
6. Aguarde o GitHub publicar o site.

## Personalizar
- Edite os dados em `data/cv.json`.
- Substitua `assets/foto-perfil.png` pela foto que deseja usar, mantendo o mesmo nome.
- Edite as cores e estilos em `style.css`.

## Observação
Confirme o cargo e as atividades exercidas na Fortify Reivende antes de usar o currículo em candidaturas. Os campos não confirmados foram mantidos genéricos ou vazios.
