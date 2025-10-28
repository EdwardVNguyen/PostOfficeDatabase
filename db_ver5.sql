-- MySQL dump 10.13  Distrib 9.4.0, for macos15.4 (arm64)
--
-- Host: localhost    Database: postOfficeDatabase
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `street_name` varchar(255) NOT NULL,
  `city_name` varchar(255) NOT NULL,
  `state_name` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `zip_code` char(5) NOT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`address_id`),
  KEY `fk_address_created_by` (`created_by`),
  KEY `fk_address_updated_by` (`updated_by`),
  CONSTRAINT `fk_address_created_by` FOREIGN KEY (`created_by`) REFERENCES `authentication` (`auth_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_address_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `authentication` (`auth_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'Sesame Street','New York City','NY','12345',NULL,NULL,'2025-10-22 20:47:23','2025-10-22 20:47:23'),(3,'123 Main St','Houston','TX','77004',5,5,'2025-10-25 02:00:57','2025-10-25 02:00:57'),(6,'Laugh Tale','Grand Line','OP','12345',8,8,'2025-10-25 02:31:35','2025-10-25 02:31:35'),(7,'Epping Forest','Camelot','GL','93472',9,9,'2025-10-25 02:42:49','2025-10-25 02:42:49'),(8,'Shrek’s Swamp','Lordship of Duloc','FL','94375',NULL,NULL,'2025-10-25 17:52:28','2025-10-25 17:52:28'),(9,'Royal Oak','Toledo','OH','55533',NULL,NULL,'2025-10-25 19:28:07','2025-10-25 19:28:07');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authentication`
--

DROP TABLE IF EXISTS `authentication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authentication` (
  `auth_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`auth_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authentication`
--

LOCK TABLES `authentication` WRITE;
/*!40000 ALTER TABLE `authentication` DISABLE KEYS */;
INSERT INTO `authentication` VALUES (1,'OscarTheGrouch@email.com','pass1234','2025-10-22 20:45:21','2025-10-22 20:45:21'),(5,'jane.doe@example.com','password123','2025-10-25 02:00:57','2025-10-25 02:00:57'),(8,'luffy@onepiece.com','onepieceisreal','2025-10-25 02:31:35','2025-10-25 02:31:35'),(9,'montyPython@grail.com','tisbutascratch','2025-10-25 02:42:49','2025-10-25 02:42:49'),(11,'shrek@swamp.com','password123','2025-10-25 17:48:45','2025-10-25 17:48:45'),(12,'bossbaby@pixar.com','boss','2025-10-25 19:25:54','2025-10-25 19:25:54');
/*!40000 ALTER TABLE `authentication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complaint`
--

DROP TABLE IF EXISTS `complaint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complaint` (
  `complaint_id` int NOT NULL AUTO_INCREMENT,
  `complaint_type` enum('customer','employee') NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `customer_id` int DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(63) DEFAULT NULL,
  `issue_type` enum('lost package','damaged package','delayed delivery','harassment in office','dangerous work environment') NOT NULL,
  `package_id` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`complaint_id`),
  KEY `customer_id` (`customer_id`),
  KEY `package_id` (`package_id`),
  KEY `fk_complaint_created_by` (`created_by`),
  KEY `fk_complaint_updated_by` (`updated_by`),
  CONSTRAINT `complaint_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE SET NULL,
  CONSTRAINT `fk_complaint_created_by` FOREIGN KEY (`created_by`) REFERENCES `authentication` (`auth_id`),
  CONSTRAINT `fk_complaint_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `authentication` (`auth_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complaint`
--

LOCK TABLES `complaint` WRITE;
/*!40000 ALTER TABLE `complaint` DISABLE KEYS */;
/*!40000 ALTER TABLE `complaint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `address_id` int NOT NULL,
  `phone_number` varchar(63) DEFAULT NULL,
  `auth_id` int NOT NULL,
  `account_type` enum('individual','business','prime') NOT NULL,
  `birth_date` date DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `auth_id` (`auth_id`),
  KEY `fk_customer_created_by` (`created_by`),
  KEY `fk_customer_updated_by` (`updated_by`),
  KEY `fk_customer_address` (`address_id`),
  CONSTRAINT `fk_customer_address` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_customer_auth` FOREIGN KEY (`auth_id`) REFERENCES `authentication` (`auth_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_customer_created_by` FOREIGN KEY (`created_by`) REFERENCES `authentication` (`auth_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_customer_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `authentication` (`auth_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Oscar',NULL,'Bruno',1,NULL,1,'individual','1969-06-01',NULL,NULL,'2025-10-22 20:50:55','2025-10-22 20:50:55'),(2,'Jane','A','Doe',3,'8325557890',5,'individual',NULL,NULL,NULL,'2025-10-25 02:00:57','2025-10-25 02:00:57'),(4,'Luffy','D','Monkey',6,NULL,8,'prime',NULL,8,8,'2025-10-25 02:31:35','2025-10-25 02:31:35'),(5,'Monty',NULL,'Python',7,'1234412341',9,'business',NULL,9,9,'2025-10-25 02:42:49','2025-10-25 02:42:49');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `account_type` enum('manager','clerk','courier') NOT NULL,
  `address_id` int NOT NULL,
  `phone_number` varchar(63) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `ethnicity` varchar(255) DEFAULT NULL,
  `employee_ssn` char(11) NOT NULL,
  `auth_id` int NOT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `employee_ssn` (`employee_ssn`),
  UNIQUE KEY `auth_id` (`auth_id`),
  KEY `address_id` (`address_id`),
  KEY `fk_employee_created_by` (`created_by`),
  KEY `fk_employee_updated_by` (`updated_by`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`),
  CONSTRAINT `fk_employee_auth` FOREIGN KEY (`auth_id`) REFERENCES `authentication` (`auth_id`),
  CONSTRAINT `fk_employee_created_by` FOREIGN KEY (`created_by`) REFERENCES `authentication` (`auth_id`),
  CONSTRAINT `fk_employee_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `authentication` (`auth_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'Shrek',NULL,'Ogre','clerk',8,'3335551234','1990-05-15',50000.00,'Ogre','123-45-6789',11,NULL,NULL,'2025-10-25 17:56:34','2025-10-25 18:47:36'),(2,'Theodore',NULL,'Templeton','manager',9,NULL,NULL,1000000.00,NULL,'134-43-3497',12,NULL,NULL,'2025-10-25 19:32:24','2025-10-25 19:32:24');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facility`
--

DROP TABLE IF EXISTS `facility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facility` (
  `facility_id` int NOT NULL AUTO_INCREMENT,
  `status` enum('active','inactive') NOT NULL,
  `facility_name` varchar(255) NOT NULL,
  `address_id` int NOT NULL,
  `facility_type` enum('warehouse','post_office') NOT NULL,
  `days_of_week` enum('monday','tuesday','wednesday','thursday','friday','saturday','sunday') NOT NULL,
  `opening_hours` time NOT NULL,
  `closing_hours` time NOT NULL,
  `manager_id` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`facility_id`),
  KEY `fk_postoffice_address` (`address_id`),
  KEY `fk_manager_facility` (`manager_id`),
  KEY `fk_facility_created_by` (`created_by`),
  KEY `fk_facility_updated_by` (`updated_by`),
  CONSTRAINT `fk_facility_created_by` FOREIGN KEY (`created_by`) REFERENCES `authentication` (`auth_id`),
  CONSTRAINT `fk_facility_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `authentication` (`auth_id`),
  CONSTRAINT `fk_manager_facility` FOREIGN KEY (`manager_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `fk_postoffice_address` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facility`
--

LOCK TABLES `facility` WRITE;
/*!40000 ALTER TABLE `facility` DISABLE KEYS */;
/*!40000 ALTER TABLE `facility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package`
--

DROP TABLE IF EXISTS `package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package` (
  `package_id` int NOT NULL AUTO_INCREMENT,
  `sender_customer_id` int DEFAULT NULL,
  `sender_name` varchar(255) NOT NULL,
  `sender_phone` varchar(63) DEFAULT NULL,
  `sender_email` varchar(255) NOT NULL,
  `sender_address_id` int NOT NULL,
  `recipient_customer_id` int DEFAULT NULL,
  `recipient_name` varchar(255) NOT NULL,
  `recipient_phone` varchar(63) DEFAULT NULL,
  `recipient_email` varchar(255) DEFAULT NULL,
  `recipient_address_id` int NOT NULL,
  `package_type` varchar(255) NOT NULL,
  `weight` decimal(10,2) NOT NULL,
  `length` decimal(10,2) NOT NULL,
  `width` decimal(10,2) NOT NULL,
  `height` decimal(10,2) NOT NULL,
  `package_status` varchar(255) NOT NULL,
  `courier_id` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`package_id`),
  KEY `fk_package_sender_customer` (`sender_customer_id`),
  KEY `fk_package_recipient_customer` (`recipient_customer_id`),
  KEY `fk_package_sender_address` (`sender_address_id`),
  KEY `fk_package_recipient_address` (`recipient_address_id`),
  KEY `fk_package_courier` (`courier_id`),
  KEY `fk_package_created_by` (`created_by`),
  KEY `fk_package_updated_by` (`updated_by`),
  CONSTRAINT `fk_package_courier` FOREIGN KEY (`courier_id`) REFERENCES `employee` (`employee_id`) ON DELETE SET NULL,
  CONSTRAINT `fk_package_created_by` FOREIGN KEY (`created_by`) REFERENCES `authentication` (`auth_id`) ON DELETE SET NULL,
  CONSTRAINT `fk_package_recipient_address` FOREIGN KEY (`recipient_address_id`) REFERENCES `address` (`address_id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_package_recipient_customer` FOREIGN KEY (`recipient_customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE SET NULL,
  CONSTRAINT `fk_package_sender_address` FOREIGN KEY (`sender_address_id`) REFERENCES `address` (`address_id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_package_sender_customer` FOREIGN KEY (`sender_customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE SET NULL,
  CONSTRAINT `fk_package_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `authentication` (`auth_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package`
--

LOCK TABLES `package` WRITE;
/*!40000 ALTER TABLE `package` DISABLE KEYS */;
INSERT INTO `package` VALUES (6,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',6,NULL,'Maria Lopez',NULL,NULL,9,'Box',2.50,30.00,20.00,10.00,'In Transit',NULL,1,1,'2025-10-26 15:48:26','2025-10-26 15:48:26'),(7,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',7,NULL,'Ethan Patel','8325559823','ethan.patel@email.com',6,'Envelope',0.50,25.00,18.00,1.00,'Delivered',NULL,1,1,'2025-10-26 15:48:26','2025-10-26 15:48:26'),(8,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',8,NULL,'Sophie Nguyen',NULL,'sophie.nguyen@email.com',7,'Crate',8.20,60.00,40.00,35.00,'Processing',NULL,1,1,'2025-10-26 15:48:26','2025-10-26 15:48:26'),(9,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',6,NULL,'Liam Johnson',NULL,NULL,8,'Tube',1.10,40.00,10.00,10.00,'Out for Delivery',NULL,1,1,'2025-10-26 15:48:26','2025-10-26 15:48:26'),(10,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',7,NULL,'Ava Kim','7135554019',NULL,3,'Box',3.70,35.00,25.00,15.00,'Delivered',NULL,1,1,'2025-10-26 15:48:26','2025-10-26 15:48:26'),(11,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',6,NULL,'Noah Smith','7135551234','noah.smith@email.com',7,'Box',2.10,30.00,20.00,15.00,'Processing',NULL,1,1,'2025-10-26 16:40:10','2025-10-26 16:40:10'),(12,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',7,NULL,'Emma Davis',NULL,'emma.davis@email.com',8,'Envelope',0.50,25.00,18.00,1.00,'Delivered',NULL,1,1,'2025-10-26 16:40:10','2025-10-26 16:40:10'),(13,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',8,NULL,'William Brown','8325559876',NULL,6,'Crate',5.30,60.00,40.00,35.00,'In Transit',NULL,1,1,'2025-10-26 16:40:10','2025-10-26 16:40:10'),(14,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',6,NULL,'Olivia Johnson',NULL,NULL,7,'Tube',1.20,40.00,10.00,10.00,'Out for Delivery',NULL,1,1,'2025-10-26 16:40:10','2025-10-26 16:40:10'),(15,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',7,NULL,'James Wilson','7135555678','james.wilson@email.com',8,'Box',3.50,35.00,25.00,15.00,'Delivered',NULL,1,1,'2025-10-26 16:40:10','2025-10-26 16:40:10'),(16,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',8,NULL,'Sophia Martinez',NULL,'sophia.martinez@email.com',6,'Envelope',0.80,20.00,15.00,2.00,'Processing',NULL,1,1,'2025-10-26 16:40:10','2025-10-26 16:40:10'),(17,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',6,NULL,'Benjamin Anderson','8325554321',NULL,7,'Crate',6.00,70.00,50.00,40.00,'In Transit',NULL,1,1,'2025-10-26 16:40:10','2025-10-26 16:40:10'),(18,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',7,NULL,'Ava Thomas',NULL,'ava.thomas@email.com',8,'Box',2.80,28.00,22.00,12.00,'Out for Delivery',NULL,1,1,'2025-10-26 16:40:10','2025-10-26 16:40:10'),(19,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',8,NULL,'Mason Taylor','7135558765',NULL,6,'Tube',1.50,42.00,12.00,10.00,'Delivered',NULL,1,1,'2025-10-26 16:40:10','2025-10-26 16:40:10'),(20,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',6,NULL,'Isabella Lee',NULL,NULL,7,'Crate',4.20,55.00,35.00,30.00,'Processing',NULL,1,1,'2025-10-26 16:40:10','2025-10-26 16:40:10'),(21,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',6,NULL,'Grace Turner','8325551111','grace.turner@email.com',7,'Box',3.10,34.00,22.00,14.00,'Processing',NULL,1,1,'2025-10-26 16:41:17','2025-10-26 16:41:17'),(22,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',7,NULL,'Jack Howard',NULL,'jack.howard@email.com',8,'Envelope',0.80,22.00,16.00,2.00,'In Transit',NULL,1,1,'2025-10-26 16:41:17','2025-10-26 16:41:17'),(23,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',8,NULL,'Chloe Bennett','7135552222',NULL,6,'Crate',6.00,65.00,42.00,35.00,'Delivered',NULL,1,1,'2025-10-26 16:41:17','2025-10-26 16:41:17'),(24,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',6,NULL,'Eli Rivera',NULL,NULL,7,'Tube',1.20,40.00,12.00,12.00,'Out for Delivery',NULL,1,1,'2025-10-26 16:41:17','2025-10-26 16:41:17'),(25,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',7,NULL,'Zoe Foster','8325553333','zoe.foster@email.com',8,'Box',3.50,36.00,25.00,15.00,'Processing',NULL,1,1,'2025-10-26 16:41:17','2025-10-26 16:41:17'),(26,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',8,NULL,'Leo Patterson',NULL,'leo.patterson@email.com',6,'Envelope',0.70,21.00,16.00,3.00,'In Transit',NULL,1,1,'2025-10-26 16:41:17','2025-10-26 16:41:17'),(27,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',6,NULL,'Hannah Coleman','7135554444',NULL,7,'Crate',5.70,60.00,38.00,32.00,'Delivered',NULL,1,1,'2025-10-26 16:41:17','2025-10-26 16:41:17'),(28,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',7,NULL,'Mason Hayes',NULL,NULL,8,'Box',2.80,32.00,24.00,13.00,'Out for Delivery',NULL,1,1,'2025-10-26 16:41:17','2025-10-26 16:41:17'),(29,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',8,NULL,'Lily Jenkins','8325555555','lily.jenkins@email.com',6,'Tube',1.50,42.00,14.00,12.00,'Processing',NULL,1,1,'2025-10-26 16:41:17','2025-10-26 16:41:17'),(30,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',6,NULL,'Benjamin Ward',NULL,NULL,7,'Crate',6.20,70.00,45.00,38.00,'Delivered',NULL,1,1,'2025-10-26 16:41:17','2025-10-26 16:41:17'),(35,1,'Oscar Bruno','555-1010','oscarthegrouch@email.com',1,NULL,'Liam Torres','555-2222','liam.torres@example.com',3,'Electronics',4.50,30.00,20.00,10.00,'In Transit',NULL,1,1,'2025-01-15 14:22:11','2025-01-18 09:45:03'),(36,1,'Oscar Bruno','555-1010','oscarthegrouch@email.com',1,NULL,'Ava Johnson','555-3333','ava.johnson@example.com',6,'Books',2.10,25.00,18.00,8.00,'Delivered',NULL,1,1,'2025-02-10 11:12:22','2025-02-11 08:30:09'),(37,1,'Oscar Bruno','555-1010','oscarthegrouch@email.com',1,NULL,'Noah Kim','555-4444','noah.kim@example.com',9,'Clothing',1.75,28.00,22.00,5.00,'Pending',NULL,1,1,'2025-03-03 10:54:41','2025-03-03 10:54:41'),(38,1,'Oscar Bruno','555-1010','oscarthegrouch@email.com',1,NULL,'Sophia Lee','555-5555','sophia.lee@example.com',7,'Documents',0.50,10.00,8.00,2.00,'In Transit',NULL,1,1,'2025-04-22 15:18:19','2025-04-25 12:44:32'),(39,1,'Oscar Bruno','555-1010','oscarthegrouch@email.com',1,NULL,'Emma Davis','555-6666','emma.davis@example.com',8,'Toys',3.40,22.00,18.00,12.00,'Delivered',NULL,1,1,'2025-05-12 13:32:50','2025-05-14 10:21:10'),(40,1,'Oscar Bruno','555-1010','oscarthegrouch@email.com',1,NULL,'Ethan Brown','555-7777','ethan.brown@example.com',9,'Home Goods',5.90,40.00,30.00,15.00,'In Transit',NULL,1,1,'2025-06-08 16:02:05','2025-06-09 09:10:22'),(41,1,'Oscar Bruno','555-1010','oscarthegrouch@email.com',1,NULL,'Isabella Martinez','555-8888','isabella.martinez@example.com',1,'Appliances',8.25,55.00,40.00,25.00,'Pending',NULL,1,1,'2025-07-21 11:47:34','2025-07-21 11:47:34'),(42,1,'Oscar Bruno','555-1010','oscarthegrouch@email.com',1,NULL,'Mason Wilson','555-9999','mason.wilson@example.com',3,'Tools',6.70,48.00,36.00,20.00,'Delivered',NULL,1,1,'2025-08-15 08:59:13','2025-08-16 15:28:45'),(43,1,'Oscar Bruno','555-1010','oscarthegrouch@email.com',1,NULL,'Olivia Chen','555-1212','olivia.chen@example.com',6,'Furniture',12.50,70.00,50.00,40.00,'In Transit',NULL,1,1,'2025-09-02 18:14:51','2025-09-04 09:37:26'),(44,1,'Oscar Bruno','555-1010','oscarthegrouch@email.com',1,NULL,'Lucas Patel','555-3434','lucas.patel@example.com',8,'Sports Equipment',9.80,65.00,45.00,35.00,'Delivered',NULL,1,1,'2025-10-10 12:44:09','2025-10-11 10:05:58'),(65,1,'Oscar Bruno','713-421-9921','oscarthegrouch@email.com',1,NULL,'Maria Lopez','832-512-7744','maria.lopez@email.com',3,'Box',4.25,30.00,20.00,15.00,'In Transit',NULL,1,NULL,'2025-10-26 23:12:23','2025-10-26 23:12:23'),(66,1,'Oscar Bruno','713-421-9921','oscarthegrouch@email.com',1,NULL,'John Park','346-998-2321','johnpark@email.com',6,'Envelope',0.50,12.00,9.00,1.00,'Delivered',NULL,1,NULL,'2025-10-26 23:12:23','2025-10-26 23:12:23'),(67,1,'Oscar Bruno','713-421-9921','oscarthegrouch@email.com',1,NULL,'Linda Tran','281-672-4450','linda.tran@email.com',7,'Tube',2.30,25.00,5.00,5.00,'Pending Pickup',NULL,1,NULL,'2025-10-26 23:12:23','2025-10-26 23:12:23'),(68,1,'Oscar Bruno','713-421-9921','oscarthegrouch@email.com',1,NULL,'Ethan Davis','713-870-1133','ethandavis@email.com',8,'Crate',18.75,40.00,30.00,25.00,'In Warehouse',NULL,1,NULL,'2025-10-26 23:12:23','2025-10-26 23:12:23'),(69,1,'Oscar Bruno','713-421-9921','oscarthegrouch@email.com',1,NULL,'Chloe Nguyen','832-771-9922','chloenguyen@email.com',9,'Box',6.50,28.00,22.00,18.00,'In Transit',NULL,1,NULL,'2025-10-26 23:12:23','2025-10-26 23:12:23'),(70,1,'Oscar Bruno','713-421-9921','oscarthegrouch@email.com',1,NULL,'Jacob Smith','832-190-4555','jacobsmith@email.com',3,'Envelope',0.80,13.00,10.00,1.00,'Delivered',NULL,1,NULL,'2025-10-26 23:12:23','2025-10-26 23:12:23'),(71,1,'Oscar Bruno','713-421-9921','oscarthegrouch@email.com',1,NULL,'Samantha Cruz','713-200-3321','samanthacruz@email.com',6,'Tube',3.10,24.00,6.00,6.00,'Out for Delivery',NULL,1,NULL,'2025-10-26 23:12:23','2025-10-26 23:12:23'),(72,1,'Oscar Bruno','713-421-9921','oscarthegrouch@email.com',1,NULL,'Daniel Chen','832-505-5542','danielchen@email.com',7,'Crate',22.40,42.00,32.00,28.00,'In Warehouse',NULL,1,NULL,'2025-10-26 23:12:23','2025-10-26 23:12:23'),(73,1,'Oscar Bruno','713-421-9921','oscarthegrouch@email.com',1,NULL,'Grace Patel','281-302-6655','gracepatel@email.com',8,'Box',5.00,26.00,20.00,16.00,'Pending Pickup',NULL,1,NULL,'2025-10-26 23:12:23','2025-10-26 23:12:23'),(74,1,'Oscar Bruno','713-421-9921','oscarthegrouch@email.com',1,NULL,'Noah Brown','832-991-8899','noahbrown@email.com',9,'Envelope',0.60,11.00,8.00,1.00,'Delivered',NULL,1,NULL,'2025-10-26 23:12:23','2025-10-26 23:12:23'),(75,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient1',NULL,NULL,3,'Box',2.50,30.00,20.00,10.00,'In Transit',NULL,1,1,'2025-10-26 23:14:48','2025-10-26 23:14:48'),(76,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient2','8325551111',NULL,6,'Envelope',0.50,25.00,18.00,1.00,'Delivered',NULL,1,1,'2025-10-26 23:14:48','2025-10-26 23:14:48'),(77,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient3',NULL,'rec3@email.com',7,'Crate',8.20,60.00,40.00,35.00,'Processing',NULL,1,1,'2025-10-26 23:14:48','2025-10-26 23:14:48'),(78,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient4',NULL,NULL,8,'Tube',1.10,40.00,10.00,10.00,'Out for Delivery',NULL,1,1,'2025-10-26 23:14:48','2025-10-26 23:14:48'),(79,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient5','7135554019',NULL,9,'Box',3.70,35.00,25.00,15.00,'Delivered',NULL,1,1,'2025-10-26 23:14:48','2025-10-26 23:14:48'),(80,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient6',NULL,NULL,1,'Envelope',0.80,22.00,15.00,2.00,'Processing',NULL,1,1,'2025-10-26 23:14:48','2025-10-26 23:14:48'),(81,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient7','8325552222','rec7@email.com',3,'Crate',7.50,50.00,30.00,30.00,'In Transit',NULL,1,1,'2025-10-26 23:14:48','2025-10-26 23:14:48'),(82,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient8',NULL,NULL,6,'Tube',1.20,42.00,12.00,12.00,'Delivered',NULL,1,1,'2025-10-26 23:14:48','2025-10-26 23:14:48'),(83,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient9',NULL,'rec9@email.com',7,'Box',2.80,32.00,22.00,12.00,'Processing',NULL,1,1,'2025-10-26 23:14:48','2025-10-26 23:14:48'),(84,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient10','7135555555',NULL,8,'Envelope',0.60,24.00,16.00,2.00,'Out for Delivery',NULL,1,1,'2025-10-26 23:14:48','2025-10-26 23:14:48'),(85,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient11',NULL,NULL,9,'Crate',9.00,65.00,45.00,40.00,'In Transit',NULL,1,1,'2025-10-26 23:14:48','2025-10-26 23:14:48'),(86,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient12',NULL,'rec12@email.com',1,'Tube',1.00,38.00,11.00,11.00,'Delivered',NULL,1,1,'2025-10-26 23:14:48','2025-10-26 23:14:48'),(87,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient13','8325553333',NULL,3,'Box',3.20,34.00,24.00,14.00,'Processing',NULL,1,1,'2025-10-26 23:14:48','2025-10-26 23:14:48'),(88,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient14',NULL,'rec14@email.com',6,'Envelope',0.70,23.00,17.00,2.00,'Out for Delivery',NULL,1,1,'2025-10-26 23:14:48','2025-10-26 23:14:48'),(89,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient15',NULL,NULL,7,'Crate',8.50,55.00,35.00,38.00,'Delivered',NULL,1,1,'2025-10-26 23:14:48','2025-10-26 23:14:48'),(90,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient16','7135556666',NULL,8,'Tube',1.30,43.00,13.00,13.00,'Processing',NULL,1,1,'2025-10-26 23:14:48','2025-10-26 23:14:48'),(91,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient17',NULL,'rec17@email.com',9,'Box',2.90,33.00,23.00,13.00,'In Transit',NULL,1,1,'2025-10-26 23:14:48','2025-10-26 23:14:48'),(92,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient18',NULL,NULL,1,'Envelope',0.60,25.00,18.00,1.00,'Delivered',NULL,1,1,'2025-10-26 23:14:48','2025-10-26 23:14:48'),(93,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient19','8325557777','rec19@email.com',6,'Crate',7.80,52.00,32.00,32.00,'Processing',NULL,1,1,'2025-10-26 23:14:48','2025-10-26 23:14:48'),(94,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient20',NULL,NULL,7,'Tube',1.10,41.00,12.00,12.00,'Out for Delivery',NULL,1,1,'2025-10-26 23:14:48','2025-10-26 23:14:48'),(95,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient21',NULL,NULL,3,'Box',3.00,35.00,25.00,15.00,'Processing',NULL,1,1,'2025-10-26 23:15:53','2025-10-26 23:15:53'),(96,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient22','8325558888',NULL,6,'Envelope',0.40,22.00,16.00,1.00,'Delivered',NULL,1,1,'2025-10-26 23:15:53','2025-10-26 23:15:53'),(97,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient23',NULL,'rec23@email.com',7,'Crate',8.80,62.00,42.00,36.00,'In Transit',NULL,1,1,'2025-10-26 23:15:53','2025-10-26 23:15:53'),(98,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient24',NULL,NULL,8,'Tube',1.40,44.00,13.00,13.00,'Out for Delivery',NULL,1,1,'2025-10-26 23:15:53','2025-10-26 23:15:53'),(99,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient25','7135559999',NULL,9,'Box',4.00,36.00,26.00,16.00,'Delivered',NULL,1,1,'2025-10-26 23:15:53','2025-10-26 23:15:53'),(100,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient26',NULL,NULL,1,'Envelope',0.70,24.00,18.00,2.00,'Processing',NULL,1,1,'2025-10-26 23:15:53','2025-10-26 23:15:53'),(101,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient27','8325550001','rec27@email.com',3,'Crate',7.90,54.00,34.00,34.00,'In Transit',NULL,1,1,'2025-10-26 23:15:53','2025-10-26 23:15:53'),(102,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient28',NULL,NULL,6,'Tube',1.20,41.00,12.00,12.00,'Delivered',NULL,1,1,'2025-10-26 23:15:53','2025-10-26 23:15:53'),(103,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient29',NULL,'rec29@email.com',7,'Box',3.10,33.00,23.00,13.00,'Processing',NULL,1,1,'2025-10-26 23:15:53','2025-10-26 23:15:53'),(104,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient30','7135551112',NULL,8,'Envelope',0.50,23.00,17.00,1.00,'Out for Delivery',NULL,1,1,'2025-10-26 23:15:53','2025-10-26 23:15:53'),(105,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient31',NULL,NULL,9,'Crate',8.50,60.00,40.00,35.00,'In Transit',NULL,1,1,'2025-10-26 23:15:53','2025-10-26 23:15:53'),(106,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient32',NULL,'rec32@email.com',1,'Tube',1.00,39.00,12.00,12.00,'Delivered',NULL,1,1,'2025-10-26 23:15:53','2025-10-26 23:15:53'),(107,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient33','8325552223',NULL,3,'Box',3.30,34.00,24.00,14.00,'Processing',NULL,1,1,'2025-10-26 23:15:53','2025-10-26 23:15:53'),(108,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient34',NULL,'rec34@email.com',6,'Envelope',0.60,25.00,18.00,2.00,'Out for Delivery',NULL,1,1,'2025-10-26 23:15:53','2025-10-26 23:15:53'),(109,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient35',NULL,NULL,7,'Crate',8.00,55.00,35.00,38.00,'Delivered',NULL,1,1,'2025-10-26 23:15:53','2025-10-26 23:15:53'),(110,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient36','7135552224',NULL,8,'Tube',1.30,43.00,13.00,13.00,'Processing',NULL,1,1,'2025-10-26 23:15:53','2025-10-26 23:15:53'),(111,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient37',NULL,'rec37@email.com',9,'Box',2.90,33.00,23.00,13.00,'In Transit',NULL,1,1,'2025-10-26 23:15:53','2025-10-26 23:15:53'),(112,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient38',NULL,NULL,1,'Envelope',0.50,24.00,16.00,1.00,'Delivered',NULL,1,1,'2025-10-26 23:15:53','2025-10-26 23:15:53'),(113,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient39','8325553334','rec39@email.com',6,'Crate',7.70,52.00,32.00,32.00,'Processing',NULL,1,1,'2025-10-26 23:15:53','2025-10-26 23:15:53'),(114,1,'Oscar Bruno',NULL,'oscarthegrouch@email.com',1,NULL,'Recipient40',NULL,NULL,7,'Tube',1.20,42.00,12.00,12.00,'Out for Delivery',NULL,1,1,'2025-10-26 23:15:53','2025-10-26 23:15:53');
/*!40000 ALTER TABLE `package` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tracking_event`
--

DROP TABLE IF EXISTS `tracking_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tracking_event` (
  `tracking_event_id` int NOT NULL AUTO_INCREMENT,
  `package_id` int NOT NULL,
  `location_id` int DEFAULT NULL,
  `event_type` enum('pre-shipment','in transit','out for delivery','delivered') NOT NULL,
  `event_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`tracking_event_id`),
  KEY `package_id` (`package_id`),
  KEY `location_id` (`location_id`),
  KEY `fk_tracking_event_created_by` (`created_by`),
  KEY `fk_tracking_event_updated_by` (`updated_by`),
  CONSTRAINT `fk_tracking_event_created_by` FOREIGN KEY (`created_by`) REFERENCES `authentication` (`auth_id`),
  CONSTRAINT `fk_tracking_event_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `authentication` (`auth_id`),
  CONSTRAINT `tracking_event_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `address` (`address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tracking_event`
--

LOCK TABLES `tracking_event` WRITE;
/*!40000 ALTER TABLE `tracking_event` DISABLE KEYS */;
/*!40000 ALTER TABLE `tracking_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `package_id` int NOT NULL,
  `cost_fee` decimal(10,2) NOT NULL,
  `date_time` datetime NOT NULL,
  `estimated_shipping_time` varchar(255) DEFAULT NULL,
  `special_instructions` text,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`transaction_id`),
  KEY `package_id` (`package_id`),
  KEY `fk_transaction_created_by` (`created_by`),
  KEY `fk_transaction_updated_by` (`updated_by`),
  CONSTRAINT `fk_transaction_created_by` FOREIGN KEY (`created_by`) REFERENCES `authentication` (`auth_id`),
  CONSTRAINT `fk_transaction_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `authentication` (`auth_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-27 14:43:09
