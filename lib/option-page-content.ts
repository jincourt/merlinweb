export type OptionPageContent = {
  highlights: string[];
  example: string;
};

export const OPTION_PAGE_CONTENT: Record<string, OptionPageContent> = {
  catalogue: {
    highlights: [
      "Vitrine active : vos clients filtrent et comparent sans vous appeler.",
      "Catégories, filtres et contenus modifiables depuis un espace simple.",
    ],
    example:
      "Un menuisier présente ses gammes de cuisines avec photos et fourchettes de prix ; un coach affiche ses programmes filtrables par objectif.",
  },
  maintenance: {
    highlights: [
      "Disponibilité, sécurité et performances assurées dans la durée.",
      "Sauvegardes et support adaptés à la taille de votre site.",
    ],
    example:
      "Une PME avec espace client bénéficie de sauvegardes hebdomadaires et d'une intervention rapide en cas de problème.",
  },
  "domaine-hebergement": {
    highlights: [
      "Adresse professionnelle avec SSL pour rassurer vos visiteurs.",
      "Enregistrement, DNS et hébergement dimensionnés à votre trafic.",
    ],
    example:
      "Un avocat obtient cabinet-muller.ch avec email professionnel et site sécurisé en HTTPS.",
  },
  devis: {
    highlights: [
      "Devis automatique qui filtre les demandes sérieuses et accélère la décision.",
      "Prestations, calculs et PDF configurés aux couleurs de votre marque.",
    ],
    example:
      "Un peintre reçoit surface, finition et photos — le PDF se génère avec son logo et ses conditions.",
  },
  facturation: {
    highlights: [
      "Factures et suivi des paiements centralisés sur votre site.",
      "Numérotation, mentions légales et relances selon votre processus.",
    ],
    example:
      "Une consultante émet ses factures mensuelles avec historique par client et paiements en attente.",
  },
  contact: {
    highlights: [
      "Demandes qualifiées dès le premier contact, sans allers-retours.",
      "Champs sur mesure, pièces jointes et routage par type de demande.",
    ],
    example:
      "Un architecte reçoit budget, délai, photos du terrain et type de projet — prêt à traiter sans rappel.",
  },
  "formulaire-personnalise": {
    highlights: [
      "Parcours adapté à votre métier, pas un formulaire générique.",
      "Étapes, logique conditionnelle et intégrations selon votre flux.",
    ],
    example:
      "Un centre de formation gère inscriptions, niveau requis et justificatifs avec validation des places.",
  },
  email: {
    highlights: [
      "Canal direct avec votre audience, indépendant des réseaux sociaux.",
      "Templates, segments et inscription intégrés à votre charte.",
    ],
    example:
      "Un restaurant envoie menu et événements à 800 abonnés locaux, avec un meilleur taux d'ouverture qu'Instagram.",
  },
  rdv: {
    highlights: [
      "Agenda rempli sans échanges de mails, moins d'absences.",
      "Créneaux, durées, rappels et synchro avec votre calendrier.",
    ],
    example:
      "Un thérapeute propose des consultations en ligne ; les clients réservent selon ses disponibilités réelles.",
  },
  "espace-client": {
    highlights: [
      "Accès privé sécurisé qui renforce la confiance client.",
      "Documents, niveaux d'accès et branding à vos couleurs.",
    ],
    example:
      "Un fiduciaire partage bilans et échéances avec chaque client, accessible 24 h/24.",
  },
  multilingue: {
    highlights: [
      "Touchez FR, DE, IT et EN — un avantage clé en Suisse.",
      "Contenu adapté par langue avec bascule automatique.",
    ],
    example:
      "Un hôtel à Fribourg présente son offre en français et allemand ; les clients réservent sans barrière linguistique.",
  },
  analytics: {
    highlights: [
      "Comprenez d'où viennent vos visiteurs et ce qui convertit.",
      "Tableaux de bord clairs, sans jargon technique.",
    ],
    example:
      "Un plombier découvre que 70 % de ses contacts viennent du mobile local et adapte son numéro en évidence.",
  },
  chat: {
    highlights: [
      "Convertit les visiteurs hésitants au moment où l'intention est forte.",
      "WhatsApp ou chat intégré avec horaires et messages d'accueil.",
    ],
    example:
      "Une fleuriste reçoit des commandes de dernière minute via WhatsApp depuis le site.",
  },
  "ia-assistant": {
    highlights: [
      "Réponses 24 h/24 aux questions fréquentes, demandes qualifiées.",
      "Entraîné sur vos services et FAQ, avec escalade humaine si besoin.",
    ],
    example:
      "Un garage répond sur révisions et délais, puis propose une prise de rendez-vous en fin de conversation.",
  },
  "qr-menu": {
    highlights: [
      "Carte à jour en un clic, sans réimpression.",
      "Allergènes, photos, versions lunch/dîner et multilingue.",
    ],
    example:
      "Un bistrot genevois met à jour le plat du jour chaque matin ; les clients scannent le QR sur table.",
  },
  coaching: {
    highlights: [
      "Autonomie réelle sur votre site après la livraison.",
      "Session et documentation adaptées à vos modules actifs.",
    ],
    example:
      "Une association modifie ses actualités et envoie sa newsletter après 90 minutes de prise en main.",
  },
  personnalise: {
    highlights: [
      "Fonctionnalité sur mesure pour un besoin hors catalogue.",
      "Analyse, développement et intégration à votre site Merlin.",
    ],
    example:
      "Un vigneron obtient réservation de dégustations avec groupes et paiement en ligne.",
  },
  seo: {
    highlights: [
      "Contacts qualifiés via Google — levier rentable pour une PME suisse.",
      "Mots-clés locaux, structure technique et fiche Google Business.",
    ],
    example:
      "Un électricien à Lausanne reçoit 5 à 8 appels qualifiés par mois sur « électricien Lausanne urgence ».",
  },
  "google-ads": {
    highlights: [
      "Visibilité immédiate sur les recherches actives, budget maîtrisé.",
      "Ciblage géographique, annonces et suivi des conversions.",
    ],
    example:
      "Un déménageur trace chaque appel estival sur Genève et Lausanne pour mesurer le coût par client.",
  },
  "google-business": {
    highlights: [
      "Premier contact local : appels et itinéraires sans pub payante.",
      "Fiche complète avec photos, horaires et collecte d'avis.",
    ],
    example:
      "Un coiffeur complète sa fiche et double ses appels via le pack local « near me ».",
  },
  "strategie-digitale": {
    highlights: [
      "Efforts concentrés là où l'impact est maximal pour votre activité.",
      "Feuille de route 6–12 mois avec actions concrètes et mesurables.",
    ],
    example:
      "Un cabinet d'architecture priorise portfolio en ligne et LinkedIn plutôt que Google Ads.",
  },
  "audit-presence": {
    highlights: [
      "État des lieux avant d'investir : visibilité, cohérence, failles.",
      "Rapport clair avec plan d'action priorisé.",
    ],
    example:
      "Un physiothérapeute corrige horaires Google et annuaires obsolètes — +30 % d'appels en une semaine.",
  },
  "avis-reputation": {
    highlights: [
      "Avis réguliers qui rassurent les prospects et améliorent le classement local.",
      "Relances automatiques et mise en avant sur votre site.",
    ],
    example:
      "Un nettoyeur passe de 4 à 47 avis Google en six mois, note 4,8.",
  },
  prospection: {
    highlights: [
      "Pipeline structuré de la capture lead à la conversion.",
      "Qualification, relances et rappels adaptés à votre cycle de vente.",
    ],
    example:
      "Un consultant B2B qualifie en trois étapes et reçoit un rappel s'il n'a pas relancé sous 48 h.",
  },
  logo: {
    highlights: [
      "Identité visuelle professionnelle, mémorable dès le premier regard.",
      "Déclinaisons, favicon et fichiers sources pour tous vos supports.",
    ],
    example:
      "Une boulangerie obtient un logo chaleureux utilisé sur site, sacs et réseaux sociaux.",
  },
  "charte-graphique": {
    highlights: [
      "Communication cohérente sur web, print et réseaux sociaux.",
      "Palette, typographies, logo et templates documentés.",
    ],
    example:
      "Une fintech aligne présentations, site et cartes de visite sur une même identité.",
  },
  affiche: {
    highlights: [
      "Support percutant pour événements, promos et présence locale.",
      "Format, message et QR code vers votre site si souhaité.",
    ],
    example:
      "Un yoga studio distribue des flyers avec QR vers la page de réservation du cours découverte.",
  },
  "carte-visite": {
    highlights: [
      "Networking efficace avec un design aligné à votre marque.",
      "Recto-verso, QR code et fichiers prêts pour l'imprimeur.",
    ],
    example:
      "Un agent immobilier : QR vers ses biens disponibles, le contact scanne et voit les annonces.",
  },
};

export function getOptionPageContent(
  optionId: string,
): OptionPageContent | undefined {
  return OPTION_PAGE_CONTENT[optionId];
}
