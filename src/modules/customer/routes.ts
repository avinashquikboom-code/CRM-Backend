import { Router } from 'express';
import { CustomerController } from './controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', CustomerController.list);
router.get('/:id', CustomerController.getById);
router.post('/', authorize(['SUPER_ADMIN', 'COMPANY_ADMIN', 'MANAGER']), CustomerController.create);
router.put('/:id', authorize(['SUPER_ADMIN', 'COMPANY_ADMIN', 'MANAGER']), CustomerController.update);
router.delete('/:id', authorize(['SUPER_ADMIN', 'COMPANY_ADMIN']), CustomerController.remove);

export default router;
