-- -------------------------------------------------------------
-- TablePlus 4.7.1(428)
--
-- https://tableplus.com/
--
-- Database: barbar-shop-nest
-- Generation Time: 2022-07-08 12:09:27.2360
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `booking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `timeslotId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_886145f6923e381f27bf7249acb` (`timeslotId`),
  CONSTRAINT `FK_886145f6923e381f27bf7249acb` FOREIGN KEY (`timeslotId`) REFERENCES `timeslot` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `event` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `eventDurationMinutes` int NOT NULL,
  `cleaningDurationMinutes` int NOT NULL,
  `advanceBookingAllowedDays` int NOT NULL,
  `minMinutesBeforeBookingCanBeMade` int NOT NULL,
  `maxBookingPerSlot` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `event_break` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `startsAt` varchar(255) NOT NULL,
  `endsAt` varchar(255) NOT NULL,
  `eventId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_33ea9a976bf5bbdcfb8bc2e0832` (`eventId`),
  CONSTRAINT `FK_33ea9a976bf5bbdcfb8bc2e0832` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `holiday` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `shop_time` (
  `id` int NOT NULL AUTO_INCREMENT,
  `day` varchar(255) NOT NULL,
  `opensAt` varchar(255) NOT NULL,
  `closesAt` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `timeslot` (
  `id` int NOT NULL AUTO_INCREMENT,
  `startsAt` timestamp NOT NULL,
  `endsAt` timestamp NOT NULL,
  `totalConfirmedBookings` int NOT NULL DEFAULT '1',
  `eventId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_d359803c33b020ecbb38b746e0e` (`eventId`),
  CONSTRAINT `FK_d359803c33b020ecbb38b746e0e` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `event` (`id`, `title`, `eventDurationMinutes`, `cleaningDurationMinutes`, `advanceBookingAllowedDays`, `minMinutesBeforeBookingCanBeMade`, `maxBookingPerSlot`) VALUES
(1, 'Hair Cut', 10, 5, 7, 10, 3),
(2, 'Hair Color', 30, 15, 7, 10, 5);

INSERT INTO `event_break` (`id`, `title`, `startsAt`, `endsAt`, `eventId`) VALUES
(1, 'Lunch Break', '12:00 ', '13:00 ', 1),
(2, 'Tea Break', '15:00', '16:00', 1),
(3, 'Lunch Break', '12:00', '13:00', 2),
(4, 'Tea Break', '15:00', '13:00', 2);

INSERT INTO `holiday` (`id`, `title`, `date`) VALUES
(1, 'Jonh\'s Birthday', '2022-07-01');

INSERT INTO `shop_time` (`id`, `day`, `opensAt`, `closesAt`) VALUES
(6, 'Monday', '08:00', '20:00'),
(7, 'Tuesday', '08:00', '20:00'),
(8, 'Wednesday', '08:00', '20:00'),
(9, 'Thursday', '08:00', '20:00'),
(10, 'Friday', '08:00', '20:00'),
(11, 'Saturday', '10:00', '22:00'),
(12, 'Sunday', '00:00', '00:00');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;