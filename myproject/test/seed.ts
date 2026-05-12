import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { AuthService } from '../src/Module/users/services/auth.service';
import { DataSource } from 'typeorm';
import { PokemonService } from 'src/Module/pokemon/service/pokemon.service';
import { QuizService } from 'src/Module/quiz/quiz/quiz.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const dataSource = app.get(DataSource);
  const authService = app.get(AuthService);
  const pokemonServie = app.get(PokemonService)
  const quizService = app.get(QuizService)

  console.log('🌱 Démarrage du script de seed...');

  try {
    // Synchronisation forcée (Supprime et recrée TOUTES les tables proprement)
    await dataSource.synchronize(true);
    console.log('🧹 Base de données synchronisée et réinitialisée.');

    // Création des utilisateurs de test
    console.log('⏳ Création des utilisateurs en cours...');
    
    // Création d'un utilisateur Administrateur (Niveau 3)
    const admin = await authService.signUp('admin@test.com', 'admin');
    await dataSource.query(`UPDATE user SET permLvl = 3 WHERE id = ?`, [admin.id]);
    console.log('👑 Administrateur de niveau 3 créé : admin@test.com');
    
    // Création d'un utilisateur normal (Niveau 1 par défaut)
    await authService.signUp('test@test.com', 'test');
    console.log('👤 Utilisateur normal créé : test@test.com');

    console.log("Load des pokemon a partire de l'api")
    await pokemonServie.getAllAPIPoke(500)

    console.log('Creation de quiz')
    await quizService.createQuiz("Quiz - Pokémon-Easy", 'EASY', 10, 5)
    await quizService.createQuiz("Quiz - Pokémon-Easy", 'EASY', 10, 5)
    await quizService.createQuiz("Quiz - Pokémon-Easy", 'EASY', 10, 5)
    await quizService.createQuiz("Quiz - Pokémon-Medium", 'Medium', 25, 5)
    await quizService.createQuiz("Quiz - Pokémon-Medium", 'Medium', 25, 5)
    await quizService.createQuiz("Quiz - Pokémon-Medium", 'Medium', 25, 5)
    await quizService.createQuiz("Quiz - Pokémon-Hard", 'HARD', 50, 5)
    await quizService.createQuiz("Quiz - Pokémon-Hard", 'HARD', 50, 5)
    await quizService.createQuiz("Quiz - Pokémon-Hard", 'HARD', 50, 5)

    console.log('✅ Base de données initialisée avec succès !');

  } catch (error) {
    console.error("❌ Erreur lors de l'exécution du seed :", error);
  } finally {
    await app.close();
  }
}

bootstrap();