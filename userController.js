const UserDetails = require('../models/userDetails');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    try {
        const { username, firstName, lastName, email, password } = req.body;
        console.log('Registration attempt with email:', email); // Add this line

        // Check if user already exists
        let user = await UserDetails.findOne({ $or: [{ email }, { username }] });
        if (user) {
            console.log('User already exists'); // Add this line
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        user = new UserDetails({
            username,
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await user.save();
        console.log('User created successfully'); // Add this line
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        console.log('Login attempt with identifier:', identifier); // Add this line

        // Check if user exists by email or username
        const user = await UserDetails.findOne({ $or: [{ email: identifier }, { username: identifier }] });
        if (!user) {
            console.log('User not found'); // Add this line
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password does not match'); // Add this line
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log('Login successful for user:', user.username); // Add this line
        res.status(200).json({ token, username: user.username });
    } catch (error) {
        console.error('Login error:', error);
        res.status(400).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserDetails.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await UserDetails.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await UserDetails.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await UserDetails.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserDetails.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(400).json({ error: error.message });
    }
};