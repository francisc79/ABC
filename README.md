# Jogo do Alfabeto

Jogo educativo desenvolvido para ajudar crianças a reconhecer e identificar as letras do alfabeto de forma simples e interativa.

<p align="center">
  <a href="https://francisc79.github.io/ABC/"><strong>▶ JOGAR ONLINE</strong></a>
</p>

## Sobre o projeto

O jogo apresenta uma letra-alvo na tela. O participante deve localizar e selecionar a letra correspondente entre as opções exibidas no tabuleiro. As 26 letras são embaralhadas a cada partida, tornando cada rodada diferente.

O projeto foi desenvolvido com tecnologias web e pode ser executado diretamente pelo navegador.

## Funcionalidades

- Tela inicial com botão para começar.
- Seleção aleatória da próxima letra.
- Tabuleiro interativo com as 26 letras do alfabeto.
- Embaralhamento das letras a cada nova partida.
- Feedback visual para respostas corretas e incorretas.
- Efeitos sonoros para acertos e conclusão do jogo.
- Música de fundo durante a atividade.
- Mensagem de conclusão ao encontrar todas as letras.
- Opção para reiniciar e jogar novamente.
- Layout adaptável para diferentes tamanhos de tela.
- Manifesto e Service Worker para suporte a instalação e cache dos arquivos essenciais.

## Como jogar

1. Acesse o [Jogo do Alfabeto](https://francisc79.github.io/ABC/).
2. Clique em **Começar**.
3. Observe a letra destacada na parte superior.
4. Encontre e selecione a mesma letra no tabuleiro.
5. Ao acertar, a letra é retirada do tabuleiro e uma nova letra é apresentada.
6. Continue até encontrar todas as 26 letras.
7. Clique em **Jogar Novamente** para iniciar uma nova partida.

## Tecnologias utilizadas

| Tecnologia | Utilização |
| --- | --- |
| HTML5 | Estrutura e conteúdo da aplicação |
| CSS3 | Estilização, animações e grade responsiva |
| JavaScript | Embaralhamento, validação das respostas e controle da partida |
| Bootstrap 5 | Classes utilitárias e componentes básicos |
| HTML Audio | Música de fundo e efeitos sonoros |
| Web App Manifest | Metadados para instalação como aplicativo |
| Service Worker | Cache dos arquivos para suporte offline |

## Executar localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/francisc79/ABC.git
   ```

2. Abra a pasta no Visual Studio Code.
3. Inicie um servidor local, por exemplo, com a extensão Live Server.
4. Acesse o endereço local exibido pelo servidor.

O Service Worker requer HTTPS ou localhost. Para testar os recursos de instalação e funcionamento offline, utilize um navegador compatível.

## Estrutura do projeto

```text
ABC/
├── index.html
├── selecionaletra.css
├── selecionaletra.js
├── manifest.json
├── sw.js
├── abc.jpg
├── brick.jpg
├── brick.png
└── arquivos de áudio (.wav)
```

## Organização do código

- **index.html:** define a tela inicial, o alvo, o tabuleiro, a mensagem de vitória e os elementos de áudio.
- **selecionaletra.css:** contém as cores, dimensões, animações e regras de responsividade.
- **selecionaletra.js:** controla a sequência de letras, o embaralhamento, a verificação das respostas, os sons e o reinício.
- **manifest.json:** configura o nome, ícones e modo de exibição do aplicativo instalado.
- **sw.js:** armazena os arquivos principais em cache para permitir o carregamento offline após a primeira visita.

## Melhorias futuras

- Incluir opções de letras maiúsculas e minúsculas.
- Adicionar níveis de dificuldade e acompanhamento de progresso.
- Oferecer narração do nome das letras.
- Incluir atividades de associação entre letras e palavras.

---

Desenvolvido por **Francisco Antônio** · Projeto educativo de portfólio
