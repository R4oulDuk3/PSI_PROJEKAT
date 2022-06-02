-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: film_kafe
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
INSERT INTO `auth_group` VALUES (1,'Manager');
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
INSERT INTO `auth_group_permissions` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,7),(8,1,8),(9,1,9),(10,1,10),(11,1,11),(12,1,12),(13,1,13),(14,1,14),(15,1,15),(16,1,16),(17,1,17),(18,1,18),(19,1,19),(20,1,20),(21,1,21),(22,1,22),(23,1,23),(24,1,24),(25,1,25),(26,1,26),(27,1,27),(28,1,28),(29,1,29),(30,1,30),(31,1,31),(32,1,32),(33,1,33),(34,1,34),(35,1,35),(36,1,36),(37,1,37),(38,1,38),(39,1,39),(40,1,40),(41,1,41),(42,1,42),(43,1,43),(44,1,44),(45,1,45),(46,1,46),(47,1,47),(48,1,48),(49,1,49),(50,1,50),(51,1,51),(52,1,52),(53,1,53),(54,1,54),(55,1,55),(56,1,56),(57,1,57),(58,1,58),(59,1,59),(60,1,60),(61,1,61),(62,1,62),(63,1,63),(64,1,64),(65,1,65),(66,1,66),(67,1,67),(68,1,68),(69,1,69),(70,1,70),(71,1,71),(72,1,72),(73,1,73),(74,1,74),(75,1,75),(76,1,76),(77,1,77),(78,1,78),(79,1,79),(80,1,80),(81,1,81),(82,1,82),(83,1,83),(84,1,84),(85,1,85),(86,1,86),(87,1,87),(88,1,88),(89,1,89),(90,1,90),(91,1,91),(92,1,92),(93,1,93),(94,1,94),(95,1,95),(96,1,96),(97,1,97),(98,1,98),(99,1,99),(100,1,100),(101,1,101),(102,1,102),(103,1,103),(104,1,104),(105,1,105),(106,1,106),(107,1,107),(108,1,108),(109,1,109),(110,1,110),(111,1,111),(112,1,112),(113,1,113),(114,1,114),(115,1,115),(116,1,116);
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add users',6,'add_users'),(22,'Can change users',6,'change_users'),(23,'Can delete users',6,'delete_users'),(24,'Can view users',6,'view_users'),(25,'Can add coupon',7,'add_coupon'),(26,'Can change coupon',7,'change_coupon'),(27,'Can delete coupon',7,'delete_coupon'),(28,'Can view coupon',7,'view_coupon'),(29,'Can add events',8,'add_events'),(30,'Can change events',8,'change_events'),(31,'Can delete events',8,'delete_events'),(32,'Can view events',8,'view_events'),(33,'Can add meni',9,'add_meni'),(34,'Can change meni',9,'change_meni'),(35,'Can delete meni',9,'delete_meni'),(36,'Can view meni',9,'view_meni'),(37,'Can add product',10,'add_product'),(38,'Can change product',10,'change_product'),(39,'Can delete product',10,'delete_product'),(40,'Can view product',10,'view_product'),(41,'Can add shift',11,'add_shift'),(42,'Can change shift',11,'change_shift'),(43,'Can delete shift',11,'delete_shift'),(44,'Can view shift',11,'view_shift'),(45,'Can add table',12,'add_table'),(46,'Can change table',12,'change_table'),(47,'Can delete table',12,'delete_table'),(48,'Can view table',12,'view_table'),(49,'Can add event reservation',13,'add_eventreservation'),(50,'Can change event reservation',13,'change_eventreservation'),(51,'Can delete event reservation',13,'delete_eventreservation'),(52,'Can view event reservation',13,'view_eventreservation'),(53,'Can add users coupons',14,'add_userscoupons'),(54,'Can change users coupons',14,'change_userscoupons'),(55,'Can delete users coupons',14,'delete_userscoupons'),(56,'Can view users coupons',14,'view_userscoupons'),(57,'Can add schedule',15,'add_schedule'),(58,'Can change schedule',15,'change_schedule'),(59,'Can delete schedule',15,'delete_schedule'),(60,'Can view schedule',15,'view_schedule'),(61,'Can add sale',16,'add_sale'),(62,'Can change sale',16,'change_sale'),(63,'Can delete sale',16,'delete_sale'),(64,'Can view sale',16,'view_sale'),(65,'Can add customer expenditure',17,'add_customerexpenditure'),(66,'Can change customer expenditure',17,'change_customerexpenditure'),(67,'Can delete customer expenditure',17,'delete_customerexpenditure'),(68,'Can view customer expenditure',17,'view_customerexpenditure'),(69,'Can add preference',18,'add_preference'),(70,'Can change preference',18,'change_preference'),(71,'Can delete preference',18,'delete_preference'),(72,'Can view preference',18,'view_preference'),(73,'Can add event table',19,'add_eventtable'),(74,'Can change event table',19,'change_eventtable'),(75,'Can delete event table',19,'delete_eventtable'),(76,'Can view event table',19,'view_eventtable'),(77,'Can add coupon products',20,'add_couponproducts'),(78,'Can change coupon products',20,'change_couponproducts'),(79,'Can delete coupon products',20,'delete_couponproducts'),(80,'Can view coupon products',20,'view_couponproducts'),(81,'Can add reserved tables',21,'add_reservedtables'),(82,'Can change reserved tables',21,'change_reservedtables'),(83,'Can delete reserved tables',21,'delete_reservedtables'),(84,'Can view reserved tables',21,'view_reservedtables'),(85,'Can add Token',22,'add_token'),(86,'Can change Token',22,'change_token'),(87,'Can delete Token',22,'delete_token'),(88,'Can view Token',22,'view_token'),(89,'Can add token',23,'add_tokenproxy'),(90,'Can change token',23,'change_tokenproxy'),(91,'Can delete token',23,'delete_tokenproxy'),(92,'Can view token',23,'view_tokenproxy'),(93,'Can add setup tables',24,'add_setuptables'),(94,'Can change setup tables',24,'change_setuptables'),(95,'Can delete setup tables',24,'delete_setuptables'),(96,'Can view setup tables',24,'view_setuptables'),(97,'Can add setup',25,'add_setup'),(98,'Can change setup',25,'change_setup'),(99,'Can delete setup',25,'delete_setup'),(100,'Can view setup',25,'view_setup'),(101,'Can add preferences',26,'add_preferences'),(102,'Can change preferences',26,'change_preferences'),(103,'Can delete preferences',26,'delete_preferences'),(104,'Can view preferences',26,'view_preferences'),(105,'Can add free tables',27,'add_freetables'),(106,'Can change free tables',27,'change_freetables'),(107,'Can delete free tables',27,'delete_freetables'),(108,'Can view free tables',27,'view_freetables'),(109,'Can add event reservations',28,'add_eventreservations'),(110,'Can change event reservations',28,'change_eventreservations'),(111,'Can delete event reservations',28,'delete_eventreservations'),(112,'Can view event reservations',28,'view_eventreservations'),(113,'Can add reserved tables new',29,'add_reservedtablesnew'),(114,'Can change reserved tables new',29,'change_reservedtablesnew'),(115,'Can delete reserved tables new',29,'delete_reservedtablesnew'),(116,'Can view reserved tables new',29,'view_reservedtablesnew');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_users_idUsers` FOREIGN KEY (`user_id`) REFERENCES `users` (`idUsers`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupon`
--

DROP TABLE IF EXISTS `coupon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupon` (
  `idCupon` int NOT NULL,
  `Description` varchar(100) DEFAULT NULL,
  `Name` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `points` int NOT NULL,
  PRIMARY KEY (`idCupon`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupon`
--

LOCK TABLES `coupon` WRITE;
/*!40000 ALTER TABLE `coupon` DISABLE KEYS */;
INSERT INTO `coupon` VALUES (1,'free drink','Kupon','assets/beer.jpg',100),(2,'free drink','Kupon','assets/beer.jpg',100),(3,'free drink','Kupon','assets/beer.jpg',100),(4,'free drink','Kupon','assets/beer.jpg',100),(5,'free drink','Kupon','assets/beer.jpg',100),(6,'free drink','Kupon','assets/beer.jpg',100),(7,'free drink','Kupon','assets/beer.jpg',100),(8,'free drink','Kupon','assets/beer.jpg',100),(9,'free drink','Kupon','assets/beer.jpg',100),(10,'free drink','Kupon','assets/beer.jpg',100),(11,'free drink','Kupon','assets/beer.jpg',100);
/*!40000 ALTER TABLE `coupon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupon_products`
--

DROP TABLE IF EXISTS `coupon_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupon_products` (
  `Coupon` int NOT NULL,
  `Amount` int unsigned DEFAULT NULL,
  `Unit` varchar(45) DEFAULT NULL,
  `Product` int NOT NULL,
  PRIMARY KEY (`Coupon`),
  UNIQUE KEY `coupon_products_Coupon_Product_ea3026ec_uniq` (`Coupon`,`Product`),
  KEY `coupon_products_Product_53fcd45d_fk_meni_idMeni` (`Product`),
  CONSTRAINT `coupon_products_Coupon_f2836da6_fk_coupon_idCupon` FOREIGN KEY (`Coupon`) REFERENCES `coupon` (`idCupon`),
  CONSTRAINT `coupon_products_Product_53fcd45d_fk_meni_idMeni` FOREIGN KEY (`Product`) REFERENCES `meni` (`idMeni`),
  CONSTRAINT `coupon_products_chk_1` CHECK ((`Amount` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupon_products`
--

LOCK TABLES `coupon_products` WRITE;
/*!40000 ALTER TABLE `coupon_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `coupon_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_expenditure`
--

DROP TABLE IF EXISTS `customer_expenditure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_expenditure` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `Amount` decimal(12,2) NOT NULL,
  `Day` datetime(6) NOT NULL,
  `Customer` int NOT NULL,
  `Unit` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_expenditure_Customer_fa0efce8_fk` (`Customer`),
  CONSTRAINT `customer_expenditure_Customer_fa0efce8_fk` FOREIGN KEY (`Customer`) REFERENCES `users` (`idUsers`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_expenditure`
--

LOCK TABLES `customer_expenditure` WRITE;
/*!40000 ALTER TABLE `customer_expenditure` DISABLE KEYS */;
INSERT INTO `customer_expenditure` VALUES (1,1000.00,'2022-06-01 17:41:49.909993',18,'l'),(2,1000.00,'2022-06-01 17:43:44.645459',18,'l'),(3,1000.00,'2022-06-01 17:45:58.486726',18,'l'),(4,1000.00,'2022-06-01 17:46:35.047669',18,'l'),(5,500.00,'2022-06-02 12:02:59.093014',18,'l');
/*!40000 ALTER TABLE `customer_expenditure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`idUsers`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2022-06-02 19:45:59.604682','1','Manager',1,'[{\"added\": {}}]',3,19);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(22,'authtoken','token'),(23,'authtoken','tokenproxy'),(4,'contenttypes','contenttype'),(7,'filmkafe','coupon'),(20,'filmkafe','couponproducts'),(17,'filmkafe','customerexpenditure'),(13,'filmkafe','eventreservation'),(28,'filmkafe','eventreservations'),(8,'filmkafe','events'),(19,'filmkafe','eventtable'),(27,'filmkafe','freetables'),(9,'filmkafe','meni'),(18,'filmkafe','preference'),(26,'filmkafe','preferences'),(10,'filmkafe','product'),(21,'filmkafe','reservedtables'),(29,'filmkafe','reservedtablesnew'),(16,'filmkafe','sale'),(15,'filmkafe','schedule'),(25,'filmkafe','setup'),(24,'filmkafe','setuptables'),(11,'filmkafe','shift'),(12,'filmkafe','table'),(6,'filmkafe','users'),(14,'filmkafe','userscoupons'),(5,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2022-05-25 15:37:55.041487'),(2,'contenttypes','0002_remove_content_type_name','2022-05-25 15:37:55.248324'),(3,'auth','0001_initial','2022-05-25 15:37:55.968322'),(4,'auth','0002_alter_permission_name_max_length','2022-05-25 15:37:56.108761'),(5,'auth','0003_alter_user_email_max_length','2022-05-25 15:37:56.138463'),(6,'auth','0004_alter_user_username_opts','2022-05-25 15:37:56.159576'),(7,'auth','0005_alter_user_last_login_null','2022-05-25 15:37:56.178326'),(8,'auth','0006_require_contenttypes_0002','2022-05-25 15:37:56.194949'),(9,'auth','0007_alter_validators_add_error_messages','2022-05-25 15:37:56.220136'),(10,'auth','0008_alter_user_username_max_length','2022-05-25 15:37:56.233466'),(11,'auth','0009_alter_user_last_name_max_length','2022-05-25 15:37:56.249577'),(12,'auth','0010_alter_group_name_max_length','2022-05-25 15:37:56.288387'),(13,'auth','0011_update_proxy_permissions','2022-05-25 15:37:56.308397'),(14,'auth','0012_alter_user_first_name_max_length','2022-05-25 15:37:56.324043'),(15,'filmkafe','0001_initial','2022-05-25 15:38:00.205885'),(16,'admin','0001_initial','2022-05-25 15:38:00.623277'),(17,'admin','0002_logentry_remove_auto_add','2022-05-25 15:38:00.663311'),(18,'admin','0003_logentry_add_action_flag_choices','2022-05-25 15:38:00.708667'),(19,'sessions','0001_initial','2022-05-25 15:38:00.808570'),(20,'filmkafe','0002_remove_coupon_redeemed','2022-05-25 15:39:05.383347'),(21,'filmkafe','0003_remove_users_date_joinede','2022-05-25 16:02:15.639837'),(22,'filmkafe','0004_alter_users_idusers','2022-05-25 16:29:23.339325'),(23,'filmkafe','0005_auto_20220527_0010','2022-05-26 22:10:09.718886'),(24,'authtoken','0001_initial','2022-05-26 22:58:54.951826'),(25,'authtoken','0002_auto_20160226_1747','2022-05-26 22:58:54.993713'),(26,'authtoken','0003_tokenproxy','2022-05-26 22:58:54.998699'),(27,'filmkafe','0002_auto_20220528_2059','2022-05-28 18:59:48.590859'),(28,'filmkafe','0003_remove_meni_akcija','2022-05-29 15:36:15.408597'),(29,'filmkafe','0004_meni_akcija','2022-05-29 15:36:15.449784'),(30,'filmkafe','0005_auto_20220530_1513','2022-05-30 13:13:39.858899'),(31,'filmkafe','0006_auto_20220530_1535','2022-05-30 13:35:15.735546'),(32,'filmkafe','0007_auto_20220530_1611','2022-05-30 14:11:14.624392'),(33,'filmkafe','0008_alter_table_name','2022-05-30 14:25:39.436131'),(34,'filmkafe','0009_auto_20220530_1735','2022-05-30 15:35:50.328213'),(35,'filmkafe','0010_alter_table_idtable','2022-05-30 15:45:48.983433'),(36,'filmkafe','0011_auto_20220530_1826','2022-05-30 16:26:28.873738'),(37,'filmkafe','0012_auto_20220530_1923','2022-05-30 17:23:12.051403'),(38,'filmkafe','0013_auto_20220530_2033','2022-05-30 18:33:42.429926'),(39,'filmkafe','0014_rename_weighter_schedule_waiter','2022-05-30 18:39:23.063142'),(40,'filmkafe','0002_alter_preference_options','2022-05-31 12:39:29.071079'),(41,'filmkafe','0003_alter_preference_options','2022-05-31 12:39:42.312240'),(42,'filmkafe','0004_alter_preference_options','2022-05-31 12:41:11.191929'),(43,'filmkafe','0005_alter_preference_options','2022-05-31 12:41:40.918806'),(44,'filmkafe','0002_preferences','2022-05-31 16:09:22.878907'),(45,'filmkafe','0003_auto_20220601_1534','2022-06-01 13:34:21.049556'),(46,'filmkafe','0004_auto_20220601_1536','2022-06-01 13:36:32.706363'),(47,'filmkafe','0005_users_totalexp','2022-06-01 15:18:33.077013'),(48,'filmkafe','0006_eventreservation_noofseats','2022-06-01 20:24:50.749500'),(49,'filmkafe','0007_freetables','2022-06-01 20:56:16.391050'),(50,'filmkafe','0002_auto_20220602_0001','2022-06-01 22:01:47.295226'),(51,'filmkafe','0002_eventreservations_phone','2022-06-02 13:21:49.710409'),(52,'filmkafe','0002_reservedtablesnew','2022-06-02 16:50:12.189750'),(53,'filmkafe','0003_coupon_points','2022-06-02 17:33:38.988569'),(54,'filmkafe','0004_auto_20220602_2329','2022-06-02 21:29:13.004102');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('0lm2rcrvb24pq2dpeg0kvlm8fdw9i3b8','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwlB1:17zUFCs6muvhMCjoIgjGgUda-OEjQtcO6N0-JpQhYes','2022-06-16 13:47:51.926464'),('0r26s4m4yv71jfv6klsv8wyojwcjwgnu','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwi5R:cmQSjLlNPhvG_Hb3N46H7ySltc9iil6GGNNqd4Icp74','2022-06-16 10:29:53.000610'),('1bnafn3cjg2gmum3rv0ff8e5s7t78opv','e30:1nw6Tc:9OeIpkj_1m1WGGLJn68stMmegwphwWrU99oQrVJxxgM','2022-06-14 18:20:20.794221'),('1w5dbg6wne08emo9yqp1195gufe37sy4','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nw6mJ:z7gvHBzuAJiLAn9Eq1AfJZ2pynvLY-ZD8H9A89vn9hE','2022-06-14 18:39:39.105756'),('2i8tkb8nwhj771qm6c07hho6yyokbuv8','.eJxVjMsOgjAUBf-la9NcCpTi0r3fQO7ToqYkPFbGf1cSFro9M3NebsBtzcO26DyM4s4ugDv9joT80LITuWO5TZ6nss4j-V3xB138dRJ9Xg737yDjkr81AFXMvXRskFCJtIa6a9GSNRg4qla9iCFSahNaDEx1D6htk7iz2Lj3Bz-BOX4:1nwsRS:J0fUsmueQvcjWilKirTuS-No9SL7BzY5YfYIw5saCkU','2022-06-16 21:33:18.685598'),('4cyusn9ulfmpw7atm1vclb3r9fetlkry','e30:1nw6Mn:NQGJFeFLNrKOD4TDhuKaECZc6u27ElGunT4bR2Hxgo0','2022-06-14 18:13:17.519216'),('4ptrruu4haa175w0u12k7z8mk3e7m86x','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nw6yD:U2qUMlRbDgM9EYXRuSxkelCD23s9DWEZWSArkNJ-c6s','2022-06-14 18:51:57.906785'),('59ughiejykopg5ib0q0h3euf91jv6h1b','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwl0m:3IBkygtZqC8VrYsO8PVyCXrbNzTPm7zvIfyEMmQY5fQ','2022-06-16 13:37:16.685454'),('6qg9krtnn4i7mnmazz2b47otta1k0ryt','.eJxVjEsOAiEQBe_C2hCaT8O4dO8ZCNCNjBommc_KeHedZBa6fVX1XiKmbW1xW3iOI4mzAC9Ov2NO5cF9J3RP_TbJMvV1HrPcFXnQRV4n4uflcP8OWlrat87kalaoQ7W2egcIYKxXDgdiSMi5DEDOYFUqm6I0FqqsOQQsUFlp8f4A_ro3_w:1nwXUi:nzGnV_8wfNCAcbgOGX2Y5wN5_CGRLBTQEckpRwJuyxM','2022-06-15 23:11:16.830809'),('7odps3ce1cil4n8ls78pcb2wi1jcxxot','.eJxVjEsOAiEQBe_C2hCaT8O4dO8ZCNCNjBommc_KeHedZBa6fVX1XiKmbW1xW3iOI4mzAC9Ov2NO5cF9J3RP_TbJMvV1HrPcFXnQRV4n4uflcP8OWlrat87kalaoQ7W2egcIYKxXDgdiSMi5DEDOYFUqm6I0FqqsOQQsUFlp8f4A_ro3_w:1nw8it:vBQpgxMNslRHHzBnhxTcpbSLKyqVapVtIGHRf9QoNvw','2022-06-14 20:44:15.263366'),('8ismpfqor1ad2bcld5xpm10tiwysahpn','.eJxVjEsOAiEQBe_C2hCaT8O4dO8ZCNCNjBommc_KeHedZBa6fVX1XiKmbW1xW3iOI4mzAC9Ov2NO5cF9J3RP_TbJMvV1HrPcFXnQRV4n4uflcP8OWlrat87kalaoQ7W2egcIYKxXDgdiSMi5DEDOYFUqm6I0FqqsOQQsUFlp8f4A_ro3_w:1nwXVX:ieKKQ7zaKFYmwfcbG_85aJMjgHquAPoZmqXhfACc8sw','2022-06-15 23:12:07.507965'),('92iksxf7cjgq2t1bnhjfqhm1d5q992u1','.eJxVjDsOwjAQBe_iGlnx-ruU9JzBWnttEkCxFCcV4u4QKQW0b2beS0Ta1jFuvSxxYnEWKojT75goP8q8E77TfGsyt3ldpiR3RR60y2vj8rwc7t_BSH381uBTyJi9tUw1Oz8AWgOqVjAMSCWhLib4WrSroEgpjYrZZSYkhMGI9wcLozgT:1nwpQr:6mggeEk2hofwUpULveWVr89OcS_SDj1yTzAQf0g0mWA','2022-06-16 18:20:29.168876'),('9joio71cs491atlucdtz1c1mlizowecx','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwlpi:rtGknGyrZsFkHfBZ42p_LxAqOauftkyViUTHtd0fuiQ','2022-06-16 14:29:54.061693'),('a56i6nbr19i5cs5bpig6auqhi3bdgp4h','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nw76S:cRn2hdG_NO9Pi6tJKdgPpM0k6rggIs_XU3osy5fd9lk','2022-06-14 19:00:28.009457'),('btk1qhyro2x26v598oc0jt5m4cmiprwr','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwk2L:pK2UFbJiSExlxv9rYLh2Dmj756Jr3AMXp4buJAa3wHU','2022-06-16 12:34:49.743289'),('d9i02b8t52t01p18fiq68c6fv2x0x8fh','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwke7:NOCsk-9S7XBLV_yx16zEhVN1ZkJx2jOQXmJBdUz_JtE','2022-06-16 13:13:51.479775'),('da847899ps0dcjflv6aqpub9waweo3ff','.eJxVjDsOwjAQBe_iGlnx-ruU9JzBWnttEkCxFCcV4u4QKQW0b2beS0Ta1jFuvSxxYnEWKojT75goP8q8E77TfGsyt3ldpiR3RR60y2vj8rwc7t_BSH381uBTyJi9tUw1Oz8AWgOqVjAMSCWhLib4WrSroEgpjYrZZSYkhMGI9wcLozgT:1nwoSN:TXUPviUVaxnpWd8dUhXi1pQUcJ8FCAqvaH26OUzFs_E','2022-06-16 17:17:59.253882'),('de6b5ecrsis4worb4frsj3ss54xc85qn','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwl58:rDSGB2UjzyNJRnBn_qxUrA7pbF1A7RoGHutMvkA9mc0','2022-06-16 13:41:46.867824'),('eknyypv7s6x3tuaoi9xkeymku2a528zs','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwlXB:T8c75FvkJOlKG44TK7xSUxdqxQhlMQft8Z1gx-J795o','2022-06-16 14:10:45.742589'),('f4rqdph18reek9cy1zlo1xrvv8ayoql8','.eJxVjEsOAiEQBe_C2hCaT8O4dO8ZCNCNjBommc_KeHedZBa6fVX1XiKmbW1xW3iOI4mzAC9Ov2NO5cF9J3RP_TbJMvV1HrPcFXnQRV4n4uflcP8OWlrat87kalaoQ7W2egcIYKxXDgdiSMi5DEDOYFUqm6I0FqqsOQQsUFlp8f4A_ro3_w:1nwXOm:2rfN6Xu4445XYmrOm3h175q9ZjP8hKfOpz8cwIOjM-g','2022-06-15 23:05:08.624727'),('ftp2efp8a448fxka6t0238vfnuim2n1s','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwlXd:snlXXVVnQOwI5aVY9-YLY5fR-ujoGTIYHK3ZFS3OPEE','2022-06-16 14:11:13.361430'),('fzk2o79731fq04m6p3gcy5x2nqphad9k','.eJxVjDsOwjAQBe_iGlnx-ruU9JzBWnttEkCxFCcV4u4QKQW0b2beS0Ta1jFuvSxxYnEWKojT75goP8q8E77TfGsyt3ldpiR3RR60y2vj8rwc7t_BSH381uBTyJi9tUw1Oz8AWgOqVjAMSCWhLib4WrSroEgpjYrZZSYkhMGI9wcLozgT:1nwj3M:Ym8TfZxq8At6s8vhK1u83AtXN1hJgks-8hOxYPT_OG8','2022-06-16 11:31:48.865274'),('g3jy6fkxi15gv207g31by856gqvw9mxi','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwlfB:ouSBL0qHrWM5rZFYeFP-Sty-pyfQxnFpiR1MS8fmJOg','2022-06-16 14:19:01.713301'),('gw2ql36opl2deo5v8iqhsq1u2y744x95','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwjzF:pbCE9KeRmvP9IUsJ_PRV3BwL2Q40PzFF8lxypTNds1A','2022-06-16 12:31:37.867255'),('hargwe60ehtctjqr9b7wxzxwsc2agnyu','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwhrm:KoliUtUqC8EGg9tAqdVpuwimt5RnntsoQJ8cwpI4ExI','2022-06-16 10:15:46.015651'),('ij0qwxhcch40ans673uvbjj7eya98oqw','.eJxVjDsOwjAQBe_iGlnx-ruU9JzBWnttEkCxFCcV4u4QKQW0b2beS0Ta1jFuvSxxYnEWKojT75goP8q8E77TfGsyt3ldpiR3RR60y2vj8rwc7t_BSH381uBTyJi9tUw1Oz8AWgOqVjAMSCWhLib4WrSroEgpjYrZZSYkhMGI9wcLozgT:1nwpC1:htSOfG06xlnZ52B8ld26o1FW5RcpgwWxpNfu4t23L8E','2022-06-16 18:05:09.121288'),('j0p6j1534gn76s14wznfb2h8yqnmm17r','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwiHQ:EBywSr51teqM_BFvkHZ4-G-xh6BjkaTntKd3N1IHTRg','2022-06-16 10:42:16.131390'),('j2mres3tdhwe44ydg2etvlkch9kee7t8','e30:1nw6V6:TdwEptLyOSDoT9l0rfI0pNdcJ2u0MbE14PLgayvuvQs','2022-06-14 18:21:52.094154'),('ke5jcvw3bf1pdio7z303ui7x1bs1jbvr','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nw6wR:KGQ4exWkjAjs8xYNrbxylsf-d9opAHbV5EamZVGdzXY','2022-06-14 18:50:07.291306'),('l34eazx1gprn6wdto3ozff4p5klm9val','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwlok:O2I7isTD9YxGVDQKK9MbJyLsnfQW0ru-ULvN5JOBr-U','2022-06-16 14:28:54.573014'),('l87p7mevz6amchdvwn3p5ug1w5spvelf','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwiK8:KmJ0zCT8wej-QbCIGR1Rr5rqE6wA8L3fhIbr6qewgzE','2022-06-16 10:45:04.641599'),('lrx8eksilazim2hh5bi5kay2760cl1ll','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nw6rB:3lxGfUlmlWXXMaWY5KQH-R3Zz1Q3OEug4kPut_QR_IU','2022-06-14 18:44:41.363336'),('ls6l8mf88tlt1tli2y0wpv7uz5pykj7r','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwimo:Ha9_aRh_Wf1HsGY5tBd5-JikNbqiA5-wipbOB9tMb5M','2022-06-16 11:14:42.143648'),('mb6vcdxq2lnrhpnulkw1qgsb3d9dinee','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwk9n:Xf8lofIOpjnPD3VnM52fwc8PvKIGehJU1muON_qHrBQ','2022-06-16 12:42:31.219433'),('od35mrk0w1jocubxfxk00vsx5e9pfr4a','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nw6q8:0IeqY6wcq23ejubhRAhAjIHP1vmsZVcSdL7PE0iX7uI','2022-06-14 18:43:36.933665'),('oi92jqs4siyie1uw5hqhoa687zuep18e','.eJxVjDsOwjAQBe_iGlnx-ruU9JzBWnttEkCxFCcV4u4QKQW0b2beS0Ta1jFuvSxxYnEWKojT75goP8q8E77TfGsyt3ldpiR3RR60y2vj8rwc7t_BSH381uBTyJi9tUw1Oz8AWgOqVjAMSCWhLib4WrSroEgpjYrZZSYkhMGI9wcLozgT:1nwpN2:6HnKXSlQKFZWJnY8h97cAdnU7aFHOL0c_0zF16E7mrI','2022-06-16 18:16:32.672060'),('p9ymrb6noi7qhmt5cchmrwybgzpklgta','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwjXe:vmANrpBQUkS81Bwx-TMn7Otvsnu_imlWfLem9JGsK0U','2022-06-16 12:03:06.710131'),('q6v8dhfsl01vcto7gcpxnhpctdzspz1q','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nw6sW:-qG7pKHZM-Ky_XK0Ihf1garAHJYAuG02oGRe_JEKweY','2022-06-14 18:46:04.423584'),('s8ovj1zuxmwm2zqy3vbc000w5xgxtwgk','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwisz:S-UU3PYyxuftdHBkAClRWurg25KyJR-m-V1K2zAl9Qo','2022-06-16 11:21:05.213031'),('sea5pdxvqu54dn7f18n1t9xw92tb0wyy','.eJxVjMsOgjAUBf-la9NcCpTi0r3fQO7ToqYkPFbGf1cSFro9M3NebsBtzcO26DyM4s4ugDv9joT80LITuWO5TZ6nss4j-V3xB138dRJ9Xg737yDjkr81AFXMvXRskFCJtIa6a9GSNRg4qla9iCFSahNaDEx1D6htk7iz2Lj3Bz-BOX4:1nwrun:N79DSd5cWCNNmTp9trLbMrr9w04Du6xzzAdG8fFIEj0','2022-06-16 20:59:33.746916'),('ton7dwr299hmao6dg5a4vvyix4tbxyxp','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwk5y:jE3zW3YhRkQkK0uUEeNT26pZdCk2jtyh_mA-2uyIyr4','2022-06-16 12:38:34.226445'),('uayd2fq19uqw685gem57sg37mtg5qajh','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwi0t:TTUwpfH-CkH-roorKRRTOn1qIzSgeCx_tdx2_fQUdOY','2022-06-16 10:25:11.842952'),('ul0n6ykt6c8wxzo53dzl4bq2lvk1kugn','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwloO:maP3CzYQF2IpnhydqyyM1H6YqoXxKXfMiCk4DDZUzuM','2022-06-16 14:28:32.149100'),('vmkayy4g20hdqj8synvgru4d57s67z37','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwjII:Y71DcADucAq2aig8VtlE22W_-j4Ngdy4x1_UEK8GNBg','2022-06-16 11:47:14.650748'),('vq9dnqrrp3ircz0wbah89o0aoegcx4tm','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwiC1:oLI2kFDxqDagoHLROqx-wMylx4PYNhMrBoUxn70TAkE','2022-06-16 10:36:41.084743'),('wgxjihdaz3dvvuydqx5knzfbqglj9huu','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwikY:pai4VAQrc3RjAWwyysXgXRYmY5Ppn_bZkX9Vy4rGtKc','2022-06-16 11:12:22.456078'),('x59vnpwciey1j87vhylbbpxuqe4eyq0n','.eJxVjEsOAiEQBe_C2hCaT8O4dO8ZCNCNjBommc_KeHedZBa6fVX1XiKmbW1xW3iOI4mzAC9Ov2NO5cF9J3RP_TbJMvV1HrPcFXnQRV4n4uflcP8OWlrat87kalaoQ7W2egcIYKxXDgdiSMi5DEDOYFUqm6I0FqqsOQQsUFlp8f4A_ro3_w:1nw8zp:FE1IwsFrbFlaVpsGnMXlFuRw4SqYi7tXd8PmT8R2abg','2022-06-14 21:01:45.377754'),('x8fx1300lgcu5x3d5lehcnbj4n7zvj9z','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwij4:QLHcHU5PeYnrh9dAEUVYwjJKpDDlZXv_qCITz26yqk0','2022-06-16 11:10:50.831262'),('xcsbkk2kq45fop5qtncftj3il4zbc7w0','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nw75g:HvPfNqTDHV1hWeFsK7-s2qoXzqvybFkVUkMfkx7OO0A','2022-06-14 18:59:40.389348'),('xjjq94lv5ksulj6qkpvikj6ttkhefkll','.eJxVjEsOAiEQBe_C2hCaT8O4dO8ZCNCNjBommc_KeHedZBa6fVX1XiKmbW1xW3iOI4mzAC9Ov2NO5cF9J3RP_TbJMvV1HrPcFXnQRV4n4uflcP8OWlrat87kalaoQ7W2egcIYKxXDgdiSMi5DEDOYFUqm6I0FqqsOQQsUFlp8f4A_ro3_w:1nwqQp:n5P6EGWKnt0iKz-Gsap30iWKEoSxeIWHjCjNnoR3A_0','2022-06-16 19:24:31.595130'),('xq4t5wi38wcrzymrupfwgsdgx6epka48','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwlG3:Rfe4dPsBWK_Jd56wA0PKXFeYLfX6FtRX_qXBgDxNKQw','2022-06-16 13:53:03.418804'),('xqj30tshxnb5ootnnjk916j4cyyx1k7k','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwlZd:s-ZDKKgAWiP1uI9wZtwxgbaTaO9uYS5eQpQTcYoZEgc','2022-06-16 14:13:17.381782'),('yf191ssdz31jm4h3i61mtaso525gf6uv','.eJxVjEsOAiEQBe_C2hCaT8O4dO8ZCNCNjBommc_KeHedZBa6fVX1XiKmbW1xW3iOI4mzAC9Ov2NO5cF9J3RP_TbJMvV1HrPcFXnQRV4n4uflcP8OWlrat87kalaoQ7W2egcIYKxXDgdiSMi5DEDOYFUqm6I0FqqsOQQsUFlp8f4A_ro3_w:1nw8u9:u4zPsI1uf_yvpUUMN3-_9XYPKsMOvAoFowmJgA6iS-s','2022-06-14 20:55:53.565029'),('yjfe8zwrokvar2q5j4hgy7ysaqh7gzeh','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwhoc:Ke4O-6SCgRuv5bziiFA5Xd9DzidLcSjkzid1VosiDnk','2022-06-16 10:12:30.999894'),('yogp90u6fq9qf740n7tioh9s5ndnh727','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwlWo:Vtg4E8w6K-X3yXp2Dp3V_V6fb3RWUhKU2ZYCIMrOzfA','2022-06-16 14:10:22.420285'),('z2xsomkb2f3ygxmdl3kx2ucjqvsm7wmm','.eJxVjDsOwjAQBe_iGlnx-ruU9JzBWnttEkCxFCcV4u4QKQW0b2beS0Ta1jFuvSxxYnEWKojT75goP8q8E77TfGsyt3ldpiR3RR60y2vj8rwc7t_BSH381uBTyJi9tUw1Oz8AWgOqVjAMSCWhLib4WrSroEgpjYrZZSYkhMGI9wcLozgT:1nwpEG:7t3j_PowgIE7nUSTHM9l4a-voRDGayAEYOHoqaCRjPc','2022-06-16 18:07:28.048690'),('z80cgnqzlj5qdlzsep4p9xzp8tbpcych','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwhH5:3lkWU9sMnV-Ep-AtUUYhP00Xhh0J7SHS3HHeiDCzqyY','2022-06-16 09:37:51.028094'),('zbbi2st3ep5wxj73e7yi1cchj9l3xg0s','.eJxVjDsOwyAQBe9CHaHlu5Ayvc-AFgPBSYQlY1dR7h5bcpG0b2bemwXa1hq2npcwJXZlQrDL7xhpfOZ2kPSgdp_5OLd1mSI_FH7Szoc55dftdP8OKvW61wp9jNqgtcaisaZgAQlSYDTK5uSdly4RCecVgHaaFCKCpd0G76iwzxfFdTZE:1nwlo9:Sk2YVTQSeUwwv_Cglgf-QS8YBNaodqoSuPBxo42bhUU','2022-06-16 14:28:17.327569'),('zc6a7y32enfwy6syn1iit7hm5ytk3riu','.eJxVjEsOAiEQBe_C2hCaT8O4dO8ZCNCNjBommc_KeHedZBa6fVX1XiKmbW1xW3iOI4mzAC9Ov2NO5cF9J3RP_TbJMvV1HrPcFXnQRV4n4uflcP8OWlrat87kalaoQ7W2egcIYKxXDgdiSMi5DEDOYFUqm6I0FqqsOQQsUFlp8f4A_ro3_w:1nw98f:i_eRpJ47gKQiW-Vhbtc4F229B2HHqlBX-S_K0fH2r64','2022-06-14 21:10:53.014167'),('zn7b9k8ksgze17dpzxhqgkh2gp01ztvo','.eJxVjDsOwjAQBe_iGlnx-ruU9JzBWnttEkCxFCcV4u4QKQW0b2beS0Ta1jFuvSxxYnEWKojT75goP8q8E77TfGsyt3ldpiR3RR60y2vj8rwc7t_BSH381uBTyJi9tUw1Oz8AWgOqVjAMSCWhLib4WrSroEgpjYrZZSYkhMGI9wcLozgT:1nwpdo:jAss6B2L2tScPqg4JfRggjDAq1tGBkzqbVsazpBgx_g','2022-06-16 18:33:52.248689'),('zvp7liunx6ytzzvgzvu04el9mlsqjacb','.eJxVjDsOwjAQBe_iGlnx-ruU9JzBWnttEkCxFCcV4u4QKQW0b2beS0Ta1jFuvSxxYnEWKojT75goP8q8E77TfGsyt3ldpiR3RR60y2vj8rwc7t_BSH381uBTyJi9tUw1Oz8AWgOqVjAMSCWhLib4WrSroEgpjYrZZSYkhMGI9wcLozgT:1nwp82:6rB5vN7PDfvqbbM4KKZ6HTVJip4u2aTTkG_wC-J6Ows','2022-06-16 18:01:02.726873'),('zxsvf0kknb6x5p5q9gg1hem4of5vd94q','.eJxVjEsOAiEQBe_C2hCaT8O4dO8ZCNCNjBommc_KeHedZBa6fVX1XiKmbW1xW3iOI4mzAC9Ov2NO5cF9J3RP_TbJMvV1HrPcFXnQRV4n4uflcP8OWlrat87kalaoQ7W2egcIYKxXDgdiSMi5DEDOYFUqm6I0FqqsOQQsUFlp8f4A_ro3_w:1nw9AX:01ILGvBVedKhY_VLFnylxGQUf2VwiBfYc_xhnb0A-zY','2022-06-14 21:12:49.007154'),('zxvg5lzhxn6jil06pv96721zdy9pgrj6','.eJxVjDsOwjAQBe_iGlnx-ruU9JzBWnttEkCxFCcV4u4QKQW0b2beS0Ta1jFuvSxxYnEWKojT75goP8q8E77TfGsyt3ldpiR3RR60y2vj8rwc7t_BSH381uBTyJi9tUw1Oz8AWgOqVjAMSCWhLib4WrSroEgpjYrZZSYkhMGI9wcLozgT:1nwqGq:LsT5m-Rmcf2meCsE7yXNaZ_mePbbbc-x3Ncnabipsd0','2022-06-16 19:14:12.348845');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_reservation`
--

DROP TABLE IF EXISTS `event_reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_reservation` (
  `Approved` int NOT NULL,
  `Noofseats` int NOT NULL,
  `ID` int NOT NULL AUTO_INCREMENT,
  `Event` int NOT NULL,
  `User` int NOT NULL,
  `Phone` varchar(15) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `event_reservation_Event_User_de6c87e2_uniq` (`Event`,`User`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_reservation`
--

LOCK TABLES `event_reservation` WRITE;
/*!40000 ALTER TABLE `event_reservation` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_reservations`
--

DROP TABLE IF EXISTS `event_reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_reservations` (
  `Event` int NOT NULL,
  `Approved` int NOT NULL,
  `User` int NOT NULL,
  `Noofseats` int NOT NULL,
  PRIMARY KEY (`Event`),
  UNIQUE KEY `event_reservation_Event_User_de6c87e2_uniq` (`Event`,`User`),
  KEY `event_reservation_User_293b625e_fk` (`User`),
  CONSTRAINT `event_reservation_Event_55587848_fk_events_idEvents` FOREIGN KEY (`Event`) REFERENCES `events` (`idEvents`),
  CONSTRAINT `event_reservation_User_293b625e_fk` FOREIGN KEY (`User`) REFERENCES `users` (`idUsers`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_reservations`
--

LOCK TABLES `event_reservations` WRITE;
/*!40000 ALTER TABLE `event_reservations` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_table`
--

DROP TABLE IF EXISTS `event_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_table` (
  `Event` int NOT NULL,
  `Table` int NOT NULL,
  PRIMARY KEY (`Event`),
  KEY `event_table_Table_74076431_fk` (`Table`),
  CONSTRAINT `event_table_Event_361211d9_fk_events_idEvents` FOREIGN KEY (`Event`) REFERENCES `events` (`idEvents`),
  CONSTRAINT `event_table_Table_74076431_fk` FOREIGN KEY (`Table`) REFERENCES `table` (`idtable`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_table`
--

LOCK TABLES `event_table` WRITE;
/*!40000 ALTER TABLE `event_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `idEvents` int NOT NULL AUTO_INCREMENT,
  `Description` varchar(100) DEFAULT NULL,
  `Start` datetime(6) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `End` datetime(6) NOT NULL,
  `image` varchar(100) NOT NULL,
  `Setup` int DEFAULT NULL,
  PRIMARY KEY (`idEvents`),
  KEY `events_Setup_78df510d_fk_setup_idSetup` (`Setup`),
  CONSTRAINT `events_Setup_78df510d_fk_setup_idSetup` FOREIGN KEY (`Setup`) REFERENCES `setup` (`idSetup`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (18,'has','2022-06-01 15:56:27.000000','Dorucak','2022-06-01 15:56:27.000000','ynGOwnpx4ke4z4ojENQelb5w0NqyQb',2);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `free_tables`
--

DROP TABLE IF EXISTS `free_tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `free_tables` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `Event` int NOT NULL,
  `Table` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `free_tables_Event_ea67e3fa_fk_events_idEvents` (`Event`),
  KEY `free_tables_Table_e3ec209c_fk_table_idtable` (`Table`),
  CONSTRAINT `free_tables_Event_ea67e3fa_fk_events_idEvents` FOREIGN KEY (`Event`) REFERENCES `events` (`idEvents`),
  CONSTRAINT `free_tables_Table_e3ec209c_fk_table_idtable` FOREIGN KEY (`Table`) REFERENCES `table` (`idtable`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `free_tables`
--

LOCK TABLES `free_tables` WRITE;
/*!40000 ALTER TABLE `free_tables` DISABLE KEYS */;
/*!40000 ALTER TABLE `free_tables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meni`
--

DROP TABLE IF EXISTS `meni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meni` (
  `idMeni` int NOT NULL,
  `MeniProduct` varchar(100) NOT NULL,
  `Price` decimal(12,2) NOT NULL,
  `Amount` decimal(12,2) NOT NULL,
  `Unit` varchar(45) DEFAULT NULL,
  `Subtype` varchar(45) DEFAULT NULL,
  `Akcija` int DEFAULT NULL,
  PRIMARY KEY (`idMeni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meni`
--

LOCK TABLES `meni` WRITE;
/*!40000 ALTER TABLE `meni` DISABLE KEYS */;
INSERT INTO `meni` VALUES (1,'Albino',450.00,0.00,'l','Pivo',0),(2,'hoptopod',100.00,0.00,NULL,'Pivo',0),(3,'Ardberg',450.00,0.00,'l','Viski',0);
/*!40000 ALTER TABLE `meni` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preference`
--

DROP TABLE IF EXISTS `preference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preference` (
  `Day` datetime(6) NOT NULL,
  `PreferedShift` int NOT NULL,
  `Waiter` int NOT NULL,
  PRIMARY KEY (`PreferedShift`),
  KEY `preference_Waiter_8303f67d_fk_users_idUsers` (`Waiter`),
  CONSTRAINT `preference_PreferedShift_2ede9967_fk_shift_idShift` FOREIGN KEY (`PreferedShift`) REFERENCES `shift` (`idShift`),
  CONSTRAINT `preference_Waiter_8303f67d_fk_users_idUsers` FOREIGN KEY (`Waiter`) REFERENCES `users` (`idUsers`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preference`
--

LOCK TABLES `preference` WRITE;
/*!40000 ALTER TABLE `preference` DISABLE KEYS */;
/*!40000 ALTER TABLE `preference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preferences`
--

DROP TABLE IF EXISTS `preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preferences` (
  `Day` datetime(6) NOT NULL,
  `idpreference` int NOT NULL AUTO_INCREMENT,
  `PreferedShift` int NOT NULL,
  `Waiter` int NOT NULL,
  PRIMARY KEY (`idpreference`),
  KEY `preferences_PreferedShift_f312f0b8_fk_shift_idShift` (`PreferedShift`),
  KEY `preferences_Waiter_7b633fc9_fk_users_idUsers` (`Waiter`),
  CONSTRAINT `preferences_PreferedShift_f312f0b8_fk_shift_idShift` FOREIGN KEY (`PreferedShift`) REFERENCES `shift` (`idShift`),
  CONSTRAINT `preferences_Waiter_7b633fc9_fk_users_idUsers` FOREIGN KEY (`Waiter`) REFERENCES `users` (`idUsers`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preferences`
--

LOCK TABLES `preferences` WRITE;
/*!40000 ALTER TABLE `preferences` DISABLE KEYS */;
INSERT INTO `preferences` VALUES ('2022-06-01 00:00:00.000000',1,1,7),('2022-06-01 00:00:00.000000',2,2,7),('2022-06-01 00:00:00.000000',4,1,7);
/*!40000 ALTER TABLE `preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `idProduct` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `Description` varchar(100) NOT NULL,
  `Type` varchar(45) NOT NULL,
  `Amount` decimal(12,2) NOT NULL,
  `Unit` varchar(10) NOT NULL,
  `ProductCode` int NOT NULL,
  `MarketPrice` decimal(12,2) NOT NULL,
  `SupplierCode` int NOT NULL,
  `MinAmount` decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (`idProduct`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (7,'Albino','Pivo sa citrusnim notama','Pivo',90.00,'l',832098409,130.00,985340583,20.00),(8,'Crna Krava','Pivo sa citrusnim notama','Pivo',50.00,'l',832098409,130.00,985340583,20.00),(9,'Plutonium','Pivo sa citrusnim notama','Pivo',15.00,'l',832098409,130.00,985340583,20.00),(12,'Hoptopod','','',29.00,'l',24325,299.00,2535,10.00),(13,'Jelen','','',100.00,'l',24325,150.00,2535,10.00);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserved_tables_new`
--

DROP TABLE IF EXISTS `reserved_tables_new`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserved_tables_new` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Reservation` int NOT NULL,
  `ReservedTables` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reserved_tables_new_Reservation_ReservedTables_77139973_uniq` (`Reservation`,`ReservedTables`),
  KEY `reserved_tables_new_ReservedTables_6293d0a5_fk_table_idtable` (`ReservedTables`),
  CONSTRAINT `reserved_tables_new_Reservation_a7ef16aa_fk_event_reservation_ID` FOREIGN KEY (`Reservation`) REFERENCES `event_reservation` (`ID`),
  CONSTRAINT `reserved_tables_new_ReservedTables_6293d0a5_fk_table_idtable` FOREIGN KEY (`ReservedTables`) REFERENCES `table` (`idtable`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserved_tables_new`
--

LOCK TABLES `reserved_tables_new` WRITE;
/*!40000 ALTER TABLE `reserved_tables_new` DISABLE KEYS */;
/*!40000 ALTER TABLE `reserved_tables_new` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale`
--

DROP TABLE IF EXISTS `sale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale` (
  `idSale` int NOT NULL AUTO_INCREMENT,
  `From` datetime(6) NOT NULL,
  `duration` int unsigned NOT NULL,
  `NewPrice` decimal(12,2) NOT NULL,
  `ProductOnSale` int NOT NULL,
  PRIMARY KEY (`idSale`),
  KEY `sale_ProductOnSale_9206e5df_fk_meni_idMeni` (`ProductOnSale`),
  CONSTRAINT `sale_ProductOnSale_9206e5df_fk_meni_idMeni` FOREIGN KEY (`ProductOnSale`) REFERENCES `meni` (`idMeni`),
  CONSTRAINT `sale_chk_1` CHECK ((`duration` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale`
--

LOCK TABLES `sale` WRITE;
/*!40000 ALTER TABLE `sale` DISABLE KEYS */;
/*!40000 ALTER TABLE `sale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `Day` datetime(6) NOT NULL,
  `idSchedule` int NOT NULL AUTO_INCREMENT,
  `Started` datetime(6) DEFAULT NULL,
  `Ended` datetime(6) DEFAULT NULL,
  `shift` int NOT NULL,
  `Weighter` int NOT NULL,
  PRIMARY KEY (`idSchedule`),
  KEY `schedule_shift_c4b12240_fk_shift_idShift` (`shift`),
  KEY `schedule_Weighter_301a5bff_fk` (`Weighter`),
  CONSTRAINT `schedule_shift_c4b12240_fk_shift_idShift` FOREIGN KEY (`shift`) REFERENCES `shift` (`idShift`),
  CONSTRAINT `schedule_Weighter_301a5bff_fk` FOREIGN KEY (`Weighter`) REFERENCES `users` (`idUsers`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `setup`
--

DROP TABLE IF EXISTS `setup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `setup` (
  `idSetup` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  PRIMARY KEY (`idSetup`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setup`
--

LOCK TABLES `setup` WRITE;
/*!40000 ALTER TABLE `setup` DISABLE KEYS */;
INSERT INTO `setup` VALUES (2,'Postavka 2'),(5,'psotavka 6');
/*!40000 ALTER TABLE `setup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `setuptables`
--

DROP TABLE IF EXISTS `setuptables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `setuptables` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `Setup` int NOT NULL,
  `Table` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `setuptables_Setup_8a91a32c_fk_setup_idSetup` (`Setup`),
  KEY `setuptables_Table_58ce75e3_fk` (`Table`),
  CONSTRAINT `setuptables_Setup_8a91a32c_fk_setup_idSetup` FOREIGN KEY (`Setup`) REFERENCES `setup` (`idSetup`),
  CONSTRAINT `setuptables_Table_58ce75e3_fk` FOREIGN KEY (`Table`) REFERENCES `table` (`idtable`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setuptables`
--

LOCK TABLES `setuptables` WRITE;
/*!40000 ALTER TABLE `setuptables` DISABLE KEYS */;
INSERT INTO `setuptables` VALUES (9,2,9),(10,2,10),(11,2,11),(12,2,12),(13,2,19),(15,5,21);
/*!40000 ALTER TABLE `setuptables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shift`
--

DROP TABLE IF EXISTS `shift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shift` (
  `idShift` int NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Start` time(6) NOT NULL,
  `End` time(6) NOT NULL,
  PRIMARY KEY (`idShift`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shift`
--

LOCK TABLES `shift` WRITE;
/*!40000 ALTER TABLE `shift` DISABLE KEYS */;
INSERT INTO `shift` VALUES (1,'Prva smena','08:00:00.000000','12:00:00.000000'),(2,'Druga smena','12:00:00.000000','16:00:00.000000'),(3,'shift3','16:00:00.000000','00:49:00.000000'),(4,'shift4','00:49:00.000000','02:49:00.000000');
/*!40000 ALTER TABLE `shift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `table`
--

DROP TABLE IF EXISTS `table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `table` (
  `idtable` int NOT NULL AUTO_INCREMENT,
  `NoOfSeats` int NOT NULL,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`idtable`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `table`
--

LOCK TABLES `table` WRITE;
/*!40000 ALTER TABLE `table` DISABLE KEYS */;
INSERT INTO `table` VALUES (1,8,'Separe'),(3,8,'Separe'),(5,8,'Separe'),(6,8,'Separe'),(9,8,'Separe'),(10,8,'Separe'),(11,8,'Separe'),(12,8,'Separe'),(13,1,'sto'),(14,1,'sto'),(15,1,'sto'),(16,1,'sto'),(17,1,'sto'),(18,1,'sto'),(19,1,'sto'),(20,15,'sto'),(21,5,'sto');
/*!40000 ALTER TABLE `table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `idUsers` int NOT NULL AUTO_INCREMENT,
  `Email` varchar(255) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Surname` varchar(45) NOT NULL,
  `Role` varchar(45) NOT NULL,
  `Salary` decimal(12,2) DEFAULT NULL,
  `Valute` varchar(45) DEFAULT NULL,
  `image` varchar(100) NOT NULL,
  `Phone` varchar(15) NOT NULL,
  `TotalExp` int NOT NULL,
  PRIMARY KEY (`idUsers`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('pbkdf2_sha256$260000$riEBCkpkjV92vlI2ERrIRN$nfCn6VrZA/KnvA2f6c9TBg2d/ui1HqeRvoXcMNiA3RU=',NULL,0,'nije@test.rs','','',0,1,'2022-05-30 17:41:28.615224',7,'nije@test.rs','','','Waiter',NULL,NULL,'','',0),('pbkdf2_sha256$260000$kXJqf4dKw6lq1lpfmp6h8m$L3kr+tTUuMILV1eddzO2JjPS6VTWw3LoMn8J4hmYn3Y=','2022-06-02 21:31:45.771372',0,'test@QR.rs','','',0,1,'2022-06-01 15:14:33.835927',18,'test@qr.rs','TestQR','QRtest','User',3900.00,NULL,'','+30155555555',4500),('pbkdf2_sha256$260000$bW5JvAvY2CTrKwGxODA6ph$pSgbByWMeBGaskWZ+MfLDYqBFrEcLJG28VyBMl0OaBE=','2022-06-02 19:45:01.628313',1,'ognjen.perovic36999@gmail.com','','',1,1,'2022-06-02 19:43:36.474809',19,'ognjen.perovic36999@gmail.com','','','',NULL,NULL,'','',0),('pbkdf2_sha256$260000$0jIH9PPSL2fY3VPJ1lF31c$7hmjIjTslG4c9psiqHcMvaEeG19PX3y9ps4KmNCTV0w=','2022-06-02 21:33:18.681581',0,'manager@mail.rs','','',0,1,'2022-06-02 20:56:38.281795',20,'manager@mail.rs','Gavrilo','Vojteski','Manager',NULL,NULL,'','+3814464846',0),('pbkdf2_sha256$260000$Oeg7KoREBOHJwTlcxMsRf9$ke5lpzpi1nwJDU8a2pGm0QliRTgYl7Id9+d+1bPxucs=',NULL,0,'ognjen@mail.rs','','',0,1,'2022-06-02 21:34:22.510437',21,'ognjen@mail.rs','Ognjen','Perovic','Waiter',NULL,NULL,'yrKksmCA7JfdWZsQhCl0ct22bWsy8V','+381605648',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_coupons`
--

DROP TABLE IF EXISTS `users_coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_coupons` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `idUsers_Coupons` int NOT NULL,
  `Coupon` int NOT NULL,
  `User` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_coupons_Coupon_03242d94_fk_coupon_idCupon` (`Coupon`),
  KEY `users_coupons_User_06965e7c_fk` (`User`),
  CONSTRAINT `users_coupons_Coupon_03242d94_fk_coupon_idCupon` FOREIGN KEY (`Coupon`) REFERENCES `coupon` (`idCupon`),
  CONSTRAINT `users_coupons_User_06965e7c_fk` FOREIGN KEY (`User`) REFERENCES `users` (`idUsers`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_coupons`
--

LOCK TABLES `users_coupons` WRITE;
/*!40000 ALTER TABLE `users_coupons` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_groups`
--

DROP TABLE IF EXISTS `users_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `users_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_groups_users_id_group_id_83a49e68_uniq` (`users_id`,`group_id`),
  KEY `users_groups_group_id_2f3517aa_fk_auth_group_id` (`group_id`),
  CONSTRAINT `users_groups_group_id_2f3517aa_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_groups`
--

LOCK TABLES `users_groups` WRITE;
/*!40000 ALTER TABLE `users_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_user_permissions`
--

DROP TABLE IF EXISTS `users_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `users_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_user_permissions_users_id_permission_id_d7a00931_uniq` (`users_id`,`permission_id`),
  KEY `users_user_permissio_permission_id_6d08dcd2_fk_auth_perm` (`permission_id`),
  CONSTRAINT `users_user_permissio_permission_id_6d08dcd2_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_user_permissions`
--

LOCK TABLES `users_user_permissions` WRITE;
/*!40000 ALTER TABLE `users_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-02 23:37:27
