const handleRegister = (req, res, db, bcrypt, saltRounds) => {
	console.log("Hit register")
	const { email, password, name } = req.body; 
	if ( !email || !password || !name) {
		return res.status(400).json('incorrect form submission');
	}
	const hash = bcrypt.hashSync(password, saltRounds);
		//We do this transaction because we want to insert data into the login table and users table, and make sure they are done as one (so that if any errors happen in either, both can rollback succesfully)
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
		return trx('users')
			.returning('*')
			.insert({
				email: loginEmail[0],
				name: name,
				joined: new Date()
			})
			.then(user => {
				res.json(user[0]); 
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json("Unable to Register"))
    }
    
module.exports = {
        handleRegister: handleRegister
    };