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
    CONSTRAINT noticias_fk_categoria
        FOREIGN KEY (categoria) 
        REFERENCES categoria_noticias (categoria)
        ON UPDATE CASCADE                    
        ON DELETE RESTRICT
);

INSERT INTO categoria_noticias (categoria) VALUES ('Curso');
INSERT INTO categoria_noticias (categoria) VALUES ('Defesa');
INSERT INTO categoria_noticias (categoria) VALUES ('Informativo');

-- Tabela para armazenar as categorias das publicações
-- É criada primeiro porque a tabela 'artigos' depende dela.
CREATE TABLE categoria_artigos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE
);

-- Tabela principal para armazenar os dados dos artigos/publicações
CREATE TABLE artigos (
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

INSERT INTO categoria_artigos (nome) VALUES
('Artigos'),
('Artigos de Conferência (AC)'),
('Capítulos de livros (CL)'),
('Notas Técnicas (NT)');
