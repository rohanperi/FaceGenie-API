const handleSignIn = (db, bcrypt) => (req,res) => {
const { email, password } = req.body;
if ( !email || !password) {
		return res.status(400).json('incorrect form submission');
	}
	console.log("Hit Sign-In ")
	db.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash); // true
			if(isValid) {
				db.select('*').from('users')
					.where('email', '=', email)
					.then(user => {
						res.json(user[0]);
					})
					.catch(err => res.status(400).json('Unable to get user'))
			} else {
				res.status(400).json('wrong credentials')
			}
		})
		.catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
    handleSignIn: handleSignIn
}