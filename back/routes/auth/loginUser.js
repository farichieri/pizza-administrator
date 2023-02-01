const router = require('express').Router();
const User = require('../../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_TOKEN = process.env.JWT_TOKEN;

router.post('/', async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) {
      return res.json({ status: 'error', error: 'Invalid login' });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          username: req.body.username,
          password: req.body.password,
        },
        JWT_TOKEN
      );
      return res.json({
        status: 'ok',
        user: token,
        isAdmin: user.isAdmin,
        password: user.password,
        username: user.username,
      });
    } else {
      return res.status(400).json({ status: 'error', user: false });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
