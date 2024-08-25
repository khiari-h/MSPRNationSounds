-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 25 août 2024 à 19:22
-- Version du serveur : 8.2.0
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `nationsoundsdevelopment`
--

-- --------------------------------------------------------

--
-- Structure de la table `cache`
--

DROP TABLE IF EXISTS `cache`;
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('wordpress_concerts', 'a:7:{i:0;a:17:{s:2:\"id\";i:400;s:4:\"date\";s:19:\"2024-08-13T20:26:55\";s:8:\"date_gmt\";s:19:\"2024-08-13T18:26:55\";s:4:\"guid\";a:1:{s:8:\"rendered\";s:58:\"https://nationsounds.online/?post_type=concerts&#038;p=400\";}s:8:\"modified\";s:19:\"2024-08-13T20:38:30\";s:12:\"modified_gmt\";s:19:\"2024-08-13T18:38:30\";s:4:\"slug\";s:14:\"concert-de-pop\";s:6:\"status\";s:7:\"publish\";s:4:\"type\";s:8:\"concerts\";s:4:\"link\";s:52:\"https://nationsounds.online/concerts/concert-de-pop/\";s:5:\"title\";a:1:{s:8:\"rendered\";s:14:\"Concert de Pop\";}s:7:\"content\";a:2:{s:8:\"rendered\";s:0:\"\";s:9:\"protected\";b:0;}s:14:\"featured_media\";i:0;s:8:\"template\";s:0:\"\";s:10:\"class_list\";a:5:{i:0;s:8:\"post-400\";i:1;s:8:\"concerts\";i:2;s:13:\"type-concerts\";i:3;s:14:\"status-publish\";i:4;s:6:\"hentry\";}s:3:\"acf\";a:8:{s:3:\"nom\";s:22:\"Concert Pop avec Poppi\";s:11:\"description\";s:66:\"La jeune Poppi vous donne rendez-vous pour un concert exceptionnel\";s:4:\"date\";s:8:\"20240817\";s:10:\"heuredebut\";s:8:\"20:00:00\";s:8:\"heurefin\";s:8:\"21:00:00\";s:4:\"lieu\";s:12:\"Scene Marais\";s:5:\"photo\";i:395;s:4:\"type\";s:3:\"Pop\";}s:6:\"_links\";a:5:{s:4:\"self\";a:1:{i:0;a:1:{s:4:\"href\";s:54:\"https://nationsounds.online/wp-json/wp/v2/concerts/400\";}}s:10:\"collection\";a:1:{i:0;a:1:{s:4:\"href\";s:50:\"https://nationsounds.online/wp-json/wp/v2/concerts\";}}s:5:\"about\";a:1:{i:0;a:1:{s:4:\"href\";s:56:\"https://nationsounds.online/wp-json/wp/v2/types/concerts\";}}s:13:\"wp:attachment\";a:1:{i:0;a:1:{s:4:\"href\";s:58:\"https://nationsounds.online/wp-json/wp/v2/media?parent=400\";}}s:6:\"curies\";a:1:{i:0;a:3:{s:4:\"name\";s:2:\"wp\";s:4:\"href\";s:23:\"https://api.w.org/{rel}\";s:9:\"templated\";b:1;}}}}i:1;a:17:{s:2:\"id\";i:398;s:4:\"date\";s:19:\"2024-08-13T20:20:23\";s:8:\"date_gmt\";s:19:\"2024-08-13T18:20:23\";s:4:\"guid\";a:1:{s:8:\"rendered\";s:58:\"https://nationsounds.online/?post_type=concerts&#038;p=398\";}s:8:\"modified\";s:19:\"2024-08-13T20:38:37\";s:12:\"modified_gmt\";s:19:\"2024-08-13T18:38:37\";s:4:\"slug\";s:12:\"concert-jazz\";s:6:\"status\";s:7:\"publish\";s:4:\"type\";s:8:\"concerts\";s:4:\"link\";s:50:\"https://nationsounds.online/concerts/concert-jazz/\";s:5:\"title\";a:1:{s:8:\"rendered\";s:12:\"Concert Jazz\";}s:7:\"content\";a:2:{s:8:\"rendered\";s:0:\"\";s:9:\"protected\";b:0;}s:14:\"featured_media\";i:0;s:8:\"template\";s:0:\"\";s:10:\"class_list\";a:5:{i:0;s:8:\"post-398\";i:1;s:8:\"concerts\";i:2;s:13:\"type-concerts\";i:3;s:14:\"status-publish\";i:4;s:6:\"hentry\";}s:3:\"acf\";a:8:{s:3:\"nom\";s:13:\"Concert Jazzi\";s:11:\"description\";s:66:\"Le concert de votre artiste Jazz préféré Jazzi en exclusivité \";s:4:\"date\";s:8:\"20240816\";s:10:\"heuredebut\";s:8:\"20:00:00\";s:8:\"heurefin\";s:8:\"21:00:00\";s:4:\"lieu\";s:12:\"Scene Marais\";s:5:\"photo\";i:393;s:4:\"type\";s:4:\"Jazz\";}s:6:\"_links\";a:5:{s:4:\"self\";a:1:{i:0;a:1:{s:4:\"href\";s:54:\"https://nationsounds.online/wp-json/wp/v2/concerts/398\";}}s:10:\"collection\";a:1:{i:0;a:1:{s:4:\"href\";s:50:\"https://nationsounds.online/wp-json/wp/v2/concerts\";}}s:5:\"about\";a:1:{i:0;a:1:{s:4:\"href\";s:56:\"https://nationsounds.online/wp-json/wp/v2/types/concerts\";}}s:13:\"wp:attachment\";a:1:{i:0;a:1:{s:4:\"href\";s:58:\"https://nationsounds.online/wp-json/wp/v2/media?parent=398\";}}s:6:\"curies\";a:1:{i:0;a:3:{s:4:\"name\";s:2:\"wp\";s:4:\"href\";s:23:\"https://api.w.org/{rel}\";s:9:\"templated\";b:1;}}}}i:2;a:17:{s:2:\"id\";i:392;s:4:\"date\";s:19:\"2024-08-13T20:17:57\";s:8:\"date_gmt\";s:19:\"2024-08-13T18:17:57\";s:4:\"guid\";a:1:{s:8:\"rendered\";s:58:\"https://nationsounds.online/?post_type=concerts&#038;p=392\";}s:8:\"modified\";s:19:\"2024-08-13T20:38:48\";s:12:\"modified_gmt\";s:19:\"2024-08-13T18:38:48\";s:4:\"slug\";s:12:\"concert-rock\";s:6:\"status\";s:7:\"publish\";s:4:\"type\";s:8:\"concerts\";s:4:\"link\";s:50:\"https://nationsounds.online/concerts/concert-rock/\";s:5:\"title\";a:1:{s:8:\"rendered\";s:12:\"Concert Rock\";}s:7:\"content\";a:2:{s:8:\"rendered\";s:0:\"\";s:9:\"protected\";b:0;}s:14:\"featured_media\";i:0;s:8:\"template\";s:0:\"\";s:10:\"class_list\";a:5:{i:0;s:8:\"post-392\";i:1;s:8:\"concerts\";i:2;s:13:\"type-concerts\";i:3;s:14:\"status-publish\";i:4;s:6:\"hentry\";}s:3:\"acf\";a:8:{s:3:\"nom\";s:16:\"Concert de Rocki\";s:11:\"description\";s:59:\"Venez assister au concert de Rocki votre artiste préféré\";s:4:\"date\";s:8:\"20240814\";s:10:\"heuredebut\";s:8:\"20:00:00\";s:8:\"heurefin\";s:8:\"22:00:00\";s:4:\"lieu\";s:12:\"Scene Marais\";s:5:\"photo\";i:394;s:4:\"type\";s:4:\"Rock\";}s:6:\"_links\";a:5:{s:4:\"self\";a:1:{i:0;a:1:{s:4:\"href\";s:54:\"https://nationsounds.online/wp-json/wp/v2/concerts/392\";}}s:10:\"collection\";a:1:{i:0;a:1:{s:4:\"href\";s:50:\"https://nationsounds.online/wp-json/wp/v2/concerts\";}}s:5:\"about\";a:1:{i:0;a:1:{s:4:\"href\";s:56:\"https://nationsounds.online/wp-json/wp/v2/types/concerts\";}}s:13:\"wp:attachment\";a:1:{i:0;a:1:{s:4:\"href\";s:58:\"https://nationsounds.online/wp-json/wp/v2/media?parent=392\";}}s:6:\"curies\";a:1:{i:0;a:3:{s:4:\"name\";s:2:\"wp\";s:4:\"href\";s:23:\"https://api.w.org/{rel}\";s:9:\"templated\";b:1;}}}}i:3;a:17:{s:2:\"id\";i:370;s:4:\"date\";s:19:\"2024-08-03T17:39:24\";s:8:\"date_gmt\";s:19:\"2024-08-03T15:39:24\";s:4:\"guid\";a:1:{s:8:\"rendered\";s:58:\"https://nationsounds.online/?post_type=concerts&#038;p=370\";}s:8:\"modified\";s:19:\"2024-08-13T20:45:27\";s:12:\"modified_gmt\";s:19:\"2024-08-13T18:45:27\";s:4:\"slug\";s:6:\"test-f\";s:6:\"status\";s:7:\"publish\";s:4:\"type\";s:8:\"concerts\";s:4:\"link\";s:44:\"https://nationsounds.online/concerts/test-f/\";s:5:\"title\";a:1:{s:8:\"rendered\";s:15:\"Concert Electro\";}s:7:\"content\";a:2:{s:8:\"rendered\";s:0:\"\";s:9:\"protected\";b:0;}s:14:\"featured_media\";i:0;s:8:\"template\";s:0:\"\";s:10:\"class_list\";a:5:{i:0;s:8:\"post-370\";i:1;s:8:\"concerts\";i:2;s:13:\"type-concerts\";i:3;s:14:\"status-publish\";i:4;s:6:\"hentry\";}s:3:\"acf\";a:8:{s:3:\"nom\";s:29:\"Concert Electro avec ElectriK\";s:11:\"description\";s:43:\"Venez assisté au concert le plus dynamique\";s:4:\"date\";s:8:\"20240804\";s:10:\"heuredebut\";s:8:\"00:00:00\";s:8:\"heurefin\";s:8:\"04:00:00\";s:4:\"lieu\";s:12:\"Scene Marais\";s:5:\"photo\";i:397;s:4:\"type\";s:4:\"Rock\";}s:6:\"_links\";a:5:{s:4:\"self\";a:1:{i:0;a:1:{s:4:\"href\";s:54:\"https://nationsounds.online/wp-json/wp/v2/concerts/370\";}}s:10:\"collection\";a:1:{i:0;a:1:{s:4:\"href\";s:50:\"https://nationsounds.online/wp-json/wp/v2/concerts\";}}s:5:\"about\";a:1:{i:0;a:1:{s:4:\"href\";s:56:\"https://nationsounds.online/wp-json/wp/v2/types/concerts\";}}s:13:\"wp:attachment\";a:1:{i:0;a:1:{s:4:\"href\";s:58:\"https://nationsounds.online/wp-json/wp/v2/media?parent=370\";}}s:6:\"curies\";a:1:{i:0;a:3:{s:4:\"name\";s:2:\"wp\";s:4:\"href\";s:23:\"https://api.w.org/{rel}\";s:9:\"templated\";b:1;}}}}i:4;a:17:{s:2:\"id\";i:367;s:4:\"date\";s:19:\"2024-08-03T17:11:36\";s:8:\"date_gmt\";s:19:\"2024-08-03T15:11:36\";s:4:\"guid\";a:1:{s:8:\"rendered\";s:58:\"https://nationsounds.online/?post_type=concerts&#038;p=367\";}s:8:\"modified\";s:19:\"2024-08-15T08:50:06\";s:12:\"modified_gmt\";s:19:\"2024-08-15T06:50:06\";s:4:\"slug\";s:29:\"test-2-de-laffichage-en-cours\";s:6:\"status\";s:7:\"publish\";s:4:\"type\";s:8:\"concerts\";s:4:\"link\";s:67:\"https://nationsounds.online/concerts/test-2-de-laffichage-en-cours/\";s:5:\"title\";a:1:{s:8:\"rendered\";s:15:\"Concert Country\";}s:7:\"content\";a:2:{s:8:\"rendered\";s:0:\"\";s:9:\"protected\";b:0;}s:14:\"featured_media\";i:0;s:8:\"template\";s:0:\"\";s:10:\"class_list\";a:5:{i:0;s:8:\"post-367\";i:1;s:8:\"concerts\";i:2;s:13:\"type-concerts\";i:3;s:14:\"status-publish\";i:4;s:6:\"hentry\";}s:3:\"acf\";a:8:{s:3:\"nom\";s:26:\"Concert Country avec KnTry\";s:11:\"description\";s:60:\"Pour les fans des USA venez découvrir notre concert country\";s:4:\"date\";s:8:\"20240803\";s:10:\"heuredebut\";s:8:\"19:00:00\";s:8:\"heurefin\";s:8:\"20:00:00\";s:4:\"lieu\";s:12:\"Scene Marais\";s:5:\"photo\";i:394;s:4:\"type\";s:7:\"Country\";}s:6:\"_links\";a:5:{s:4:\"self\";a:1:{i:0;a:1:{s:4:\"href\";s:54:\"https://nationsounds.online/wp-json/wp/v2/concerts/367\";}}s:10:\"collection\";a:1:{i:0;a:1:{s:4:\"href\";s:50:\"https://nationsounds.online/wp-json/wp/v2/concerts\";}}s:5:\"about\";a:1:{i:0;a:1:{s:4:\"href\";s:56:\"https://nationsounds.online/wp-json/wp/v2/types/concerts\";}}s:13:\"wp:attachment\";a:1:{i:0;a:1:{s:4:\"href\";s:58:\"https://nationsounds.online/wp-json/wp/v2/media?parent=367\";}}s:6:\"curies\";a:1:{i:0;a:3:{s:4:\"name\";s:2:\"wp\";s:4:\"href\";s:23:\"https://api.w.org/{rel}\";s:9:\"templated\";b:1;}}}}i:5;a:17:{s:2:\"id\";i:364;s:4:\"date\";s:19:\"2024-08-03T16:29:04\";s:8:\"date_gmt\";s:19:\"2024-08-03T14:29:04\";s:4:\"guid\";a:1:{s:8:\"rendered\";s:58:\"https://nationsounds.online/?post_type=concerts&#038;p=364\";}s:8:\"modified\";s:19:\"2024-08-15T09:18:50\";s:12:\"modified_gmt\";s:19:\"2024-08-15T07:18:50\";s:4:\"slug\";s:12:\"teet-concert\";s:6:\"status\";s:7:\"publish\";s:4:\"type\";s:8:\"concerts\";s:4:\"link\";s:50:\"https://nationsounds.online/concerts/teet-concert/\";s:5:\"title\";a:1:{s:8:\"rendered\";s:13:\"Concert Blues\";}s:7:\"content\";a:2:{s:8:\"rendered\";s:0:\"\";s:9:\"protected\";b:0;}s:14:\"featured_media\";i:0;s:8:\"template\";s:0:\"\";s:10:\"class_list\";a:5:{i:0;s:8:\"post-364\";i:1;s:8:\"concerts\";i:2;s:13:\"type-concerts\";i:3;s:14:\"status-publish\";i:4;s:6:\"hentry\";}s:3:\"acf\";a:8:{s:3:\"nom\";s:25:\"Concert Blues avec Bluzzi\";s:11:\"description\";s:68:\"Venez assister au concert de Bluzzi pour un moment calme et détendu\";s:4:\"date\";s:8:\"20240803\";s:10:\"heuredebut\";s:8:\"19:30:00\";s:8:\"heurefin\";s:8:\"22:00:00\";s:4:\"lieu\";s:12:\"Scene Hôtel\";s:5:\"photo\";i:393;s:4:\"type\";s:5:\"Blues\";}s:6:\"_links\";a:5:{s:4:\"self\";a:1:{i:0;a:1:{s:4:\"href\";s:54:\"https://nationsounds.online/wp-json/wp/v2/concerts/364\";}}s:10:\"collection\";a:1:{i:0;a:1:{s:4:\"href\";s:50:\"https://nationsounds.online/wp-json/wp/v2/concerts\";}}s:5:\"about\";a:1:{i:0;a:1:{s:4:\"href\";s:56:\"https://nationsounds.online/wp-json/wp/v2/types/concerts\";}}s:13:\"wp:attachment\";a:1:{i:0;a:1:{s:4:\"href\";s:58:\"https://nationsounds.online/wp-json/wp/v2/media?parent=364\";}}s:6:\"curies\";a:1:{i:0;a:3:{s:4:\"name\";s:2:\"wp\";s:4:\"href\";s:23:\"https://api.w.org/{rel}\";s:9:\"templated\";b:1;}}}}i:6;a:17:{s:2:\"id\";i:358;s:4:\"date\";s:19:\"2024-08-03T15:57:39\";s:8:\"date_gmt\";s:19:\"2024-08-03T13:57:39\";s:4:\"guid\";a:1:{s:8:\"rendered\";s:58:\"https://nationsounds.online/?post_type=concerts&#038;p=358\";}s:8:\"modified\";s:19:\"2024-08-13T20:49:13\";s:12:\"modified_gmt\";s:19:\"2024-08-13T18:49:13\";s:4:\"slug\";s:17:\"test-du-composant\";s:6:\"status\";s:7:\"publish\";s:4:\"type\";s:8:\"concerts\";s:4:\"link\";s:55:\"https://nationsounds.online/concerts/test-du-composant/\";s:5:\"title\";a:1:{s:8:\"rendered\";s:17:\"Concert Classique\";}s:7:\"content\";a:2:{s:8:\"rendered\";s:0:\"\";s:9:\"protected\";b:0;}s:14:\"featured_media\";i:0;s:8:\"template\";s:0:\"\";s:10:\"class_list\";a:5:{i:0;s:8:\"post-358\";i:1;s:8:\"concerts\";i:2;s:13:\"type-concerts\";i:3;s:14:\"status-publish\";i:4;s:6:\"hentry\";}s:3:\"acf\";a:8:{s:3:\"nom\";s:19:\"Concert avec Cassie\";s:11:\"description\";s:49:\"Un concert pour les amateurs de musique classique\";s:4:\"date\";s:8:\"20240803\";s:10:\"heuredebut\";s:8:\"16:15:00\";s:8:\"heurefin\";s:8:\"18:15:00\";s:4:\"lieu\";s:16:\"Scene Principale\";s:5:\"photo\";i:395;s:4:\"type\";s:9:\"Classique\";}s:6:\"_links\";a:5:{s:4:\"self\";a:1:{i:0;a:1:{s:4:\"href\";s:54:\"https://nationsounds.online/wp-json/wp/v2/concerts/358\";}}s:10:\"collection\";a:1:{i:0;a:1:{s:4:\"href\";s:50:\"https://nationsounds.online/wp-json/wp/v2/concerts\";}}s:5:\"about\";a:1:{i:0;a:1:{s:4:\"href\";s:56:\"https://nationsounds.online/wp-json/wp/v2/types/concerts\";}}s:13:\"wp:attachment\";a:1:{i:0;a:1:{s:4:\"href\";s:58:\"https://nationsounds.online/wp-json/wp/v2/media?parent=358\";}}s:6:\"curies\";a:1:{i:0;a:3:{s:4:\"name\";s:2:\"wp\";s:4:\"href\";s:23:\"https://api.w.org/{rel}\";s:9:\"templated\";b:1;}}}}}', 1724596854),
('concert_names', 'a:7:{i:0;a:2:{s:2:\"id\";i:400;s:4:\"name\";s:22:\"Concert Pop avec Poppi\";}i:1;a:2:{s:2:\"id\";i:398;s:4:\"name\";s:13:\"Concert Jazzi\";}i:2;a:2:{s:2:\"id\";i:392;s:4:\"name\";s:16:\"Concert de Rocki\";}i:3;a:2:{s:2:\"id\";i:370;s:4:\"name\";s:29:\"Concert Electro avec ElectriK\";}i:4;a:2:{s:2:\"id\";i:367;s:4:\"name\";s:26:\"Concert Country avec KnTry\";}i:5;a:2:{s:2:\"id\";i:364;s:4:\"name\";s:25:\"Concert Blues avec Bluzzi\";}i:6;a:2:{s:2:\"id\";i:358;s:4:\"name\";s:19:\"Concert avec Cassie\";}}', 1724597394),
('wordpress_artists_meetings', 'a:7:{i:0;a:17:{s:2:\"id\";i:419;s:4:\"date\";s:19:\"2024-08-15T09:21:35\";s:8:\"date_gmt\";s:19:\"2024-08-15T07:21:35\";s:4:\"guid\";a:1:{s:8:\"rendered\";s:66:\"https://nationsounds.online/?post_type=artists_meetings&#038;p=419\";}s:8:\"modified\";s:19:\"2024-08-15T09:22:03\";s:12:\"modified_gmt\";s:19:\"2024-08-15T07:22:03\";s:4:\"slug\";s:21:\"atelier-avec-electrik\";s:6:\"status\";s:7:\"publish\";s:4:\"type\";s:16:\"artists_meetings\";s:4:\"link\";s:67:\"https://nationsounds.online/artists_meetings/atelier-avec-electrik/\";s:5:\"title\";a:1:{s:8:\"rendered\";s:21:\"Atelier avec ElectriK\";}s:7:\"content\";a:2:{s:8:\"rendered\";s:0:\"\";s:9:\"protected\";b:0;}s:14:\"featured_media\";i:0;s:8:\"template\";s:0:\"\";s:10:\"class_list\";a:5:{i:0;s:8:\"post-419\";i:1;s:16:\"artists_meetings\";i:2;s:21:\"type-artists_meetings\";i:3;s:14:\"status-publish\";i:4;s:6:\"hentry\";}s:3:\"acf\";a:8:{s:3:\"nom\";s:29:\"Atelier musique avec ElectriK\";s:11:\"description\";s:52:\"Venez apprendre à jouer de la guitare avec Electrik\";s:4:\"date\";s:8:\"20240816\";s:10:\"heuredebut\";s:8:\"11:00:00\";s:8:\"heurefin\";s:8:\"00:00:00\";s:4:\"lieu\";s:12:\"Scene Hôtel\";s:5:\"photo\";i:420;s:4:\"type\";s:13:\"Électronique\";}s:6:\"_links\";a:5:{s:4:\"self\";a:1:{i:0;a:1:{s:4:\"href\";s:62:\"https://nationsounds.online/wp-json/wp/v2/artists_meetings/419\";}}s:10:\"collection\";a:1:{i:0;a:1:{s:4:\"href\";s:58:\"https://nationsounds.online/wp-json/wp/v2/artists_meetings\";}}s:5:\"about\";a:1:{i:0;a:1:{s:4:\"href\";s:64:\"https://nationsounds.online/wp-json/wp/v2/types/artists_meetings\";}}s:13:\"wp:attachment\";a:1:{i:0;a:1:{s:4:\"href\";s:58:\"https://nationsounds.online/wp-json/wp/v2/media?parent=419\";}}s:6:\"curies\";a:1:{i:0;a:3:{s:4:\"name\";s:2:\"wp\";s:4:\"href\";s:23:\"https://api.w.org/{rel}\";s:9:\"templated\";b:1;}}}}i:1;a:17:{s:2:\"id\";i:418;s:4:\"date\";s:19:\"2024-08-15T09:18:02\";s:8:\"date_gmt\";s:19:\"2024-08-15T07:18:02\";s:4:\"guid\";a:1:{s:8:\"rendered\";s:66:\"https://nationsounds.online/?post_type=artists_meetings&#038;p=418\";}s:8:\"modified\";s:19:\"2024-08-15T09:18:03\";s:12:\"modified_gmt\";s:19:\"2024-08-15T07:18:03\";s:4:\"slug\";s:21:\"rencontre-avec-cassie\";s:6:\"status\";s:7:\"publish\";s:4:\"type\";s:16:\"artists_meetings\";s:4:\"link\";s:67:\"https://nationsounds.online/artists_meetings/rencontre-avec-cassie/\";s:5:\"title\";a:1:{s:8:\"rendered\";s:21:\"Rencontre avec Cassie\";}s:7:\"content\";a:2:{s:8:\"rendered\";s:0:\"\";s:9:\"protected\";b:0;}s:14:\"featured_media\";i:0;s:8:\"template\";s:0:\"\";s:10:\"class_list\";a:5:{i:0;s:8:\"post-418\";i:1;s:16:\"artists_meetings\";i:2;s:21:\"type-artists_meetings\";i:3;s:14:\"status-publish\";i:4;s:6:\"hentry\";}s:3:\"acf\";a:8:{s:3:\"nom\";s:27:\"Atelier musique avec Cassie\";s:11:\"description\";s:80:\"Cassie vous donne rendez-vous pour un atelier musique: Apprentissage et rigolade\";s:4:\"date\";s:8:\"20240816\";s:10:\"heuredebut\";s:8:\"08:00:00\";s:8:\"heurefin\";s:8:\"10:00:00\";s:4:\"lieu\";s:12:\"Scene Marais\";s:5:\"photo\";i:417;s:4:\"type\";s:4:\"Rock\";}s:6:\"_links\";a:5:{s:4:\"self\";a:1:{i:0;a:1:{s:4:\"href\";s:62:\"https://nationsounds.online/wp-json/wp/v2/artists_meetings/418\";}}s:10:\"collection\";a:1:{i:0;a:1:{s:4:\"href\";s:58:\"https://nationsounds.online/wp-json/wp/v2/artists_meetings\";}}s:5:\"about\";a:1:{i:0;a:1:{s:4:\"href\";s:64:\"https://nationsounds.online/wp-json/wp/v2/types/artists_meetings\";}}s:13:\"wp:attachment\";a:1:{i:0;a:1:{s:4:\"href\";s:58:\"https://nationsounds.online/wp-json/wp/v2/media?parent=418\";}}s:6:\"curies\";a:1:{i:0;a:3:{s:4:\"name\";s:2:\"wp\";s:4:\"href\";s:23:\"https://api.w.org/{rel}\";s:9:\"templated\";b:1;}}}}i:2;a:17:{s:2:\"id\";i:415;s:4:\"date\";s:19:\"2024-08-15T09:11:32\";s:8:\"date_gmt\";s:19:\"2024-08-15T07:11:32\";s:4:\"guid\";a:1:{s:8:\"rendered\";s:66:\"https://nationsounds.online/?post_type=artists_meetings&#038;p=415\";}s:8:\"modified\";s:19:\"2024-08-15T09:11:32\";s:12:\"modified_gmt\";s:19:\"2024-08-15T07:11:32\";s:4:\"slug\";s:20:\"rencontre-avec-kntry\";s:6:\"status\";s:7:\"publish\";s:4:\"type\";s:16:\"artists_meetings\";s:4:\"link\";s:66:\"https://nationsounds.online/artists_meetings/rencontre-avec-kntry/\";s:5:\"title\";a:1:{s:8:\"rendered\";s:20:\"Rencontre avec KnTry\";}s:7:\"content\";a:2:{s:8:\"rendered\";s:0:\"\";s:9:\"protected\";b:0;}s:14:\"featured_media\";i:0;s:8:\"template\";s:0:\"\";s:10:\"class_list\";a:5:{i:0;s:8:\"post-415\";i:1;s:16:\"artists_meetings\";i:2;s:21:\"type-artists_meetings\";i:3;s:14:\"status-publish\";i:4;s:6:\"hentry\";}s:3:\"acf\";a:8:{s:3:\"nom\";s:18:\"Chiller avec KnTry\";s:11:\"description\";s:52:\"KnTry vous donne rendez-vous pour un moment détente\";s:4:\"date\";s:8:\"20240816\";s:10:\"heuredebut\";s:8:\"07:00:00\";s:8:\"heurefin\";s:8:\"10:00:00\";s:4:\"lieu\";s:18:\"Scene Forum Halles\";s:5:\"photo\";i:416;s:4:\"type\";s:7:\"Country\";}s:6:\"_links\";a:5:{s:4:\"self\";a:1:{i:0;a:1:{s:4:\"href\";s:62:\"https://nationsounds.online/wp-json/wp/v2/artists_meetings/415\";}}s:10:\"collection\";a:1:{i:0;a:1:{s:4:\"href\";s:58:\"https://nationsounds.online/wp-json/wp/v2/artists_meetings\";}}s:5:\"about\";a:1:{i:0;a:1:{s:4:\"href\";s:64:\"https://nationsounds.online/wp-json/wp/v2/types/artists_meetings\";}}s:13:\"wp:attachment\";a:1:{i:0;a:1:{s:4:\"href\";s:58:\"https://nationsounds.online/wp-json/wp/v2/media?parent=415\";}}s:6:\"curies\";a:1:{i:0;a:3:{s:4:\"name\";s:2:\"wp\";s:4:\"href\";s:23:\"https://api.w.org/{rel}\";s:9:\"templated\";b:1;}}}}i:3;a:17:{s:2:\"id\";i:413;s:4:\"date\";s:19:\"2024-08-15T09:05:41\";s:8:\"date_gmt\";s:19:\"2024-08-15T07:05:41\";s:4:\"guid\";a:1:{s:8:\"rendered\";s:66:\"https://nationsounds.online/?post_type=artists_meetings&#038;p=413\";}s:8:\"modified\";s:19:\"2024-08-15T09:11:54\";s:12:\"modified_gmt\";s:19:\"2024-08-15T07:11:54\";s:4:\"slug\";s:26:\"rencontre-avec-bluzzigroup\";s:6:\"status\";s:7:\"publish\";s:4:\"type\";s:16:\"artists_meetings\";s:4:\"link\";s:72:\"https://nationsounds.online/artists_meetings/rencontre-avec-bluzzigroup/\";s:5:\"title\";a:1:{s:8:\"rendered\";s:26:\"Rencontre avec BluzziGroup\";}s:7:\"content\";a:2:{s:8:\"rendered\";s:0:\"\";s:9:\"protected\";b:0;}s:14:\"featured_media\";i:0;s:8:\"template\";s:0:\"\";s:10:\"class_list\";a:5:{i:0;s:8:\"post-413\";i:1;s:16:\"artists_meetings\";i:2;s:21:\"type-artists_meetings\";i:3;s:14:\"status-publish\";i:4;s:6:\"hentry\";}s:3:\"acf\";a:8:{s:3:\"nom\";s:35:\"Séance de répétition avec Bluzzi\";s:11:\"description\";s:87:\"BluzziGroup le groupe du moment vous donne rendez vous pour une séance de répétition\";s:4:\"date\";s:8:\"20240816\";s:10:\"heuredebut\";s:8:\"09:00:00\";s:8:\"heurefin\";s:8:\"10:00:00\";s:4:\"lieu\";s:16:\"Scene Principale\";s:5:\"photo\";i:409;s:4:\"type\";s:5:\"Blues\";}s:6:\"_links\";a:5:{s:4:\"self\";a:1:{i:0;a:1:{s:4:\"href\";s:62:\"https://nationsounds.online/wp-json/wp/v2/artists_meetings/413\";}}s:10:\"collection\";a:1:{i:0;a:1:{s:4:\"href\";s:58:\"https://nationsounds.online/wp-json/wp/v2/artists_meetings\";}}s:5:\"about\";a:1:{i:0;a:1:{s:4:\"href\";s:64:\"https://nationsounds.online/wp-json/wp/v2/types/artists_meetings\";}}s:13:\"wp:attachment\";a:1:{i:0;a:1:{s:4:\"href\";s:58:\"https://nationsounds.online/wp-json/wp/v2/media?parent=413\";}}s:6:\"curies\";a:1:{i:0;a:3:{s:4:\"name\";s:2:\"wp\";s:4:\"href\";s:23:\"https://api.w.org/{rel}\";s:9:\"templated\";b:1;}}}}i:4;a:17:{s:2:\"id\";i:412;s:4:\"date\";s:19:\"2024-08-15T09:03:02\";s:8:\"date_gmt\";s:19:\"2024-08-15T07:03:02\";s:4:\"guid\";a:1:{s:8:\"rendered\";s:66:\"https://nationsounds.online/?post_type=artists_meetings&#038;p=412\";}s:8:\"modified\";s:19:\"2024-08-15T09:12:13\";s:12:\"modified_gmt\";s:19:\"2024-08-15T07:12:13\";s:4:\"slug\";s:20:\"rencontre-avec-poppi\";s:6:\"status\";s:7:\"publish\";s:4:\"type\";s:16:\"artists_meetings\";s:4:\"link\";s:66:\"https://nationsounds.online/artists_meetings/rencontre-avec-poppi/\";s:5:\"title\";a:1:{s:8:\"rendered\";s:20:\"Rencontre avec Poppi\";}s:7:\"content\";a:2:{s:8:\"rendered\";s:0:\"\";s:9:\"protected\";b:0;}s:14:\"featured_media\";i:0;s:8:\"template\";s:0:\"\";s:10:\"class_list\";a:5:{i:0;s:8:\"post-412\";i:1;s:16:\"artists_meetings\";i:2;s:21:\"type-artists_meetings\";i:3;s:14:\"status-publish\";i:4;s:6:\"hentry\";}s:3:\"acf\";a:8:{s:3:\"nom\";s:20:\"Breaktime avec Poppi\";s:11:\"description\";s:53:\"Poppi vous donne rendez-vous pour discuter et chiller\";s:4:\"date\";s:8:\"20240822\";s:10:\"heuredebut\";s:8:\"11:00:00\";s:8:\"heurefin\";s:8:\"00:00:00\";s:4:\"lieu\";s:18:\"Scene Forum Halles\";s:5:\"photo\";i:410;s:4:\"type\";s:3:\"Pop\";}s:6:\"_links\";a:5:{s:4:\"self\";a:1:{i:0;a:1:{s:4:\"href\";s:62:\"https://nationsounds.online/wp-json/wp/v2/artists_meetings/412\";}}s:10:\"collection\";a:1:{i:0;a:1:{s:4:\"href\";s:58:\"https://nationsounds.online/wp-json/wp/v2/artists_meetings\";}}s:5:\"about\";a:1:{i:0;a:1:{s:4:\"href\";s:64:\"https://nationsounds.online/wp-json/wp/v2/types/artists_meetings\";}}s:13:\"wp:attachment\";a:1:{i:0;a:1:{s:4:\"href\";s:58:\"https://nationsounds.online/wp-json/wp/v2/media?parent=412\";}}s:6:\"curies\";a:1:{i:0;a:3:{s:4:\"name\";s:2:\"wp\";s:4:\"href\";s:23:\"https://api.w.org/{rel}\";s:9:\"templated\";b:1;}}}}i:5;a:17:{s:2:\"id\";i:408;s:4:\"date\";s:19:\"2024-08-15T09:01:26\";s:8:\"date_gmt\";s:19:\"2024-08-15T07:01:26\";s:4:\"guid\";a:1:{s:8:\"rendered\";s:66:\"https://nationsounds.online/?post_type=artists_meetings&#038;p=408\";}s:8:\"modified\";s:19:\"2024-08-15T09:12:38\";s:12:\"modified_gmt\";s:19:\"2024-08-15T07:12:38\";s:4:\"slug\";s:20:\"rencontre-avec-rocki\";s:6:\"status\";s:7:\"publish\";s:4:\"type\";s:16:\"artists_meetings\";s:4:\"link\";s:66:\"https://nationsounds.online/artists_meetings/rencontre-avec-rocki/\";s:5:\"title\";a:1:{s:8:\"rendered\";s:20:\"Rencontre avec Rocki\";}s:7:\"content\";a:2:{s:8:\"rendered\";s:0:\"\";s:9:\"protected\";b:0;}s:14:\"featured_media\";i:0;s:8:\"template\";s:0:\"\";s:10:\"class_list\";a:5:{i:0;s:8:\"post-408\";i:1;s:16:\"artists_meetings\";i:2;s:21:\"type-artists_meetings\";i:3;s:14:\"status-publish\";i:4;s:6:\"hentry\";}s:3:\"acf\";a:8:{s:3:\"nom\";s:32:\"Séance d\'autographes avec Rocki\";s:11:\"description\";s:40:\"Venez faire signer vos albums avec Rocki\";s:4:\"date\";s:8:\"20240816\";s:10:\"heuredebut\";s:8:\"07:00:00\";s:8:\"heurefin\";s:8:\"08:00:00\";s:4:\"lieu\";s:16:\"Scene Principale\";s:5:\"photo\";i:411;s:4:\"type\";s:4:\"Rock\";}s:6:\"_links\";a:5:{s:4:\"self\";a:1:{i:0;a:1:{s:4:\"href\";s:62:\"https://nationsounds.online/wp-json/wp/v2/artists_meetings/408\";}}s:10:\"collection\";a:1:{i:0;a:1:{s:4:\"href\";s:58:\"https://nationsounds.online/wp-json/wp/v2/artists_meetings\";}}s:5:\"about\";a:1:{i:0;a:1:{s:4:\"href\";s:64:\"https://nationsounds.online/wp-json/wp/v2/types/artists_meetings\";}}s:13:\"wp:attachment\";a:1:{i:0;a:1:{s:4:\"href\";s:58:\"https://nationsounds.online/wp-json/wp/v2/media?parent=408\";}}s:6:\"curies\";a:1:{i:0;a:3:{s:4:\"name\";s:2:\"wp\";s:4:\"href\";s:23:\"https://api.w.org/{rel}\";s:9:\"templated\";b:1;}}}}i:6;a:17:{s:2:\"id\";i:407;s:4:\"date\";s:19:\"2024-08-14T17:25:10\";s:8:\"date_gmt\";s:19:\"2024-08-14T15:25:10\";s:4:\"guid\";a:1:{s:8:\"rendered\";s:66:\"https://nationsounds.online/?post_type=artists_meetings&#038;p=407\";}s:8:\"modified\";s:19:\"2024-08-15T09:12:53\";s:12:\"modified_gmt\";s:19:\"2024-08-15T07:12:53\";s:4:\"slug\";s:20:\"rencontre-avec-jazzi\";s:6:\"status\";s:7:\"publish\";s:4:\"type\";s:16:\"artists_meetings\";s:4:\"link\";s:66:\"https://nationsounds.online/artists_meetings/rencontre-avec-jazzi/\";s:5:\"title\";a:1:{s:8:\"rendered\";s:20:\"Rencontre avec Jazzi\";}s:7:\"content\";a:2:{s:8:\"rendered\";s:0:\"\";s:9:\"protected\";b:0;}s:14:\"featured_media\";i:0;s:8:\"template\";s:0:\"\";s:10:\"class_list\";a:5:{i:0;s:8:\"post-407\";i:1;s:16:\"artists_meetings\";i:2;s:21:\"type-artists_meetings\";i:3;s:14:\"status-publish\";i:4;s:6:\"hentry\";}s:3:\"acf\";a:8:{s:3:\"nom\";s:19:\"Recontre avec Jazzi\";s:11:\"description\";s:61:\"Venez discuter avec Jazzi de Jazz et autres pendant une heure\";s:4:\"date\";s:8:\"20240817\";s:10:\"heuredebut\";s:8:\"09:15:00\";s:8:\"heurefin\";s:8:\"10:15:00\";s:4:\"lieu\";s:15:\"Scene Pont Neuf\";s:5:\"photo\";i:397;s:4:\"type\";s:4:\"Jazz\";}s:6:\"_links\";a:5:{s:4:\"self\";a:1:{i:0;a:1:{s:4:\"href\";s:62:\"https://nationsounds.online/wp-json/wp/v2/artists_meetings/407\";}}s:10:\"collection\";a:1:{i:0;a:1:{s:4:\"href\";s:58:\"https://nationsounds.online/wp-json/wp/v2/artists_meetings\";}}s:5:\"about\";a:1:{i:0;a:1:{s:4:\"href\";s:64:\"https://nationsounds.online/wp-json/wp/v2/types/artists_meetings\";}}s:13:\"wp:attachment\";a:1:{i:0;a:1:{s:4:\"href\";s:58:\"https://nationsounds.online/wp-json/wp/v2/media?parent=407\";}}s:6:\"curies\";a:1:{i:0;a:3:{s:4:\"name\";s:2:\"wp\";s:4:\"href\";s:23:\"https://api.w.org/{rel}\";s:9:\"templated\";b:1;}}}}}', 1724597958),
('artist_meeting_names', 'a:7:{i:0;a:2:{s:2:\"id\";i:419;s:4:\"name\";s:29:\"Atelier musique avec ElectriK\";}i:1;a:2:{s:2:\"id\";i:418;s:4:\"name\";s:27:\"Atelier musique avec Cassie\";}i:2;a:2:{s:2:\"id\";i:415;s:4:\"name\";s:18:\"Chiller avec KnTry\";}i:3;a:2:{s:2:\"id\";i:413;s:4:\"name\";s:35:\"Séance de répétition avec Bluzzi\";}i:4;a:2:{s:2:\"id\";i:412;s:4:\"name\";s:20:\"Breaktime avec Poppi\";}i:5;a:2:{s:2:\"id\";i:408;s:4:\"name\";s:32:\"Séance d\'autographes avec Rocki\";}i:6;a:2:{s:2:\"id\";i:407;s:4:\"name\";s:19:\"Recontre avec Jazzi\";}}', 1724598498);

-- --------------------------------------------------------

--
-- Structure de la table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `event_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_type` enum('concerts','artists') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=420 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id`, `event_name`, `event_type`, `created_at`, `updated_at`) VALUES
(415, 'Chiller avec KnTry', 'artists', '2024-08-25 14:53:12', '2024-08-25 14:53:12'),
(418, 'Atelier musique avec Cassie', 'artists', '2024-08-25 14:53:12', '2024-08-25 14:53:12'),
(419, 'Atelier musique avec ElectriK', 'artists', '2024-08-25 14:53:12', '2024-08-25 14:53:12'),
(358, 'Concert avec Cassie', 'concerts', '2024-08-25 14:53:12', '2024-08-25 14:53:12'),
(364, 'Concert Blues avec Bluzzi', 'concerts', '2024-08-25 14:53:12', '2024-08-25 14:53:12'),
(367, 'Concert Country avec KnTry', 'concerts', '2024-08-25 14:53:12', '2024-08-25 14:53:12'),
(370, 'Concert Electro avec ElectriK', 'concerts', '2024-08-25 14:53:12', '2024-08-25 14:53:12'),
(392, 'Concert de Rocki', 'concerts', '2024-08-25 14:53:12', '2024-08-25 14:53:12'),
(398, 'Concert Jazzi', 'concerts', '2024-08-25 14:53:12', '2024-08-25 14:53:12'),
(400, 'Concert Pop avec Poppi', 'concerts', '2024-08-25 14:53:12', '2024-08-25 14:53:12'),
(413, 'Séance de répétition avec Bluzzi', 'artists', '2024-08-25 14:53:12', '2024-08-25 14:53:12'),
(412, 'Breaktime avec Poppi', 'artists', '2024-08-25 14:53:12', '2024-08-25 14:53:12'),
(408, 'Séance d\'autographes avec Rocki', 'artists', '2024-08-25 14:53:12', '2024-08-25 14:53:12'),
(407, 'Rencontre avec Jazzi', 'artists', '2024-08-25 14:53:12', '2024-08-25 14:53:12');

-- --------------------------------------------------------

--
-- Structure de la table `event_participant`
--

DROP TABLE IF EXISTS `event_participant`;
CREATE TABLE IF NOT EXISTS `event_participant` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `participant_id` bigint UNSIGNED NOT NULL,
  `event_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `event_participant_participant_id_foreign` (`participant_id`),
  KEY `event_participant_event_id_foreign` (`event_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `event_participant`
--

INSERT INTO `event_participant` (`id`, `participant_id`, `event_id`, `created_at`, `updated_at`) VALUES
(3, 2, 413, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `queue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(15, '0001_01_01_000001_create_cache_table', 1),
(16, '0001_01_01_000002_create_jobs_table', 1),
(17, '2024_08_17_201647_create_participants_table', 1),
(18, '2024_08_17_201841_create_events_table', 1),
(19, '2024_08_17_201931_create_event_participant_table', 1),
(20, '2024_08_17_205443_create_news_table', 1),
(21, '2024_08_17_205558_create_subscribers_table', 1);

-- --------------------------------------------------------

--
-- Structure de la table `news`
--

DROP TABLE IF EXISTS `news`;
CREATE TABLE IF NOT EXISTS `news` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `importance` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `participants`
--

DROP TABLE IF EXISTS `participants`;
CREATE TABLE IF NOT EXISTS `participants` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `participants_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `participants`
--

INSERT INTO `participants` (`id`, `first_name`, `last_name`, `email`, `created_at`, `updated_at`) VALUES
(2, 'Hamdane', 'Khiari', 'hamdane.khiari@gmail.com', '2024-08-25 12:53:53', '2024-08-25 12:53:53');

-- --------------------------------------------------------

--
-- Structure de la table `subscribers`
--

DROP TABLE IF EXISTS `subscribers`;
CREATE TABLE IF NOT EXISTS `subscribers` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `subscribers_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `subscribers`
--

INSERT INTO `subscribers` (`id`, `first_name`, `last_name`, `email`, `created_at`, `updated_at`) VALUES
(1, 'Hamdane', 'Khiari', 'hamdane.khiari@gmail.com', '2024-08-25 12:27:09', '2024-08-25 12:27:09'),
(2, 'HK', 'KHI', 'khi_ha@hotmail.fr', '2024-08-25 16:22:29', '2024-08-25 16:22:29');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
