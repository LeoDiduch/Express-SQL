const express = require("express");
const connection = require("./conf");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, err => {
  if (err) {
    throw new Error("bad");
  }
  console.log(`$(port)`);
});

// GET
app.get("/stupeflip", (req, res) => {
  connection.query("SELECT * from songs_stupeflip", (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération des sons");
    } else {
      res.json(results);
    }
  });
});

// GET (light)
app.get("/stupeflip/infos", (req, res) => {
  connection.query(
    "SELECT title, release_date, best_song from songs_stupeflip",
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la récupération des sons");
      } else {
        res.json(results);
      }
    }
  );
});

// GET Func

// contain
app.get("/stupeflip/title/:param", (req, res) => {
  const param = req.params.param;
  connection.query(
    `SELECT * FROM songs_stupeflip WHERE title LIKE '%${param}%'`,
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la récupération des sons");
      } else {
        res.json(results);
      }
    }
  );
});

// start by
app.get("/stupeflip/title/:param", (req, res) => {
  const param = req.params.param;
  connection.query(
    `SELECT * FROM songs_stupeflip WHERE title LIKE '${param}%'`,
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la récupération des sons");
      } else {
        res.json(results);
      }
    }
  );
});

// sup to
app.get("/stupeflip/album/:param", (req, res) => {
  const param = req.params.param;
  connection.query(
    `SELECT * FROM songs_stupeflip WHERE number_album > ${param}`,
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la récupération des sons");
      } else {
        res.json(results);
      }
    }
  );
});

// Order by
app.get("/stupeflip/order/:param", (req, res) => {
  const param = req.params.param.toUpperCase();
  connection.query(
    `SELECT * FROM songs_stupeflip ORDER BY title ${param}`,
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la récupération des sons");
      } else {
        res.json(results);
      }
    }
  );
});

// Post
app.post("/stupeflip/post", (req, res) => {
  const formData = req.body;
  connection.query(
    "INSERT INTO songs_stupeflip SET ?",
    formData,
    (err, res) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la sauvegarde d'un sons");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// Put
app.put("/stupeflip/maj", (req, res) => {
  const idArtists = req.body.id;
  const formData = req.body;
  connection.query(
    "UPDATE songs_stupeflip SET ? WHERE id = ?",
    [formData, idArtists],
    err => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la mise a jour d'un sons");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// Put boolean
app.put("/stupeflip/majbol", (req, res) => {
  const idArtists = req.body.id;
  connection.query(
    "UPDATE songs_stupeflip SET freshness = !freshness WHERE id = ?",
    idArtists,
    err => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .send("Erreur lors de la mise a jour d'un booléen d'un sons");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// Delete
app.delete("/stupeflip/delete", (req, res) => {
  const idArtists = req.body.id;
  connection.query(
    "DELETE FROM songs_stupeflip WHERE id = ?",
    idArtists,
    err => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la suppression d'un sons");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// Delete boolean
app.delete("/stupeflip/deletebol", (req, res) => {
  connection.query("DELETE FROM songs_stupeflip WHERE freshness = 0", err => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send(
          "Erreur lors de la suppression d'un songs qui n'est pas dans le best-off"
        );
    } else {
      res.sendStatus(200);
    }
  });
});
