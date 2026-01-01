const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb+srv://bhumi021971_db_user:EB27rM7PeW4QiSHq@cluster0.6jekyel.mongodb.net/travel_booking?appName=Cluster0';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serve static files (html, css, js)

// MongoDB Connection
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Successfully connected to MongoDB at ' + MONGO_URI);
    })
    .catch((err) => {
        console.error('❌ Error connecting to MongoDB:', err);
    });

// Define a simple Schema and Model for testing (optional, but good for verification)
const bookingSchema = new mongoose.Schema({
    userId: String,
    busName: String,
    seats: [String],
    totalAmount: Number,
    date: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);

// API Routes
app.post('/api/bookings', async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).json({ message: 'Booking saved successfully', booking: newBooking });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save booking' });
    }
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is connected and running!' });
});

// Serve the main page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`🔗 Database URL: ${MONGO_URI}`);
});
