module.exports = (error, req, res, ext) => {
  console.log(error);

  if (error.name === 'CastError') {
    res.status(404).send({ error: 'id used is malformed' });
  } else {
    res.status(500).end();
  }
};
