import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with default Admin user...');

  const companyCode = 'ACME';
  const adminEmail = 'admin@logistics.com';
  const rawPassword = 'Admin@123';

  // 1. Check or Create Default Company
  let company = await prisma.company.findUnique({
    where: { code: companyCode },
  });

  if (!company) {
    company = await prisma.company.create({
      data: {
        code: companyCode,
        name: 'Acme Global Logistics Ltd',
        registrationNumber: 'REG-ACME-2026',
        domain: 'acmelogistics.com',
        status: 'ACTIVE',
      },
    });
    console.log(`✅ Created Default Company: ${company.name} (${company.code})`);
  }

  // 2. Check or Create Admin User
  const passwordHash = await bcrypt.hash(rawPassword, 10);
  let user = await prisma.user.findFirst({
    where: { email: adminEmail },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        companyId: company.id,
        email: adminEmail,
        passwordHash,
        firstName: 'System',
        lastName: 'Admin',
        role: 'SUPER_ADMIN',
        status: 'ACTIVE',
      },
    });
    console.log(`✅ Created Default Admin User: ${user.email}`);
  } else {
    // Update password hash to match Admin@123
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        status: 'ACTIVE',
      },
    });
    console.log(`✅ Updated password for Admin User: ${user.email}`);
  }

  console.log('\n🎉 Database Seed Completed Successfully!');
  console.log('--------------------------------------------------');
  console.log(`📧 Admin Email:    ${adminEmail}`);
  console.log(`🔑 Admin Password: ${rawPassword}`);
  console.log(`🏢 Company Code:   ${companyCode}`);
  console.log('--------------------------------------------------\n');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
