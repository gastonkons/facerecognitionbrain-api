const handleProfiles = (req, res, db) => {
  // Pärams se usa para las variables en los links
  const {
    id
  } = req.params;
  db.select('*').from('users').where({
      id: id
    })
    .then(user => {
      console.log(user)
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => {
      res.status(400).json('Error')
    })
}

module.exports = {
  handleProfiles: handleProfiles
}