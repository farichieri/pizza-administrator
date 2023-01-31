const router = require('express').Router();
const { allUsers } = require('../../controllers/users');

router.get('/', async (req, res) => {
  try {
    const users = await allUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
