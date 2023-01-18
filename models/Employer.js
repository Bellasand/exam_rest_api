import mongoose from 'mongoose'

const EmployerSchema = new mongoose.Schema(
    {
         firstName: { type: String, required: true },
         lastName: { type: String, required: true},
         email: { type: String, required: true, unique: true},
         password: { type: String, required: true}
    },
    { timestamps: true }
)

const Employer = mongoose.model('Employer', EmployerSchema)
export default Employer
