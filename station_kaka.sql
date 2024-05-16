-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 16 mai 2024 à 16:37
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `station_kaka`
--

-- --------------------------------------------------------

--
-- Structure de la table `join_table`
--

CREATE TABLE `join_table` (
  `id` int(10) NOT NULL,
  `id_piste` int(10) NOT NULL,
  `id_remontee` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `join_table`
--

INSERT INTO `join_table` (`id`, `id_piste`, `id_remontee`) VALUES
(1, 3, 1),
(2, 13, 1),
(3, 3, 2),
(4, 13, 2),
(5, 3, 4),
(6, 25, 4),
(7, 4, 3),
(8, 25, 3),
(9, 1, 5),
(10, 2, 5),
(11, 27, 6),
(12, 28, 6),
(13, 5, 6),
(14, 22, 6),
(15, 24, 7),
(16, 6, 7),
(18, 20, 8),
(19, 8, 8),
(20, 9, 10),
(21, 15, 10),
(22, 16, 10),
(23, 7, 7),
(24, 19, 9),
(25, 20, 9),
(26, 21, 9),
(27, 10, 9),
(28, 11, 9),
(29, 11, 11),
(30, 17, 11),
(31, 18, 11),
(32, 23, 10),
(33, 12, 11);

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `id` int(10) NOT NULL,
  `content` text DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `id_user` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `content`, `date`, `id_user`) VALUES
(73, 'Je suis un ours à l\'ail.', '2024-05-06 14:58:57', 64),
(74, 'J\'adore Alain Soral c\'est mon humoriste préféré!', '2024-05-06 16:38:46', 61),
(75, 'caca', '2024-05-06 16:43:22', 64),
(76, 'caacacca', '2024-05-07 13:50:24', 61),
(77, 'okzdopkadp', '2024-05-08 13:50:39', 61),
(78, 'azidj', '2024-05-08 13:50:41', 61);

-- --------------------------------------------------------

--
-- Structure de la table `pistes`
--

CREATE TABLE `pistes` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `pistes`
--

INSERT INTO `pistes` (`id`, `name`, `color`, `state`) VALUES
(1, 'Les Rhodos', 'Bleue', 1),
(2, 'Les Ribettes', 'Bleue', 1),
(3, 'Les Casses', 'Bleue', 1),
(4, 'S Du Chamois', 'Bleue', 1),
(5, 'Les Lampions', 'Bleue', 0),
(6, 'Le Gourq', 'Bleue', 1),
(7, 'Les Clouzeaux', 'Bleue', 1),
(8, 'L\'Arbre', 'Bleue', 0),
(9, 'Bouticari Bleu', 'Bleue', 1),
(10, 'L\'Inglin', 'Bleue', 0),
(11, 'Le Grand Serre', 'Bleue', 1),
(12, 'La Gérabio', 'Bleue', 1),
(13, 'La Monthery', 'Verte', 0),
(14, 'Jonction Basse', 'Verte', 1),
(15, 'Bouticari Vert', 'Verte', 1),
(16, 'Le Forest', 'Verte', 0),
(17, 'La Draye', 'Rouge', 1),
(18, 'Les Sagnières', 'Rouge', 1),
(19, 'Barrigart', 'Rouge', 0),
(20, 'Pré Méan', 'Rouge', 0),
(21, 'L\'Ousselat', 'Rouge', 0),
(22, 'La Mandarine', 'Rouge', 1),
(23, 'La Rouge Bouticari', 'Rouge', 1),
(24, 'L\'Ecureuil', 'Rouge', 0),
(25, 'Les Jockeys', 'Rouge', 0),
(26, 'Le Chamois', 'Rouge', 1),
(27, 'Le Lièvre', 'Noire', 1),
(28, 'Le Tétras', 'Noire', 0);

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
  `id` int(10) NOT NULL,
  `content` varchar(280) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `id_user` int(10) NOT NULL,
  `id_piste` int(10) DEFAULT NULL,
  `id_remontee` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `content`, `date`, `id_user`, `id_piste`, `id_remontee`) VALUES
(57, 'test', '2024-05-06 16:19:05', 61, NULL, 1),
(58, 'as', '2024-05-06 16:19:11', 61, NULL, 3),
(59, 'double test', '2024-05-06 16:21:18', 61, NULL, 3),
(60, 'triple test', '2024-05-06 16:21:31', 61, NULL, 3),
(61, 'aa', '2024-05-06 16:36:48', 61, 1, NULL),
(62, 'aa', '2024-05-06 16:36:51', 61, 1, NULL),
(63, 'aa', '2024-05-06 16:36:53', 61, 1, NULL),
(64, 'aa', '2024-05-06 16:36:55', 61, 1, NULL),
(65, 'czacca', '2024-05-07 13:52:02', 61, 2, NULL),
(66, 'caaca', '2024-05-08 13:51:04', 61, NULL, 2);

-- --------------------------------------------------------

--
-- Structure de la table `remontees`
--

CREATE TABLE `remontees` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `remontees`
--

INSERT INTO `remontees` (`id`, `name`, `state`) VALUES
(1, 'La Troïka', 1),
(2, 'Les Torres', 1),
(3, 'La Burge', 1),
(4, 'Les Amoureux', 1),
(5, 'Le Moulin', 1),
(6, 'Le Beauregard I', 1),
(7, 'Le Beauregard II', 1),
(8, 'Ste Marie Madeleine', 0),
(9, 'Les Cassettes', 0),
(10, 'Bouticari', 1),
(11, 'Le Grand Serre', 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `login` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `token_expiration` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `token`, `token_expiration`) VALUES
(60, 'soral', '$2y$10$wY4k853ol1SGoWRcN2Y0W.MCMsMOWM.DseElnnnE2/qGClfRcdGya', '2b6bb846ad4e70c4998226def6e1b494', 1713925160),
(61, 'root', '$2y$10$AKXNQ1nv.2OmZl63ysA/ouFiQQYrR.oSdt8Eduys6bSlg6i0JVxRW', '36616068145fcca4ce60589e7f882546', 1715871937),
(62, 'banana', '$2y$10$0iHDavKWWnMlnm.uFLYWSusJPV2SS/FGqRnjFd0gJONLIt6GDj1o2', 'b7a33d09dbec4c940585831ed0ce5d58', 1715030767),
(63, 'penis', '$2y$10$u9ueb9.IezsdyxLL3Pfs6eDi/.2zOULJf4VQBWCxAXMKM57jhi5qC', '903937d7ba4d36cb2c43c039aab7a501', 1715037673),
(64, 'oursalail', '$2y$10$8AiIhGgfarKieW0Meu8J.ux35mBRIJiFxhISrSZa06XAGCC2KbjXW', 'a18c83159b27fe81f6818984f29ac6b3', 1715008390),
(65, 'user1', '$2y$10$vcg1vPlS0soOupVKG.jdIeIrh7UPy6Lbc4I/ZMWtwu16Rvg6CDlnC', NULL, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `join_table`
--
ALTER TABLE `join_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_piste_id` (`id_piste`),
  ADD KEY `fk_remontee_id` (`id_remontee`);

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_user` (`id_user`) USING BTREE;

--
-- Index pour la table `pistes`
--
ALTER TABLE `pistes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_user` (`id_user`),
  ADD KEY `fk_id_remontees` (`id_remontee`),
  ADD KEY `fk_id_pistes` (`id_piste`);

--
-- Index pour la table `remontees`
--
ALTER TABLE `remontees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `login` (`login`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `join_table`
--
ALTER TABLE `join_table`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT pour la table `pistes`
--
ALTER TABLE `pistes`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT pour la table `remontees`
--
ALTER TABLE `remontees`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `join_table`
--
ALTER TABLE `join_table`
  ADD CONSTRAINT `fk_piste_id` FOREIGN KEY (`id_piste`) REFERENCES `pistes` (`id`),
  ADD CONSTRAINT `fk_remontee_id` FOREIGN KEY (`id_remontee`) REFERENCES `remontees` (`id`);

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `fk_id_us` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_id_pistes` FOREIGN KEY (`id_piste`) REFERENCES `pistes` (`id`),
  ADD CONSTRAINT `fk_id_remontees` FOREIGN KEY (`id_remontee`) REFERENCES `remontees` (`id`),
  ADD CONSTRAINT `fk_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
