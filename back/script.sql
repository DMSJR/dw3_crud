CREATE TABLE agencias (
    agenciaid INTEGER DEFAULT nextval('seq_agencias') PRIMARY KEY,
    codigo INTEGER,
    nome VARCHAR(30),
    endereco VARCHAR(255),
    email VARCHAR(30),
    telefone VARCHAR(20),
    saldo FLOAT,
    dataabertura DATE,  -- Corrigido para o tipo DATE
    deleted BOOLEAN
);

CREATE sequence seq_agencias;

create table IF NOT EXISTS usuarios (
    usuarioid bigserial constraint pk_usuarios PRIMARY KEY,
    username varchar(10) UNIQUE,
    password text,
    deleted boolean DEFAULT false
);

CREATE EXTENSION if NOT EXISTS pgcrypto;

insert into usuarios values 
    (default, 'admin', crypt('admin', gen_salt('bf'))), -- senha criptografada com bcrypt
    (default, 'qwe', crypt('qwe', gen_salt('bf'))) -- senha criptografada com bcrypt
ON CONFLICT DO NOTHING;