import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Employer from '../models/Employer.js'

export const register = async (req, res) => {
    try { 
        const { firstName, lastName, email, password } = req.body
        const salt = await bcryptjs.genSalt()
        const encryptedPassword = await bcryptjs.hash(password, salt)
        const newEmployer = await Employer.create({
            firstName,
            lastName,
            email,
            password: encryptedPassword
        })
        const savedEmployer = await newEmployer.save()
        res.status(201).json(savedEmployer)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        
        const employer = await Employer.findOne({
          email: email
        })
        
        if (!employer) return res.status(400).json({msg: 'invalid email/password'})
        
        const isPasswordValid = await bcryptjs.compare(password, employer.password)
        
        if (isPasswordValid) {
            const token = jwt.sign({ id: employer._id }, process.env.JWT_SECRET)
            employer.password = '***'
            res.status(200).json({token, employer})
        } else {
            res.status(400).json({msg: 'invalid credentials'})
        }
    } catch (error) {
        res.status(500).json({ error: err.message })
    }
}
