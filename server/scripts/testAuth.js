const axios = require('axios');

const API_URL = 'http://localhost:5000/api/auth';

const testAuth = async () => {
  try {
    console.log('🧪 Début des tests d\'authentification...\n');

    // 1. Test de connexion
    console.log('1️⃣ Test de connexion...');
    const loginData = {
      email: 'test@example.com',
      password: 'azerty'
    };

    const loginResponse = await axios.post(`${API_URL}/login`, loginData);
    console.log('✅ Connexion réussie !');
    console.log('Token reçu:', loginResponse.data.token);
    console.log('Données utilisateur:', loginResponse.data.user);
    console.log('\n');

    // 2. Test d'accès au profil
    console.log('2️⃣ Test d\'accès au profil...');
    const token = loginResponse.data.token;
    const profileResponse = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Accès au profil réussi !');
    console.log('Données du profil:', profileResponse.data);
    console.log('\n');

    // 3. Test d'accès au profil sans token
    console.log('3️⃣ Test d\'accès au profil sans token...');
    try {
      await axios.get(`${API_URL}/me`);
    } catch (error) {
      console.log('✅ Test réussi ! Accès refusé sans token');
      console.log('Message d\'erreur:', error.response?.data?.message);
    }
    console.log('\n');

    // 4. Test d'accès au profil avec un token invalide
    console.log('4️⃣ Test d\'accès au profil avec un token invalide...');
    try {
      await axios.get(`${API_URL}/me`, {
        headers: { Authorization: 'Bearer token_invalide' }
      });
    } catch (error) {
      console.log('✅ Test réussi ! Accès refusé avec token invalide');
      console.log('Message d\'erreur:', error.response?.data?.message);
    }

    console.log('\n🎉 Tous les tests d\'authentification ont réussi !');
  } catch (error) {
    console.error('❌ Erreur lors des tests:', error.response?.data || error.message);
  }
};

testAuth(); 