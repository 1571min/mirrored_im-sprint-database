DROP DATABASE IF EXISTS chat;
CREATE DATABASE chat;
USE chat;

CREATE TABLE messages (
  id int not null AUTO_INCREMENT,
  username varchar(256) not null,
  roomname varchar(256),
  text text(1024) not null,
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id int not null AUTO_INCREMENT,
  username varchar(256),
  PRIMARY KEY (id)
);



/* Create other tables and define schemas for them here! */
/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/