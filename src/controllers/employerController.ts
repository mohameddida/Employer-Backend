import { Request, Response } from 'express';
import Employee from '../models/employerModel';
import { isMongoError } from '../utils/errorUtils';
// Create a new employee
export const createEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, position, department, salary } = req.body;
        const newEmployee = new Employee({ name, email, position, department, salary });
        const employee = await newEmployee.save();
        res.status(201).json(employee);
    } catch (err) {
        if (isMongoError(err) && err.code === 11000) {
            res.status(400).json({ msg: 'Email already exists' });
        } else {
            res.status(500).send('Server Error');
        }
    }
};
// get all employers 
export const getAllEmployers = async (req: Request, res: Response): Promise<void> => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
// get one employee 
export const getEmployerByID = async (req: Request, res: Response): Promise<void> => {
    try {
        const employe = await Employee.findById(req.params.id);
        res.status(200).json(employe);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
// Update an existing employee
export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, position, department, salary } = req.body;
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            { name, email, position, department, salary },
            { new: true }
        );
        if (!employee) {
            res.status(404).json({ msg: 'Employee not found' });
        } else {
            res.json(employee);
        }
    } catch (err) {
        if (isMongoError(err) && err.code === 11000) {
            res.status(400).json({ msg: 'Email already exists' });
        } else {
            res.status(500).send('Server Error');
        }
    }
};

// Delete an employee
export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            res.status(404).json({ msg: 'Employee not found' });
        } else {
            res.json({ msg: 'Employee removed' });
        }
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
