const handleProfileGet = (req, res, db) => {
	// req is like the url, and we are destructuring the url to get the id parameter! (indicated its a parameter with the ":")
	const { id } = req.params;
	db.select('*').from('users').where({
		id: id
	})
	.then(user => {
		if(user.length){
			res.json(user[0])
		} else {
			res.status(400).json("User not found")
		}
	})
	.catch(err => res.status(400).json("Error getting User"))
}
//with ES6 we dont need to do the semicolon then value
module.exports = {
    handleProfileGet
}
