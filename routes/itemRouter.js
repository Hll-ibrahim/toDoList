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

router.get('/getItems', (req, res) => {

    connection.query('SELECT * FROM items', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});


router.post('/items', (req, res) => {
    const newItem = req.body.item;
    connection.query('INSERT INTO items SET ?', { name: newItem }, (error, results) => {
        if (error) throw error;
        res.redirect('/');
    });
});
router.post('/createItem',(req,res)=>{
    const name = req.body.name;
    console.log(name);
    connection.query('INSERT INTO items SET ?', { name: name }, (error, results) => {
        if (error) throw error;
        res.json('success');
    });
})
router.delete('/delete', (req, res) => {
    const userId = req.body.id;
    connection.query('DELETE FROM items WHERE id = ?', userId, (error, results) => {
        if (error) {
            console.log(err);
            throw error;
        } else {
            res.status(200).json('success');
        }
    });
});

router.get('/getItem/:id',(req,res)=>{
    const id = req.params.id;
    connection.query('SELECT * FROM items WHERE id = ?', id, (error,result)=>{
        if(error) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(result);
        }
    });
});

router.post('/update/post',(req,res)=>{
    const id = req.body.id;
    const name = req.body.name;
    connection.query('UPDATE items SET name = ? WHERE id = ?', [name, id], (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json("success");
        }
    });

});

module.exports = router;