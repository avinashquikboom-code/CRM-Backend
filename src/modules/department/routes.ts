import { Router } from 'express';
import { DepartmentController } from './controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', DepartmentController.list);
router.get('/:id', DepartmentController.getById);
router.post('/', authorize(['SUPER_ADMIN', 'COMPANY_ADMIN', 'MANAGER']), DepartmentController.create);
router.put('/:id', authorize(['SUPER_ADMIN', 'COMPANY_ADMIN', 'MANAGER']), DepartmentController.update);
router.delete('/:id', authorize(['SUPER_ADMIN', 'COMPANY_ADMIN']), DepartmentController.remove);

export default router;
