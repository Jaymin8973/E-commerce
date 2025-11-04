-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 04, 2025 at 02:25 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(120) NOT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productTypeId` int(11) DEFAULT NULL,
  `genderId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `createdAt`, `updatedAt`, `productTypeId`, `genderId`) VALUES
(1, 'Topwear', 'topwear', 'Upper-body apparel including shirts and t-shirts', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 1),
(2, 'Topwear', 'topwear', 'Upper-body apparel including shirts and t-shirts', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(3, 'Bottomwear', 'bottomwear', 'Lower-body apparel such as trousers and shorts', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 1),
(4, 'Bottomwear', 'bottomwear', 'Lower-body apparel such as trousers and shorts', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(5, 'Jeans', 'jeans', 'Denim jeans for casual and everyday wear', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 1),
(6, 'Jeans', 'jeans', 'Denim jeans for casual and everyday wear', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(7, 'Jackets', 'jackets', 'Winter or casual jackets in various styles', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 3),
(8, 'Sneakers', 'sneakers', 'Casual and sports sneakers', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2, 3),
(9, 'Formal Shoes', 'formal-shoes', 'Formal shoes for business and occasions', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2, 1),
(10, 'Sandals', 'sandals', 'Lightweight open footwear for casual use', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2, 3),
(11, 'Boots', 'boots', 'Durable boots for outdoor or fashion wear', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2, 3),
(12, 'Watches', 'watches', 'Analog and digital wrist watches', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 3, 3),
(13, 'Sunglasses', 'sunglasses', 'UV-protected sunglasses for men and women', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 3, 3),
(14, 'Wallets', 'wallets', 'Leather and fabric wallets for daily use', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 3, 3),
(15, 'Belts', 'belts', 'Formal and casual belts for men and women', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `genders`
--

CREATE TABLE `genders` (
  `id` int(11) NOT NULL,
  `gender` enum('Men','Women','Unisex') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `genders`
--

INSERT INTO `genders` (`id`, `gender`, `createdAt`, `updatedAt`) VALUES
(1, 'Men', '2025-11-03 08:54:49', '2025-11-03 08:54:49'),
(2, 'Women', '2025-11-03 08:54:58', '2025-11-03 08:54:58'),
(3, 'Unisex', '2025-11-03 08:55:01', '2025-11-03 08:55:01');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `productName` varchar(150) NOT NULL,
  `brand` varchar(100) NOT NULL,
  `shortDescription` text DEFAULT NULL,
  `status` enum('active','draft','inactive') DEFAULT 'active',
  `imageUrl` varchar(255) DEFAULT NULL,
  `mrp` float NOT NULL,
  `sellingPrice` float NOT NULL,
  `discountPercent` float DEFAULT NULL,
  `sku` varchar(100) NOT NULL,
  `hsnCode` varchar(50) DEFAULT NULL,
  `totalStock` int(11) NOT NULL DEFAULT 0,
  `lowStockAlert` int(11) DEFAULT 5,
  `metaTitle` varchar(160) DEFAULT NULL,
  `metaDescription` varchar(255) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `productTypeId` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `subcategoryId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `genderId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `productName`, `brand`, `shortDescription`, `status`, `imageUrl`, `mrp`, `sellingPrice`, `discountPercent`, `sku`, `hsnCode`, `totalStock`, `lowStockAlert`, `metaTitle`, `metaDescription`, `tags`, `productTypeId`, `categoryId`, `subcategoryId`, `createdAt`, `updatedAt`, `genderId`) VALUES
(1, 'Zara Loafers (Footwear)', 'Zara', 'Zara Loafers - quality footwear crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Loafers', 6917, 5016.49, 27.5, 'ZAR-FOO-0024', '42021200', 236, 5, NULL, NULL, NULL, 2, 9, NULL, '2025-11-04 13:17:12', '2025-11-04 13:17:12', 1),
(2, 'Levis Formal (Accessories)', 'Levis', 'Levis Formal - quality accessories crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Formal', 5660, 3605.87, 36.3, 'LEV-ACC-0035', '61091000', 282, 5, NULL, NULL, NULL, 3, 15, NULL, '2025-11-04 13:17:12', '2025-11-04 13:17:12', 1),
(3, 'Campus Oxford (Footwear)', 'Campus', 'Campus Oxford - quality footwear crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Oxford', 5688, 5043.37, 11.3, 'CAM-FOO-0019', '42021200', 106, 5, NULL, NULL, NULL, 2, 9, NULL, '2025-11-04 13:17:12', '2025-11-04 13:17:12', 1),
(4, 'Woodland Fabric (Accessories)', 'Woodland', 'Woodland Fabric - quality accessories crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Fabric', 1631, 957.27, 41.3, 'WOO-ACC-0045', '91021100', 146, 5, NULL, NULL, NULL, 3, 14, NULL, '2025-11-04 13:17:12', '2025-11-04 13:17:12', 1),
(5, 'Nike T-Shirts (Clothing)', 'Nike', 'Nike T-Shirts - quality clothing crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?T-Shirts', 4532, 3894.02, 14.1, 'NIK-CLO-0008', '61091000', 124, 5, NULL, NULL, NULL, 1, 1, NULL, '2025-11-04 13:17:12', '2025-11-04 13:17:12', 1),
(6, 'H&M Jeans (Clothing)', 'H&M', 'H&M Jeans - quality clothing crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Jeans', 6434, 5092.45, 20.9, 'H&M-CLO-0006', '61091000', 240, 5, NULL, NULL, NULL, 1, 3, NULL, '2025-11-04 13:17:12', '2025-11-04 13:17:12', 3),
(7, 'Woodland Casual Sneakers (Footwear)', 'Woodland', 'Woodland Casual Sneakers - quality footwear crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Casual+Sneakers', 8253, 5480.81, 33.6, 'WOO-FOO-0034', '42029100', 289, 5, NULL, NULL, NULL, 2, 8, NULL, '2025-11-04 13:17:12', '2025-11-04 13:17:12', 3),
(8, 'Zara Chelsea Boots (Footwear)', 'Zara', 'Zara Chelsea Boots - quality footwear crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Chelsea+Boots', 7534, 5551.13, 26.3, 'ZAR-FOO-0029', '42029100', 32, 5, NULL, NULL, NULL, 2, 11, NULL, '2025-11-04 13:17:12', '2025-11-04 13:17:12', 3),
(9, 'Fossil Denim Jackets (Clothing)', 'Fossil', 'Fossil Denim Jackets - quality clothing crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Denim+Jackets', 7711, 4339.08, 43.7, 'FOS-CLO-0002', '61091000', 116, 5, NULL, NULL, NULL, 1, 7, NULL, '2025-11-04 13:17:12', '2025-11-04 13:17:12', 1),
(10, 'Nike Leather (Accessories)', 'Nike', 'Nike Leather - quality accessories crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Leather', 8610, 6467.32, 24.9, 'NIK-ACC-0036', '42021200', 85, 5, NULL, NULL, NULL, 3, 14, NULL, '2025-11-04 13:17:12', '2025-11-04 13:17:12', 1),
(11, 'Bata Winter Jackets (Clothing)', 'Bata', 'Bata Winter Jackets - quality clothing crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Winter+Jackets', 7818, 7107.57, 9.1, 'BAT-CLO-0014', '91021100', 190, 5, NULL, NULL, NULL, 1, 7, NULL, '2025-11-04 13:17:12', '2025-11-04 13:17:12', 1),
(12, 'Fossil Jeans (Clothing)', 'Fossil', 'Fossil Jeans - quality clothing crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Jeans', 3602, 2750.69, 23.6, 'FOS-CLO-0010', '62034200', 88, 5, NULL, NULL, NULL, 1, 3, NULL, '2025-11-04 13:17:12', '2025-11-04 13:17:12', 2),
(13, 'Casio Analog (Accessories)', 'Casio', 'Casio Analog - quality accessories crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Analog', 5144, 3101.74, 39.7, 'CAS-ACC-0041', '64041100', 40, 5, NULL, NULL, NULL, 3, 12, NULL, '2025-11-04 13:17:12', '2025-11-04 13:17:12', 1),
(14, 'Woodland Trousers (Clothing)', 'Woodland', 'Woodland Trousers - quality clothing crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Trousers', 3346, 2128.48, 36.4, 'WOO-CLO-0005', '64041100', 57, 5, NULL, NULL, NULL, 1, 3, NULL, '2025-11-04 13:17:12', '2025-11-04 13:17:12', 1),
(15, 'Nike Hiking Boots (Footwear)', 'Nike', 'Nike Hiking Boots - quality footwear crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Hiking+Boots', 9655, 8538.99, 11.6, 'NIK-FOO-0032', '61091000', 126, 5, NULL, NULL, NULL, 2, 11, NULL, '2025-11-04 13:17:12', '2025-11-04 13:17:12', 1),
(16, 'Fossil Shirts (Clothing)', 'Fossil', 'Fossil Shirts - quality clothing crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Shirts', 5356, 4679.92, 12.6, 'FOS-CLO-0004', '61091000', 86, 5, NULL, NULL, NULL, 1, 1, NULL, '2025-11-04 13:17:12', '2025-11-04 13:17:12', 3),
(17, 'Levis Fabric (Accessories)', 'Levis', 'Levis Fabric - quality accessories crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Fabric', 5946, 3837.99, 35.5, 'LEV-ACC-0039', '91021100', 72, 5, NULL, NULL, NULL, 3, 14, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 3),
(18, 'Casio Casual (Accessories)', 'Casio', 'Casio Casual - quality accessories crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Casual', 957, 569.18, 40.5, 'CAS-ACC-0047', '42029100', 81, 5, NULL, NULL, NULL, 3, 15, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 3),
(19, 'Woodland Analog (Accessories)', 'Woodland', 'Woodland Analog - quality accessories crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Analog', 5415, 4288.31, 20.8, 'WOO-ACC-0044', '42029100', 180, 5, NULL, NULL, NULL, 3, 12, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 1),
(20, 'Clarks Hiking Boots (Footwear)', 'Clarks', 'Clarks Hiking Boots - quality footwear crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Hiking+Boots', 8548, 7462.39, 12.7, 'CLA-FOO-0028', '62034200', 53, 5, NULL, NULL, NULL, 2, 11, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 1),
(21, 'Titan Denim Jackets (Clothing)', 'Titan', 'Titan Denim Jackets - quality clothing crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Denim+Jackets', 2675, 2200.68, 17.7, 'TIT-CLO-0017', '42021200', 141, 5, NULL, NULL, NULL, 1, 7, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 3),
(22, 'Redtape Sports Sneakers (Footwear)', 'Redtape', 'Redtape Sports Sneakers - quality footwear crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Sports+Sneakers', 6746, 6081.44, 9.9, 'RED-FOO-0021', '64041100', 127, 5, NULL, NULL, NULL, 2, 8, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 1),
(23, 'Redtape Formal (Accessories)', 'Redtape', 'Redtape Formal - quality accessories crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Formal', 4677, 4189.85, 10.4, 'RED-ACC-0050', '62034200', 216, 5, NULL, NULL, NULL, 3, 15, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 1),
(24, 'Adidas Oxford (Footwear)', 'Adidas', 'Adidas Oxford - quality footwear crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Oxford', 1763, 1131.1, 35.8, 'ADI-FOO-0026', '61091000', 174, 5, NULL, NULL, NULL, 2, 9, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 1),
(25, 'H&M Fabric (Accessories)', 'H&M', 'H&M Fabric - quality accessories crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Fabric', 1987, 1100.25, 44.6, 'H&M-ACC-0040', '42021200', 293, 5, NULL, NULL, NULL, 3, 14, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 1),
(26, 'Ray-Ban Trousers (Clothing)', 'Ray-Ban', 'Ray-Ban Trousers - quality clothing crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Trousers', 6776, 4167.66, 38.5, 'RAY-CLO-0009', '64041100', 112, 5, NULL, NULL, NULL, 1, 3, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 3),
(27, 'Clarks Smart (Accessories)', 'Clarks', 'Clarks Smart - quality accessories crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Smart', 2942, 2367.86, 19.5, 'CLA-ACC-0046', '64041100', 87, 5, NULL, NULL, NULL, 3, 12, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 3),
(28, 'Adidas Analog (Accessories)', 'Adidas', 'Adidas Analog - quality accessories crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Analog', 1912, 1568, 18, 'ADI-ACC-0037', '62034200', 211, 5, NULL, NULL, NULL, 3, 12, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 1),
(29, 'Puma Fabric (Accessories)', 'Puma', 'Puma Fabric - quality accessories crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Fabric', 7978, 7048.55, 11.7, 'PUM-ACC-0042', '42029100', 159, 5, NULL, NULL, NULL, 3, 14, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 3),
(30, 'Redtape Leather (Accessories)', 'Redtape', 'Redtape Leather - quality accessories crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Leather', 6661, 4223.28, 36.6, 'RED-ACC-0049', '62034200', 57, 5, NULL, NULL, NULL, 3, 14, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 2),
(31, 'Nike Denim Jackets (Clothing)', 'Nike', 'Nike Denim Jackets - quality clothing crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Denim+Jackets', 5305, 3437.41, 35.2, 'NIK-CLO-0001', '62034200', 57, 5, NULL, NULL, NULL, 1, 7, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 3),
(32, 'Ray-Ban Chelsea Boots (Footwear)', 'Ray-Ban', 'Ray-Ban Chelsea Boots - quality footwear crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Chelsea+Boots', 4301, 3853.09, 10.4, 'RAY-FOO-0033', '61091000', 89, 5, NULL, NULL, NULL, 2, 11, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 2),
(33, 'Fossil Aviators (Accessories)', 'Fossil', 'Fossil Aviators - quality accessories crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Aviators', 2142, 1537.29, 28.2, 'FOS-ACC-0038', '42021200', 294, 5, NULL, NULL, NULL, 3, 13, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 3),
(34, 'Casio Flip Flops (Footwear)', 'Casio', 'Casio Flip Flops - quality footwear crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Flip+Flops', 9488, 8704.27, 8.3, 'CAS-FOO-0020', '42021200', 170, 5, NULL, NULL, NULL, 2, 10, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 2),
(35, 'Woodland Hiking Boots (Footwear)', 'Woodland', 'Woodland Hiking Boots - quality footwear crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Hiking+Boots', 9444, 8489.9, 10.1, 'WOO-FOO-0023', '91021100', 113, 5, NULL, NULL, NULL, 2, 11, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 3),
(36, 'Zara Sports Sneakers (Footwear)', 'Zara', 'Zara Sports Sneakers - quality footwear crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Sports+Sneakers', 6358, 5532.97, 13, 'ZAR-FOO-0030', '61091000', 132, 5, NULL, NULL, NULL, 2, 8, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 1),
(37, 'Zara Winter Jackets (Clothing)', 'Zara', 'Zara Winter Jackets - quality clothing crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Winter+Jackets', 8316, 5049.05, 39.3, 'ZAR-CLO-0013', '62034200', 131, 5, NULL, NULL, NULL, 1, 7, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 3),
(38, 'Adidas Shirts (Clothing)', 'Adidas', 'Adidas Shirts - quality clothing crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Shirts', 1570, 1404.27, 10.6, 'ADI-CLO-0015', '62034200', 86, 5, NULL, NULL, NULL, 1, 1, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 3),
(39, 'Puma Loafers (Footwear)', 'Puma', 'Puma Loafers - quality footwear crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Loafers', 7711, 4807, 37.7, 'PUM-FOO-0031', '91021100', 132, 5, NULL, NULL, NULL, 2, 9, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 1),
(40, 'Casio Denim Jackets (Clothing)', 'Casio', 'Casio Denim Jackets - quality clothing crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Denim+Jackets', 4056, 3392.47, 16.4, 'CAS-CLO-0003', '42029100', 284, 5, NULL, NULL, NULL, 1, 7, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 2),
(41, 'Adidas Oxford (Footwear)', 'Adidas', 'Adidas Oxford - quality footwear crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Oxford', 6338, 3539.23, 44.2, 'ADI-FOO-0025', '42021200', 122, 5, NULL, NULL, NULL, 2, 9, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 3),
(42, 'Adidas Shirts (Clothing)', 'Adidas', 'Adidas Shirts - quality clothing crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Shirts', 9843, 6567.95, 33.3, 'ADI-CLO-0007', '42029100', 190, 5, NULL, NULL, NULL, 1, 1, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 3),
(43, 'Redtape Trousers (Clothing)', 'Redtape', 'Redtape Trousers - quality clothing crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Trousers', 9924, 6329.98, 36.2, 'RED-CLO-0011', '64041100', 33, 5, NULL, NULL, NULL, 1, 3, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 1),
(44, 'Woodland Flip Flops (Footwear)', 'Woodland', 'Woodland Flip Flops - quality footwear crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Flip+Flops', 7922, 4858.27, 38.7, 'WOO-FOO-0018', '61091000', 139, 5, NULL, NULL, NULL, 2, 10, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 3),
(45, 'Zara Jeans (Clothing)', 'Zara', 'Zara Jeans - quality clothing crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Jeans', 7051, 5558.69, 21.2, 'ZAR-CLO-0016', '91021100', 275, 5, NULL, NULL, NULL, 1, 3, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 2),
(46, 'Redtape Smart (Accessories)', 'Redtape', 'Redtape Smart - quality accessories crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Smart', 2496, 2310.23, 7.4, 'RED-ACC-0043', '62034200', 140, 5, NULL, NULL, NULL, 3, 12, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 1),
(47, 'Titan Loafers (Footwear)', 'Titan', 'Titan Loafers - quality footwear crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Loafers', 8752, 5563.6, 36.4, 'TIT-FOO-0027', '62034200', 297, 5, NULL, NULL, NULL, 2, 9, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 3),
(48, 'Adidas Oxford (Footwear)', 'Adidas', 'Adidas Oxford - quality footwear crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Oxford', 8761, 7678.22, 12.4, 'ADI-FOO-0022', '42021200', 69, 5, NULL, NULL, NULL, 2, 9, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 1),
(49, 'Fossil Smart (Accessories)', 'Fossil', 'Fossil Smart - quality accessories crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Smart', 9851, 6001.6, 39.1, 'FOS-ACC-0048', '62034200', 26, 5, NULL, NULL, NULL, 3, 12, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 2),
(50, 'Zara Shirts (Clothing)', 'Zara', 'Zara Shirts - quality clothing crafted for comfort and style.', 'active', 'https://source.unsplash.com/collection/542909/?Shirts', 5185, 2989.03, 42.4, 'ZAR-CLO-0012', '42021200', 166, 5, NULL, NULL, NULL, 1, 1, NULL, '2025-11-04 13:17:13', '2025-11-04 13:17:13', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_detail_accessory`
--

CREATE TABLE `product_detail_accessory` (
  `id` int(11) NOT NULL,
  `accessoryType` varchar(255) DEFAULT NULL,
  `dimensions` varchar(255) DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_detail_clothing`
--

CREATE TABLE `product_detail_clothing` (
  `id` int(11) NOT NULL,
  `material` varchar(255) DEFAULT NULL,
  `fabric` varchar(255) DEFAULT NULL,
  `pattern` varchar(255) DEFAULT NULL,
  `collarType` varchar(255) DEFAULT NULL,
  `fit` varchar(255) DEFAULT NULL,
  `occasion` varchar(255) DEFAULT NULL,
  `season` varchar(255) DEFAULT NULL,
  `careInstruction` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_detail_footwear`
--

CREATE TABLE `product_detail_footwear` (
  `id` int(11) NOT NULL,
  `heelHeight` varchar(255) DEFAULT NULL,
  `soleMaterial` varchar(255) DEFAULT NULL,
  `upperMaterial` varchar(255) DEFAULT NULL,
  `closure` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_types`
--

CREATE TABLE `product_types` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `slug` varchar(120) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_types`
--

INSERT INTO `product_types` (`id`, `name`, `description`, `slug`, `createdAt`, `updatedAt`) VALUES
(1, 'clothing', 'clothing', 'clothing', '2025-11-03 07:50:54', '2025-11-03 07:50:54'),
(2, 'footwear', 'footwear', 'footwear', '2025-11-03 08:00:23', '2025-11-03 08:00:23'),
(3, 'accessories', 'accessories', 'accessories', '2025-11-03 08:00:23', '2025-11-03 08:00:23');

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
  `id` int(11) NOT NULL,
  `size` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `stock` int(11) NOT NULL,
  `price` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subcategories`
--

CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(120) NOT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `categoryId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subcategories`
--

INSERT INTO `subcategories` (`id`, `name`, `slug`, `description`, `createdAt`, `updatedAt`, `categoryId`) VALUES
(1, 'Shirts', 'shirts', 'Casual and formal shirts for men', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(2, 'T-Shirts', 't-shirts', 'Round-neck and polo t-shirts for everyday wear', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(3, 'Sweatshirts', 'sweatshirts', 'Warm and casual sweatshirts for men', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(4, 'Tops', 'tops', 'Trendy tops and blouses for women', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2),
(5, 'Kurtas', 'kurtas', 'Traditional and ethnic kurtas for women', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2),
(6, 'Tunics', 'tunics', 'Elegant tunics for formal and casual wear', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2),
(7, 'Trousers', 'trousers', 'Formal and casual trousers for men', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 3),
(8, 'Shorts', 'shorts', 'Comfortable shorts for casual and sports use', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 3),
(9, 'Track Pants', 'track-pants', 'Athletic and lounge track pants', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 3),
(10, 'Skirts', 'skirts', 'Casual and formal skirts for women', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 4),
(11, 'Leggings', 'leggings', 'Stretchable leggings for daily wear', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 4),
(12, 'Palazzos', 'palazzos', 'Loose, flared pants for women', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 4),
(13, 'Slim Fit Jeans', 'slim-fit-jeans', 'Modern slim-fit denim jeans for men', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 5),
(14, 'Regular Fit Jeans', 'regular-fit-jeans', 'Classic straight-cut denim jeans', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 5),
(15, 'Ripped Jeans', 'ripped-jeans', 'Distressed and ripped style jeans', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 5),
(16, 'High-Rise Jeans', 'high-rise-jeans', 'High-waisted jeans for women', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 6),
(17, 'Boyfriend Jeans', 'boyfriend-jeans', 'Relaxed and stylish boyfriend fit', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 6),
(18, 'Skinny Jeans', 'skinny-jeans', 'Tight-fitting jeans with stretch comfort', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 6),
(19, 'Denim Jackets', 'denim-jackets', 'Stylish denim jackets for all seasons', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 7),
(20, 'Leather Jackets', 'leather-jackets', 'Premium leather jackets', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 7),
(21, 'Bomber Jackets', 'bomber-jackets', 'Trendy bomber jackets for casual wear', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 7),
(22, 'Running Sneakers', 'running-sneakers', 'Lightweight running sneakers', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 8),
(23, 'Casual Sneakers', 'casual-sneakers', 'Everyday sneakers for men and women', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 8),
(24, 'High Tops', 'high-tops', 'Fashion high-top sneakers', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 8),
(25, 'Oxfords', 'oxfords', 'Classic lace-up formal shoes', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 9),
(26, 'Derby', 'derby', 'Elegant derby shoes for office wear', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 9),
(27, 'Loafers', 'loafers', 'Slip-on formal loafers', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 9),
(28, 'Slides', 'slides', 'Casual slip-on sandals', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 10),
(29, 'Flip Flops', 'flip-flops', 'Comfortable flip-flops for daily use', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 10),
(30, 'Strap Sandals', 'strap-sandals', 'Secure strap sandals for casual wear', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 10),
(31, 'Chelsea Boots', 'chelsea-boots', 'Ankle-length boots with elastic side panels', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 11),
(32, 'Hiking Boots', 'hiking-boots', 'Durable outdoor hiking boots', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 11),
(33, 'Combat Boots', 'combat-boots', 'Rugged boots with a bold look', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 11),
(34, 'Analog Watches', 'analog-watches', 'Classic analog wrist watches', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 12),
(35, 'Smart Watches', 'smart-watches', 'Smartwatches with health tracking', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 12),
(36, 'Digital Watches', 'digital-watches', 'Digital watches with LED display', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 12),
(37, 'Aviators', 'aviators', 'Timeless aviator-style sunglasses', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 13),
(38, 'Wayfarers', 'wayfarers', 'Trendy wayfarer sunglasses', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 13),
(39, 'Round Frames', 'round-frames', 'Retro round sunglasses', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 13);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categories_product_type_id_slug` (`productTypeId`,`slug`),
  ADD KEY `genderId` (`genderId`);

--
-- Indexes for table `genders`
--
ALTER TABLE `genders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productTypeId` (`productTypeId`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `subcategoryId` (`subcategoryId`),
  ADD KEY `genderId` (`genderId`);

--
-- Indexes for table `product_detail_accessory`
--
ALTER TABLE `product_detail_accessory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `product_detail_clothing`
--
ALTER TABLE `product_detail_clothing`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `product_detail_footwear`
--
ALTER TABLE `product_detail_footwear`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `product_types`
--
ALTER TABLE `product_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subcategories_category_id_slug` (`categoryId`,`slug`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `genders`
--
ALTER TABLE `genders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `product_detail_accessory`
--
ALTER TABLE `product_detail_accessory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_detail_clothing`
--
ALTER TABLE `product_detail_clothing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_detail_footwear`
--
ALTER TABLE `product_detail_footwear`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_types`
--
ALTER TABLE `product_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_10` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `categories_ibfk_12` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `categories_ibfk_14` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `categories_ibfk_15` FOREIGN KEY (`productTypeId`) REFERENCES `product_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `categories_ibfk_16` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `categories_ibfk_2` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `categories_ibfk_4` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `categories_ibfk_6` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `categories_ibfk_8` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_100` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_104` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_108` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_112` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_116` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_12` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_120` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_124` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_128` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_132` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_136` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_140` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_144` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_148` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_152` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_156` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_16` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_160` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_164` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_168` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_172` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_176` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_180` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_184` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_188` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_192` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_196` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_20` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_200` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_204` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_208` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_212` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_216` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_220` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_224` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_228` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_232` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_236` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_24` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_240` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_244` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_248` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_252` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_256` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_260` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_264` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_268` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_272` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_276` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_28` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_280` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_284` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_288` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_292` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_293` FOREIGN KEY (`productTypeId`) REFERENCES `product_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_294` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_295` FOREIGN KEY (`subcategoryId`) REFERENCES `subcategories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_296` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_32` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_36` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_4` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_40` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_44` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_48` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_52` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_56` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_60` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_64` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_68` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_72` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_76` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_8` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_80` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_84` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_88` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_92` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_96` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `product_detail_accessory`
--
ALTER TABLE `product_detail_accessory`
  ADD CONSTRAINT `product_detail_accessory_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_detail_clothing`
--
ALTER TABLE `product_detail_clothing`
  ADD CONSTRAINT `product_detail_clothing_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_detail_footwear`
--
ALTER TABLE `product_detail_footwear`
  ADD CONSTRAINT `product_detail_footwear_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `product_variants_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD CONSTRAINT `subcategories_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
