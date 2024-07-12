-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : db_evalnodes3
-- Généré le : ven. 12 juil. 2024 à 12:23
-- Version du serveur : 9.0.0
-- Version de PHP : 8.2.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `evalnodes3`
--

-- --------------------------------------------------------

--
-- Structure de la table `materials`
--

CREATE TABLE `materials` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `supplier_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `materials`
--

INSERT INTO `materials` (`id`, `name`, `description`, `supplier_id`) VALUES
(2, 'frêne', 'un bois avec en F au début', 1),
(3, 'chêne', 'bois qui a le nom d\'un prof', 1),
(4, 'noyer', 'un bois qui a coulé', 1),
(12, 'acier', 'assez solide', 2),
(13, 'inox', 'pour les couverts', 2),
(14, 'aluminum', 'un autre metal commun', 2),
(15, 'Plastique', 'un polymere', 3);

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `category` enum('shelf','cupboard') NOT NULL,
  `description` text NOT NULL,
  `count` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`id`, `name`, `category`, `description`, `count`) VALUES
(3, 'pas ouf', 'shelf', 'aaaa', 10),
(4, 'go tout ranger', 'cupboard', 'best meuble', 1),
(5, 'voial', 'cupboard', 'truc', 42);

-- --------------------------------------------------------

--
-- Structure de la table `products_materials`
--

CREATE TABLE `products_materials` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `material_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `products_materials`
--

INSERT INTO `products_materials` (`id`, `product_id`, `material_id`) VALUES
(1, 3, 3),
(2, 3, 14),
(3, 4, 2),
(4, 4, 14),
(5, 5, 4),
(6, 5, 12),
(7, 5, 14),
(8, 5, 2);

-- --------------------------------------------------------

--
-- Structure de la table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `suppliers`
--

INSERT INTO `suppliers` (`id`, `name`) VALUES
(1, 'BBois'),
(2, 'MetaLo'),
(3, 'pPlastique');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `materials`
--
ALTER TABLE `materials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_m_1` (`supplier_id`);

--
-- Index pour la table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `products_materials`
--
ALTER TABLE `products_materials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pm_1` (`material_id`),
  ADD KEY `fk_pm_2` (`product_id`);

--
-- Index pour la table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `materials`
--
ALTER TABLE `materials`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `products_materials`
--
ALTER TABLE `products_materials`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `materials`
--
ALTER TABLE `materials`
  ADD CONSTRAINT `fk_m_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `products_materials`
--
ALTER TABLE `products_materials`
  ADD CONSTRAINT `fk_pm_1` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_pm_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
