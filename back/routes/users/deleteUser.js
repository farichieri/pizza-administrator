const router = require('express').Router();
const User = require('../../models/User');

router.delete('/:_id', async (req, res) => {
  const { _id } = req.params;
  try {
    await User.findByIdAndRemove(_id).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${_id}. Maybe User was not found.`,
        });
      } else {
        res.send({ message: 'User was deleted successfully.' });
      }
    });
  } catch (error) {
    res.status(505).send({
      message: 'Error deleting User with id: ' + _id,
      error: error.message,
    });
  }
});

module.exports = router;
