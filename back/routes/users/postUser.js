const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

router.post('/', async (req, res) => {
  const { name, username, password, isAdmin, isSuperAdmin } = req.body;
  try {
    const cryptPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: name,
      username: username,
      password: cryptPassword,
      isAdmin: isAdmin,
      isSuperAdmin: isSuperAdmin,
    });
    res
      .status(200)
      .json({ success: `The next user was created successfully:`, newUser });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
