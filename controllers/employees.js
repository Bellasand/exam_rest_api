import Employer from '../models/Employer.js'
import bcryptjs from 'bcryptjs'

export const getEmployees = async (req, res) => {
    try {
        const employees = await Employer.find()
        if (employees.length !==0)
            res.status(200).json(employees)
        else
            res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getEmployer = async (req, res) => {
    try {
        const { id } = req.params
        const employer = await Employer.findById(id)
        if (employer)
            res.status(200).json(employer)
        else
            res.status(404).json({ error: 'resource not found' })
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

export const deleteEmployer = async (req, res) => {
    try {
        await Employer.deleteOne({_id: req.params.id })
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}

export const updateEmployer = async (req, res) => {
    try {
        const filter = {_id: req.params.id }
        const { firstName, lastName, email, password } = req.body
        const salt = await bcryptjs.genSalt()
        const encryptedPassword = await bcryptjs.hash(password, salt)
        
        const update = {
            firstName,
            lastName,
            email,
            password: encryptedPassword
        }
      
        await Employer.findOneAndUpdate(filter. update)
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}
