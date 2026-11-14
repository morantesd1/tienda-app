-- 1. Crear y seleccionar la base de datos
CREATE DATABASE IF NOT EXISTS tienda_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE tienda_db;

-- 2. Crear la tabla padre: categorias
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- 3. Crear la tabla hija: productos (relación 1 a N)
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria_id INT NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL CHECK (precio >= 0),
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_productos_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categorias(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;

-- 4. Insertar datos de ejemplo
INSERT INTO categorias (nombre) VALUES 
    ('Electrónica'),
    ('Ropa'),
    ('Mascotas'),
    ('Salud y Belleza'),
    ('Papelería y Oficina'),
    ('Alimentos');

INSERT INTO productos (categoria_id, nombre, precio, stock) VALUES 
    (1, 'Laptop Lenovo ThinkPad', 850.00, 12),
    (1, 'Audífonos Bluetooth', 45.99, 30),
    (2, 'Camiseta de Algodón', 15.50, 50),
    (3, 'Café Molido 500g', 8.75, 40);

-- 5. Consulta para comprobar la relación (JOIN)
SELECT 
    p.id,
    p.nombre AS producto,
    c.nombre AS categoria,
    p.precio,
    p.stock,
    p.fecha_creacion
FROM productos p
INNER JOIN categorias c ON p.categoria_id = c.id;