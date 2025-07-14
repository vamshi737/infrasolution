CREATE DATABASE IF NOT EXISTS bankdb;

USE bankdb;

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100),
  password VARCHAR(100),
  balance INT DEFAULT 1000
);

INSERT INTO users (username, password, balance) VALUES
('vamshi', 'Vamshi123', 1000);
