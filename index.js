const express = require("express");
const mongoose = require("mongoose");

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB Connection URI
const DB_URI = 'mongodb+srv://sukhbirmundlia:sachin123@cluster0.3b0qq.mongodb.net/testing';

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB   
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB!"))
.catch(err => console.error("❌ Error connecting to MongoDB:", err));

// Define Schema & Model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    address:String,
    phone:String,
});

const User = mongoose.model("backnew", userSchema);


app.post("/data", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        console.log(" Data saved:", req.body);
        res.json({ message: "Data saved successfully", data: req.body });
    } catch (err) {
        console.error(" Error saving data:", err);
        res.status(500).json({ message: "Error saving data" });
    }
});


app.get('/backnews', async (req, res) => {
    try {
        const backnews = await User.find(); 
        res.json(backnews); 
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Error fetching users" });
    }
});


// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
