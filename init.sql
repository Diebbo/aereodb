-- MariaDB script

-- Drop the database if it exists
DROP DATABASE IF EXISTS aereodb;

-- Create the database
CREATE DATABASE aereodb;

-- Use the database
USE aereodb;

-- Table 'UserData'
DROP TABLE IF EXISTS aereoports;

CREATE TABLE aereoports (
    id CHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(160) NOT NULL
);
