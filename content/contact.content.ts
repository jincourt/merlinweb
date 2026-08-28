import { t, type Dictionary } from "intlayer";

const contactContent = {
  key: "contact",
  content: {
    title: t({
      fr: "Contactez-nous",
      en: "Contact us",
      de: "Kontaktieren Sie uns",
    }),
    body: t({
      fr: "Renouveler votre site, créer votre produit digital ou un outil métier selon vos besoins, appelez ou envoyez un email pour déterminer si une collaboration fait sens.",
      en: "Renew your website, build a digital product or a business tool tailored to your needs — call or email us to see if working together makes sense.",
      de: "Erneuern Sie Ihre Website, erstellen Sie ein digitales Produkt oder ein branchenspezifisches Tool — rufen Sie uns an oder schreiben Sie uns, um zu prüfen, ob eine Zusammenarbeit passt.",
    }),
    availableSlots: t({
      fr: "Créneaux disponibles",
      en: "Available slots",
      de: "Verfügbare Termine",
    }),
    prevDateAria: t({
      fr: "Date précédente",
      en: "Previous date",
      de: "Vorheriges Datum",
    }),
    nextDateAria: t({
      fr: "Date suivante",
      en: "Next date",
      de: "Nächstes Datum",
    }),
    emailPlaceholder: t({
      fr: "Votre email",
      en: "Your email",
      de: "Ihre E-Mail",
    }),
    phonePlaceholder: t({
      fr: "Votre numéro",
      en: "Your phone number",
      de: "Ihre Telefonnummer",
    }),
    errorDateTime: t({
      fr: "Choisissez une date et une heure.",
      en: "Choose a date and time.",
      de: "Wählen Sie Datum und Uhrzeit.",
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
    errorSend: t({
      fr: "Erreur lors de l'envoi. Réessayez.",
      en: "Error sending. Please try again.",
      de: "Fehler beim Senden. Bitte erneut versuchen.",
    }),
    errorNetwork: t({
      fr: "Erreur réseau. Réessayez.",
      en: "Network error. Please try again.",
      de: "Netzwerkfehler. Bitte erneut versuchen.",
    }),
    successMessage: t({
      fr: "Demande envoyée. Nous vous recontacterons pour confirmer le rendez-vous.",
      en: "Request sent. We will contact you to confirm the appointment.",
      de: "Anfrage gesendet. Wir melden uns zur Terminbestätigung.",
    }),
    sending: t({
      fr: "Envoi…",
      en: "Sending…",
      de: "Wird gesendet…",
    }),
    confirmAppointment: t({
      fr: "Confirmer le rendez-vous",
      en: "Confirm appointment",
      de: "Termin bestätigen",
    }),
  },
} satisfies Dictionary;

export default contactContent;
