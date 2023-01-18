import Department from '../models/Department.js'

export const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find()
        if (departments.length !==0)
            res.status(200).json(departments)
        else
            res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getDepartment = async (req, res) => {
    try {
        const { id } = req.params
        const department = await Department.findById(id)
        if (department)
            res.status(200).json(department)
        else
            res.status(404).json({ error: 'resource not found' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const addDepartment = async (req, res) => {
    try {
        const { depName, depNumber } = req.body
        const newDepartment = await Department.create({
          depName,
          depNumber
        })
        const savedDepartment = await newDepartment.save()
        res.status(201).json({ id: savedDepartment._id})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteDepartment = async (req, res) => {
    try {
        await Department.deleteOne({_id: req.params.id })
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}

export const updateDepartment = async (req, res) => {
    try {
        const filter = { _id: req.params.id }
        const { depName, depNumber } = req.body
        const update = {
            depName: depName,
            depNumber: depNumber
        }
      
        await Department.findOneAndUpdate(filter, update)
        res.status(204).send()
    } catch (err) {
      console.log(err)
      res.status(404).json({ error: err.message })
    }
}
