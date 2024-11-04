const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors"); // Tambahkan ini

const app = express();
app.use(express.json());
app.use(cors()); // Tambahkan ini

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_puskesmas",
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected");
});

// Route dasar
app.get("/", (req, res) => {
    res.send("Welcome to the Login System API");
});

// Register
app.post("/register", (req, res) => {
    const { username, password, role } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error("Hashing error:", err); // Logging error
            return res.status(500).send("Error in hashing password");
        }

        const query = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
        db.query(query, [username, hash, role], (err, result) => {
            if (err) {
                console.error("Database error:", err); // Logging error
                return res.status(500).send("Database error: " + err.sqlMessage); // Sending error message
            }

            res.send("User registered successfully");
        });
    });
});


// Login
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], (err, results) => {
        if (err) throw err;
        if (results.length === 0) return res.status(401).send("User not found");
        bcrypt.compare(password, results[0].password, (err, isMatch) => {
            if (err) throw err;
            if (!isMatch) return res.status(401).send("Incorrect password");
            const token = jwt.sign(
                { id: results[0].id, role: results[0].role },
                "secret",
                { expiresIn: "1h" }
            );
            res.json({ token, role: results[0].role });
        });
    });
});

// Endpoint untuk mendapatkan semua pasien
app.get("/pasien", (req, res) => {
    db.query("SELECT * FROM pasien", (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to retrieve patients" });
        } else {
            res.json(results);
        }
    });
});

// Fungsi untuk menghitung nomor antrian dan waktu periksa
function calculateQueueNumberAndTime(currentTime) {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT MAX(nomor_antrian) AS last_queue_number FROM pasien",
            (err, results) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }

                const lastQueueNumber = results[0].last_queue_number || 0;
                const newQueueNumber = lastQueueNumber + 1;
                const newQueueTime = new Date(currentTime);
                newQueueTime.setMinutes(
                    newQueueTime.getMinutes() + newQueueNumber + 30
                );

                resolve({ newQueueNumber, newQueueTime });
            }
        );
    });
}


// Endpoint untuk menambahkan pasien baru
app.post("/pasien", (req, res) => {
    const { nik, nama_lengkap, ...rest } = req.body;
    const currentTime = new Date();

    calculateQueueNumberAndTime(currentTime)
        .then(({ newQueueNumber, newQueueTime }) => {
            const newPatient = {
                ...req.body,
                nomor_antrian: newQueueNumber,
                waktu_periksa: newQueueTime,
            };

            db.query(
                "INSERT INTO pasien SET ?",
                [newPatient],
                (err, results) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({
                            error: "Terjadi kesalahan saat menambahkan pasien",
                        });
                    } else {
                        res.status(201).json({
                            message: "Pasien berhasil ditambahkan",
                            pasienId: results.insertId,
                        });
                    }
                }
            );
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error adding patient");
        });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
