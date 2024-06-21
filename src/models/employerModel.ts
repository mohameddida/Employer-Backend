import mongoose, { Document, Schema } from 'mongoose';

interface IEmployer extends Document {
    name: string;
    email: string;
    position: string;
    department?: string;
    salary: number;
}

const EmployerSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    position: { type: String, required: true },
    department: { type: String },
    salary: { type: Number, required: true }
});

export default mongoose.model<IEmployer>('Employer', EmployerSchema);
