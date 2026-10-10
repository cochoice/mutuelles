// Configuration du site CoChoice pour les mutuelles étudiantes.
export const CONFIG = {
  // Demandes de rendez-vous de la page d'accueil, envoyées vers un Google Form.
  // Tant que `action` est vide, rien n'est envoyé et la page le dit.
  //
  // Le Form doit contenir, dans cet ordre : Prénom, Nom, Fonction, Mutuelle,
  // Votre service, Email professionnel, Consentement.
  //
  // Récupérer les identifiants entry.XXXXXXX :
  //   1. Dans Google Forms, menu ⋮ > « Obtenir le lien prérempli ».
  //   2. Remplir chaque champ avec une valeur reconnaissable, puis copier le lien.
  //   3. Lire les paramètres `entry.123456789=...` dans l'URL : chaque numéro correspond à une question.
  //   4. L'URL d'envoi est celle du formulaire où `/viewform` est remplacé par `/formResponse`.
  //
  // Rappel : dans les paramètres du Form, désactiver « Exiger la connexion »
  // et la collecte d'adresses email vérifiées, sinon les réponses seront refusées.
  googleForm: {
    action: '', // à compléter : URL .../formResponse du Form « Demandes de rendez-vous CoChoice (mutuelles) »
    fields: {
      prenom: '',
      nom: '',
      fonction: '',
      organisation: '',
      service: '',
      email: '',
      consentement: '',
    }, // identifiants entry.XXXXXXX de chaque question
  },
}
