///<reference path='../typings/main/ambient/node/node.d.ts'/>
///<reference path='../typings/main/ambient/express/express.d.ts'/>

var passport = require('passport');
var util = require('util');
var register = require('../controllers/register');
var userService = require('../services/UserService');
var UserService = new userService.UserService();
var pg = require('pg');
//var connectionString = 'postgres://tktgpsbkoyvbep:CJjoY9wIRXLBgFG3WSsTGJsOrX@ec2-54-225-223-40.compute-1.amazonaws.com:5432/ddsg8nfog95prg?ssl=true';
var connectionString = 'postgres://postgres:postgres@localhost:5432/team3';

module.exports = function(express) {
  var router = express.Router();

  var isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error', 'Please login before proceeding.');
    res.redirect('/');
  };

  router.get('/register', function(req, res) {
    res.render('register', { title: 'Kapow' });
  });

  router.post('/register', register.register);

  router.post('/changePassword', function(req, res) {
    UserService.changePassword(req, res);
  });

  router.post('/changeEmail', function(req, res) {
    UserService.changeEmail(req, res);
  });

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  // router.post('/login', passport.authenticate('local', {
  //   successRedirect: '/feed',
  //   failureRedirect: '/',
  //   failureFlash: true
  // }));

  router.post('/login', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  router.get('/explore', isAuthenticated, function(req, res) {
    res.render('explore');
  });

  //Routing

    router.get('/test', function(req, res, next) {
      res.render('test1', { title: 'Kapow' });
    });

    router.get('/view/:id', isAuthenticated, function(req, res, next) {
      res.render('view_content', { title: 'Kapow', id: req.params.id});
    });

    router.get('/feed/', isAuthenticated, function(req, res, next) {
      res.render('feed', { title: 'Kapow'});
    });

    router.get('/news/', isAuthenticated, function(req, res, next) {
    console.log(util.inspect(req.user.account_type, false, null));
      res.render('news', { title: 'Kapow', account_type: req.user.account_type});
    });

    router.get('/editPanel/:id', function(req, res, next) {
      res.render('editPanel', { title: 'Kapow', id: req.params.id});
    });

    router.get('/editPanel/', function(req, res, next) {
      res.render('editPanel', {title: 'Kapow', id: "00000000"});
    });

    router.get('/search', function(req, res, next) {
      res.render('search', { title: 'Search Kapow'});
    });

    router.get('/about/', isAuthenticated, function(req, res, next) {
      res.render('about', { title: 'Kapow'});
    });

    router.get('/profile', isAuthenticated, function(req, res, next) {
      res.render('profile', { title: 'Kapow'});
    });


    //API Testing

    router.post('/api/v1/test1', function(req, res) {

      var results = [];

      // Grab data from http request
      console.log(util.inspect(req.body, false, null));
      var data = { test_field1: req.body.test_field1 };

      // Get a Postgres client from the connection pool
      pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if (err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err });
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO test1(test_field1) values($1)", [data.test_field1]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM test1 ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
          results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
          done();
          return res.json(results);
        });


      });
    });

    router.get('/api/v1/test1', function(req, res) {

      var results = [];

      // Get a Postgres client from the connection pool
      pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if (err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err });
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM test1 ORDER BY id ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
          results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
          done();
          return res.json(results);
        });

      });

    });


    router.put('/api/v1/test1/:id', function(req, res) {

      var results = [];

      // Grab data from the URL parameters
      var id = req.params.id;

      // Grab data from http request
      var data = { test_field1: req.body.test_field1 };

      // Get a Postgres client from the connection pool
      pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if (err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err });
        }

        // SQL Query > Update Data
        client.query("UPDATE test1 SET test_field1=($1) WHERE id=($2)", [data.test_field1, id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM test1 ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
          results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
          done();
          return res.json(results);
        });
      });

    });

    router.delete('/api/v1/test1/:id', function(req, res) {

      var results = [];

      // Grab data from the URL parameters
      var id = req.params.id;


      // Get a Postgres client from the connection pool
      pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if (err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err });
        }

        // SQL Query > Delete Data
        client.query("DELETE FROM test1 WHERE id=($1)", [id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM test1 ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
          results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
          done();
          return res.json(results);
        });
      });

    });

    //Get panel api
 router.get('/api/v1/panel/:id', function(req, res) {

   var results = [];
   var data = req.params.id;

   // Get a Postgres client from the connection pool
   pg.connect(connectionString, function(err, client, done) {
     // Handle connection errors
     if (err) {
       done();
       console.log(err);
       return res.status(500).json({ success: false, data: err });
     }

     // SQL Query > Select Data
     var query = client.query("SELECT content FROM panel where id = '" + data +"';");

     // Stream results back one row at a time
     query.on('row', function(row) {
       results.push(row);
     });

     // After all data is returned, close connection and return results
     query.on('end', function() {
       done();
       return res.json(results);
     });

   });

 });

 //Search api no filter
 router.get('/api/v1/search_all/:search_string', function(req, res) {

   var projectResults = [];
   var userResults = [];
   var resultsMap = {};
   var searchString = req.params.search_string;

   console.log("searching whole app for " + searchString);

   // Get a Postgres client from the connection pool
   pg.connect(connectionString, function(err, client, done) {
     // Handle connection errors
     if (err) {
       done();
       console.log(err);
       return res.status(500).json({ success: false, data: err });
     }

     //Search projects SQL Query > Select Data
     var query = client.query("SELECT id, title, create_date, owner_user_id, tags FROM project WHERE title LIKE '%" + searchString + "%' or tags LIKE '%" + searchString + "%' ;");

     // Stream results back one row at a time
     query.on('row', function(row) {
       projectResults.push(row);
     });

     // Search users
     query = client.query("SELECT id, username FROM users WHERE username LIKE '%" + searchString + "%' ;")

     // Stream results back one row at a time
     query.on('row', function(row) {
       userResults.push(row);
     });

     resultsMap["project_results"] = projectResults;
     resultsMap["user_results"] = userResults;

     // After all data is returned, close connection and return results
     query.on('end', function() {
       done();
       return res.json(resultsMap);
     });

   });

 });

 //delete a project
  router.put('/api/v1/project/:id', function(req,res){

    var id = req.params.id;

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
      // Handle connection errors
      if (err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err });
      }

      // SQL Query > Insert Data
      client.query("UPDATE project SET deleted = true WHERE project.id = ($1)", [id]);

    });
  })

 //Search Comics api
 router.get('/api/v1/search_projects/:search_string', function(req, res) {

   var results = [];
   var searchString = req.params.search_string;

   console.log("searching in projects for " + searchString);

   // Get a Postgres client from the connection pool
   pg.connect(connectionString, function(err, client, done) {
     // Handle connection errors
     if (err) {
       done();
       console.log(err);
       return res.status(500).json({ success: false, data: err });
     }

     //Search projects SQL Query > Select Data
     var query = client.query("SELECT id, title, create_date, owner_user_id, tags FROM project WHERE title LIKE '%" + searchString + "%' or tags LIKE '%" + searchString + "%';");

     // Stream results back one row at a time
     query.on('row', function(row) {
       results.push(row);
     });

     // After all data is returned, close connection and return results
     query.on('end', function() {
       done();
       return res.json(results);
     });

   });

 });

 //Search Users api
 router.get('/api/v1/search_users/:search_string', function(req, res) {

   var results = [];
   var searchString = req.params.search_string;

   console.log("searching in users for " + searchString);

   // Get a Postgres client from the connection pool
   pg.connect(connectionString, function(err, client, done) {
     // Handle connection errors
     if (err) {
       done();
       console.log(err);
       return res.status(500).json({ success: false, data: err });
     }

     // Search users
     var query = client.query("SELECT id, username FROM users WHERE username LIKE '%" + searchString + "%' ;")

     // Stream results back one row at a time
     query.on('row', function(row) {
       results.push(row);
     });

     // After all data is returned, close connection and return results
     query.on('end', function() {
       done();
       return res.json(results);
     });

   });

 });

 //Save panel api

 router.post('/api/v1/panel', function(req, res) {

   var results = [];
   // Grab data from http request
   var data = req.body;

   // Get a Postgres client from the connection pool
   pg.connect(connectionString, function(err, client, done) {
     // Handle connection errors
     if (err) {
       done();
       console.log(err);
       return res.status(500).json({ success: false, data: err });
     }

     // SQL Query > Insert Data
     client.query("UPDATE panel SET content = $2 where panel.id = $1", [data.id, data.data]);

     return res.status(200).json({success: true});

   });
 });

    //Register user api

    router.post('/api/v1/user', function(req, res) {

      var results = [];

      // Grab data from http request
      var data = req.body;

      // Get a Postgres client from the connection pool
      pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if (err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err });
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO users(username, email, password) values($1, $2, $3)", [data.username, data.email, data.password]);

        return res.status(200).json({success: true});

      });
    });

    // Get list of users that contribute to a project by its id
  router.get('/api/v1/contributor/:project_id', function(req, res) {

    var results = [];
    var project_id = req.params.project_id;

    console.log('begin');
    console.log(project_id);
    console.log('end');
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
      // Handle connection errors
      if (err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err });
      }

      // SQL Query > Select Data
      var query = client.query("select users.username, contributor.id from users join contributor on users.id = contributor.user_id WHERE contributor.project_id = ($1)", [project_id]);


      query.on('row', function(row) {
        results.push(row);
      });

      // After all data is returned, close connection and return results
      query.on('end', function() {
        done();
        return res.json(results);
      });

    });

  });

  // Get list of all contributors
 router.get('/api/v1/contributor/', function(req, res) {

   var results = [];

   // Get a Postgres client from the connection pool
   pg.connect(connectionString, function(err, client, done) {
     // Handle connection errors
     if (err) {
       done();
       console.log(err);
       return res.status(500).json({ success: false, data: err });
     }

     // SQL Query > Select Data
     var query = client.query("select * from contributor");

     // Stream results back one row at a time
     query.on('row', function(row) {
       results.push(row);
     });

     // After all data is returned, close connection and return results
     query.on('end', function() {
       done();
       return res.json(results);
     });

   });

 });

 // Get list of all users
router.get('/api/v1/users', function(req, res) {

  var results = [];

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM users");

    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });

  });

});


//add a contributor
  router.post('/api/v1/contributor/', function(req, res) {

    // Grab data from http request
    var data = req.body;

    console.log(data);

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
      // Handle connection errors
      if (err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err });
      }

      // SQL Query > Insert Data
      var query = client.query("INSERT INTO contributor(user_id, project_id) values($1, $2)", [data.user_id, data.project_id]);

      query.on('end', function() {
        done();
        return res.status(200).json({ success: true, data: err });
      });

    });
  });

//delete a contributor
  router.delete('/api/v1/contributor/:id', function(req, res) {

    console.log("trying to delete contributor");

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
      // Handle connection errors
      if (err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err });
      }

      // SQL Query > Insert Data
      var query = client.query("DELETE FROM contributor WHERE id = $1", [req.params.id]);

      query.on('end', function() {
        done();
        return res.status(200).json({ success: true, data: err });
      });


    });
  });


    // Get content for feed
    router.get('/api/v1/project', function(req, res) {

      var results = [];

      // Get a Postgres client from the connection pool
      pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if (err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err });
        }

        // SQL Query > Select Data
        var query = client.query("select project.*, users.username, to_char(project.create_date, 'MM/DD/YYYY - HH:MM pm') as date_created from project join users on users.id = project.owner_user_id where is_published = true and deleted = false order by create_date DESC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
          results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
          done();
          return res.json(results);
        });

      });

    });

    //Get tags for a comic
router.get('/api/v1/tags/:id', function(req, res) {

  var results = [];
  var id = req.params.id

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }

    // SQL Query > Select Data
    var query = client.query("SELECT tags FROM project WHERE project.id = ($1)", [id]);

    // Stream results back one row at a time
    query.on('row', function(row) {
      results = row;
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

//Save tags api

router.post('/api/v1/tags', function(req, res) {

  var results = [];
  // Grab data from http request
  var data = req.body;
  console.log(data.tags);

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }

    // SQL Query > Insert Data
    client.query("UPDATE project SET tags=$2 WHERE project.id = $1", [data.id, data.tags]);

    return res.status(200).json({success: true});

  });
});

    //Get a single comic
    router.get('/api/v1/project/:id', function(req, res) {

      var results = [];
      var id = req.params.id

      // Get a Postgres client from the connection pool
      pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if (err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err });
        }

        // SQL Query > Select Data
        var query = client.query("SELECT project.*, users.username, to_char(project.create_date, 'MM/DD/YYYY - HH:MM pm') as date_created FROM project join users on users.id = project.owner_user_id WHERE project.id = ($1)", [id]);

        // Stream results back one row at a time
        query.on('row', function(row) {
          results = row;
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
          done();
          return res.json(results);
        });
      });
    });

    //Get comments for a comic
    router.get('/api/v1/comments/:project_id', function(req, res) {

      var results = [];
      var id = req.params.project_id;

      // Get a Postgres client from the connection pool
      pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if (err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err });
        }

        // SQL Query > Select Data
        var query = client.query("SELECT comment.*, users.username, to_char(comment.post_date, 'MM/DD/YYYY - HH:MM pm') as date_posted FROM comment join users on users.id = comment.user_id WHERE comment.project_id = ($1) order by post_date desc", [id]);

        // Stream results back one row at a time
        query.on('row', function(row) {
          results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
          done();
          return res.json(results);
        });
      });
    });

    router.post('/api/v1/comments', function(req, res) {


      var results = [];

      // Grab data from http request
      var data = req.body;

      console.log(util.inspect(req.body, false, null));

      // Get a Postgres client from the connection pool
      pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if (err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err });
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO comment(user_id, project_id, post_date, text) values($1, $2, now(), $3)", [req.user.id, data.project_id, data.text]);

        // SQL Query > Select Data
        var query = client.query("SELECT comment.*, users.username, to_char(comment.post_date, 'MM/DD/YYYY - HH:MM pm') as date_posted FROM comment join users on users.id = comment.user_id WHERE comment.project_id = ($1) order by post_date desc", [data.project_id]);

        // Stream results back one row at a time
        query.on('row', function(row) {
          results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
          done();
          return res.json(results);
        });

      });
    });

    router.get('/api/v1/announcements/', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
      // Handle connection errors
      if (err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err });
      }

      // SQL Query > Select Data
      var query = client.query("SELECT announcement.*, to_char(announcement.post_date, 'MM/DD/YYYY - HH:MM pm') as date_posted FROM announcement order by post_date desc");

      // Stream results back one row at a time
      query.on('row', function(row) {
        results.push(row);
      });

      // After all data is returned, close connection and return results
      query.on('end', function() {
        done();
        return res.json(results);
      });
    });
  });

  router.post('/api/v1/announcements', function(req, res) {
    if (req.user.account_type != 'admin') {
      return res.status(403).json({ success: false, data: 'Error' });
    }

    var results = [];

    // Grab data from http request
    var data = req.body;

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
      // Handle connection errors
      if (err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err });
      }

      // SQL Query > Insert Data
      client.query("INSERT INTO announcement(post_date, text, title) values(now(), $1, $2)", [data.text, data.title]);

      // SQL Query > Select Data
       var query = client.query("SELECT announcement.*, to_char(announcement.post_date, 'MM/DD/YYYY - HH:MM pm') as date_posted FROM announcement order by post_date desc");

      // Stream results back one row at a time
      query.on('row', function(row) {
        results.push(row);
      });

      // After all data is returned, close connection and return results
      query.on('end', function() {
        done();
        return res.json(results);
      });
    });
  });

  //Get number of likes or dislikes for a comic
  router.get('/api/v1/voter/:vote_type/:project_id', function(req, res) {

    var results = [];
    console.log('Database getting likes');

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
      // Handle connection errors
      if (err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err });
      }

      // SQL Query > Select Data
      var query = client.query("SELECT COUNT(vote) FROM voter WHERE project_id = $1 AND vote=$2", [req.params.project_id, req.params.vote_type]);


      // Stream results back one row at a time
      query.on('row', function(row) {
        results = row;
      });

      // After all data is returned, close connection and return results
      query.on('end', function() {
        done();
        return res.json(results);
      });
    });
  });

  //add a voter
    router.post('/api/v1/voter/', function(req, res) {

      // Grab data from http request
      var data = req.body;
      var user_project_id = req.user.id +'-' + data.project_id;
      var user = req.user.id;

      console.log(data);

      // Get a Postgres client from the connection pool
      pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if (err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err });
        }

        // SQL Query > Insert Data
        var query = client.query("INSERT INTO voter(user_id, vote, project_id, user_project_id) values($1, $2, $3, $4) ON CONFLICT (user_project_id) DO UPDATE SET vote=$2", [user, data.vote, data.project_id, user_project_id]);

        query.on('end', function() {
          done();
          return res.status(200).json({ success: true, data: err });
        });

      });
    });



  return router;
};
