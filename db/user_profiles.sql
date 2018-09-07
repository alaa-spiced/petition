DROP TABLE IF EXISTS user_profiles;

CREATE TABLE user_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) UNIQUE,
  age Integer,
  city VARCHAR(20),
  url TEXT
);
