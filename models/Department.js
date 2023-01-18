import mongoose from 'mongoose'

const DepartmentSchema = new mongoose.Schema(
    {
        depName: { type: String, required: true },
        depNumber: { type: Number, required: true}
    },
    { timestamps: true }
)

const Department = mongoose.model('Department', DepartmentSchema)
export default Department
