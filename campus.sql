-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 16, 2024 at 08:06 AM
-- Server version: 11.2.5-MariaDB
-- PHP Version: 8.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `campus`
--

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `id` int(11) NOT NULL,
  `nama_mahasiswa` varchar(255) NOT NULL,
  `fakultas` varchar(255) NOT NULL,
  `semester` int(20) NOT NULL,
  `alamat` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mahasiswa`
--

INSERT INTO `mahasiswa` (`id`, `nama_mahasiswa`, `fakultas`, `semester`, `alamat`) VALUES
(1, 'agus', 'Teknik ', 6, 'jl rahmad 10'),
(2, 'siti', 'Teknik sapi Luncur', 10, 'Jl suhat 20'),
(3, 'agus junior', 'Teknik Tepuk Pramuka', 12, 'jl cus 23'),
(5, 'robert', 'Teknik Kecil', 2, 'jl kadungpleset 23'),
(6, 'hamdog', 'teknik kapal karam', 24, 'jl sumenek 12'),
(8, 'suciptop', 'Kedokteran', 5, 'jl Sarjana mang eak'),
(9, 'mamad', 'Teknik Penting kerja', 10, 'jl Ikangiat 12'),
(10, 'alex', 'Teknik Bule', 3, 'jl Ikangiat 12'),
(11, 'gogog', 'Fakultas Farmasi', 2, 'jl Farmasi 12');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `role` enum('admin','user') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`) VALUES
(1, 'admin', '$2y$10$bcFdDDdJqvDualxFTJFB5eZ06V3l9fhUGQK5x5AcTSg12xkdwb/lG', 'admin'),
(2, 'user', 'userhas123', 'user'),
(3, 'agus', '$2b$10$CrIEuAGF5xdd99zhZlueGeKXzq.CEzbtXXo912S2av8ju30/74T/K', 'user'),
(4, 'admin2', '$2b$10$ZLWFp4AnIQF8wIqud4SRt.bFyw9aUGFiYhL78m0IDe2jHzbGzZC62', 'admin'),
(5, 'mimin', '$2b$10$9TgUPr2gIbBmGdrXwgOPa.yP09zBE.BsLyi/5DOyHZAIJc895gCAW', 'user'),
(6, 'person', '$2b$10$ot0MrFgu7AwH9NohVCrTgu0quT3hiyGRlXvxdbtMfQA3sOaOk/Op2', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
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
-- AUTO_INCREMENT for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
