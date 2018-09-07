const spicedPg = require("spiced-pg");
let db; //connecting to heroku or localhost
if (process.env.DATABASE_URL) {
  db = spicedPg(process.env.DATABASE_URL);
}else {
 db = spicedPg("postgres:postgres:postgres@localhost:5432/petition");
}


exports.getSigners = function() {
  const q = "select signatures.user_id AS s_id, users.first_name || ' ' || users.last_name AS userinfo, user_profiles.age, user_profiles.city, user_profiles.url from signatures left join users on signatures.user_id = users.id left join user_profiles on signatures.user_id = user_profiles.user_id;";
  return db.query(q).then(results => {
    return results.rows;
  });
};

exports.getUserIdByEmail = function(email) {
  const q = "SELECT id FROM users WHERE email = $1;";
  const params = [email];
  return db.query(q, params).then(results => {
    return results.rows[0];
  });
};

exports.checkSignatureByUserId = function(userId) {
  const q = "SELECT signature FROM signatures WHERE user_id = $1;";
  const params = [userId];
  return db.query(q, params).then(results => {
    return results.rows;
  });
};

exports.getSignature = function(userId) {
  const q = "SELECT signature FROM signatures WHERE user_id = $1;";

  const params = [userId];
  return db.query(q, params).then(results => {
    return results.rows;
  });
};

exports.getSignersCount = function() {
  const q = "SELECT COUNT(*) FROM signatures";
  return db.query(q).then(results => {
    return results.rows[0].count;
  });
};

exports.insertSignature = function(userId, signature) {
  const q =
    "INSERT INTO signatures (user_id,signature) VALUES ($1, $2) RETURNING *";

  const params = [userId, signature];
  return db.query(q, params).then(results => {
    return results.rows[0];
  });
};

exports.createUser = function(firstName, lastName, email, password) {
  const q =
    "INSERT INTO users (first_name, last_name,email, hashed_password) VALUES ($1, $2 ,$3, $4) RETURNING *";

  const params = [firstName, lastName, email, password];
  return db.query(q, params).then(results => {
    return results.rows[0];
  });
};

exports.getEmail = function(email) {
  const q = "SELECT * FROM users WHERE email = $1;";
  const params = [email];
  return db.query(q, params).then(results => {
    return results.rows;
  });
};

exports.insertProfile = function(userId, age, city, url) {
  const q =
    "INSERT INTO user_profiles (user_id, age,city, url) VALUES ($1, $2 ,$3, $4) RETURNING *;";

  const params = [userId, age, city, url];
  return db
    .query(q, params)
    .then(results => {
      return results.rows[0];
    })
    .catch(err => {
      console.log("insertProfile Sql error here: " + err);
    });
};

exports.getSignersByCityName = function(cityName) {
  const q = "select users.first_name || ' ' || users.last_name AS userinfo, user_profiles.age, user_profiles.url from users left join user_profiles on user_profiles.user_id = users.id where user_profiles.city = $1;";
 const params = [cityName];
  return db.query(q , params).then(results => {
    return results.rows;
  });
};

exports.getUserInfo = function(userId) {
  const q = " select users.first_name, users.last_name, users.email, users.hashed_password, user_profiles.age, user_profiles.city, user_profiles.url from users left join user_profiles on users.id = user_profiles.user_id where users.id = $1;";
 const params = [userId];
  return db.query(q , params).then(results => {
    return results.rows[0];
  });
};

exports.updateUsers = function(userId, firstName, lastName, email, hashedPassword) {
  const q =
    `UPDATE users SET first_name = $2, last_name = $3, email = $4, hashed_password = $5 WHERE id = $1 RETURNING *;`;
  const params = [userId, firstName, lastName, email, hashedPassword];
  return db
    .query(q, params)
    .then(results => {
      return results.rows[0];
    })
    .catch(err => {
      console.log("Updateing User Sql error here: " + err);
    });
};

exports.updateUserProfile = function(userId, age, city, url) {
  const q =
"INSERT INTO user_profiles (user_id ,age, city, url) VALUES ($1 , $2 , $3 , $4) ON CONFLICT (user_id) DO UPDATE SET age = $2 , city = $3 , url = $4;";
  const params = [userId, age, city, url];
  return db
    .query(q, params)
    .then(results => {
      return results.rows[0];
    })
    .catch(err => {
      console.log("Updateing UserProfile Sql error here: " + err);
    });
};

exports.deleteSignature = function(userId) {
  const q = "delete from signatures where user_id = $1;";
  const params = [userId];

  return db
    .query(q, params)
    .then(results => {
      return results.rows[0];
    })
    .catch(err => {
      console.log("Deleting user signature Sql error here: " + err);
    });
};

exports.checkEmail = function(email) {
  const q = "SELECT email FROM users WHERE email = $1;";
  const params = [email];
  return db.query(q, params).then(results => {
    return results.rows;
  });
};
