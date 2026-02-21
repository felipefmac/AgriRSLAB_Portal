# AgriRSLAB-Portal - ABP1

<a id="topo"></a>
<p align="center">
  <img src="https://github.com/404NotFound-ABP/AgriRSLAB_Portal/blob/76a8c62e6c347c423505e24162cd9b520b5d316c/imagens/1.1Imagens%20Git/logo_404notfound.png"
       alt="Logo 404NotFound"
       style="max-width: 260px; width: 60%; height: auto;">
</p>

<p align="center">
  <a href="#sobre">Sobre o Projeto</a> |
  <a href="#sprint">Entrega de Sprints</a> |
  <a href="#backlogs">Product Backlog</a> |
  <a href="#tecnologias">Tecnologias</a> |
  <a href="#equipe">Nossa Equipe</a>
</p>

<a id="sobre"></a>
# Sobre o Projeto 📋

A criação de um website para o Laboratório de Sensoriamento Remoto Agrícola do INPE (AgriRS Lab).

O site do AgriRS está sendo desenvolvido pela **404NotFound** com o objetivo de centralizar informações essenciais do laboratório, ampliar sua visibilidade e facilitar o acesso do público às pesquisas, projetos e iniciativas. O portal reunirá perfis da equipe e áreas de atuação, publicações científicas, oportunidades (vagas, editais, estágios) e canais de contato.  
Nossa meta é manter a comunidade atualizada sobre as atividades e descobertas do laboratório e aproximar estudantes, parceiros e a sociedade do conhecimento produzido.

[↑ Voltar ao topo](#topo)


<a id="sprint"></a>

<details>
  <summary><b>Entregas de Sprints 🎯</b></summary>
  <br>

  Todas as entregas serão realizadas conforme os prazos acordados com o cliente. Para cada ciclo de desenvolvimento, será gerado um relatório completo por sprint e uma planilha de tarefas, na aba **Tasks**, que detalha cada atividade executada, o responsável, a data de conclusão e uma descrição do trabalho realizado. A relação detalhada das sprints e tarefas é apresentada abaixo.
  
  <div align="center">
  
  | Sprint | Entrega       | Status |                 Relatório                  | Vídeo | Tasks |
  |------: |---------------|:------:|:------------------------------------------:|:-----:|:-----:|
  | 1      | 📅 08/10/2025 | ✅     | [Ver Backlog](docs/sprint1.md#backlog)     | [Ver vídeo](https://youtu.be/8NwBtAC9zXE)     | ✅     |
  | 2      | 📅 04/11/2025 | ✅     | [Ver Backlog](docs/sprint2.md#backlog)     | [Ver vídeo](https://youtu.be/8m5mneY6ezg)     | ✅     |
  | 3      | 📅 24/11/2025 | ✅     | [Ver Backlog](docs/sprint3.md#backlog)     | [Ver vídeo](https://youtu.be/AR4eFr8gDT8)     | ✅     |
  
  
  </div>
  
  **Legenda:**
  - ✅ **Finalizada**
  - 🚧 **Em Progresso**
  - `—` **Não iniciado**

  [↑ Voltar ao topo](#topo)
</details>


<details>
  <summary><b>Objetivo das Sprints 📌 </b></summary>
  <br>

  # *Sprint 1 – Planejamento e Prototipagem:* 
  O foco desta sprint foi a criação do protótipo inicial do site e a definição da identidade visual do projeto. Foram estabelecidos os elementos de design, paleta de cores, tipografia e estrutura de navegação, garantindo uma base sólida para o desenvolvimento. Esta etapa também permitiu alinhar expectativas da equipe, definir requisitos visuais e validar conceitos antes da implementação.
  
  # *Sprint 2 – Implementação Inicial e Testes:*
  Durante a segunda sprint, iniciou-se a codificação do site, transformando o protótipo em páginas funcionais. Paralelamente, foram realizados os primeiros testes no banco de dados, avaliando a integração inicial entre frontend e backend. Esta sprint teve como objetivo consolidar a estrutura do site, detectar problemas precocemente e preparar o ambiente para o desenvolvimento de funcionalidades mais complexas.
  
  # *Sprint 3 – Banco de Dados, Dinamização e Ajustes de Design:*
  A terceira sprint concentrou-se na criação do banco de dados e na implementação da dinamização das páginas, conectando efetivamente frontend e backend. Adicionalmente, foram realizados ajustes no design, aprimorando a experiência do usuário e garantindo consistência visual em todas as páginas. Essa etapa final permitiu integrar funcionalidades essenciais, corrigir inconsistências e aproximar o projeto da versão final planejada.


  [↑ Voltar ao topo](#topo)
</details>


<a id="dor"></a>

<details>
  <summary><b>Dor do Cliente 😢</b></summary>
  <br>
  
  1. Necessidade de um site para divulgação do Laboratório de Sensoriamento Remoto Agrícola do INPE.  
  2. Cliente com pouca experiência em desenvolvimento de websites — portanto, é essencial que o gerenciamento de conteúdo seja simples e objetivo.  
  3. Necessidade de compliance com estrutura e regras do INPE (instituição pública).
  
  [↑ Voltar ao topo](#topo)
</details>


<details>
  <summary><b>Requisitos e User Stories 📋</b></summary>
  <br>

  | Requisito | Sub-Requisito | User Story |
  |-----------|---------------|------------|
  | RF01 - Página Inicial (Início/Home) | RF01.1 – Apresentar botões/menus de navegação para todas as páginas do site. | RF01.1 Como visitante, quero acessar uma página inicial com menus de navegação para todas as páginas, para que eu possa encontrar facilmente as informações do laboratório. |
  | RF01 - Página Inicial (Início/Home) | RF01.2 – Exibir seções em destaque (cards) com chamadas para notícias, projetos, publicações ou outras atualizações. | RF01.2 Como visitante, quero ver seções em destaque na página inicial com notícias, projetos e publicações, para que eu tenha acesso rápido às atualizações. |
  | RF01 - Página Inicial (Início/Home) | RF01.3 – Link para redes sociais e contato no final da página. | RF01.3 Como visitante, quero encontrar links para redes sociais e contato no rodapé, para que eu possa seguir e interagir com o laboratório. |
  | RF01 - Página Inicial (Início/Home) | RF01.4 – Incluir colaboradores e financiadores (CNPq, CAPES, FAPESP). | RF01.4 Como visitante, quero visualizar na página inicial uma seção com os colaboradores e financiadores do laboratório (como CNPq, CAPES e FAPESP), para reconhecer as instituições que apoiam nossas pesquisas e fortalecer a credibilidade do trabalho. |
  | RF02 - Página sobre o AgriRS (Sobre o AgriRS/About AgriRS) | RF02.1 – Deve descrever o laboratório, objetivo e foco. | RF02.1 Como visitante, quero acessar uma página “Sobre” que descreva o laboratório, objetivos e foco, para entender sua missão. |
  | RF02 - Página sobre o AgriRS (Sobre o AgriRS/About AgriRS) | RF02.2 – Deve descrever as áreas de atuação com pequenos textos explicativos. | RF02.2 Como visitante, quero que os membros sejam categorizados por tipo e ordenados alfabeticamente, para facilitar a navegação. |
  | RF03 - Página de Membros (Equipe/Team) | RF03.1 – Listar todos os integrantes com nome, foto, função e breve descrição. | RF03.1 Como visitante, quero visualizar todos os integrantes do laboratório com nome, foto, função e breve descrição, para conhecer melhor a equipe e suas áreas de atuação. |
  | RF03 - Página de Membros (Equipe/Team) | RF03.2 – Categorizar por tipo de membro (Pesquisadores titulares, pesquisadores colaboradores). | RF03.2 Como visitante, quero que os integrantes do laboratório sejam categorizados por tipo de membro, para que eu possa identificar facilmente o papel e a função de cada pessoa na equipe. |
  | RF03 - Página de Membros (Equipe/Team) | RF03.3 – Ordenar cada categoria por ordem alfabética. | RF03.3 Como visitante, quero que os integrantes dentro de cada categoria sejam listados em ordem alfabética, para facilitar a localização de um membro específico. |
  | RF04 - Página de Vagas (Oportunidades/Join Us) | RF04.1 – Listar oportunidades como estágios, IC, pós-graduação e parcerias. | RF04.1 Como visitante, quero visualizar uma lista de oportunidades como estágios, iniciação científica, pós-graduação e parcerias, para identificar formas de participar das atividades do laboratório. |
  | RF04 - Página de Vagas (Oportunidades/Join Us) | RF04.2 – Informar como se candidatar (documentos, critérios, prazos etc.). | RF04.2 Como visitante, quero acessar informações claras sobre como me candidatar às oportunidades, incluindo documentos necessários, critérios e prazos, para que eu possa enviar minha inscrição corretamente. |
  | RF05 - Página de Projetos (Projetos/Projects) | RF05.1 – Listar projetos com título, resumo, ano de início, status e equipe envolvida. | RF05.1 Como visitante, quero visualizar uma lista de projetos com título, resumo, ano de início, status e equipe envolvida, para conhecer as iniciativas do laboratório e entender quem participa de cada uma. |
  | RF05 - Página de Projetos (Projetos/Projects) | RF05.2 – Permitir a inclusão de imagens ou links para mais informações. | RF05.2 Como visitante, quero que cada projeto listado possa incluir imagens ou links para mais informações, para que eu possa explorar detalhes adicionais e compreender melhor o contexto de cada iniciativa. |
  | RF06 - Página de Notícias (Notícias/News) | RF06.1 – Permitir a publicação de notícias com título, data, imagem e texto. | RF06.1 Como administrador, quero poder publicar notícias com título, data, imagem e texto, para manter o público informado sobre as novidades e atividades do laboratório. |
  | RF06 - Página de Notícias (Notícias/News) | RF06.2 – Devem ser organizadas cronologicamente. | RF06.2 Como visitante, quero visualizar as notícias organizadas em ordem cronológica, para acompanhar a evolução das atividades e eventos do laboratório ao longo do tempo. |
  | RF07 - Página de Publicações (Publicações/Publications) | RF07.1 – Listar artigos, livros, capítulos etc., com título, revista, autores, ano e link. | RF07.1 Como visitante, quero visualizar uma lista de artigos, livros, capítulos e outras publicações com título, revista, autores, ano e link, para acessar e consultar facilmente a produção científica do laboratório. |
  | RF07 - Página de Publicações (Publicações/Publications) | RF07.2 – Deve ter campo de pesquisa por palavra-chave. | RF07.2 Como visitante, quero pesquisar publicações por palavra-chave, para encontrar rapidamente conteúdos específicos de meu interesse. |
  | RF08 - Página de Contato (Contato/Contact) | RF08.1 – Conter um formulário com campos: nome, e-mail, assunto e mensagem que redireciona | RF08.1 Como visitante, quero preencher um formulário com meu nome, e-mail, assunto e mensagem, para entrar em contato diretamente com o laboratório de forma prática e rápida. |
  | RF08 - Página de Contato (Contato/Contact) | RF08.2 – Exibir informações institucionais como telefone, e-mail e endereço. | RF08.2 Como visitante, quero visualizar as informações institucionais do laboratório, como telefone, e-mail e endereço, para ter diferentes formas de contato e localização. |
  | RF08 - Página de Contato (Contato/Contact) | RF08.3 – Incluir links para as redes sociais do laboratório. | RF08.3 Como visitante, quero acessar links para as redes sociais do laboratório, para acompanhar suas atualizações e interagir com suas publicações. |
  | RF08 - Página de Contato (Contato/Contact) | RF08.4 – Incluir um mapa para localização do laboratório dentro do INPE. | RF08.4 Como visitante, quero visualizar um mapa com a localização do laboratório dentro do INPE, para facilitar minha chegada ao local. |
  | RNF01 - Responsividade | O site deve ser totalmente responsivo (funcionar em celulares, tablets e computadores). | RNF01 Como visitante, quero que o site se adapte automaticamente a diferentes tamanhos de tela (celulares, tablets e computadores), para ter navegação fluida, leitura confortável e acesso completo às funcionalidades em qualquer dispositivo. |
  | RNF02 - Facilidade de Atualização | O conteúdo deve ser fácil de atualizar por integrantes do laboratório. | RNF02 Como administrador, quero que o site possua um sistema de gerenciamento de conteúdo simples e intuitivo, para que os integrantes do laboratório possam atualizar textos, imagens e informações sem necessidade de conhecimentos técnicos avançados. |
  | RNF03 - Tempo de Carregamento | O site deve carregar rapidamente (preferência por imagens otimizadas). | RNF03 Como visitante, quero que o site carregue rapidamente, utilizando imagens otimizadas e recursos leves, para que eu tenha uma navegação fluida e não desista de acessar o conteúdo devido à lentidão. |
  | RNF04 - Idiomas | Ter uma versão em português e inglês. | RNF04 Como visitante, quero que o site tenha versões em português e inglês, para que eu possa acessar o conteúdo no idioma de minha preferência e facilitar o entendimento por públicos nacionais e internacionais. |
  | RNF05 - Hospedagem e domínio | O site deverá ser hospedado em um serviço confiável e utilizar um domínio próprio. | RNF05 Como administrador, quero que o site seja hospedado em um serviço confiável e utilize um domínio próprio, para garantir estabilidade, segurança e fácil acesso pelos usuários. |
  | RNF06 - Identidade visual | A definir com integrantes do laboratório. | RNF06 Como visitante, quero que o site siga uma identidade visual definida em conjunto com os integrantes do laboratório, para que a aparência e o estilo transmitam profissionalismo, coerência e reforcem a marca do grupo. |
  
  
  
  
  
  # Definition of Done (DoD) ✅
  
  O Definition of Done (DoD) é fundamental para garantir a qualidade e a consistência do trabalho entregue em um projeto. Ele define, de forma clara e objetiva, os critérios que uma tarefa, user story ou funcionalidade deve atender para ser considerada realmente concluída. Com o DoD, a equipe evita ambiguidades, reduz retrabalho e assegura que todas as entregas sigam o mesmo padrão de excelência. Além disso, ele facilita a comunicação entre os membros do time e aumenta a transparência do processo de desenvolvimento, contribuindo para um fluxo de trabalho mais eficiente e previsível. Confira abaixo o *DoD* do projeto:
  
  
  O *DoD* pode ser acessado [aqui](https://github.com/404NotFound-ABP/AgriRSLAB_Portal/blob/e8aae51d47e695c02c723c4ff65f78f73a937011/docs/DoD.md)

  [↑ Voltar ao topo](#topo)
</details>


<a id="backlogs"></a>

<details>
  <summary><b>Backlog Geral do Projeto 📌</b></summary>
  <br>
  
  | ID      | Seção / Atividade | Pontuação | Disciplina | Sprint |
  |---------|-------------------|-----------|------------|--------|
  | DD-001  | Definir identidade visual do site | 10  | DD | 1 |
  | DD-002  | Criar protótipo da página home | 8  | DD | 1 |
  | DD-003  | Criar protótipo mobile (home) | 4	  | DD | 1 |
  | DD-004  | Criar cards em destaque na home (notícias, projetos, publicações) | 9 | DD | 1 |
  | DD-005  | Criar protótipo da página "Sobre" – objetivo e foco do laboratório | 4  | DD | 1 |
  | DD-006  | Criar protótipo mobile (sobre) | 2  | DD | 1 |
  | DD-007  | Criar protótipo da página de membros (nome, foto, função, descrição) | 6	 | DD | 1 |
  | DD-008  | Criar protótipo mobile (membros) | 3  | DD | 1 |
  | DD-009  | Criar protótipo da página de vagas | 3  | DD | 1 |
  | DD-010  | Criar protótipo mobile (vagas) | 1  | DD | 1 |
  | DD-011  | Criar protótipo da página de projetos | 1  | DD | 1 |
  | DD-012  | Criar protótipo mobile (projetos) | 1  | DD | 1 |
  | DD-013  | Criar protótipo da página de notícias | 7  | DD | 1 |
  | DD-014  | Criar protótipo mobile (notícias) | 3  | DD | 1 |
  | DD-015  | Criar protótipo da página de publicações | 4  | DD | 1 |
  | DD-016  | Criar protótipo mobile (publicações) | 2 | DD | 1 |
  | DD-017  | Criar protótipo da página de contato | 4 | DD | 1 |
  | DD-018  | Criar protótipo mobile (contato)| 2  | DD | 1 |
  | DD-007  | Criar layout no Figma (Vagas) | 20 | DD | 1 |
  | DW-001  | Criação da estrutura da página de publicações em HTML |  5  | DW | 2 |
  | DW-001.1 | Criação da estrutura dos cards das publicações em HTML | 10  | DW | 2 |
  | DW-001.2 | Criação da estrutura dos filtros de pesquisa em HTML   | 10 | DW | 2 |
  | DW-001.3 | Criação de um arquivo CSS para a estiliação | 8  | DW | 2 |
  | DW-001.4 | Adicionar cores padrões | 2 | DW | 2 |
  | DW-001.5 | Adicionar fontes padrão | 2  | DW | 2 |
  | DW-001.6 | Estilização dos cards | 5  | DW | 2 |
  | DW-001.7 | Adicionar as cores e fontes padrões aos cards | 2 | DW | 2 |
  | DW-001.8 | Adicionar imagens dos artigos  | 2  | DW | 2 |
  | SO-001 | Configuração GitHub   | 15 | SO | 2 |
  | DW-002 | Criaçaõ da estrutura da página inicial em HTML | 5  | DW | 2 |
  | DW-002.1 | Criação da estrutura dos cards da section "Atuação" em HTML | 8  | DW | 2 |
  | DW-002.2 | Criação da estrutura do cards da section "Projetos" em HTML  | 8 | DW | 2 |
  | DW-002.3 | Criação da estrutura do cards da section "Notícias" em HTML  | 8  | DW | 2 |
  | DW-002.4 | Criação de um arquivo CSS para a estiliação | 8  | DW | 2 |
  | DW-002.5 | Adicionar cores padrões | 2  | DW | 2 |
  | DW-002.6 | Adicionar fontes padrão | 2  | DW | 2 |
  | DW-002.7 | Estilização dos cards da section "Atuação" em CSS | 10 | DW | 2 |
  | DW-002.8 | Estilização dos cards da section "Projetos" em CSS | 10 | DW | 2 |
  | DW-002.9 | Estilização dos cards da section "Notícias" em CSS | 10  | DW | 2 |
  | DW-02.10 |  Adicionar imagens | 2  | DW | 2 |
  | DW-003 | Criação da estrutura da página de notícias em HTML  | 8  | DW | 2 |
  | DW-003.1 | Criação da estrutura dos cards das notícias em HTML  | 10 | DW | 2 |
  | DW-003.2 | Criação da estrutura da página de carrossel de notícias em HTML | 10 | DW | 2 |
  | DW-003.3 | Criação da estrutura dos cards da página de carrossel  de notícias em HTML | 10 | DW | 2 |
  | DW-003.4 | Criação de um arquivo CSS para a estiliação | 8 | DW | 2 |
  | DW-003.5 | Estilização da página  | 8 | DW | 2 |
  | DW-003.6 | Adicionar cores padrões | 2 | DW | 2 |
  | DW-003.7 | Adicionar fontes padrão | 2 | DW | 2 |
  | DW-003.8 | Estilização dos cards da página de notícias  | 8 | DW | 2 |
  | DW-003.9 | Estilização dos cards da página de carrossel de notícias | 8 | DW | 2 |
  | DW-03.10 | Adicionar as cores e fontes padrões aos cards  | 2 | DW | 2 |
  | DW-03.11 | Adicionar imagens das notícias | 2 | DW | 2 |
  | DW-03.12 | Organizar notícias cronologicamente | 5 | DW | 2 |
  | DW-004 | Criação da estrutura da página de projetos em HTML  | 8 | DW | 2 |
  | DW-004.1 | Criação da estrutura da página de projetos abertos em HTML  | 5  | DW | 2 |
  | DW-004.2 | Criação da estrutura dos cards dos projetos em HTML | 5 | DW | 2 |
  | DW-004.3 | Criação de um arquivo CSS para a estiliação da página de cards de projetos  | 8 | DW | 2 |
  | DW-004.4 | Criação de um arquivo CSS para a estiliação da página de projeto aberto  | 8 | DW | 2 
  | DW-004.5 | Adicionar cores padrões  | 2 | DW | 2 
  | DW-004.6 | Adicionar fontes padrão  | 2 | DW | 2  
  | DW-004.7 | Estilização dos cards da página de projetos  | 8 | DW | 2 
  | DW-004.8 | Adicionar as cores e fontes padrões aos cards e na descrição do projeto | 2 | DW | 2 
  | DW-004.9 | Adicionar imagens dos projetos  | 2 | DW | 2 
  | DW-005 | Criação da estrutura da página de vagas em HTML |  8 | DW | 2 
  | DW-005.1 | Criação da estrutura da página de candidatura em HTML  | 5 | DW | 2 
  | DW-005.2 | Criação da estrutura dos cards das vagas em HTML  | 5 | DW | 2 
  | DW-005.3 | Criação da estrutura do formulário de candidatura em HTML  | 10 | DW | 2 
  | DW-005.4 | Criação de um arquivo CSS para a página de vagas  | 8 | DW | 2 
  | DW-005.5 | Estilização da página  | 8 | DW | 2 
  | DW-005.6 | Criação de um arquivo CSS para a página de candidatura  | 8 | DW | 2 
  | DW-005.7 | Estilização da página   | 8 | DW | 2 
  | DW-005.8 | Adicionar cores padrões  | 2 | DW | 2 
  | DW-005.9 | Adicionar fontes padrão   | 2 | DW | 2
  | DW-05.1.0 | Estilização dos cards da página de vagas   | 8 | DW | 2 
  | DW-05.1.1 | Estilização do formulário de candidatura  | 8 | DW | 2
  | DW-006 | Criação da estrutura da página de membros em HTML  | 5 | DW | 2 
  | DW-006.1 | Criação da estrutura dos cards de membros em HTML | 10 | DW | 2 
  | DW-006.2 | Criação de um arquivo CSS para a estlização  | 8 | DW | 2 
  | DW-006.3 | Adicionar cores padrões | 2 | DW | 2 
  | DW-006.4 | Adicionar fontes padrão |  2 | DW | 2
  | DW-006.5 | Estilização dos cards de membros  | 20 | DW | 2 
  | DW-007 | Criação da estrutura da página de contatos em HTML | 5 | DW | 2 
  | DW-007.1 | Criação da estrutura do formulário de contato HTML  | 10 | DW | 2 
  | DW-007.2 | Criação da estrutura do card de localização em  HTML   | 5 | DW | 2 
  | DW-007.3 | Criação de um arquivo CSS para a estlização | 8 | DW | 2 
  | DW-007.4 | Estilização da página | 8 | DW | 2
  | DW-007.5 | Adicionar cores padrões | 2 | DW | 2
  | DW-007.6 | Adicionar fontes padrão | 2 | DW | 2
  | DW-007.7 | Estilização do formulário | 10 | DW | 2
  | DW-007.8 | Estilização do card de localização |  5 | DW | 2
  | DW-008 | Criação da estrutura da página sobre em HTML | 5 | DW | 2
  | DW-008.1 | Adicionar imagem e logo de colaboradores |  2 | DW | 2
  | DW-008.2 | Criação de um arquivo CSS para a estlização | 8 | DW | 2
  | DW-008.3 | Estilização da página  | 8 | DW | 2
  | DW-008.4 | Adicionar cores padrões  | 2 | DW | 2
  | DW-008.5 | Adicionar fontes padrão  | 2 | DW | 2
  | DW-009 | Criar a estrutura em HTML para o Header  | 10 | DW | 2
  | DW-009.1 | Estilizar o Header em CSS  | 10 | DW | 2
  | DW-010 | Criar a estrutura em HTML para o Footer  | 10 | DW | 2
  | DW-010.1 | Estilizar o footer em CSS   | 10 | DW | 2
  | DW-011 | Criar a estrutura da página administrativa em HTML  | 5 | DW | 2
  | DW-11.1 | Estilizar a página administrativa em CSS | 10 | DW | 2
  | DW-012 | Criação da estrutura HTML menu hamburguer. | 10 | DW | 2
  | DW-12.1 | Estilização do menu hamburguer em CSS. | 8 | DW | 2
  | AL-001 | Ligação com o BD | 20 | AL | 2
  | MB-001 | Testes no BD | 20 | MB | 2
  | SO-002 | Documentação | 20 | SO | 3
  | DW-013 | Botão de pesquisa do site | 10 | DW | 3
  | AL/MB-002 | Ligar filtros da página de artigos ao BD | 10 | AL/MB | 3
  | AL/MB-002.1 | Ligar filtros da página de vagas ao BD | 10 | AL/MB | 3
  | AL/MB-003 | Dinamizar página de vagas | 8 | AL/MB | 3
  | DW-014 | Formulário de candidatura via email | 10 | DW | 3
  | DW-014.1 | Formulário do fale conosco | 10 | DW | 3
  | AL/MB-004 | Dinamizar página inicial | 8 | AL/MB | 3
  | AL/MB-005 | Puxar o header e o footer da página admin | 5 | AL/MB | 3
  | SO-003 | Organizar pastas do GitHub | 20 | SO | 3
  | DW-015 | Design da página de login administrativo | 5 | DW | 3 
  | DW-016 | Login funcional e seguro da página admin   | 10 | DW | 3
  | DW-017 | Seletor de idioma (inglês/português) | 10 | DW | 3
  | DW-018 | Tradução em libras  | 5 | DW | 3
  | AL/MB-006 | Dinamizar página de membros | 10 | AL/MB | 3
  | AL/MB-007 | Dinamização da página de notícias | 10 | AL/MB | 3
  | AL/MB-008 | Subir login da pág admin | 8 | AL/MB | 3 
  | AL/MB-009 | Dinamização da página de projetos | 10 | AL/MB | 3 
  | AL/MB-010 | Subir a dinamização da pág de membros e projetos   | 8 | AL/MB | 3
  | AL/MB-011 | Adicionar botão de navegação na pág admin  | 8 | AL/MB | 3
  | AL/MB-012 | Correção de erros na pág de notícias | 10 | AL/MB | 3

  [↑ Voltar ao topo](#topo)
</details>


<details>
  <summary><b>Backlog de Gestão do Projeto 📌</b></summary>
  <br>
  
  | ID      | Seção / Atividade | Pontuação | Disciplina | Sprint |
  |---------|-------------------|-----------|------------|--------|
  | ES-001 | *Scrum Master:* Facilitar cerimônias ágeis, acompanhar impedimentos, garantir comunicação eficaz e apoiar a equipe na aplicação do DoD. | 20 | ES | 1, 2, 3 |
  | ES-002 | *Product Owner:* Refinar e priorizar backlog, alinhar requisitos com stakeholders, validar entregas nas reviews e garantir clareza nos critérios de aceitação. | 20 | ES | 1, 2, 3 |

  [↑ Voltar ao topo](#topo)

</details>


<a id="tecnologias"></a>

<details>
  <summary><b>Tecnologias 💻</b></summary>
  <br>
  <p align="center">
    <a href="https://www.figma.com/" style="">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" width="30" height="30">
    </a>
    <a href="https://trello.com/" >
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg" alt="Trello" width="30" height="30">
    </a>
    <a href="https://code.visualstudio.com/" >
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" width="30" height="30">
    </a>
  </p>
  
  [↑ Voltar ao topo](#topo)
</details>


<a id="equipe"></a>
# Nossa Equipe 👩‍💻

A equipe **404 Not Found** é constituída de alunos do primeiro semestre do curso de Desenvolvimento de Software Multiplataforma.

| Função        | Nome                          | Links |
|---------------|-------------------------------|-------|
| Project Owner | Eloah Sousa da Silva          | [GitHub](https://github.com/eloahsousaa) / [LinkedIn](https://www.linkedin.com/in/eloah-sousa-650038349/) |
| Scrum Master  | Pedro Gonçalves Sampaio       | [GitHub](https://github.com/PedroSmp) / [LinkedIn](https://www.linkedin.com/in/pedro-sampaio-463a77375) |
| Dev Team      | Ariana Ferreira dos Santos    | [GitHub](https://github.com/arianaferresan) / [LinkedIn](https://br.linkedin.com/in/arianaferreira) |
| Dev Team      | Felipe Faria Machado          | [GitHub](https://github.com/Felipe1781) / [LinkedIn](https://www.linkedin.com/in/felipefariamachado) |
| Dev Team      | João Augusto Leal Neto        | [GitHub](https://github.com/lealdev7) / [LinkedIn](https://www.linkedin.com/in/jo%C3%A3o-leal-558071385/) |
| Dev Team      | João Otávio Nunes de Mesquita | [GitHub](https://github.com/jotavionm) / [LinkedIn](https://www.linkedin.com/in/jo%C3%A3o-ot%C3%A1vio-nunes-mesquita/) |
| Dev Team      | Luiza Gonçalves Manchini      | [GitHub](https://github.com/luiza-manchini) / [LinkedIn](https://www.linkedin.com/in/luiza-manchini-b51a7b336/) |
| Dev Team      | William Max dos Santos Silva  | [GitHub](https://github.com/WilliamM4x) / [LinkedIn](https://www.linkedin.com/in/william-max-7b8036140/) |

[↑ Voltar ao topo](#topo)
