const Promise = require('promise');
const db = require('../config/database');
const bcrypt = require('bcrypt');

module.exports = {
  // READ
  findAll: function() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users ORDER BY id ASC', [])
        .then((results) => {
          resolve(results.rows);
        })
        .catch((error) => { reject(error) });
    });
  },

  findOne: function(data) {
    return new Promise((resolve, reject) => {
      if(!data.id && !data.email) {
        reject('error: must provide id or email')
      } else {
        if(data.id) {
          findOneById(data.id)
            .then((results) => {
              // delete results.password;
              resolve(results);
            })
            .catch((error) => { reject(error) });
        } else if (data.email) {
          findOneByEmail(data.email)
            .then((results) => {
              // delete results.password;
              resolve(results);
            })
            .catch((error) => { reject(error) });
        };
      };
    });
  },

  getUserByUserEmail: function(data) {
    return new Promise(function(resolve, reject) {
      db.query(`SELECT * FROM users WHERE email = $1`,[data.email])
        .then((result) => {
          resolve(result.rows[0])
        })
        .catch((err) => reject(err))
    })
  },

  // CREATE
  create: function(data) {
    return new Promise(function(resolve, reject) {
      validateUserData(data)
        .then(function() {
          return hashPassword(data.password);
        })
        .then(function(hash) {
          return db.query(
            'INSERT INTO users (name, email, phone, password, image) VALUES ($1, $2, $3, $4, $5) returning id',
            [data.name, data.email, data.phone, hash, data.image]);
        })
        .then(function(result) {
          resolve(result.rows[0]);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  },

  // UPDATE
  update: function(data) {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE users SET name = $1, email = $2, phone = $3, password = $4 WHERE id = $5 returning (name, email, phone, password)', 
        [data.name, data.email, data.phone, hashPassword(data.password), data.id])
        .then(function(result) {
          resolve(result.rows[0]);
        })
        .catch(function(err) {
          reject(err);
        });
    })
  },

  // DELETE
  delete: function(data) {
    return new Promise(function(resolve, reject) {
      db.query('DELETE FROM users WHERE id = $1', [data.id])
        .then(function(result) {
          resolve(result.rows[0]);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  },
};


function findOneById(id) {
  return new Promise(function(resolve, reject) {
    db.query('SELECT * FROM users WHERE id = $1', [id])
      .then(function(result) {
        if (result.rows[0]) {
          resolve(result.rows[0]);
        }
        else {
          reject('no user found')
        }
      })
      .catch(function(err) {
        reject(err);
      });
  });
}

function findOneByEmail(email) {
  return new Promise(function(resolve, reject) {
    db.query('SELECT * FROM users WHERE email = $1', [email])
      .then(function(result) {
        if (result.rows[0]) {
          resolve(result.rows[0]);
        }
        else {
          reject('no user found')
        }
      })
      .catch(function(err) {
        reject(err);
      });
  });
}

function validateUserData(data) {
  return new Promise(function(resolve, reject) {
    if (!data.password || !data.email) {
      reject('email and/or password missing')
    }
    else {
      validatePassword(data.password, 6)
        .then(function() {
          return validateEmail(data.email);
        })
        .then(function() {
          resolve();
        })
        .catch(function(err) {
          reject(err);
        });
    }
  });
}

function validateEmail(email) {
  return new Promise(function(resolve, reject) {
    if (typeof (email) !== 'string') {
      reject('email must be a string');
    }
    else {
      var re = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
      if (re.test(email)) {
        resolve();
      }
      else {
        reject('provided email does not match proper email format');
      }
    }
  });
}

function validatePassword(password, minCharacters) {
  return new Promise(function(resolve, reject) {
    if (typeof (password) !== 'string') {
      reject('password must be a string');
    }
    else if (password.length < minCharacters) {
      reject('password must be at least ' + minCharacters + ' characters long');
    }
    else {
      resolve();
    }
  });
}


function hashPassword(password) {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        reject(err);
      }
      else {
        bcrypt.hash(password, salt, function(err, hash) {
          if (err) {
            reject(err);
          }
          else {
            resolve(hash);
          }
        });
      }
    });
  });
}
