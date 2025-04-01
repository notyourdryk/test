CREATE DATABASE IF NOT EXISTS `stations`;

USE `stations`;

CREATE TABLE IF NOT EXISTS `Station` (
    `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` varchar(128) NOT NULL COMMENT 'Station name',
    PRIMARY KEY (`id`),
    UNIQUE `UNIQ_name` (`name`)
) ENGINE InnoDB COMMENT 'Stations';

CREATE TABLE IF NOT EXISTS `Tag` (
    `stationId` int UNSIGNED NOT NULL,
    `title` varchar(32) NOT NULL COMMENT 'Tag title',
    UNIQUE `UNIQ_stationId+title` (`stationId`, `title`)
) ENGINE InnoDB COMMENT 'Tags';
