const User = require('../../models').User
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const BCRYPT_SALT_ROUNDS = 12;

module.exports = {
    createUser: async (params) => {
        const { firstName, lastName, email, password } = params.registerInput
        let hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
        try {
            const existingUser = await User.findOne({
                where: {
                    email: email
                }
            })
            if (existingUser) {
                throw new Error("User already exists")
            }
            const user = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword
            })
            const result = await user.save()
            return 'user created successfully'
        }
        catch (e) {
            console.log(e)
        }
    },

    login: async (params, req) => {
        const { email, password } = params.loginInput
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            throw new Error("User does not exist")
        }
        const isEqual = bcrypt.compare(password, user.password)
        if (!isEqual) {
            throw new Error("Password is incorrect")
        }
        const token = jwt.sign({ userId: user.id, email: user.email }, 'secret_key',
        {expiresIn:'1h'});


        return {userId:user.id, token:token, tokenExpiration: 1}

    }
}