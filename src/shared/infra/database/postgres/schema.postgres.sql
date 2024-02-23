CREATE TABLE Clientes(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(25) NOT NULL,
    limite INTEGER NOT NULL,
    saldo INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE Transacoes(
    id SERIAL PRIMARY KEY,
    valor INTEGER NOT NULL,
    tipo VARCHAR(1) NOT NULL,
    descricao VARCHAR(10) NOT NULL,
    realizada_em TIMESTAMP NOT NULL DEFAULT NOW(),
    cliente_id INTEGER NOT NULL,
    CONSTRAINT fk_cliente_id FOREIGN KEY (cliente_id) REFERENCES Clientes(id)
);

INSERT INTO Clientes (nome, limite) VALUES ('o barato sai caro', 1000 * 100);
INSERT INTO Clientes (nome, limite) VALUES ('zan corp ltda', 800 * 100);
INSERT INTO Clientes (nome, limite) VALUES ('les cruders', 10000 * 100);
INSERT INTO Clientes (nome, limite) VALUES ('padaria joia de cocaia', 100000 * 100);
INSERT INTO Clientes (nome, limite) VALUES ('kid mais', 5000 * 100);