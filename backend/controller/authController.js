const userModel = require('../models/userModel');
const response = require('../response');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
    const { username, password, role } = req.body;

    // Check if the user already exists
    userModel.getUserByUsername(username, (error, result) => {
        if (error) return response(500, null, 'Technical problem', res);

        if (result.length > 0) {
            return response(409, null, 'Username already exists', res);
        }

        // Hash the password
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return response(500, null, 'Technical problem', res);

            // Create the new user
            userModel.createUser(username, hash, role, (error, result) => {
                if (error) return response(500, null, 'Technical problem', res);

                if (result.affectedRows > 0) {
                    return response(201, { id: result.insertId }, 'User registered successfully', res);
                }
            });
        });
    });
};

const login = (req, res) => {
    const { username, password } = req.body;

    userModel.getUserByUsername(username, (error, result) => {
        if (error) return response(500, null, 'Technical problem', res);

        if (result.length === 0) {
            return response(404, null, 'User not found', res);
        }

        const user = result[0];

        // Compare the password with the hash
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return response(500, null, 'Technical problem', res);

            if (!isMatch) {
                return response(401, null, 'Invalid password', res);
            }

            // Generate JWT token
            const token = jwt.sign(
                { id: user.id, role: user.role },
                'your_jwt_secret', // Secret key
                { expiresIn: '1h' } // Token expiration time
            );

            return response(200, { token }, 'Login successful', res);
        });
    });
};

const getUser = (req, res) => {
    userModel.getDataUser((error, result) => {
        if(error) response(500, null ,'sorry tecnical problem shooting', res)
        response(200, result, 'Success get all data from rest', res)
    })
}

module.exports = { login, register,getUser };
