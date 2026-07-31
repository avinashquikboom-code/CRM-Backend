import { Router } from 'express';
import { VendorController } from './controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', VendorController.list);
router.get('/:id', VendorController.getById);
router.post('/', authorize(['SUPER_ADMIN', 'COMPANY_ADMIN', 'MANAGER']), VendorController.create);
router.put('/:id', authorize(['SUPER_ADMIN', 'COMPANY_ADMIN', 'MANAGER']), VendorController.update);
router.delete('/:id', authorize(['SUPER_ADMIN', 'COMPANY_ADMIN']), VendorController.remove);

export default router;
