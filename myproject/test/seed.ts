import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { AuthService } from '../src/Module/users/services/auth.service';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const dataSource = app.get(DataSource);
  const authService = app.get(AuthService);

  console.log('🌱 Démarrage du script de seed...');

  try {
    // 1. Synchronisation forcée (Supprime et recrée TOUTES les tables proprement)
    // Cela remplace les requêtes SQL brutes et garantit que la table 'user' existe.
    await dataSource.synchronize(true);
    console.log('🧹 Base de données synchronisée et réinitialisée.');

    // 2. Création des utilisateurs de test
    console.log('⏳ Création des utilisateurs en cours...');
    
    // Création d'un utilisateur Administrateur (Niveau 3)
    const admin = await authService.signUp('admin@test.com', 'admin');
    await dataSource.query(`UPDATE user SET permLvl = 3 WHERE id = ?`, [admin.id]);
    console.log('👑 Administrateur de niveau 3 créé : admin@test.com');
    
    // Création d'un utilisateur normal (Niveau 1 par défaut)
    await authService.signUp('test@test.com', 'test');
    console.log('👤 Utilisateur normal créé : test@test.com');

    console.log('✅ Base de données initialisée avec succès !');

  } catch (error) {
    console.error("❌ Erreur lors de l'exécution du seed :", error);
  } finally {
    await app.close();
  }
}

bootstrap();