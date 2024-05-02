const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// MySQL bağlantı ayarları
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root', // Kullanıcı adınıza göre değiştirin
    password: '', // Şifrenizi girin
    database: 'shopping_list'
});

connection.connect((err) => {
    if (err) {
        console.error('MySQL bağlantısı başarısız oldu: ' + err.stack);
        return;
    }
    console.log('MySQL bağlantısı başarıyla kuruldu. Bağlantı kimliği: ' + connection.threadId);
});

// Middleware'lerin eklenmesi
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Views dizinini ayarla
app.set('views', path.join(__dirname, 'views'));
// EJS şablon motorunu ayarla
app.set('view engine', 'ejs');
// Static dosyaları sunmak için views klasörünü ayarla
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    // MySQL'den öğeleri al
    connection.query('SELECT * FROM items', (error, results) => {
        if (error) throw error;
        res.render('index', { items: results });
    });
});

app.post('/items', (req, res) => {
    console.log(req.body);
    const newItem = req.body.item;
    connection.query('INSERT INTO items SET ?', { name: newItem }, (error, results) => {
        if (error) throw error;
        res.redirect('/');
    });
});

app.get('/items', (req, res) => {
    connection.query('DELETE FROM items', (error, results) => {
        if (error) throw error;
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
