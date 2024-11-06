-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 06, 2024 at 05:39 AM
-- Server version: 8.0.30
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_puskesmas`
--

-- --------------------------------------------------------

--
-- Table structure for table `pasien`
--

CREATE TABLE `pasien` (
  `id` int NOT NULL,
  `nik` varchar(20) DEFAULT NULL,
  `nama_lengkap` varchar(100) DEFAULT NULL,
  `jenis_kelamin` enum('Laki-laki','Perempuan') DEFAULT NULL,
  `umur` int DEFAULT NULL,
  `alamat` text,
  `poli` enum('umum','ibu_dan_anak','gigi_dan_mulut') DEFAULT NULL,
  `nomor_antrian` int DEFAULT NULL,
  `waktu_periksa` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pasien`
--

INSERT INTO `pasien` (`id`, `nik`, `nama_lengkap`, `jenis_kelamin`, `umur`, `alamat`, `poli`, `nomor_antrian`, `waktu_periksa`) VALUES
(1, '2306300', 'bima', 'Laki-laki', 22, 'serang', 'ibu_dan_anak', 1, '2024-11-04 00:31:35'),
(4, '2308374', 'Raul', 'Laki-laki', 24, 'Ciputat', 'gigi_dan_mulut', 4, '2024-11-04 13:53:08'),
(5, '23098234', 'Adit', 'Laki-laki', 28, 'Sawangan', 'ibu_dan_anak', 5, '2024-11-04 14:31:59'),
(6, '23098221', 'Raya', 'Perempuan', 29, 'Sawangan', 'umum', 6, '2024-11-04 15:02:24'),
(8, '23087456', 'Rininta', 'Perempuan', 19, 'BSD', 'umum', 8, '2024-11-04 16:09:36'),
(10, '2309730', 'Setina', 'Perempuan', 32, 'Pandeglang', 'gigi_dan_mulut', 9, '2024-11-04 17:27:34'),
(11, '2309736', 'Satya', 'Laki-laki', 48, 'Pamulang', 'umum', 10, '2024-11-04 18:00:41'),
(12, '23001154', 'Linda', 'Perempuan', 18, 'Serpong', 'gigi_dan_mulut', 11, '2024-11-04 18:35:17'),
(13, '2300873', 'Lidiya', 'Perempuan', 14, 'Pocis', 'ibu_dan_anak', 12, '2024-11-04 19:05:58'),
(14, '2302783', 'Amel', 'Perempuan', 10, 'BSD', 'ibu_dan_anak', 13, '2024-11-04 19:37:06'),
(15, '2308347', 'Stella', 'Perempuan', 25, 'Sawangan', 'umum', 14, '2024-11-04 21:46:53'),
(16, '2391145', 'Dinda', 'Perempuan', 21, 'Cikarang', 'umum', 15, '2024-11-04 22:54:27'),
(18, '2309834', 'Tiara', 'Perempuan', 21, 'BSD', 'umum', 17, '2024-11-04 23:56:49'),
(19, '2301176', 'Riyan', 'Laki-laki', 22, 'Pamulang', 'gigi_dan_mulut', 18, '2024-11-05 01:19:50'),
(21, '2308728', 'Shintiya', 'Perempuan', 25, 'Pamulang', 'ibu_dan_anak', 20, '2024-11-05 02:56:25'),
(22, '2308723', 'Shintiya', 'Perempuan', 21, 'Sawangan', 'umum', 21, '2024-11-05 03:29:02');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin','doctor') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`) VALUES
(1, 'admin', '$2a$10$qy6HRhPgmB.aHuUDhEXjBe27V9Nf4aA4j1XBiohFYCwyg5BIsKeQe', 'admin'),
(3, 'bima', '$2a$10$yjAYkAaIyyn//Ei6zbWpk.uw8wlX9SspGJTXDimhnsX99KXdLfcG6', 'user'),
(4, 'disa', '$2a$10$lQA/Nma6gRlGgdt9UYwd9eXGUu4IrV2F1dgXxLxkNpwpPaMmJ/FZW', 'user'),
(5, 'dine', '$2a$10$PF/1alSSMrmXICZBxNmVVeeNaPKVLKXU3Lo3YMC75mcyZs2B/UaCG', 'admin'),
(6, 'doctor', '$2a$10$b8h7UIUzcKiY2FrX6plUfupECMcgdU03BkobzGTVHqVRlYg3/3dqi', 'doctor'),
(7, 'dila', '$2a$10$.h49id30/tlrL.GXLsxlUug4P30t3/odlxE9XpxTyQ.fwmEqmkfXS', 'user'),
(8, 'rika', '$2a$10$Eu7fMp49gh1ZOkSSOvWwk.lOO2T0ZmxwXTyDsXPMb6DTA3NO/Ayoa', 'user'),
(9, 'rika', '$2a$10$8Lx09qwvy8nkNx.xCKmg9.JQa9tXaHx/edPjb1WVabb6Cn7pnYpkS', 'user'),
(10, 'raul', '$2a$10$TAa0Pevd1gnZCn5UzL7ozeFhhtrjvQOdPUpIwl8ISImCLJ8dz43AW', 'user'),
(11, 'bima', '$2a$10$nG8rVkbCr9wbQWKswGshT.Ee73ZZbFcJR3XOp3YxhKP9.VJeSnfWi', 'user'),
(12, 'setya', '$2a$10$dEARcAPjRCLqri2m27jYfup8g3rADWSweRIeUaE7QSK8mIrsw2BYu', 'user'),
(13, 'lana', '$2a$10$sCX6WLJiT3nfYWZ1j18cmee3N4Aair3qUIxUUKB9vCz6Up/9x7qKS', 'user'),
(14, 'nadin', '$2a$10$KkyIcbX9Nw5hL/jAZKtegeCgMXb12nxwlFyEut1hocxlAxOMV.hla', 'user'),
(15, 'nasyid', '$2a$10$WGgD/TADUZkg2yr4nChoCOHSCiaoLkuujm/2h4H81weunBn.NHu/i', 'user'),
(16, 'nadya', '$2a$10$b9fFESS5isTZcM.E1Od6vuFLcpsZPEHn341WMJo5xl5X8dfUkgIWC', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pasien`
--
ALTER TABLE `pasien`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pasien`
--
ALTER TABLE `pasien`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
