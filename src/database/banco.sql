CREATE TABLE IF NOT EXISTS categoria_noticias (
    id_categoria_noticias serial PRIMARY KEY,
    categoria varchar(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS noticias (
    id_noticias serial PRIMARY KEY,
    titulo varchar(255) NOT NULL,
    subtitulo varchar(500),
    data_criacao timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    url_imagem varchar(255) NOT NULL,
    texto TEXT NOT NULL,
    categoria varchar(30) NOT NULL,
    url_noticia varchar(255),
    destaque boolean NOT NULL DEFAULT FALSE,
    exibir BOOLEAN DEFAULT TRUE,
    CONSTRAINT noticias_fk_categoria FOREIGN KEY (categoria) REFERENCES categoria_noticias (categoria) ON UPDATE CASCADE ON DELETE RESTRICT
);

INSERT INTO categoria_noticias (categoria) VALUES ('Curso');

INSERT INTO categoria_noticias (categoria) VALUES ('Defesa');

INSERT INTO categoria_noticias (categoria) VALUES ('Informativo');

-- Tabela para armazenar as categorias das publicações
-- É criada primeiro porque a tabela 'artigos' depende dela.
CREATE TABLE IF NOT EXISTS categoria_artigos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE
);

-- Tabela principal para armazenar os dados dos artigos/publicações
CREATE TABLE IF NOT EXISTS artigos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    link_doi TEXT,
    link_pdf TEXT,
    url_imagem TEXT,
    data_cadastro TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    exibir BOOLEAN DEFAULT TRUE,

-- Chave estrangeira que referencia a tabela de categorias
id_categoria INTEGER NOT NULL,

-- Define a relação entre 'artigos' e 'categoria_artigos'
-- ON DELETE CASCADE significa que se uma categoria for deletada,
-- todos os artigos associados a ela também serão.
CONSTRAINT fk_categoria
        FOREIGN KEY(id_categoria) 
        REFERENCES categoria_artigos(id)
        ON DELETE CASCADE
);

INSERT INTO
    categoria_artigos (nome)
VALUES ('Artigos'),
    ('Artigos de Conferência (AC)'),
    ('Capítulos de livros (CL)'),
    ('Notas Técnicas (NT)');

CREATE TABLE IF NOT EXISTS grupos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

INSERT INTO
    grupos (id, nome)
VALUES (1, 'Coordenação'),
    (2, 'Pesquisadores'),
    (3, 'Doutorandos'),
    (4, 'Mestrandos'),
    (5, 'Bolsistas');

CREATE TABLE IF NOT EXISTS membros (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    descricao VARCHAR(400) NOT NULL,
    foto VARCHAR(400) NOT NULL,
    link VARCHAR(400),
    grupo_id INTEGER NOT NULL,
    exibir BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_membros_grupos FOREIGN KEY (grupo_id) REFERENCES grupos (id) ON DELETE CASCADE
);

-- 1) COORDENAÇÃO (grupo_id = 1)
INSERT INTO
    membros (
        nome,
        descricao,
        foto,
        link,
        grupo_id,
        exibir
    )
VALUES (
        'Marcos Adami',
        'Pesquisador titular do INPE, formado em Ciências Econômicas e com mestrado e doutorado em Sensoriamento Remoto pela mesma instituição. Atua com sistemas de informação geográfica e sensoriamento remoto, focando em séries temporais, mudanças no uso da terra, amostragem e estatísticas agrícolas.',
        '../../imagens/1.2 Equipe/Marcos_Adami.jpg',
        'http://lattes.cnpq.br/7484071887086439',
        1,
        TRUE
    );

-- 2) PESQUISADORES (grupo_id = 2)
INSERT INTO
    membros (
        nome,
        descricao,
        foto,
        link,
        grupo_id,
        exibir
    )
VALUES (
        'ANDRES VELÁSTEGUI',
        'Engenheiro Mecânico (ESPOL-Equador), mestre em Engenharia Ambiental (UB-Espanha) e doutor em Ciências Ambientais (UFPA). Atualmente é professor na ESPOL, com experiência em geociências e engenharia ambiental, focando em SIG, sensoriamento remoto, análise de séries temporais e mudança de uso da terra.',
        '../../imagens/1.2 Equipe/Andres_V.png',
        'https://www.escavador.com/sobre/10868535/andres-danilo-velastegui-montoya',
        2,
        TRUE
    ),
    (
        'CLEVERTON SANTANA',
        'Engenheiro Agrônomo com mestrado em Agricultura e doutorado em Sensoriamento Remoto. Atua na Conab como analista, pesquisando monitoramento agrícola com foco em estádios fenológicos, estimativas de área e produtividade, e classificação de culturas via sensoriamento remoto.',
        '../../imagens/1.2 Equipe/Cleverton_Santana.jpeg',
        'https://lattes.cnpq.br/6403186357124271.',
        2,
        TRUE
    ),
    (
        'FELIPE PETRONE',
        'Especialista GIS na VEGA Monitoramento, é Engenheiro Cartógrafo com mestrado em Sensoriamento Remoto. Possui experiência em processamento de dados geoespaciais para agricultura, desenvolvendo modelos de produtividade e monitoramento de safras com automação de fluxos em Python e Google Earth Engine.',
        '../../imagens/1.2 Equipe/Felipe_Petrone.jpeg',
        'https://www.linkedin.com/in/felipe-gomes-petrone/',
        2,
        TRUE
    ),
    (
        'HUGO BENDINI',
        'Engenheiro Agrônomo (UNESP), mestre em Ciência da Computação (UFSCar) e doutor em Sensoriamento Remoto (INPE/Humboldt-Berlin). Pesquisa sensoriamento remoto agrícola, machine learning e análise de séries temporais de imagens de satélite. Domina R, Python e computação em nuvem (Google Earth Engine).',
        '../../imagens/1.2 Equipe/hbendini.jpg',
        'https://www.escavador.com/sobre/5610465/hugo-do-nascimento-bendini',
        2,
        TRUE
    ),
    (
        'JOÃO DE SOUZA',
        'Bacharel em Ciência Ambiental (UFF) e mestre em Sensoriamento Remoto (INPE). Atua como Analista de Sensoriamento Remoto no PRODES Amazônia (INPE/CNPq), participando do mapeamento anual do desmatamento na Amazônia, em projetos para a União Europeia e na detecção de desmatamento no Pantanal.',
        '../../imagens/1.2 Equipe/João_de_Souza.jpeg',
        'https://www.linkedin.com/in/joaopedrodsc/',
        2,
        TRUE
    ),
    (
        'LUCAS OLDONI',
        'Doutor em Sensoriamento Remoto pelo INPE. Graduação (2016) e Mestrado (2018) em Engenharia Agrícola pelo Universidade Estadual do Oeste do Paraná (UNIOESTE). Tem experiência na área de Engenharia Agrícola, atuando principalmente nos seguintes temas: sensoriamento remoto agrícola, perfil temporal, índice de vegetação, estimativa de safras, agricultura de precisão.',
        '../../imagens/1.2 Equipe/Lucas-Oldoni-3.jpg',
        'https://www.escavador.com/sobre/7711778/lucas-volochen-oldoni',
        2,
        TRUE
    ),
    (
        'MICHEL EUSTAQUIO',
        'Professor Doutor na UNESP com doutorado premiado pela CAPES em Engenharia Agrícola e pós-doutorado no INPE. Pesquisador especialista em sensoriamento remoto aplicado ao monitoramento agrícola e ambiental dos biomas Amazônia e Cerrado, com passagens pela EMBRAPA e pelo projeto de mapeamento do CAR.',
        '../../imagens/1.2 Equipe/doc-michel.jpg',
        'http://lattes.cnpq.br/0567206071250904',
        2,
        TRUE
    ),
    (
        'VICTOR PRUDENTE',
        'Pesquisador de pós-doutorado na Universidade de Michigan, com doutorado em Sensoriamento Remoto (INPE) e formação em Engenharia Agrícola (Unioeste). Atua com sensoriamento remoto agrícola, SAR, multisensores, mudanças no uso da terra e agricultura familiar.',
        '../../imagens/1.2 Equipe/Victor Prudente.jpg',
        'http://lattes.cnpq.br/6154929133513022',
        2,
        TRUE
    );

-- 3) DOUTORANDOS (grupo_id = 3)
INSERT INTO
    membros (
        nome,
        descricao,
        foto,
        link,
        grupo_id,
        exibir
    )
VALUES (
        'ÂNGELA PIRES',
        'Engenheira Cartográfica e de Agrimensura pelo IFG. Possui experiência profissional no INCRA com a elaboração de mapas temáticos para georreferenciamento de imóveis rurais. Na academia, pesquisou a combinação de imagens ópticas e SAR em nuvem (GEE) para mapear o uso e cobertura da terra.',
        '../../imagens/1.2 Equipe/Angêla.jpeg',
        'https://www.linkedin.com/in/angela-gabrielly-pires-silva/',
        3,
        TRUE
    ),
    (
        'BAGGIO DE CASTRO',
        'Bacharel em Matemática Computacional pela UFF, com mestrado em Computação Aplicada pelo Instituto Nacional de Pesquisas Espaciais e especialização em Ciência de Dados Geoespaciais. Tem experiência e interesse em Processamento de Imagens. Possui conhecimento em linguagens de programação como C/C++, Java, Python, R e Shell Script, além de Computação de Alto Desempenho.',
        '../../imagens/1.2 Equipe/baggio.jpeg',
        'https://www.linkedin.com/in/baggio-castro/',
        3,
        TRUE
    ),
    (
        'DARLAN TELES',
        'Doutorando em Sensoriamento Remoto no INPE com ênfase em indicadores remoto para qualidade de pastagens no Cerrado. Mestre em Meteorologia Aplicada na Universidade Federal de Viçosa (UFV). Engenheiro Agrícola formado pela Universidade Federal de Sergipe (UFS).',
        '../../imagens/1.2 Equipe/Darlan_Teles.jpeg',
        'http://lattes.cnpq.br/2688151470890069',
        3,
        TRUE
    ),
    (
        'GABRIEL SANSIGOLO',
        'Doutorando em Computação Aplicada pelo INPE. Mestre em Computação Aplicada e Tecnólogo em Análise e Desenvolvimento de Sistemas. Tem experiência na área de Ciência da Computação, com ênfase em Geoinformática. Atualmente é pesquisador da Fundação para o Desenvolvimento Científico e Tecnológico em Saúde e desenvolvedor Full-stack nos Projetos Brazil Data Cube e HARMONIZE.',
        '../../imagens/1.2 Equipe/Gabriel_Sansigolo.jpeg',
        'http://lattes.cnpq.br/4094434844735694',
        3,
        TRUE
    ),
    (
        'HEITHOR QUEIROZ',
        'Professor no IF Baiano, é Doutorando em Sensoriamento Remoto (INPE), Mestre em Ciências Geodésicas (UFPE) e Graduado em Geoprocessamento (IFPB). Desenvolve um projeto de inovação (spin-off GeotipAI) aplicando imagens de satélite na agricultura e tem experiência como analista GIS no INSA.',
        '../../imagens/1.2 Equipe/heithor.jpeg',
        'https://www.linkedin.com/in/geotip-ai/',
        3,
        TRUE
    ),
    (
        'LUIS MAURANO',
        'Doutorando em Sensoriamento Remoto no INPE. Mestre em Sensoriamento Remoto pelo INPE. Possui graduação de Tecnólogo em Processamento de Dados pelo Mackenzie (1988). Atualmente é Tecnologista Sênior III da Divisão de Processamento de Imagens (DPI) do INPE com atuação no Programa Biomas BR - PRODES, DETER e TERRACLASS.',
        '../../imagens/1.2 Equipe/luiz Maurano.png',
        'http://lattes.cnpq.br/8242319727045776',
        3,
        TRUE
    ),
    (
        'LUIZ GABRIEL',
        'Doutorando em Sensoriamento Remoto no Programa de Pós Graduação em Sensoriamento Remoto do INPE. Possui graduação e mestrado em Engenharia Agronômica (UFSCar) e graduação em Ciências Moleculares (USP). Possui experiência em ciência de dados e tem interesse em processos de mudança de uso da terra e ordenamento territorial, meteorologia e ecologia.',
        '../../imagens/1.2 Equipe/Luiz_Gabriel.gif',
        'https://lattes.cnpq.br/9832175220121645',
        3,
        TRUE
    ),
    (
        'NILDSON SILVA',
        'Engenheiro Agrônomo (UFRPE) com graduação-sanduíche no curso de Engenharia Agrícola e do Meio Rural (USC/Espanha) e mestre em Sensoriamento Remoto (INPE). Atualmente doutorando em Sensoriamento Remoto (INPE) e Analista de Geoprocessamento na Serasa Experian.',
        '../../imagens/1.2 Equipe/Nildson_Silva.jpg',
        'http://lattes.cnpq.br/8478468854171346',
        3,
        TRUE
    ),
    (
        'PRISCILLA SANTOS',
        'Engenheira Agrimensora e Cartógrafa, Mestra em Geociências e Especialista em Estatística Aplicada pela Universidade Federal Rural do Rio de Janeiro (UFRRJ). Atualmente, Doutoranda em Sensoriamento Remoto pelo Instituto Nacional de Pesquisas Espaciais (INPE). Possui experiência na área de Geociências, com ênfase em Geomática.',
        '../../imagens/1.2 Equipe/Priscilla_Santos.jpg',
        'http://lattes.cnpq.br/1105545816489485',
        3,
        TRUE
    ),
    (
        'TÂNIA HOFFMANN',
        'Geógrafa pela Universidade Federal de Santa Catarina (UFSC), mestre e atualmente doutoranda em Sensoriamento Remoto pelo Instituto Nacional de Pesquisas Espaciais (INPE), com período sanduíche na Universidade de Maryland (UMD).',
        '../../imagens/1.2 Equipe/Tania_Hoffmann.jpg',
        'http://lattes.cnpq.br/4681448772106846',
        3,
        TRUE
    ),
    (
        'YAN AZEREDO',
        'Geógrafo pela UFF e mestre em Sensoriamento Remoto pelo INPE. Atualmente, é doutorando pelo mesmo instituto, com foco em monitoramento da vegetação nativa no bioma Cerrado. Possui experiência em geoprocessamento, modelagem ambiental e processamento digital de imagens de satélite, com ênfase em estudos de cobertura e uso da terra, desastres naturais e conservação ambiental.',
        '../../imagens/1.2 Equipe/YAN.gif',
        'http://lattes.cnpq.br/7374513612608164',
        3,
        TRUE
    );

-- 4) MESTRANDOS (grupo_id = 4)
INSERT INTO
    membros (
        nome,
        descricao,
        foto,
        link,
        grupo_id,
        exibir
    )
VALUES (
        'ANA JÚLIA DIAS',
        'Mestranda em Sensoriamento Remoto (INPE) e Bacharel em Geografia (UNESP). Sua pesquisa foca na identificação de degradação da vegetação no Cerrado. Atua também no projeto Lethal Psi (Leeds-UK), coletando e processando dados radiométricos da vegetação amazônica, com experiência em geoprocessamento.',
        '../../imagens/1.2 Equipe/Ana_Julia_Dias.gif',
        'http://lattes.cnpq.br/3916239078525280',
        4,
        TRUE
    ),
    (
        'MARINA GALDEZ',
        'Engenheira Agrícola e Ambiental formada pela Universidade Federal Fluminense (UFF). Atualmente, mestranda do Programa de Pós Graduação em Sensoriamento Remoto pelo Instituto Nacional de Pesquisas Espaciais (INPE). Desenvolve pesquisas voltadas ao monitoramento agrícola, com foco na estimativa da cobertura do solo por resíduos culturais.',
        '../../imagens/1.2 Equipe/Marina_Galdez.gif',
        'http://lattes.cnpq.br/3273203574648394',
        4,
        TRUE
    );

-- 5) BOLSISTAS (grupo_id = 5)
INSERT INTO
    membros (
        nome,
        descricao,
        foto,
        link,
        grupo_id,
        exibir
    )
VALUES (
        'ANDRÉ GÁRCIA',
        'Agrônomo (IFES) e Doutor em Sensoriamento Remoto (INPE), com foco em aplicações para a agricultura. É membro do AgriRSLab, desenvolvendo metodologias para mapeamento de cultivos. Atualmente é bolsista (CNPq) no projeto AgriRS/CONAB, onde mapeia o uso do solo com imagens ópticas e de micro-ondas (SAR).',
        '../../imagens/1.2 Equipe/Andre_Garcia.jpeg',
        'http://lattes.cnpq.br/7262240008707700',
        5,
        TRUE
    ),
    (
        'GRAZIELI RODIGHERI',
        'Engenheira Ambiental (UPF), mestre em Sensoriamento Remoto e Geoprocessamento (UFRGS) e doutora em Sensoriamento Remoto (INPE). Atualmente é bolsista de projeto (CNPq) do AgriRS em parceria com a CONAB.',
        '../../imagens/1.2 Equipe/Grazieli_Rodigheri.jpeg',
        'http://lattes.cnpq.br/0334477245993338',
        5,
        TRUE
    ),
    (
        'KELLIN KANG',
        'Bacharel em Ciências Ambientais (Unifesp). Atualmente é Bolsista de Desenvolvimento Tecnológico (CNPq) no INPE, com foco em sensoriamento remoto e inspeção de culturas agrícolas.',
        '../../imagens/1.2 Equipe/Kellin.jpeg',
        'https://www.linkedin.com/in/kellin-kang-94a868173/',
        5,
        TRUE
    ),
    (
        'LORRANY COLEGNAC',
        'Bacharel em Geografia (UNICENTRO). Atualmente é bolsista de projeto (CNPq) do AgriRS (INPE) em parceria com a CONAB.',
        '../../imagens/1.2 Equipe/Lorrany_Colegnac.jpg',
        'http://lattes.cnpq.br/1847544097139347',
        5,
        TRUE
    ),
    (
        'MAYRINE SILVA',
        'Bióloga (UTP) e Engenheira Florestal (UFSC), mestre em Ciências pelo PPG em Ecossistemas Agrícolas e Naturais (UFSC). Atualmente é bolsista de projeto (CNPq) do AgriRS em parceria com a CONAB.',
        '../../imagens/1.2 Equipe/Mayrine_Silva.jpg',
        'http://lattes.cnpq.br/0334477245993338',
        5,
        TRUE
    ),
    (
        'THAISA FERNANDES',
        'Cientista Ambiental (UFG), mestre em Ciências Ambientais (UnB) e doutoranda em Ciências Ambientais (UFG). Atualmente é bolsista de projeto (CNPq) do AgriRS (INPE) em parceria com a CONAB.',
        '../../imagens/1.2 Equipe/Thaisa_Fernandes.jpeg',
        'https://www.linkedin.com/in/thaisafernandesdeoliveira/',
        5,
        TRUE
    );
