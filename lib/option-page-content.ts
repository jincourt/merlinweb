export type OptionPageContent = {
  why: string;
  customize: string;
  example: string;
};

export const OPTION_PAGE_CONTENT: Record<string, OptionPageContent> = {
  catalogue: {
    why: "Un catalogue en ligne transforme votre site en vitrine active : vos clients comparent, filtrent et trouvent ce qu'ils cherchent sans vous appeler. Cela professionnalise votre image et réduit les questions répétitives sur vos tarifs ou disponibilités.",
    customize:
      "Nous structurons les catégories selon votre métier, ajoutons les champs utiles (dimensions, durée, niveau, etc.) et configurons les filtres pertinents. Vous gérez ensuite prix, photos et descriptions depuis un espace simple.",
    example:
      "Un menuisier présente ses gammes de cuisines et placards avec photos et fourchettes de prix. Un coach affiche ses programmes et packs d'accompagnement filtrables par objectif.",
  },
  maintenance: {
    why: "Votre site est un outil commercial : s'il tombe en panne ou se fait pirater, vous perdez des contacts et de la crédibilité. La maintenance garantit disponibilité, sécurité et performance dans la durée.",
    customize:
      "La fréquence des sauvegardes, le niveau de support et les modules surveillés s'adaptent à la taille de votre site et à votre tolérance au risque.",
    example:
      "Une PME avec espace client et formulaire de devis bénéficie de sauvegardes hebdomadaires et d'une intervention rapide en cas de problème technique.",
  },
  "domaine-hebergement": {
    why: "Votre nom de domaine, c'est votre adresse professionnelle sur internet. Un hébergement fiable avec certificat SSL rassure vos visiteurs et améliore votre référencement.",
    customize:
      "Nous gérons l'enregistrement ou le transfert de votre domaine (.ch, .com, etc.), configurons les DNS et choisissons un hébergement adapté au trafic prévu.",
    example:
      "Un avocat indépendant obtient cabinet-muller.ch avec email professionnel et site sécurisé en HTTPS, prêt à accueillir ses premiers clients.",
  },
  devis: {
    why: "Automatiser les devis vous fait gagner des heures chaque semaine et filtre les demandes sérieuses. Le client voit un prix estimatif immédiatement, ce qui accélère sa décision.",
    customize:
      "Nous modélisons vos prestations, variables de calcul (surface, durée, options) et le format du PDF livré. Les notifications partent vers la bonne personne de votre équipe.",
    example:
      "Un peintre en bâtiment reçoit des demandes avec surface, type de finition et photos. Le devis PDF se génère automatiquement avec son logo et ses conditions.",
  },
  facturation: {
    why: "Centraliser la facturation sur votre site simplifie votre administratif et accélère les encaissements. Vous gardez une trace claire de chaque transaction.",
    customize:
      "Numérotation, mentions légales suisses, modèles de facture, relances et export comptable sont configurés selon votre processus interne.",
    example:
      "Une consultante en RH émet ses factures mensuelles depuis son espace, avec suivi des paiements en attente et historique par client.",
  },
  contact: {
    why: "Un formulaire basique laisse passer des informations incomplètes. Un formulaire avancé qualifie la demande dès le premier contact et vous évite des allers-retours inutiles.",
    customize:
      "Champs sur mesure, pièces jointes, cases à cocher, routage par type de demande et messages de confirmation personnalisés.",
    example:
      "Un architecte reçoit des briefs structurés avec budget, délai, photos du terrain et type de projet — prêts à être traités sans rappel téléphonique.",
  },
  "formulaire-personnalise": {
    why: "Chaque métier a son propre parcours client. Un formulaire générique ne capture pas les informations dont vous avez vraiment besoin pour qualifier une opportunité.",
    customize:
      "Logique conditionnelle, étapes multiples, calculs internes et intégrations (email, CRM, notifications) selon votre flux de travail.",
    example:
      "Un centre de formation utilise un formulaire d'inscription avec choix de session, niveau requis et upload de justificatif — avec validation automatique des places disponibles.",
  },
  email: {
    why: "Votre liste email est un actif : elle vous permet de rester présent auprès de clients et prospects sans dépendre des réseaux sociaux. Une newsletter régulière génère des retours et des recommandations.",
    customize:
      "Design des templates, fréquence suggérée, segments d'audience et formulaire d'inscription intégré à votre charte graphique.",
    example:
      "Un restaurant envoie chaque mois son menu du moment et ses événements à 800 abonnés locaux, avec un taux d'ouverture bien supérieur aux posts Instagram.",
  },
  rdv: {
    why: "Les échanges de mails pour trouver un créneau coûtent du temps des deux côtés. La prise de rendez-vous en ligne remplit votre agenda sans friction et réduit les no-shows.",
    customize:
      "Créneaux disponibles, durée par type de rendez-vous, buffer entre sessions, rappels SMS ou email et synchronisation avec votre calendrier existant.",
    example:
      "Un thérapeute propose des consultations de 50 minutes en ligne. Les clients réservent selon ses disponibilités réelles, avec rappel 24 h avant.",
  },
  "espace-client": {
    why: "Offrir un espace privé renforce la confiance et la relation client. Vos clients accèdent à leurs documents et suivent l'avancement sans vous solliciter par email.",
    customize:
      "Niveaux d'accès, types de documents, notifications de mise à jour et branding aux couleurs de votre entreprise.",
    example:
      "Un fiduciaire partage bilans, documents fiscaux et échéances avec chaque client dans un espace sécurisé, accessible 24 h/24.",
  },
  multilingue: {
    why: "En Suisse, parler la langue de votre client est un avantage compétitif. Un site multilingue élargit votre marché sans multiplier vos efforts commerciaux.",
    customize:
      "Langues activées (FR, DE, IT, EN), contenu traduit ou adapté par région, et bascule automatique selon la préférence du visiteur.",
    example:
      "Un hôtel à Fribourg présente son offre en français et en allemand. Les clients alémaniques réservent directement sans barrière linguistique.",
  },
  analytics: {
    why: "Sans données, vous naviguez à l'aveugle. Comprendre d'où viennent vos visiteurs et ce qu'ils font sur votre site vous permet d'investir là où ça compte.",
    customize:
      "Indicateurs prioritaires selon votre objectif (contacts, devis, rendez-vous), tableaux de bord simplifiés et rapports périodiques si souhaité.",
    example:
      "Un plombier découvre que 70 % de ses contacts viennent de recherches locales sur mobile. Il adapte ses horaires d'affichage et son numéro en évidence.",
  },
  chat: {
    why: "Quand un prospect hésite, la moindre friction le fait partir. Un canal de contact instantané (chat ou WhatsApp) convertit des visiteurs qui n'auraient pas rempli un formulaire.",
    customize:
      "Horaires de disponibilité, message d'accueil, routage vers WhatsApp Business ou chat intégré, et réponses automatiques hors ligne.",
    example:
      "Une boutique de fleurs reçoit des commandes de dernière minute via WhatsApp directement depuis le site, avec un lien pré-rempli du message.",
  },
  "ia-assistant": {
    why: "Vos clients posent souvent les mêmes questions (horaires, tarifs, délais). Un assistant IA répond 24 h/24, qualifie les demandes et vous libère du temps pour l'essentiel.",
    customize:
      "Entraînement sur vos services, FAQ, documents et ton de communication. Escalade vers un humain pour les demandes complexes.",
    example:
      "Un garage répond automatiquement aux questions sur les types de révision, les délais et les marques prises en charge — et propose une prise de rendez-vous en fin de conversation.",
  },
  "qr-menu": {
    why: "Imprimer un menu à chaque changement de carte coûte cher et pollue. Un menu digital via QR code se met à jour en quelques clics et améliore l'expérience client.",
    customize:
      "Catégories, allergènes, prix, photos des plats, versions lunch/dîner et affichage multilingue pour clientèle touristique.",
    example:
      "Un bistrot genevois met à jour son plat du jour chaque matin. Les clients scannent le QR sur table et voient la carte à jour, en français et en anglais.",
  },
  coaching: {
    why: "Un site livré sans formation reste sous-utilisé. Le coaching garantit que vous et votre équipe êtes autonomes pour modifier contenus et exploiter vos modules.",
    customize:
      "Session en visio ou sur place, durée adaptée à vos modules actifs, documentation personnalisée et support post-formation.",
    example:
      "Une association modifie elle-même ses actualités et envoie sa newsletter après une session de prise en main de 90 minutes avec notre équipe.",
  },
  personnalise: {
    why: "Certaines activités ont des besoins uniques qui ne rentrent pas dans un module standard. Cette option ouvre la porte à une solution conçue autour de votre métier.",
    customize:
      "Nous analysons votre besoin, proposons une approche technique et livrons une fonctionnalité intégrée à votre site existant.",
    example:
      "Un vigneron souhaite un système de réservation de dégustations avec gestion des groupes et paiement en ligne — développé sur mesure et intégré à son site Merlin.",
  },
  seo: {
    why: "Être visible sur Google quand un client cherche votre service local, c'est recevoir des contacts gratuits et qualifiés. Le SEO local est souvent le levier le plus rentable pour une PME suisse.",
    customize:
      "Mots-clés ciblés sur votre zone, optimisation des pages, structure technique, contenu local et liaison avec votre fiche Google Business.",
    example:
      "Un électricien à Lausanne apparaît en 3e position sur « électricien Lausanne urgence » et reçoit 5 à 8 appels qualifiés par mois via son site.",
  },
  "google-ads": {
    why: "Le SEO prend du temps. Google Ads vous place immédiatement devant les clients qui cherchent activement votre service, avec un budget maîtrisé.",
    customize:
      "Ciblage géographique (commune, canton, Suisse), mots-clés, annonces rédigées dans votre ton, suivi des conversions et ajustements mensuels.",
    example:
      "Un déménageur lance une campagne sur Genève et Lausanne en période estivale. Chaque appel est tracé pour mesurer le coût réel par client acquis.",
  },
  "google-business": {
    why: "Votre fiche Google est souvent le premier contact avec votre entreprise. Une fiche complète et optimisée génère appels, itinéraires et visites sans effort publicitaire.",
    customize:
      "Catégories, description, photos professionnelles, horaires, services, posts réguliers et stratégie de collecte d'avis.",
    example:
      "Un salon de coiffure complète sa fiche avec photos avant/après et horaires à jour. Il apparaît dans le pack local pour « coiffeur near me » et double ses appels.",
  },
  "strategie-digitale": {
    why: "Sans plan, vous disperser vos efforts sur des actions isolées. Une stratégie digitale priorise ce qui aura le plus d'impact pour votre activité et votre budget.",
    customize:
      "Analyse de votre marché, concurrence locale, canaux pertinents et feuille de route sur 6 à 12 mois avec actions concrètes et mesurables.",
    example:
      "Un cabinet d'architecture identifie que ses clients viennent surtout de recommandations et LinkedIn. Le plan priorise un portfolio en ligne et une présence ciblée plutôt que Google Ads.",
  },
  "audit-presence": {
    why: "Avant d'investir, il faut savoir où vous en êtes. Un audit révèle les failles de visibilité, les incohérences de marque et les opportunités rapides à saisir.",
    customize:
      "Périmètre ajusté (site, Google, réseaux sociaux, annuaires, avis) avec rapport clair, scoring et plan d'action priorisé.",
    example:
      "Un physiothérapeute découvre via l'audit que ses horaires Google sont incorrects et que trois annuaires affichent une ancienne adresse — corrigé en une semaine, +30 % d'appels.",
  },
  "avis-reputation": {
    why: "Les avis en ligne influencent directement la décision d'achat. Un flux régulier d'avis positifs rassure les prospects et améliore votre classement local.",
    customize:
      "Moment d'envoi de la demande d'avis, message personnalisé, affichage des meilleurs témoignages sur le site et gestion des avis négatifs.",
    example:
      "Un nettoyeur professionnel envoie automatiquement un lien d'avis Google après chaque prestation. En six mois, il passe de 4 à 47 avis avec une note de 4,8.",
  },
  prospection: {
    why: "Attendre que les clients viennent limite votre croissance. Un système de prospection structure votre pipeline et vous aide à convertir plus de leads en clients.",
    customize:
      "Sources de leads, étapes de qualification, relances automatiques, rappels et tableaux de suivi adaptés à votre cycle de vente.",
    example:
      "Un consultant B2B capture les contacts via son site, les qualifie en trois étapes et reçoit un rappel automatique s'il n'a pas relancé sous 48 h.",
  },
  logo: {
    why: "Votre logo est le premier repère visuel de votre marque. Un logo professionnel inspire confiance dès le premier regard et vous distingue de la concurrence.",
    customize:
      "Style adapté à votre secteur (sobre, dynamique, artisanal…), déclinaisons couleur et monochrome, favicon et fichiers sources pour tous vos supports.",
    example:
      "Une nouvelle boulangerie artisanale obtient un logo chaleureux avec typographie manuscrite, utilisé sur le site, les sacs et les réseaux sociaux.",
  },
  "charte-graphique": {
    why: "Sans règles visuelles, chaque communication a un style différent et affaiblit votre image. Une charte garantit une identité reconnaissable et professionnelle.",
    customize:
      "Palette, typographies, usages du logo, iconographie, templates réseaux sociaux et règles d'application pour web et print.",
    example:
      "Une startup fintech reçoit une charte complète : ses présentations, site et cartes de visite partagent la même identité visuelle cohérente.",
  },
  affiche: {
    why: "Une affiche ou un flyer bien conçu capte l'attention en quelques secondes. C'est un support efficace pour événements, promotions ou présence locale.",
    customize:
      "Format (A4, A3, A5), orientation, message clé, visuels et QR code vers votre site ou formulaire de contact si souhaité.",
    example:
      "Un yoga studio imprime des flyers pour un cours découverte gratuite, avec QR code menant directement à la page de réservation en ligne.",
  },
  "carte-visite": {
    why: "La carte de visite reste un outil de networking indispensable en Suisse. Un design soigné prolonge la première impression et renvoie vers votre site.",
    customize:
      "Recto-verso, finitions, informations affichées, QR code vers votre site ou profil LinkedIn, fichiers prêts pour l'imprimeur.",
    example:
      "Un agent immobilier reçoit des cartes élégantes avec QR code vers sa page de biens disponibles — le contact scanne et voit les annonces en direct.",
  },
};

export function getOptionPageContent(optionId: string): OptionPageContent | undefined {
  return OPTION_PAGE_CONTENT[optionId];
}
