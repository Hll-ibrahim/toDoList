const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const itemRouter = require('./routes/itemRouter');

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

// routes
app.use('/', itemRouter);
app.post('/items', itemRouter);
app.get('/items', itemRouter);
app.delete('/delete',itemRouter);
app.get('/getItem/:id',itemRouter);
app.post('/update/post',itemRouter);

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
