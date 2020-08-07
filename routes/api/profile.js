const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
// @route  GET api/profile/me
// @desc   Current Profile Route
// @access Public

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'User does not exists' });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error!!' });
  }
});

module.exports = router;
