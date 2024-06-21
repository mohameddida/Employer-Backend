import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validation for creating a new employee
export const validateEmployee = [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('position').not().isEmpty().withMessage('Position is required'),
    check('salary').isNumeric().withMessage('Salary must be a number'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validation for updating an existing employee
export const validateEmployeeUpdate = [
    check('name').optional().not().isEmpty().withMessage('Name is required'),
    check('email').optional().isEmail().withMessage('Valid email is required'),
    check('position').optional().not().isEmpty().withMessage('Position is required'),
    check('salary').optional().isNumeric().withMessage('Salary must be a number'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
