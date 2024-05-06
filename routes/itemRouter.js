const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root', // Kullanıcı adınıza göre değiştirin
    password: '', // Şifrenizi girin
    database: 'shopping_list'
});
router.get('/', (req, res) => {
    // MySQL'den öğeleri al
    connection.query('SELECT * FROM items', (error, results) => {
        if (error) throw error;
        res.render('index', { items: results });
    });
});

router.post('/items', (req, res) => {
    console.log(req.body);
    const newItem = req.body.item;
    connection.query('INSERT INTO items SET ?', { name: newItem }, (error, results) => {
        if (error) throw error;
        res.redirect('/');
    });
});

router.get('/items', (req, res) => {
    connection.query('DELETE FROM items', (error, results) => {
        if (error) throw error;
        res.redirect('/');
    });
});

router.get('/delete/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    connection.query('DELETE FROM items WHERE id = '+userId, (error, results) => {
        if (error) throw error;
        res.redirect('/');
    });
});

module.exports = router;