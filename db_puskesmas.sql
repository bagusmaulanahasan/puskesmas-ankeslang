-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 25, 2024 at 10:22 AM
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
-- Table structure for table `history_delete_pasien`
--

CREATE TABLE `history_delete_pasien` (
  `id` int NOT NULL,
  `nik` varchar(20) DEFAULT NULL,
  `nama_lengkap` varchar(255) DEFAULT NULL,
  `jenis_kelamin` varchar(10) DEFAULT NULL,
  `umur` int DEFAULT NULL,
  `alamat` text,
  `poli` varchar(100) DEFAULT NULL,
  `nomor_antrian` varchar(50) DEFAULT NULL,
  `waktu_periksa` datetime DEFAULT NULL,
  `pendaftar` varchar(255) DEFAULT NULL,
  `dihapus_oleh_admin` varchar(255) DEFAULT NULL,
  `waktu_terhapus` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `history_delete_pasien`
--

INSERT INTO `history_delete_pasien` (`id`, `nik`, `nama_lengkap`, `jenis_kelamin`, `umur`, `alamat`, `poli`, `nomor_antrian`, `waktu_periksa`, `pendaftar`, `dihapus_oleh_admin`, `waktu_terhapus`) VALUES
(1, '1213213', 'wilson', 'Laki-laki', 44, 'Pocis', 'umum', '1', '2024-11-25 16:02:58', 'wilson', 'admin1', '2024-11-25 16:19:50'),
(2, '22982343', 'Bagus Maulana', 'Laki-laki', 22, 'Pamulang Barat', 'umum', '2', '2024-11-25 16:32:58', 'bgs', 'admin1', '2024-11-25 16:34:20');

-- --------------------------------------------------------

--
-- Table structure for table `history_delete_users`
--

CREATE TABLE `history_delete_users` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `role` varchar(20) DEFAULT NULL,
  `nik` varchar(20) DEFAULT NULL,
  `nama_lengkap` varchar(100) DEFAULT NULL,
  `umur` int DEFAULT NULL,
  `jenis_kelamin` enum('Laki-laki','Perempuan') DEFAULT NULL,
  `alamat` text,
  `dihapus_oleh_admin` varchar(100) NOT NULL DEFAULT 'tidak_ada',
  `waktu_terhapus` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `history_delete_users`
--

INSERT INTO `history_delete_users` (`id`, `username`, `role`, `nik`, `nama_lengkap`, `umur`, `jenis_kelamin`, `alamat`, `dihapus_oleh_admin`, `waktu_terhapus`) VALUES
(1, 'kitty', 'user', '1232233', 'Kitty Amelia', 23, 'Perempuan', 'Pamulang Barat', 'admin1', '2024-11-25 14:49:57'),
(2, 'ciya', 'user', '21214343', 'Ciya Batu', 18, 'Perempuan', 'BSD', 'admin1', '2024-11-25 15:22:31'),
(3, 'nadin', 'user', '2301123', 'Nadine Shilla', 12, 'Perempuan', 'Pocis', 'admin1', '2024-11-25 15:31:56');

-- --------------------------------------------------------

--
-- Table structure for table `pasien`
--

CREATE TABLE `pasien` (
  `id` int NOT NULL,
  `nik` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nama_lengkap` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `jenis_kelamin` enum('Laki-laki','Perempuan') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `umur` int DEFAULT NULL,
  `alamat` text COLLATE utf8mb4_general_ci,
  `poli` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nomor_antrian` int DEFAULT NULL,
  `waktu_periksa` datetime DEFAULT NULL,
  `pendaftar` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pasien`
--

INSERT INTO `pasien` (`id`, `nik`, `nama_lengkap`, `jenis_kelamin`, `umur`, `alamat`, `poli`, `nomor_antrian`, `waktu_periksa`, `pendaftar`) VALUES
(1, '22101111', 'Raul', 'Laki-laki', 24, 'Ciputat', 'umum', 1, '2024-11-25 17:08:42', 'raul'),
(2, '22101111', 'Raul', 'Laki-laki', 24, 'Ciputat', 'gigi_dan_mulut', 1, '2024-11-25 17:08:47', 'raul'),
(3, '22101111', 'Raul', 'Laki-laki', 24, 'Ciputat', 'umum', 2, '2024-11-25 17:38:42', 'raul'),
(4, '22101128', 'Nadine Shilla', 'Perempuan', 19, 'Pamulang Barat', 'gigi_dan_mulut', 2, '2024-11-25 17:38:47', 'nadin'),
(5, '22101128', 'Nadine Shilla', 'Perempuan', 19, 'Pamulang Barat', 'umum', 3, '2024-11-25 18:08:42', 'nadin'),
(6, '22101129', 'Tasya Syilla', 'Perempuan', 29, 'Pamulang Timur', 'ibu_dan_anak', 1, '2024-11-25 17:16:27', 'tasya'),
(7, '22101199', 'Bani Suregar', 'Perempuan', 10, 'Pamulang Timur', 'ibu_dan_anak', 2, '2024-11-25 17:46:27', 'bani'),
(8, '22101199', 'Bani Suregar', 'Perempuan', 10, 'Pamulang Timur', 'umum', 4, '2024-11-25 18:38:42', 'bani'),
(9, '22101128', 'Nadine Shilla', 'Perempuan', 19, 'Pamulang Barat', 'gigi_dan_mulut', 3, '2024-11-25 18:08:47', 'nadin');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('user','admin','doctor') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nik` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nama_lengkap` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `umur` int DEFAULT NULL,
  `jenis_kelamin` enum('Laki-laki','Perempuan') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `alamat` text COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `nik`, `nama_lengkap`, `umur`, `jenis_kelamin`, `alamat`) VALUES
(1, 'doctor', '$2a$10$b8h7UIUzcKiY2FrX6plUfupECMcgdU03BkobzGTVHqVRlYg3/3dqi', 'doctor', NULL, NULL, NULL, NULL, NULL),
(2, 'admin1', '$2a$10$qy6HRhPgmB.aHuUDhEXjBe27V9Nf4aA4j1XBiohFYCwyg5BIsKeQe', 'admin', '22101123', 'Nadine Syafila', 24, 'Perempuan', 'Pamulang Barat'),
(3, 'admin2', '$2a$10$tNvRVHv90Zag0dGNGwE6xOugT7TfE9SaoJIkUpa48cYwJebIQ/epK', 'admin', '22101124', 'Salwa Meyshandra', 27, 'Perempuan', 'Pamulang Timur'),
(4, 'wilson', '$2a$10$gNeQuTvMl6mreW/wXmAZceMuGximqa/0d0cLfJhKi4NLLfyxczy2u', 'user', '1213213', 'wilson', 44, 'Laki-laki', 'Pocis'),
(5, 'bgs', '$2a$10$cTFn8BROnr/7eQI/R1/3duZv2U9CMa6x0qBiI3HYhlANb7lNdjEXm', 'user', '22982343', 'Bagus Maulana', 22, 'Laki-laki', 'Pamulang Barat'),
(6, 'raul', '$2a$10$58RF3peeGlgSd7Vs29tcruC.03tYiboVd2tURKoTAy3Ac3TT1SgpG', 'user', '22101111', 'Raul', 24, 'Laki-laki', 'Ciputat'),
(7, 'nadin', '$2a$10$r2lSiWhXw5jOLaBpvm7CMO35V8.S9RxvB00BfoNgS4GENdFJbKHGO', 'user', '22101128', 'Nadine Shilla', 19, 'Perempuan', 'Pamulang Barat'),
(8, 'tasya', '$2a$10$emc.UL3QzogMlmhOSsCMbuxsgr8rcHIURDkGOmeGMf996cUMjPI5W', 'user', '22101129', 'Tasya Syilla', 29, 'Perempuan', 'Pamulang Timur'),
(9, 'bani', '$2a$10$9qHk4QEGBAHYK1WamKPhv.G0oVUSkefFPVr5VlASR/ldBmyCLqkjO', 'user', '22101199', 'Bani Suregar', 10, 'Perempuan', 'Pamulang Timur');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `history_delete_pasien`
--
ALTER TABLE `history_delete_pasien`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history_delete_users`
--
ALTER TABLE `history_delete_users`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `history_delete_pasien`
--
ALTER TABLE `history_delete_pasien`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `history_delete_users`
--
ALTER TABLE `history_delete_users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pasien`
--
ALTER TABLE `pasien`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
