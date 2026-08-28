import { t, type Dictionary } from "intlayer";

const formsContent = {
  key: "forms",
  content: {
    stepContact: t({
      fr: "Contact",
      en: "Contact",
      de: "Kontakt",
    }),
    stepModules: t({
      fr: "Modules",
      en: "Modules",
      de: "Module",
    }),
    email: t({
      fr: "Email",
      en: "Email",
      de: "E-Mail",
    }),
    phone: t({
      fr: "Téléphone",
      en: "Phone",
      de: "Telefon",
    }),
    messageOptional: t({
      fr: "Message (optionnel)",
      en: "Message (optional)",
      de: "Nachricht (optional)",
    }),
    emailPlaceholder: t({
      fr: "vous@entreprise.ch",
      en: "you@company.com",
      de: "sie@unternehmen.ch",
    }),
    phonePlaceholder: t({
      fr: "078 604 15 44",
      en: "078 604 15 44",
      de: "078 604 15 44",
    }),
    messagePlaceholder: t({
      fr: "Décrivez brièvement votre projet…",
      en: "Briefly describe your project…",
      de: "Beschreiben Sie kurz Ihr Projekt…",
    }),
    optionalModules: t({
      fr: "Modules optionnels",
      en: "Optional modules",
      de: "Optionale Module",
    }),
    baseIncluded: t({
      fr: "Base incluse ·",
      en: "Base included ·",
      de: "Basis inbegriffen ·",
    }),
    closeSearch: t({
      fr: "Fermer la recherche",
      en: "Close search",
      de: "Suche schliessen",
    }),
    searchOption: t({
      fr: "Rechercher une option",
      en: "Search for an option",
      de: "Option suchen",
    }),
    searchPlaceholder: t({
      fr: "Rechercher une option…",
      en: "Search for an option…",
      de: "Option suchen…",
    }),
    searchInOptions: t({
      fr: "Rechercher dans les options",
      en: "Search in options",
      de: "In Optionen suchen",
    }),
    result: t({
      fr: "résultat",
      en: "result",
      de: "Ergebnis",
    }),
    results: t({
      fr: "résultats",
      en: "results",
      de: "Ergebnisse",
    }),
    noSearchResults: t({
      fr: "Aucune option ne correspond à votre recherche.",
      en: "No option matches your search.",
      de: "Keine Option entspricht Ihrer Suche.",
    }),
    describeNeed: t({
      fr: "Décrivez votre besoin",
      en: "Describe your need",
      de: "Beschreiben Sie Ihren Bedarf",
    }),
    customPlaceholder: t({
      fr: "Ex. intégration CRM, espace membres…",
      en: "E.g. CRM integration, member area…",
      de: "z. B. CRM-Integration, Mitgliederbereich…",
    }),
    customNeedPrefix: t({
      fr: "Besoin personnalisé :",
      en: "Custom need:",
      de: "Individueller Bedarf:",
    }),
    errorContactRequired: t({
      fr: "Indiquez un email ou un téléphone.",
      en: "Provide an email or phone number.",
      de: "Geben Sie eine E-Mail oder Telefonnummer an.",
    }),
    errorEmail: t({
      fr: "Adresse email invalide.",
      en: "Invalid email address.",
      de: "Ungültige E-Mail-Adresse.",
    }),
    errorPhone: t({
      fr: "Numéro de téléphone invalide.",
      en: "Invalid phone number.",
      de: "Ungültige Telefonnummer.",
    }),
    errorCustomNeed: t({
      fr: "Décrivez votre besoin personnalisé.",
      en: "Describe your custom need.",
      de: "Beschreiben Sie Ihren individuellen Bedarf.",
    }),
    errorSaveContact: t({
      fr: "Impossible d'enregistrer vos coordonnées.",
      en: "Unable to save your contact details.",
      de: "Ihre Kontaktdaten konnten nicht gespeichert werden.",
    }),
    errorSend: t({
      fr: "Erreur lors de l'envoi.",
      en: "Error sending.",
      de: "Fehler beim Senden.",
    }),
    errorNetwork: t({
      fr: "Erreur réseau. Réessayez.",
      en: "Network error. Please try again.",
      de: "Netzwerkfehler. Bitte erneut versuchen.",
    }),
    requestSent: t({
      fr: "Demande envoyée",
      en: "Request sent",
      de: "Anfrage gesendet",
    }),
    thankYou: t({
      fr: "Merci pour votre confiance",
      en: "Thank you for your trust",
      de: "Vielen Dank für Ihr Vertrauen",
    }),
    replyWithin24h: t({
      fr: "Nous revenons vers vous sous 24h",
      en: "We will get back to you within 24 hours",
      de: "Wir melden uns innerhalb von 24 Stunden",
    }),
    via: t({
      fr: "via",
      en: "via",
      de: "über",
    }),
    continue: t({
      fr: "Continuer",
      en: "Continue",
      de: "Weiter",
    }),
    sending: t({
      fr: "Envoi…",
      en: "Sending…",
      de: "Wird gesendet…",
    }),
    noteYourReview: t({
      fr: "Votre avis",
      en: "Your review",
      de: "Ihre Bewertung",
    }),
    noteLeaveReview: t({
      fr: "Laisser une note",
      en: "Leave a review",
      de: "Bewertung hinterlassen",
    }),
    noteExperience: t({
      fr: "Comment s'est passée votre expérience avec Merlin ?",
      en: "How was your experience with Merlin?",
      de: "Wie war Ihre Erfahrung mit Merlin?",
    }),
    noteStarsAria: t({
      fr: "Note sur 5 étoiles",
      en: "Rating out of 5 stars",
      de: "Bewertung von 5 Sternen",
    }),
    noteStar: t({
      fr: "{n} étoile",
      en: "{n} star",
      de: "{n} Stern",
    }),
    noteStars: t({
      fr: "{n} étoiles",
      en: "{n} stars",
      de: "{n} Sterne",
    }),
    noteNameLabel: t({
      fr: "Nom ou Entreprise",
      en: "Name or company",
      de: "Name oder Unternehmen",
    }),
    noteNamePlaceholder: t({
      fr: "Votre nom ou raison sociale",
      en: "Your name or company name",
      de: "Ihr Name oder Firmenname",
    }),
    noteComment: t({
      fr: "Commentaire",
      en: "Comment",
      de: "Kommentar",
    }),
    noteCommentPlaceholder: t({
      fr: "Partagez votre expérience…",
      en: "Share your experience…",
      de: "Teilen Sie Ihre Erfahrung…",
    }),
    noteErrorStars: t({
      fr: "Sélectionnez au moins une étoile.",
      en: "Select at least one star.",
      de: "Wählen Sie mindestens einen Stern.",
    }),
    noteThanks: t({
      fr: "Merci",
      en: "Thank you",
      de: "Danke",
    }),
    noteSent: t({
      fr: "Note envoyée",
      en: "Review submitted",
      de: "Bewertung gesendet",
    }),
    noteSentBody: t({
      fr: "Votre avis a bien été transmis à notre équipe.",
      en: "Your review has been sent to our team.",
      de: "Ihre Bewertung wurde an unser Team übermittelt.",
    }),
    close: t({
      fr: "Fermer",
      en: "Close",
      de: "Schliessen",
    }),
    send: t({
      fr: "Envoyer",
      en: "Send",
      de: "Senden",
    }),
    inviteTitle: t({
      fr: "Profitez de 50.- par invitation",
      en: "Earn CHF 50 per referral",
      de: "CHF 50.- pro Einladung",
    }),
    inviteBody: t({
      fr: "Partagez votre lien avec un proche. Lorsque son projet est confirmé, vous recevez 50.- CHF — sans réduction sur son devis.",
      en: "Share your link with someone you know. When their project is confirmed, you receive CHF 50 — with no discount on their quote.",
      de: "Teilen Sie Ihren Link mit jemandem. Wenn das Projekt bestätigt wird, erhalten Sie CHF 50.— ohne Abzug auf dem Angebot.",
    }),
    invitePhoneLabel: t({
      fr: "Votre numéro de téléphone",
      en: "Your phone number",
      de: "Ihre Telefonnummer",
    }),
    inviteGenerating: t({
      fr: "Génération…",
      en: "Generating…",
      de: "Wird erstellt…",
    }),
    inviteGetLink: t({
      fr: "Obtenir mon lien",
      en: "Get my link",
      de: "Link erhalten",
    }),
    inviteErrorCreate: t({
      fr: "Erreur lors de la création.",
      en: "Error creating link.",
      de: "Fehler beim Erstellen.",
    }),
    inviteShareLink: t({
      fr: "Votre lien à partager",
      en: "Your link to share",
      de: "Ihr Link zum Teilen",
    }),
    inviteLinkAria: t({
      fr: "Lien d'invitation",
      en: "Invitation link",
      de: "Einladungslink",
    }),
    copied: t({
      fr: "Copié",
      en: "Copied",
      de: "Kopiert",
    }),
    copy: t({
      fr: "Copier",
      en: "Copy",
      de: "Kopieren",
    }),
    associatedCode: t({
      fr: "Code associé :",
      en: "Associated code:",
      de: "Zugehöriger Code:",
    }),
  },
} satisfies Dictionary;

export default formsContent;
