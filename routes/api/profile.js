const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const { check, validationResult } = require('express-validator');

// @route  GET api/profile/me
// @desc   Current Profile Route
// @access Private

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

// @route  POST api/profile
// @desc   Create profile
// @access Private

router.post(
  '/',
  [
    auth,
    [check('status', 'Status is required').not().isEmpty()],
    check('skills', 'Skills is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      location,
      website,
      bio,
      skills,
      status,
      github_username,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
    } = req.body;
    // Build profile object

    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (github_username) profileFields.github_username = github_username;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }
    // social object

    profileFields.social = {};
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (youtube) profileFields.social.youtube = youtube;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      //   if profile already exists then update

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        res.json(profile);
      }

      //   else create one
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error!' });
    }
  }
);

// @route  GET api/profile
// @desc   Get all profiles
// @access Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route  GET api/profile/:user_id
// @desc   Get profile by user_id
// @access Public

router.get('/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found!' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectID') {
      return res.status(400).json({ msg: 'Profile not found!' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route  DELETE api/profile/
// @desc   Delete a user or profile
// @access Public

router.delete('/', auth, async (req, res) => {
  try {
    // deleting a profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // deleting a user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
