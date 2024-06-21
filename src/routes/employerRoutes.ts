import { Router } from 'express';
import { createEmployee, deleteEmployee, getAllEmployers, getEmployerByID, updateEmployee } from '../controllers/employerController';
import { validateEmployee, validateEmployeeUpdate } from '../middleware/validation';

const router = Router();

router.post('/', validateEmployee, createEmployee);
router.get('/', getAllEmployers);
router.get('/:id', getEmployerByID);
router.put('/:id', validateEmployeeUpdate, updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;
