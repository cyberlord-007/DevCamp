const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('User route');
  }
);

module.exports = router;
