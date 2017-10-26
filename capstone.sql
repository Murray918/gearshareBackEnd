CREATE TABLE users (
  id SERIAL,
  first_name VARCHAR(35) NOT NULL,
  last_name VARCHAR(35) NOT NULL,
  username VARCHAR(20) NOT NULL UNIQUE,
  password VARCHAR(20) NOT NULL,
  created_at timestamp NOT NULL,
  PRIMARY KEY (id)

);

INSERT INTO users (first_name, last_name, username, password, created_at) VALUES ('Bailey', 'Bryant', 'fluffykitty', '12345678', current_timestamp);
INSERT INTO users (first_name, last_name, username, password, created_at) VALUES ('Sam', 'Kapila', 'uiqueen', '23456789', current_timestamp);
INSERT INTO users (first_name, last_name, username, password, created_at) VALUES ('Sarah', 'Shuey', 'alpha', '34567890', current_timestamp);
INSERT INTO users (first_name, last_name, username, password, created_at) VALUES ('Colton', 'Dowling', 'colot', '56787890', current_timestamp);
INSERT INTO users (first_name, last_name, username, password, created_at) VALUES ('Anthony', 'Silva', 'ajsilva', '12345678',  current_timestamp);

CREATE TABLE microphone (
  user_id int NOT NULL,
  make VARCHAR(40) NOT NULL,
  modle VARCHAR(40) NOT NULL,
  serial_number VARCHAR(100) NULL UNIQUE,
  description VARCHAR(300) NULL,
  power_source VARCHAR(40),
  created_at timestamp NOT NULL,
  PRIMARY KEY (user_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id)
);


INSERT INTO microphone (user_id, make, modle, serial_number, description, power_source, created_at) VALUES (1, 'sure', 'ksm27', '2393575jh', 'This is a studio microphone that could be used in live situaions.', 'phantom', current_timestamp );
-- INSERT INTO microphone (title, priority, created_at) VALUES ('clean house', 3, current_timestamp);
-- INSERT INTO microphone (title, priority, created_at) VALUES ('check mail', 4, current_timestamp);
-- INSERT INTO microphone (title, priority, created_at) VALUES ('pay bills', 5, current_timestamp);
-- INSERT INTO microphone (title, priority, created_at, completed_at) VALUES ('call mom', 3, current_timestamp, current_timestamp);
