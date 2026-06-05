import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o povoamento (seed) do banco de dados com nomes oficiais...');

  // 1. Limpar dados existentes
  await prisma.performanceMetric.deleteMany({});
  await prisma.teste.deleteMany({});
  await prisma.etapa.deleteMany({});
  await prisma.peca.deleteMany({});
  await prisma.aeronave.deleteMany({});
  await prisma.funcionario.deleteMany({});

  console.log('Banco de dados limpo.');

  // 2. Criar Funcionários (Nomes Oficiais baseados no storage original)
  await prisma.funcionario.create({
    data: { id: '44', nome: 'Lewis Hamilton', usuario: 'admin', senha: 'admin123', nivelAcesso: 0 },
  });

  await prisma.funcionario.create({
    data: { id: '81', nome: 'Oscar Piastri', usuario: 'pilastrini', senha: 'WDC2026', nivelAcesso: 0 },
  });

  await prisma.funcionario.create({
    data: { id: '1', nome: 'Max Verstappen', usuario: 'Tilapia', senha: 'WDC2025', nivelAcesso: 1 },
  });

  await prisma.funcionario.create({
    data: { id: '18', nome: 'Lance Stroll', usuario: 'destroi', senha: 'dummy', nivelAcesso: 2 },
  });

  console.log('Funcionários criados.');

  // 3. Criar Aeronaves (Modelos Oficiais)
  await prisma.aeronave.create({
    data: {
      codigo: 'AN-001',
      modelo: 'Jet-Civix',
      tipo: 0, // Comercial
      alcance: 190,
      capacidade: 30,
    },
  });

  await prisma.aeronave.create({
    data: {
      codigo: 'AN-002',
      modelo: 'Storm-Higher',
      tipo: 2, // Militar
      alcance: 450,
      capacidade: 2,
    },
  });

  await prisma.aeronave.create({
    data: {
      codigo: 'AN-003',
      modelo: 'Sound-Flare',
      tipo: 2, // Militar
      alcance: 580,
      capacidade: 0,
    },
  });

  console.log('Aeronaves oficiais criadas.');
  console.log('Povoamento concluído com sucesso! 🐲✅');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
