import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { AuthService } from '../src/Module/users/services/auth.service';
import { DataSource } from 'typeorm';

async function bootstrap() {
  // Création du contexte NestJS sans lancer le serveur HTTP
  const app = await NestFactory.createApplicationContext(AppModule);
  
  // Récupération de la connexion à la base de données et du service d'authentification
  const dataSource = app.get(DataSource);
  const authService = app.get(AuthService);

  console.log('🌱 Démarrage du script de seed...');

  try {
    // 1. Vider la table user et réinitialiser les IDs de SQLite
    await dataSource.query(`DELETE FROM user`);
    await dataSource.query(`DELETE FROM sqlite_sequence WHERE name='user'`);
    console.log('🧹 Table "user" vidée et IDs réinitialisés.');

    // 2. Création des utilisateurs de test
    console.log('⏳ Création des utilisateurs en cours...');
    
    // Création d'un utilisateur Administrateur
    const admin = await authService.signUp('admin@test.com', 'admin');
    // On force le statut admin à true directement en base de données
    await dataSource.query(`UPDATE user SET admin = 1 WHERE id = ?`, [admin.id]);
    console.log('👤 Administrateur créé : admin@test.com');
    
    // Création d'utilisateurs normaux
    await authService.signUp('test@test.com', 'test');
    console.log('👤 Utilisateur créé : test@test.com');

    console.log('✅ Base de données initialisée avec succès !');

  } catch (error) {
    console.error("❌ Erreur lors de l'exécution du seed :", error);
  } finally {
    // Fermeture propre de l'application
    await app.close();
  }
}

bootstrap();