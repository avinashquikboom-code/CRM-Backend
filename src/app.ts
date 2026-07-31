import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './modules/auth/auth.routes';
import { tenantMiddleware } from './middlewares/tenant.middleware';
import { errorHandler } from './middlewares/error.middleware';
import { ResponseUtil } from './utils/response.util';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Tenant middleware
app.use(tenantMiddleware);

// Health check
app.get('/health', (req, res) => {
  return ResponseUtil.success(res, 'Logistics CRM Backend Service Active', {
    timestamp: new Date().toISOString(),
    status: 'healthy',
  });
});

import companyRoutes from './modules/company/routes';
import branchRoutes from './modules/branch/routes';
import departmentRoutes from './modules/department/routes';
import employeeRoutes from './modules/employee/routes';
import customerRoutes from './modules/customer/routes';
import vendorRoutes from './modules/vendor/routes';

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/vendors', vendorRoutes);

// 404 Handler
app.use((req, res) => {
  return ResponseUtil.notFound(res, `Route ${req.method} ${req.url} not found`);
});

// Error Handler
app.use(errorHandler);

export default app;
