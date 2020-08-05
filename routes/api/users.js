const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const { findOne } = require('../../models/User');

// @route  Post api/users
// @desc   Register Route
// @access Public

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty,
    check('email', 'Please enter a valid email').isEmail,
    check(
      'password',
      'Your password must contain atleast 8 characters'
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ msg: 'User already registered!' }] });
      }
      res.send('User route');
    } catch (err) {
      console.error(err.message);
      res.status(400).send('server error');
    }
  }
);

module.exports = router;
