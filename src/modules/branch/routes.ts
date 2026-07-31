import { Router } from 'express';
import { BranchController } from './controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', BranchController.list);
router.get('/:id', BranchController.getById);
router.post('/', authorize(['SUPER_ADMIN', 'COMPANY_ADMIN', 'MANAGER']), BranchController.create);
router.put('/:id', authorize(['SUPER_ADMIN', 'COMPANY_ADMIN', 'MANAGER']), BranchController.update);
router.delete('/:id', authorize(['SUPER_ADMIN', 'COMPANY_ADMIN']), BranchController.remove);

export default router;
