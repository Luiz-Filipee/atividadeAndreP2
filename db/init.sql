CREATE TABLE vendas (
    id SERIAL PRIMARY KEY,
    categoria VARCHAR(50),
    valor DECIMAL(10,2),
    data_venda TIMESTAMP DEFAULT NOW()
);

INSERT INTO vendas (categoria, valor) VALUES
('Eletrônicos', 120.50),
('Eletrônicos', 400.00),
('Roupas', 80.00),
('Roupas', 90.00),
('Alimentos', 15.20),
('Alimentos', 30.10),
('Esporte', 210.00),
('Eletrônicos', 980.90),
('Roupas', 60.00),
('Esporte', 150.00),
('Roupas', 75.50),
('Alimentos', 20.00),
('Esporte', 310.00),
('Eletrônicos', 199.90),
('Roupas', 55.00),
('Alimentos', 18.99),
('Eletrônicos', 300.00),
('Esporte', 600.00),
('Roupas', 95.00),
('Eletrônicos', 499.00);
