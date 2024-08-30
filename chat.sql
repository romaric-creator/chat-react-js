-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 30 août 2024 à 23:32
-- Version du serveur :  10.4.11-MariaDB
-- Version de PHP : 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `chat`
--

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE `message` (
  `id_mess` int(11) NOT NULL,
  `iduserCon` int(11) NOT NULL,
  `iduserRes` int(11) NOT NULL,
  `contenu` varchar(255) NOT NULL,
  `date` time NOT NULL DEFAULT current_timestamp(),
  `staus` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `message`
--

INSERT INTO `message` (`id_mess`, `iduserCon`, `iduserRes`, `contenu`, `date`, `staus`) VALUES
(1, 1, 2, 'slt', '12:43:00', 0),
(2, 2, 1, 'hey', '12:44:00', 0),
(3, 1, 2, 'way sdkw alors', '12:50:00', 0),
(4, 1, 2, 'yo', '12:50:00', 0),
(5, 1, 2, 'moi j\'ai faim bro', '12:51:00', 0),
(6, 2, 1, 'hg', '22:01:00', 0),
(7, 2, 1, 'hg', '22:01:00', 0),
(8, 2, 1, 'hg', '22:01:00', 0),
(9, 1, 2, 'yep', '10:49:00', 0),
(10, 1, 2, 'lolololololololololololololololololololo', '00:10:00', 0),
(11, 1, 2, 'nbnbnb', '11:13:00', 0);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `dernierdate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_user`, `nom`, `email`, `password`, `dernierdate`) VALUES
(1, 'tenda', 'christiantendainfos2006@gmail.com', '$2a$10$j6jDC6UKL5ZHPr3iUkQm0.o0ElM.Z3OZbqqLGuDIM29SxmqCQ6eae', '2024-08-30 19:13:46'),
(2, 'christian', 'christiantendainfos2005@gmail.com', '$2a$10$8SkV5/wY4m8G80tkRyoshuWpuZLL2SmPjKGvQ0jXQLIfQ1PsIwvv.', '2024-08-27 18:43:33');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id_mess`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `id_mess` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
