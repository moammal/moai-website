const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// ربط قاعدة البيانات
const MONGO_URI = 'mongodb+srv://mo:mo123@cluster0.s354ddi.mongodb.net/?appName=Cluster0';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ تم الاتصال بقاعدة البيانات'))
  .catch(err => console.log('❌ خطأ في الاتصال', err));

// نموذج المستخدم في قاعدة البيانات
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});
const User = mongoose.model('User', UserSchema);

// مسار التسجيل
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully!' });
});

// مسار تسجيل الدخول
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful!', user: { username: user.username } });
});

// خدمة ملفات الموقع
app.use(express.static(path.join(__dirname, '..')));

app.listen(port, () => {
    console.log(`🚀 موقعك يعمل على: http://localhost:${port}`);
});