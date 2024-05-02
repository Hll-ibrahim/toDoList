const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = process.env.PORT || 3000;
const items = require('./items');

// MySQL bağlantı ayarları
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root', // Kullanıcı adınıza göre değiştirin
    password: 'password', // Şifrenizi girin
    database: 'shopping_list' // Kullanmak istediğiniz veritabanının adı
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
app.set('view engine', 'ejs');

// Ana sayfayı görüntüleme
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

// Tüm öğeleri silme
app.delete('/items', (req, res) => {
    // MySQL'de tüm öğeleri sil
    connection.query('DELETE FROM items', (error, results) => {
        if (error) throw error;
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
