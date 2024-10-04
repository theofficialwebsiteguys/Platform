// ./api/users/
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a user
router.post('/', async (req, res) => {
  const {name,email} = req.body

    // Validate input
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' })
  }

  try {
    const newUser = new User({name,email})
    const savedUser = newUser.save()
    res.status(201).json(savedUser)
  } catch (err) {
    res.status(400).json(err)
  }
})

// Get an existing user by ID
router.get(`/:id`, async (req, res) => {
    id = req.params.id
    try {
        const returnUser = await User.findById(id)
        res.status(200).json(returnUser)
    } catch (err) {
        res.status(400).json(err)
    }

})

module.exports = router;