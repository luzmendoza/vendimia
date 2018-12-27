-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 27-12-2018 a las 01:53:03
-- Versión del servidor: 10.2.17-MariaDB
-- Versión de PHP: 7.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `id8298531_vendimia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_articulos`
--

CREATE TABLE `cat_articulos` (
  `id` int(11) NOT NULL,
  `clave` varchar(5) NOT NULL,
  `descripcion` varchar(30) NOT NULL,
  `modelo` varchar(30) DEFAULT NULL,
  `precio` float(7,2) NOT NULL,
  `existencia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cat_articulos`
--

INSERT INTO `cat_articulos` (`id`, `clave`, `descripcion`, `modelo`, `precio`, `existencia`) VALUES
(4, '00004', 'silla', 'plastico', 4250.00, 0),
(5, '00005', 'mesa', 'contemporanea', 560.00, 3),
(6, '00006', 'clave autorgenerada', '', 24.00, 1),
(7, '2', 'este no esta', 'si esta', 600.00, 23),
(8, '3', 'tres', '', 3.00, 3),
(9, '00007', 'brincando', 'nrr', 34.00, 1),
(10, '00024', 'desde', 'el rute', 33.44, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_clientes`
--

CREATE TABLE `cat_clientes` (
  `id` int(11) NOT NULL,
  `clave` varchar(5) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido_paterno` varchar(20) NOT NULL,
  `apellido_materno` varchar(20) NOT NULL,
  `rfc` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cat_clientes`
--

INSERT INTO `cat_clientes` (`id`, `clave`, `nombre`, `apellido_paterno`, `apellido_materno`, `rfc`) VALUES
(1, '1', 'luz maria', 'mendoza', 'reyes', 'rfc130789'),
(2, '00002', 'eva liz', 'mendozz', 'reyes', '123'),
(5, '00001', 'existo', 'luego', 'no e', 'existos'),
(6, '00009', 'con routing', 'rout', 'rout', 'asdfasdf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_folios`
--

CREATE TABLE `cat_folios` (
  `id` int(11) NOT NULL,
  `tipo_folio` char(1) NOT NULL COMMENT '1.-articulos,2.-clientes,3.-ventas',
  `folio` char(5) NOT NULL,
  `consecutivo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cat_folios`
--

INSERT INTO `cat_folios` (`id`, `tipo_folio`, `folio`, `consecutivo`) VALUES
(10, '3', '00001', 1),
(11, '3', '00002', 2),
(12, '3', '00003', 3),
(13, '3', '00004', 4),
(15, '3', '00005', 5),
(17, '1', '00001', 1),
(18, '1', '00002', 2),
(19, '1', '00003', 6),
(20, '1', '00007', 7),
(22, '1', '00008', 8),
(23, '2', '00001', 1),
(25, '2', '00002', 2),
(26, '1', '00009', 9),
(28, '1', '00010', 10),
(29, '1', '00011', 11),
(30, '1', '00012', 12),
(31, '1', '00013', 13),
(32, '1', '00014', 14),
(33, '1', '00015', 15),
(34, '1', '00016', 16),
(35, '1', '00017', 17),
(36, '1', '00018', 18),
(37, '1', '00019', 19),
(38, '1', '00020', 20),
(39, '1', '00021', 21),
(40, '1', '00022', 22),
(43, '2', '00003', 3),
(44, '2', '00004', 4),
(45, '2', '00005', 5),
(47, '2', '00006', 6),
(48, '2', '00007', 7),
(50, '2', '00008', 8),
(52, '1', '00023', 23),
(54, '3', '00006', 6),
(55, '3', '00007', 7),
(56, '3', '00008', 8),
(57, '3', '00009', 9),
(58, '3', '00010', 10),
(59, '3', '00011', 11),
(60, '2', '00009', 9),
(61, '1', '00024', 24),
(62, '3', '00012', 12),
(63, '3', '00013', 13),
(64, '2', '00010', 10),
(67, '1', '00025', 25),
(68, '2', '00011', 11),
(69, '3', '00014', 14),
(70, '3', '00015', 15),
(71, '3', '00016', 16),
(72, '3', '00017', 17),
(73, '3', '00018', 18),
(74, '3', '00019', 19),
(75, '1', '00026', 26),
(76, '1', '00027', 27),
(77, '1', '00028', 28),
(78, '1', '00029', 29),
(79, '3', '00020', 20),
(80, '1', '00030', 30),
(81, '2', '00012', 12),
(82, '3', '00021', 21),
(83, '3', '00022', 22),
(84, '3', '00023', 23),
(85, '1', '00031', 31),
(86, '2', '00013', 13),
(87, '3', '00024', 24),
(88, '3', '00025', 25),
(89, '3', '00026', 26),
(90, '3', '00027', 27),
(91, '3', '00028', 28),
(92, '3', '00029', 29),
(93, '3', '00030', 30),
(94, '3', '00031', 31),
(95, '3', '00032', 32),
(96, '3', '00033', 33),
(97, '3', '00034', 34),
(98, '3', '00035', 35),
(99, '3', '00036', 36),
(100, '3', '00037', 37),
(101, '3', '00038', 38),
(102, '3', '00039', 39),
(103, '3', '00040', 40),
(104, '3', '00041', 41),
(105, '3', '00042', 42),
(106, '3', '00043', 43),
(107, '3', '00044', 44),
(108, '3', '00045', 45),
(109, '3', '00046', 46),
(110, '3', '00047', 47),
(111, '1', '00032', 32),
(112, '1', '00033', 33),
(113, '1', '00034', 34),
(114, '1', '00035', 35),
(115, '3', '00048', 48),
(116, '1', '00036', 36),
(117, '2', '00014', 14),
(118, '3', '00049', 49),
(119, '3', '00050', 50),
(120, '3', '00051', 51);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `config_general`
--

CREATE TABLE `config_general` (
  `tasa_financiamiento` double NOT NULL,
  `porc_enganche` int(11) NOT NULL,
  `plazo_maximo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `config_general`
--

INSERT INTO `config_general` (`tasa_financiamiento`, `porc_enganche`, `plazo_maximo`) VALUES
(2.8, 20, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` int(11) NOT NULL,
  `folio` varchar(5) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `total` float(7,2) NOT NULL,
  `enganche` float(7,2) NOT NULL,
  `bonificacion` float(7,2) NOT NULL,
  `mensualidades` int(11) NOT NULL,
  `estatus` char(1) NOT NULL COMMENT '1.-Activo; 2.-Cancelado',
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id`, `folio`, `id_cliente`, `total`, `enganche`, `bonificacion`, `mensualidades`, `estatus`, `fecha`) VALUES
(1, '0', 1, 4160.84, 1135.60, 381.56, 6, '1', '2018-12-26 01:59:34'),
(2, '0', 2, 548.25, 149.63, 50.28, 12, '1', '2018-12-26 02:06:03'),
(3, '00003', 1, 5257.34, 1434.86, 482.11, 9, '1', '2018-12-26 02:12:01'),
(4, '00012', 1, 4160.84, 1135.60, 381.56, 12, '1', '2018-12-26 20:47:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas_detalle`
--

CREATE TABLE `ventas_detalle` (
  `id` int(11) NOT NULL,
  `id_venta` int(11) NOT NULL,
  `id_articulo` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `ventas_detalle`
--

INSERT INTO `ventas_detalle` (`id`, `id_venta`, `id_articulo`, `cantidad`) VALUES
(1, 2, 5, 1),
(2, 3, 4, 1),
(3, 3, 5, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cat_articulos`
--
ALTER TABLE `cat_articulos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `clave` (`clave`);

--
-- Indices de la tabla `cat_clientes`
--
ALTER TABLE `cat_clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `clave` (`clave`);

--
-- Indices de la tabla `cat_folios`
--
ALTER TABLE `cat_folios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_clientes` (`id_cliente`);

--
-- Indices de la tabla `ventas_detalle`
--
ALTER TABLE `ventas_detalle`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ventas` (`id_venta`),
  ADD KEY `fk_articulos` (`id_articulo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cat_articulos`
--
ALTER TABLE `cat_articulos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `cat_clientes`
--
ALTER TABLE `cat_clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `cat_folios`
--
ALTER TABLE `cat_folios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `ventas_detalle`
--
ALTER TABLE `ventas_detalle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `fk_clientes` FOREIGN KEY (`id_cliente`) REFERENCES `cat_clientes` (`id`);

--
-- Filtros para la tabla `ventas_detalle`
--
ALTER TABLE `ventas_detalle`
  ADD CONSTRAINT `fk_articulos` FOREIGN KEY (`id_articulo`) REFERENCES `cat_articulos` (`id`),
  ADD CONSTRAINT `fk_ventas` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
