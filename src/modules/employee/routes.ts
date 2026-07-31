import { Router } from 'express';
import { EmployeeController } from './controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', EmployeeController.list);
router.get('/:id', EmployeeController.getById);
router.post('/', authorize(['SUPER_ADMIN', 'COMPANY_ADMIN', 'MANAGER']), EmployeeController.create);
router.put('/:id', authorize(['SUPER_ADMIN', 'COMPANY_ADMIN', 'MANAGER']), EmployeeController.update);
router.delete('/:id', authorize(['SUPER_ADMIN', 'COMPANY_ADMIN']), EmployeeController.remove);

export default router;
