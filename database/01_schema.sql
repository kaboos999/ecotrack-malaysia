CREATE DATABASE IF NOT EXISTS ecocycle_db;
USE ecocycle_db;

CREATE TABLE IF NOT EXISTS Users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('user','admin') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY ux_users_email (email),
  KEY ix_users_role (role),
  KEY ix_users_created_at (created_at)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Recycling_Submissions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  waste_type ENUM('Plastic','Glass','Paper','Metal') NOT NULL,
  weight DECIMAL(10,2) NOT NULL,
  image_url VARCHAR(512) NOT NULL,
  points INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY ix_submissions_user_id_created_at (user_id, created_at),
  KEY ix_submissions_waste_type (waste_type),
  CONSTRAINT fk_submissions_user
    FOREIGN KEY (user_id) REFERENCES Users(id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
) ENGINE=InnoDB;
