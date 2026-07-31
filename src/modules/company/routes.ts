import { Router } from 'express';
import { CompanyController } from './controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', CompanyController.list);
router.get('/:id', CompanyController.getById);
router.post('/', authorize(['SUPER_ADMIN', 'COMPANY_ADMIN']), CompanyController.create);
router.put('/:id', authorize(['SUPER_ADMIN', 'COMPANY_ADMIN']), CompanyController.update);
router.delete('/:id', authorize(['SUPER_ADMIN']), CompanyController.remove);

export default router;
