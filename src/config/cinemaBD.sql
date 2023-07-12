-- Volcando estructura de base de datos para Restaurante
CREATE DATABASE IF NOT EXISTS `Restaurante`;
USE `Restaurante`;

-- Volcando estructura para tabla Restaurante.plataforma
CREATE TABLE IF NOT EXISTS `mesa` (
  `id_mesa` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `vendido` tinyint(4) DEFAULT NULL,
  `id_usu` int(11) NOT NULL,
  PRIMARY KEY (`id_mesa`) USING BTREE,
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando estructura para tabla Restaurante.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usu` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(64) DEFAULT NULL,
  `apellido` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `user` varchar(16) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  `activo` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id_usu`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando estructura para tabla Restaurante.Restaurante
CREATE TABLE IF NOT EXISTS `restaurante` (
  `id_restaurante` int(11) NOT NULL AUTO_INCREMENT,
  `reserva` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `id_usu` int(11) NOT NULL,
  PRIMARY KEY (`id_restaurante`) USING BTREE,
  UNIQUE KEY `reserva` (`reserva`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
