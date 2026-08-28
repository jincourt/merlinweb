import { t, type Dictionary } from "intlayer";

const optionsContent = {
  key: "options",
  content: {
    filters: {
      all: t({
        fr: "Tout",
        en: "All",
        de: "Alle",
      }),
      site: t({
        fr: "Site web",
        en: "Website",
        de: "Website",
      }),
      marketing: t({
        fr: "Marketing",
        en: "Marketing",
        de: "Marketing",
      }),
      identite: t({
        fr: "Identité",
        en: "Branding",
        de: "Identität",
      }),
    },
    baseOffer: {
      label: t({
        fr: "Site one-page sur mesure",
        en: "Custom one-page website",
        de: "Massgeschneiderte One-Page-Website",
      }),
      description: t({
        fr: "Design, développement et livraison sous 7 jours.",
        en: "Design, development and delivery within 7 days.",
        de: "Design, Entwicklung und Lieferung innerhalb von 7 Tagen.",
      }),
    },
    categories: {
      site: {
        label: t({
          fr: "Site web",
          en: "Website",
          de: "Website",
        }),
        intro: t({
          fr: "Modules pour enrichir votre site one-page : fonctionnalités métier, outils de contact, espaces clients et automatisations adaptées à votre activité.",
          en: "Modules to enhance your one-page site: business features, contact tools, client areas and automations tailored to your business.",
          de: "Module zur Erweiterung Ihrer One-Page-Website: Geschäftsfunktionen, Kontakttools, Kundenbereiche und Automatisierungen, abgestimmt auf Ihre Tätigkeit.",
        }),
        summary: t({
          fr: "Catalogue, maintenance, domaine, devis automatisé, facturation, formulaires, newsletter, rendez-vous, espace client, multilingue, analytics, chat, assistant IA et plus.",
          en: "Catalogue, maintenance, domain, automated quotes, invoicing, forms, newsletter, appointments, client area, multilingual, analytics, chat, AI assistant and more.",
          de: "Katalog, Wartung, Domain, automatisierte Offerten, Rechnungsstellung, Formulare, Newsletter, Termine, Kundenbereich, Mehrsprachigkeit, Analytics, Chat, KI-Assistent und mehr.",
        }),
      },
      marketing: {
        label: t({
          fr: "Marketing",
          en: "Marketing",
          de: "Marketing",
        }),
        intro: t({
          fr: "Accélérez votre visibilité en ligne avec des modules pensés pour attirer, convertir et fidéliser vos clients sur le marché suisse.",
          en: "Boost your online visibility with modules designed to attract, convert and retain customers in the Swiss market.",
          de: "Steigern Sie Ihre Online-Sichtbarkeit mit Modulen, die darauf ausgelegt sind, Kunden auf dem Schweizer Markt anzuziehen, zu konvertieren und zu binden.",
        }),
        summary: t({
          fr: "SEO local, Google Ads, fiche Google Business, stratégie digitale, audit de présence, avis clients et prospection.",
          en: "Local SEO, Google Ads, Google Business Profile, digital strategy, presence audit, customer reviews and prospecting.",
          de: "Lokales SEO, Google Ads, Google Business Profil, Digitalstrategie, Präsenz-Audit, Kundenbewertungen und Akquise.",
        }),
      },
      identite: {
        label: t({
          fr: "Identité",
          en: "Branding",
          de: "Identität",
        }),
        intro: t({
          fr: "Donnez une image cohérente et professionnelle à votre marque, du logo aux supports imprimés.",
          en: "Give your brand a consistent, professional image — from logo to print materials.",
          de: "Verleihen Sie Ihrer Marke ein stimmiges, professionelles Erscheinungsbild — vom Logo bis zu Printmedien.",
        }),
        summary: t({
          fr: "Création de logo, charte graphique, affiches & flyers et cartes de visite.",
          en: "Logo design, brand guidelines, posters & flyers and business cards.",
          de: "Logo-Erstellung, Styleguide, Plakate & Flyer und Visitenkarten.",
        }),
      },
    },
    perYear: t({
      fr: "/ an",
      en: "/ year",
      de: "/ Jahr",
    }),
    includedByDefault: t({
      fr: "Inclus par défaut",
      en: "Included by default",
      de: "Standardmässig inbegriffen",
    }),
    priceFromSingle: t({
      fr: "dès {min}",
      en: "from {min}",
      de: "ab {min}",
    }),
    priceFromRange: t({
      fr: "dès {min} · jusqu'à {max}",
      en: "from {min} · up to {max}",
      de: "ab {min} · bis {max}",
    }),
    chfZero: t({
      fr: "0.- CHF",
      en: "0.- CHF",
      de: "0.- CHF",
    }),
    items: {
      catalogue: {
        label: t({
          fr: "Catalogue produits & services",
          en: "Product & service catalogue",
          de: "Produkt- & Dienstleistungskatalog",
        }),
        description: t({
          fr: "Présentation structurée de votre offre avec filtres, CMS modifiable.",
          en: "Structured presentation of your offering with filters and editable CMS.",
          de: "Strukturierte Präsentation Ihres Angebots mit Filtern und bearbeitbarem CMS.",
        }),
        detail: t({
          fr: "Mettez en valeur votre catalogue avec catégories, filtres et fiches détaillées. Vous modifiez prix, descriptions et visuels depuis un espace simple, sans toucher au code.",
          en: "Showcase your catalogue with categories, filters and detailed listings. Edit prices, descriptions and visuals from a simple interface — no code required.",
          de: "Präsentieren Sie Ihren Katalog mit Kategorien, Filtern und Detailseiten. Preise, Beschreibungen und Bilder bearbeiten Sie in einem einfachen Bereich — ohne Code.",
        }),
      },
      maintenance: {
        label: t({
          fr: "Maintenance",
          en: "Maintenance",
          de: "Wartung",
        }),
        description: t({
          fr: "Sauvegardes, mises à jour et support technique continu.",
          en: "Backups, updates and ongoing technical support.",
          de: "Backups, Updates und fortlaufender technischer Support.",
        }),
        detail: t({
          fr: "Nous assurons les sauvegardes régulières, les mises à jour de sécurité et un support réactif pour que votre site reste fiable et performant dans le temps.",
          en: "We handle regular backups, security updates and responsive support so your site stays reliable and performant over time.",
          de: "Wir übernehmen regelmässige Backups, Sicherheitsupdates und reaktiven Support, damit Ihre Website dauerhaft zuverlässig und leistungsfähig bleibt.",
        }),
      },
      "domaine-hebergement": {
        label: t({
          fr: "Nom de domaine et hébergement",
          en: "Domain name and hosting",
          de: "Domainname und Hosting",
        }),
        description: t({
          fr: "Adresse web et hébergement sécurisé pour votre site.",
          en: "Web address and secure hosting for your site.",
          de: "Webadresse und sicheres Hosting für Ihre Website.",
        }),
        detail: t({
          fr: "Enregistrement ou transfert de domaine, hébergement sécurisé avec certificat SSL et configuration DNS. Votre site est accessible en HTTPS dès la mise en ligne.",
          en: "Domain registration or transfer, secure hosting with SSL certificate and DNS configuration. Your site is accessible via HTTPS from day one.",
          de: "Domain-Registrierung oder -Transfer, sicheres Hosting mit SSL-Zertifikat und DNS-Konfiguration. Ihre Website ist ab dem Go-live über HTTPS erreichbar.",
        }),
        footnote: t({
          fr: "Inclus par défaut",
          en: "Included by default",
          de: "Standardmässig inbegriffen",
        }),
      },
      rdv: {
        label: t({
          fr: "Prise de rendez-vous",
          en: "Online booking",
          de: "Terminbuchung",
        }),
        description: t({
          fr: "Agenda en ligne synchronisé avec votre planning.",
          en: "Online calendar synced with your schedule.",
          de: "Online-Kalender synchronisiert mit Ihrer Planung.",
        }),
        detail: t({
          fr: "Vos clients réservent un créneau en ligne selon vos disponibilités. Confirmations automatiques et rappels pour limiter les absences.",
          en: "Your clients book a slot online based on your availability. Automatic confirmations and reminders to reduce no-shows.",
          de: "Ihre Kunden buchen online einen Termin nach Ihrer Verfügbarkeit. Automatische Bestätigungen und Erinnerungen reduzieren Ausfälle.",
        }),
      },
      devis: {
        label: t({
          fr: "Devis automatisé",
          en: "Automated quotes",
          de: "Automatisierte Offerten",
        }),
        description: t({
          fr: "Formulaire intelligent avec calcul et envoi PDF.",
          en: "Smart form with calculation and PDF delivery.",
          de: "Intelligentes Formular mit Berechnung und PDF-Versand.",
        }),
        detail: t({
          fr: "Vos visiteurs configurent une demande, le total se calcule automatiquement et un PDF récapitulatif est généré. Idéal pour les artisans, consultants et prestataires de services.",
          en: "Visitors configure a request, the total is calculated automatically and a summary PDF is generated. Ideal for tradespeople, consultants and service providers.",
          de: "Besucher konfigurieren eine Anfrage, der Gesamtbetrag wird automatisch berechnet und ein PDF-Zusammenfassung erstellt. Ideal für Handwerker, Berater und Dienstleister.",
        }),
      },
      personnalise: {
        label: t({
          fr: "Personnalisé",
          en: "Custom",
          de: "Individuell",
        }),
        description: t({
          fr: "Design et contenu adaptés à votre activité.",
          en: "Design and content tailored to your business.",
          de: "Design und Inhalte abgestimmt auf Ihre Tätigkeit.",
        }),
        detail: t({
          fr: "Un besoin spécifique qui ne figure pas dans notre catalogue ? Décrivez-le dans votre devis et nous construisons une solution sur mesure.",
          en: "A specific need not in our catalogue? Describe it in your quote request and we'll build a custom solution.",
          de: "Ein spezifischer Bedarf, der nicht in unserem Katalog steht? Beschreiben Sie ihn in Ihrer Offerte — wir entwickeln eine massgeschneiderte Lösung.",
        }),
      },
      facturation: {
        label: t({
          fr: "Facturation en ligne",
          en: "Online invoicing",
          de: "Online-Rechnungsstellung",
        }),
        description: t({
          fr: "Émission et suivi de factures depuis votre site.",
          en: "Issue and track invoices from your site.",
          de: "Rechnungen erstellen und verfolgen — direkt über Ihre Website.",
        }),
        detail: t({
          fr: "Créez et envoyez des factures directement depuis votre espace. Suivez les paiements en attente et gardez une trace claire de votre activité commerciale.",
          en: "Create and send invoices directly from your dashboard. Track pending payments and keep a clear record of your business activity.",
          de: "Erstellen und versenden Sie Rechnungen direkt aus Ihrem Bereich. Verfolgen Sie offene Zahlungen und behalten Sie Ihre Geschäftstätigkeit im Blick.",
        }),
      },
      contact: {
        label: t({
          fr: "Formulaire de contact avancé",
          en: "Advanced contact form",
          de: "Erweitertes Kontaktformular",
        }),
        description: t({
          fr: "Champs personnalisés, pièces jointes et notifications.",
          en: "Custom fields, file attachments and notifications.",
          de: "Individuelle Felder, Dateianhänge und Benachrichtigungen.",
        }),
        detail: t({
          fr: "Au-delà d'un simple formulaire : champs sur mesure, upload de fichiers, notifications instantanées et routage vers la bonne personne de votre équipe.",
          en: "Beyond a simple form: custom fields, file uploads, instant notifications and routing to the right team member.",
          de: "Mehr als ein einfaches Formular: massgeschneiderte Felder, Datei-Uploads, sofortige Benachrichtigungen und Weiterleitung an die richtige Person im Team.",
        }),
      },
      "formulaire-personnalise": {
        label: t({
          fr: "Formulaire personnalisé",
          en: "Custom form",
          de: "Individuelles Formular",
        }),
        description: t({
          fr: "Formulaire sur mesure adapté à votre activité et vos processus.",
          en: "Tailor-made form adapted to your business and processes.",
          de: "Massgeschneidertes Formular, abgestimmt auf Ihre Tätigkeit und Abläufe.",
        }),
        detail: t({
          fr: "Un formulaire conçu autour de votre métier — demandes de rendez-vous, briefs clients, inscriptions ou questionnaires. Logique conditionnelle incluse si nécessaire.",
          en: "A form built around your trade — appointment requests, client briefs, registrations or surveys. Conditional logic included when needed.",
          de: "Ein Formular rund um Ihr Gewerbe — Terminanfragen, Kundenbriefings, Anmeldungen oder Fragebögen. Bedingte Logik bei Bedarf inbegriffen.",
        }),
      },
      email: {
        label: t({
          fr: "Newsletter & email",
          en: "Newsletter & email",
          de: "Newsletter & E-Mail",
        }),
        description: t({
          fr: "Inscription, campagnes et templates professionnels.",
          en: "Sign-up, campaigns and professional templates.",
          de: "Anmeldung, Kampagnen und professionelle Vorlagen.",
        }),
        detail: t({
          fr: "Collectez des abonnés, envoyez des newsletters soignées et gardez le contact avec votre audience grâce à des templates alignés avec votre identité visuelle.",
          en: "Collect subscribers, send polished newsletters and stay in touch with your audience using templates aligned with your visual identity.",
          de: "Sammeln Sie Abonnenten, versenden Sie ansprechende Newsletter und bleiben Sie mit Ihrer Zielgruppe in Kontakt — mit Vorlagen passend zu Ihrer visuellen Identität.",
        }),
      },
      "espace-client": {
        label: t({
          fr: "Espace client sécurisé",
          en: "Secure client area",
          de: "Sicherer Kundenbereich",
        }),
        description: t({
          fr: "Connexion, documents et suivi de projets.",
          en: "Login, documents and project tracking.",
          de: "Login, Dokumente und Projektverfolgung.",
        }),
        detail: t({
          fr: "Offrez à vos clients un accès privé pour consulter documents, suivre l'avancement d'un projet ou échanger des fichiers en toute sécurité.",
          en: "Give your clients private access to view documents, track project progress or exchange files securely.",
          de: "Bieten Sie Ihren Kunden privaten Zugang zum Einsehen von Dokumenten, Verfolgen des Projektfortschritts oder sicheren Austausch von Dateien.",
        }),
      },
      multilingue: {
        label: t({
          fr: "Multilingue FR / DE / IT",
          en: "Multilingual FR / DE / IT",
          de: "Mehrsprachig FR / DE / IT",
        }),
        description: t({
          fr: "Site accessible aux marchés suisses et frontaliers.",
          en: "Site accessible to Swiss and cross-border markets.",
          de: "Website zugänglich für den Schweizer Markt und Grenzregionen.",
        }),
        detail: t({
          fr: "Touchez les quatre régions linguistiques de la Suisse et vos clients frontaliers. Contenu traduit et navigation adaptée à chaque langue.",
          en: "Reach Switzerland's four language regions and your cross-border clients. Translated content and navigation adapted to each language.",
          de: "Erreichen Sie alle vier Sprachregionen der Schweiz und Ihre Grenzkunden. Übersetzte Inhalte und Navigation für jede Sprache.",
        }),
      },
      analytics: {
        label: t({
          fr: "Analytics & suivi",
          en: "Analytics & tracking",
          de: "Analytics & Tracking",
        }),
        description: t({
          fr: "Tableau de bord des visites et conversions.",
          en: "Dashboard for visits and conversions.",
          de: "Dashboard für Besuche und Conversions.",
        }),
        detail: t({
          fr: "Comprenez d'où viennent vos visiteurs, quelles pages performent et où vous perdez des prospects. Tableau de bord clair, sans jargon technique.",
          en: "Understand where your visitors come from, which pages perform and where you lose prospects. Clear dashboard, no technical jargon.",
          de: "Verstehen Sie, woher Ihre Besucher kommen, welche Seiten performen und wo Sie Interessenten verlieren. Übersichtliches Dashboard ohne Fachjargon.",
        }),
      },
      chat: {
        label: t({
          fr: "Chat & WhatsApp",
          en: "Chat & WhatsApp",
          de: "Chat & WhatsApp",
        }),
        description: t({
          fr: "Contact instantané intégré à votre site.",
          en: "Instant contact integrated into your site.",
          de: "Sofortkontakt direkt auf Ihrer Website.",
        }),
        detail: t({
          fr: "Permettez à vos visiteurs de vous contacter en un clic via chat intégré ou WhatsApp. Réduisez la friction entre la découverte et la prise de contact.",
          en: "Let visitors contact you in one click via integrated chat or WhatsApp. Reduce friction between discovery and getting in touch.",
          de: "Ermöglichen Sie Besuchern, Sie per integriertem Chat oder WhatsApp mit einem Klick zu erreichen. Weniger Hürden zwischen Entdeckung und Kontaktaufnahme.",
        }),
      },
      "ia-assistant": {
        label: t({
          fr: "Assistant IA pour votre site",
          en: "AI assistant for your site",
          de: "KI-Assistent für Ihre Website",
        }),
        description: t({
          fr: "Assistant conversationnel entraîné sur vos services, FAQ et documents.",
          en: "Conversational assistant trained on your services, FAQ and documents.",
          de: "Konversationsassistent, trainiert auf Ihre Leistungen, FAQ und Dokumente.",
        }),
        detail: t({
          fr: "Un assistant disponible 24h/24 qui répond aux questions fréquentes sur vos services, tarifs et disponibilités — entraîné sur votre contenu réel.",
          en: "An assistant available 24/7 that answers frequent questions about your services, pricing and availability — trained on your actual content.",
          de: "Ein Assistent rund um die Uhr, der häufige Fragen zu Ihren Leistungen, Preisen und Verfügbarkeiten beantwortet — trainiert auf Ihren echten Inhalten.",
        }),
      },
      "qr-menu": {
        label: t({
          fr: "Menu QR",
          en: "QR menu",
          de: "QR-Menü",
        }),
        description: t({
          fr: "Menu digital accessible par QR code, modifiable à tout moment.",
          en: "Digital menu accessible via QR code, editable anytime.",
          de: "Digitales Menü per QR-Code erreichbar, jederzeit bearbeitbar.",
        }),
        detail: t({
          fr: "Parfait pour la restauration et l'hôtellerie : menu digital scannable, mise à jour instantanée des plats, prix et allergènes sans réimpression.",
          en: "Perfect for restaurants and hospitality: scannable digital menu, instant updates to dishes, prices and allergens — no reprinting.",
          de: "Ideal für Gastronomie und Hotellerie: scanbares digitales Menü, sofortige Aktualisierung von Gerichten, Preisen und Allergenen — ohne Neudruck.",
        }),
      },
      coaching: {
        label: t({
          fr: "Coaching d'utilisation",
          en: "Usage coaching",
          de: "Nutzungs-Coaching",
        }),
        description: t({
          fr: "Prise en main guidée de votre site et de vos modules.",
          en: "Guided onboarding for your site and modules.",
          de: "Geführte Einführung in Ihre Website und Module.",
        }),
        detail: t({
          fr: "Une session dédiée pour maîtriser votre site, modifier vos contenus et tirer le meilleur parti de chaque module activé.",
          en: "A dedicated session to master your site, edit your content and get the most from every active module.",
          de: "Eine dedizierte Session, um Ihre Website zu beherrschen, Inhalte anzupassen und das Beste aus jedem aktiven Modul herauszuholen.",
        }),
      },
      seo: {
        label: t({
          fr: "SEO & référencement local",
          en: "SEO & local search",
          de: "SEO & lokale Sichtbarkeit",
        }),
        description: t({
          fr: "Structure, métadonnées et visibilité Google.",
          en: "Structure, metadata and Google visibility.",
          de: "Struktur, Metadaten und Google-Sichtbarkeit.",
        }),
        detail: t({
          fr: "Optimisation technique et sémantique pour apparaître dans les recherches locales. Balises, structure, contenu et fiche Google alignés sur votre zone géographique.",
          en: "Technical and semantic optimisation to appear in local searches. Tags, structure, content and Google profile aligned with your geographic area.",
          de: "Technische und semantische Optimierung für lokale Suchanfragen. Tags, Struktur, Inhalte und Google-Profil abgestimmt auf Ihre Region.",
        }),
      },
      "google-ads": {
        label: t({
          fr: "Publicité Google Ads",
          en: "Google Ads advertising",
          de: "Google Ads Werbung",
        }),
        description: t({
          fr: "Création, configuration et lancement de campagnes locales ou nationales.",
          en: "Creation, setup and launch of local or national campaigns.",
          de: "Erstellung, Einrichtung und Start lokaler oder nationaler Kampagnen.",
        }),
        detail: t({
          fr: "Campagnes Search et Display ciblées sur votre marché suisse. Configuration des annonces, suivi des conversions et ajustements pour maximiser votre retour.",
          en: "Search and Display campaigns targeted at your Swiss market. Ad setup, conversion tracking and adjustments to maximise your return.",
          de: "Search- und Display-Kampagnen für Ihren Schweizer Markt. Anzeigen-Setup, Conversion-Tracking und Optimierungen für maximalen Ertrag.",
        }),
      },
      "google-business": {
        label: t({
          fr: "Google Business Profile",
          en: "Google Business Profile",
          de: "Google Business Profil",
        }),
        description: t({
          fr: "Optimisation complète de votre fiche Google et de votre présence locale.",
          en: "Full optimisation of your Google profile and local presence.",
          de: "Vollständige Optimierung Ihres Google-Profils und Ihrer lokalen Präsenz.",
        }),
        detail: t({
          fr: "Fiche Google complète et optimisée : horaires, photos, catégories, posts et gestion des avis pour dominer les recherches « près de moi ».",
          en: "Complete, optimised Google profile: hours, photos, categories, posts and review management to dominate 'near me' searches.",
          de: "Vollständiges, optimiertes Google-Profil: Öffnungszeiten, Fotos, Kategorien, Beiträge und Bewertungsmanagement für « in meiner Nähe »-Suchen.",
        }),
      },
      "strategie-digitale": {
        label: t({
          fr: "Stratégie digitale",
          en: "Digital strategy",
          de: "Digitalstrategie",
        }),
        description: t({
          fr: "Analyse de votre activité et feuille de route digitale sur mesure.",
          en: "Analysis of your business and a tailor-made digital roadmap.",
          de: "Analyse Ihrer Tätigkeit und massgeschneiderte digitale Roadmap.",
        }),
        detail: t({
          fr: "Audit de votre situation actuelle, analyse concurrentielle et plan d'action priorisé sur 6 à 12 mois pour structurer votre présence en ligne.",
          en: "Audit of your current situation, competitive analysis and prioritised 6–12 month action plan to structure your online presence.",
          de: "Audit Ihrer aktuellen Situation, Wettbewerbsanalyse und priorisierter 6–12-Monats-Aktionsplan zur Strukturierung Ihrer Online-Präsenz.",
        }),
      },
      "audit-presence": {
        label: t({
          fr: "Audit de présence en ligne",
          en: "Online presence audit",
          de: "Online-Präsenz-Audit",
        }),
        description: t({
          fr: "Analyse de votre visibilité, réputation et présence sur les principaux canaux.",
          en: "Analysis of your visibility, reputation and presence across key channels.",
          de: "Analyse Ihrer Sichtbarkeit, Reputation und Präsenz auf den wichtigsten Kanälen.",
        }),
        detail: t({
          fr: "État des lieux complet : site web, réseaux sociaux, annuaires, avis et cohérence de marque. Rapport actionnable avec recommandations concrètes.",
          en: "Complete assessment: website, social media, directories, reviews and brand consistency. Actionable report with concrete recommendations.",
          de: "Vollständiger Ist-Stand: Website, Social Media, Verzeichnisse, Bewertungen und Markenkonsistenz. Umsetzbarer Bericht mit konkreten Empfehlungen.",
        }),
      },
      "avis-reputation": {
        label: t({
          fr: "Avis clients & e-réputation",
          en: "Customer reviews & e-reputation",
          de: "Kundenbewertungen & E-Reputation",
        }),
        description: t({
          fr: "Collecte d'avis, relances automatiques et mise en avant de vos témoignages.",
          en: "Review collection, automatic follow-ups and showcasing your testimonials.",
          de: "Bewertungssammlung, automatische Erinnerungen und Hervorhebung Ihrer Testimonials.",
        }),
        detail: t({
          fr: "Système de collecte d'avis post-prestation, relances automatiques et affichage des meilleurs témoignages sur votre site pour rassurer vos prospects.",
          en: "Post-service review collection system, automatic follow-ups and display of your best testimonials on your site to reassure prospects.",
          de: "System zur Bewertungssammlung nach der Leistung, automatische Erinnerungen und Anzeige Ihrer besten Testimonials auf der Website zur Beruhigung von Interessenten.",
        }),
      },
      prospection: {
        label: t({
          fr: "Système de prospection",
          en: "Prospecting system",
          de: "Akquise-System",
        }),
        description: t({
          fr: "Outils pour identifier, qualifier et suivre de nouveaux prospects.",
          en: "Tools to identify, qualify and track new prospects.",
          de: "Tools zur Identifikation, Qualifizierung und Nachverfolgung neuer Interessenten.",
        }),
        detail: t({
          fr: "Pipeline de prospects structuré : capture de leads, qualification, relances et suivi jusqu'à la conversion. Adapté aux indépendants et petites équipes.",
          en: "Structured prospect pipeline: lead capture, qualification, follow-ups and tracking through to conversion. Suited to freelancers and small teams.",
          de: "Strukturierte Interessenten-Pipeline: Lead-Erfassung, Qualifizierung, Nachfassaktionen und Verfolgung bis zur Conversion. Für Selbstständige und kleine Teams.",
        }),
      },
      logo: {
        label: t({
          fr: "Création de logo",
          en: "Logo design",
          de: "Logo-Erstellung",
        }),
        description: t({
          fr: "Identité graphique simple et professionnelle pour votre marque.",
          en: "Simple, professional visual identity for your brand.",
          de: "Einfache, professionelle visuelle Identität für Ihre Marke.",
        }),
        detail: t({
          fr: "Logo professionnel en plusieurs déclinaisons (couleur, noir & blanc, favicon). Fichiers sources livrés pour une utilisation sur tous vos supports.",
          en: "Professional logo in multiple versions (colour, black & white, favicon). Source files delivered for use across all your materials.",
          de: "Professionelles Logo in mehreren Varianten (Farbe, Schwarz-Weiss, Favicon). Quelldateien für alle Ihre Medien.",
        }),
      },
      "charte-graphique": {
        label: t({
          fr: "Charte graphique",
          en: "Brand guidelines",
          de: "Styleguide",
        }),
        description: t({
          fr: "Document de référence pour garantir une communication visuelle cohérente.",
          en: "Reference document to ensure consistent visual communication.",
          de: "Referenzdokument für eine stimmige visuelle Kommunikation.",
        }),
        detail: t({
          fr: "Palette de couleurs, typographies, usages du logo et règles graphiques. Votre référence pour une communication cohérente sur web et print.",
          en: "Colour palette, typography, logo usage and graphic rules. Your reference for consistent communication across web and print.",
          de: "Farbpalette, Typografie, Logo-Verwendung und grafische Regeln. Ihre Referenz für stimmige Kommunikation im Web und Print.",
        }),
      },
      affiche: {
        label: t({
          fr: "Affiche & flyer",
          en: "Poster & flyer",
          de: "Plakat & Flyer",
        }),
        description: t({
          fr: "Conception d'une affiche professionnelle pour votre entreprise ou événement.",
          en: "Professional poster design for your business or event.",
          de: "Professionelles Plakat-Design für Ihr Unternehmen oder Event.",
        }),
        detail: t({
          fr: "Design print-ready pour événements, promotions ou communication locale. Formats A4, A3 ou sur mesure, prêts à envoyer à l'imprimeur.",
          en: "Print-ready design for events, promotions or local communication. A4, A3 or custom formats, ready to send to the printer.",
          de: "Druckfertiges Design für Events, Aktionen oder lokale Kommunikation. Formate A4, A3 oder individuell, bereit für den Drucker.",
        }),
      },
      "carte-visite": {
        label: t({
          fr: "Cartes de visite",
          en: "Business cards",
          de: "Visitenkarten",
        }),
        description: t({
          fr: "Design de cartes de visite professionnelles, prêtes à imprimer.",
          en: "Professional business card design, print-ready.",
          de: "Professionelles Visitenkarten-Design, druckfertig.",
        }),
        detail: t({
          fr: "Cartes de visite élégantes et alignées avec votre identité. Fichiers haute résolution livrés pour impression offset ou numérique.",
          en: "Elegant business cards aligned with your identity. High-resolution files delivered for offset or digital printing.",
          de: "Elegante Visitenkarten passend zu Ihrer Identität. Hochauflösende Dateien für Offset- oder Digitaldruck.",
        }),
      },
    },
    pages: {
      catalogue: {
        highlight1: t({
          fr: "Vitrine active : vos clients filtrent et comparent sans vous appeler.",
          en: "Active showcase: your clients filter and compare without calling you.",
          de: "Aktive Vitrine: Ihre Kunden filtern und vergleichen, ohne Sie anzurufen.",
        }),
        highlight2: t({
          fr: "Catégories, filtres et contenus modifiables depuis un espace simple.",
          en: "Categories, filters and content editable from a simple interface.",
          de: "Kategorien, Filter und Inhalte bearbeitbar in einem einfachen Bereich.",
        }),
        example: t({
          fr: "Un menuisier présente ses gammes de cuisines avec photos et fourchettes de prix ; un coach affiche ses programmes filtrables par objectif.",
          en: "A carpenter presents kitchen ranges with photos and price ranges; a coach displays programmes filterable by goal.",
          de: "Ein Schreiner präsentiert Küchenlinien mit Fotos und Preisspannen; ein Coach zeigt Programme, filterbar nach Ziel.",
        }),
      },
      maintenance: {
        highlight1: t({
          fr: "Disponibilité, sécurité et performances assurées dans la durée.",
          en: "Availability, security and performance ensured over the long term.",
          de: "Verfügbarkeit, Sicherheit und Performance langfristig gewährleistet.",
        }),
        highlight2: t({
          fr: "Sauvegardes et support adaptés à la taille de votre site.",
          en: "Backups and support adapted to the size of your site.",
          de: "Backups und Support angepasst an die Grösse Ihrer Website.",
        }),
        example: t({
          fr: "Une PME avec espace client bénéficie de sauvegardes hebdomadaires et d'une intervention rapide en cas de problème.",
          en: "An SME with a client area benefits from weekly backups and rapid intervention if issues arise.",
          de: "Ein KMU mit Kundenbereich profitiert von wöchentlichen Backups und schnellem Eingreifen bei Problemen.",
        }),
      },
      "domaine-hebergement": {
        highlight1: t({
          fr: "Adresse professionnelle avec SSL pour rassurer vos visiteurs.",
          en: "Professional address with SSL to reassure your visitors.",
          de: "Professionelle Adresse mit SSL zur Beruhigung Ihrer Besucher.",
        }),
        highlight2: t({
          fr: "Enregistrement, DNS et hébergement dimensionnés à votre trafic.",
          en: "Registration, DNS and hosting sized to your traffic.",
          de: "Registrierung, DNS und Hosting dimensioniert für Ihren Traffic.",
        }),
        example: t({
          fr: "Un avocat obtient cabinet-muller.ch avec email professionnel et site sécurisé en HTTPS.",
          en: "A lawyer gets cabinet-muller.ch with professional email and a secure HTTPS site.",
          de: "Ein Anwalt erhält cabinet-muller.ch mit professioneller E-Mail und sicherer HTTPS-Website.",
        }),
      },
      devis: {
        highlight1: t({
          fr: "Devis automatique qui filtre les demandes sérieuses et accélère la décision.",
          en: "Automatic quotes that filter serious requests and speed up decisions.",
          de: "Automatische Offerten filtern ernsthafte Anfragen und beschleunigen Entscheidungen.",
        }),
        highlight2: t({
          fr: "Prestations, calculs et PDF configurés aux couleurs de votre marque.",
          en: "Services, calculations and PDFs configured in your brand colours.",
          de: "Leistungen, Berechnungen und PDFs in Ihren Markenfarben konfiguriert.",
        }),
        example: t({
          fr: "Un peintre reçoit surface, finition et photos — le PDF se génère avec son logo et ses conditions.",
          en: "A painter receives surface, finish and photos — the PDF is generated with their logo and terms.",
          de: "Ein Maler erhält Fläche, Finish und Fotos — das PDF wird mit Logo und Bedingungen erstellt.",
        }),
      },
      facturation: {
        highlight1: t({
          fr: "Factures et suivi des paiements centralisés sur votre site.",
          en: "Invoices and payment tracking centralised on your site.",
          de: "Rechnungen und Zahlungsverfolgung zentral auf Ihrer Website.",
        }),
        highlight2: t({
          fr: "Numérotation, mentions légales et relances selon votre processus.",
          en: "Numbering, legal mentions and reminders according to your process.",
          de: "Nummerierung, Pflichtangaben und Mahnungen nach Ihrem Prozess.",
        }),
        example: t({
          fr: "Une consultante émet ses factures mensuelles avec historique par client et paiements en attente.",
          en: "A consultant issues monthly invoices with history per client and pending payments.",
          de: "Eine Beraterin stellt monatliche Rechnungen aus mit Historie pro Kunde und offenen Zahlungen.",
        }),
      },
      contact: {
        highlight1: t({
          fr: "Demandes qualifiées dès le premier contact, sans allers-retours.",
          en: "Qualified requests from first contact, without back-and-forth.",
          de: "Qualifizierte Anfragen ab dem ersten Kontakt, ohne Hin und Her.",
        }),
        highlight2: t({
          fr: "Champs sur mesure, pièces jointes et routage par type de demande.",
          en: "Custom fields, attachments and routing by request type.",
          de: "Massgeschneiderte Felder, Anhänge und Weiterleitung nach Anfragetyp.",
        }),
        example: t({
          fr: "Un architecte reçoit budget, délai, photos du terrain et type de projet — prêt à traiter sans rappel.",
          en: "An architect receives budget, timeline, site photos and project type — ready to process without a callback.",
          de: "Ein Architekt erhält Budget, Frist, Grundstücksfotos und Projekttyp — bereit zur Bearbeitung ohne Rückruf.",
        }),
      },
      "formulaire-personnalise": {
        highlight1: t({
          fr: "Parcours adapté à votre métier, pas un formulaire générique.",
          en: "Journey adapted to your trade, not a generic form.",
          de: "Ablauf passend zu Ihrem Gewerbe, kein generisches Formular.",
        }),
        highlight2: t({
          fr: "Étapes, logique conditionnelle et intégrations selon votre flux.",
          en: "Steps, conditional logic and integrations according to your workflow.",
          de: "Schritte, bedingte Logik und Integrationen nach Ihrem Ablauf.",
        }),
        example: t({
          fr: "Un centre de formation gère inscriptions, niveau requis et justificatifs avec validation des places.",
          en: "A training centre manages registrations, required level and supporting documents with seat validation.",
          de: "Ein Bildungszentrum verwaltet Anmeldungen, erforderliches Niveau und Nachweise mit Platzvalidierung.",
        }),
      },
      email: {
        highlight1: t({
          fr: "Canal direct avec votre audience, indépendant des réseaux sociaux.",
          en: "Direct channel with your audience, independent of social media.",
          de: "Direkter Kanal zu Ihrer Zielgruppe, unabhängig von Social Media.",
        }),
        highlight2: t({
          fr: "Templates, segments et inscription intégrés à votre charte.",
          en: "Templates, segments and sign-up integrated with your brand guidelines.",
          de: "Vorlagen, Segmente und Anmeldung integriert in Ihren Styleguide.",
        }),
        example: t({
          fr: "Un restaurant envoie menu et événements à 800 abonnés locaux, avec un meilleur taux d'ouverture qu'Instagram.",
          en: "A restaurant sends menus and events to 800 local subscribers, with a better open rate than Instagram.",
          de: "Ein Restaurant sendet Menü und Events an 800 lokale Abonnenten — mit besserer Öffnungsrate als Instagram.",
        }),
      },
      rdv: {
        highlight1: t({
          fr: "Agenda rempli sans échanges de mails, moins d'absences.",
          en: "Calendar filled without email exchanges, fewer no-shows.",
          de: "Kalender gefüllt ohne E-Mail-Pingpong, weniger Ausfälle.",
        }),
        highlight2: t({
          fr: "Créneaux, durées, rappels et synchro avec votre calendrier.",
          en: "Slots, durations, reminders and sync with your calendar.",
          de: "Zeitfenster, Dauer, Erinnerungen und Sync mit Ihrem Kalender.",
        }),
        example: t({
          fr: "Un thérapeute propose des consultations en ligne ; les clients réservent selon ses disponibilités réelles.",
          en: "A therapist offers online consultations; clients book based on real availability.",
          de: "Ein Therapeut bietet Online-Sitzungen an; Kunden buchen nach echter Verfügbarkeit.",
        }),
      },
      "espace-client": {
        highlight1: t({
          fr: "Accès privé sécurisé qui renforce la confiance client.",
          en: "Secure private access that builds client trust.",
          de: "Sicherer privater Zugang, der Kundenvertrauen stärkt.",
        }),
        highlight2: t({
          fr: "Documents, niveaux d'accès et branding à vos couleurs.",
          en: "Documents, access levels and branding in your colours.",
          de: "Dokumente, Zugriffsstufen und Branding in Ihren Farben.",
        }),
        example: t({
          fr: "Un fiduciaire partage bilans et échéances avec chaque client, accessible 24 h/24.",
          en: "A trustee shares statements and deadlines with each client, accessible 24/7.",
          de: "Ein Treuhänder teilt Bilanzen und Fristen mit jedem Kunden — rund um die Uhr erreichbar.",
        }),
      },
      multilingue: {
        highlight1: t({
          fr: "Touchez FR, DE, IT et EN — un avantage clé en Suisse.",
          en: "Reach FR, DE, IT and EN — a key advantage in Switzerland.",
          de: "Erreichen Sie FR, DE, IT und EN — ein entscheidender Vorteil in der Schweiz.",
        }),
        highlight2: t({
          fr: "Contenu adapté par langue avec bascule automatique.",
          en: "Content adapted per language with automatic switching.",
          de: "Inhalte pro Sprache angepasst mit automatischem Wechsel.",
        }),
        example: t({
          fr: "Un hôtel à Fribourg présente son offre en français et allemand ; les clients réservent sans barrière linguistique.",
          en: "A hotel in Fribourg presents its offer in French and German; clients book without language barriers.",
          de: "Ein Hotel in Freiburg präsentiert sein Angebot auf Französisch und Deutsch; Gäste buchen ohne Sprachbarriere.",
        }),
      },
      analytics: {
        highlight1: t({
          fr: "Comprenez d'où viennent vos visiteurs et ce qui convertit.",
          en: "Understand where your visitors come from and what converts.",
          de: "Verstehen Sie, woher Ihre Besucher kommen und was konvertiert.",
        }),
        highlight2: t({
          fr: "Tableaux de bord clairs, sans jargon technique.",
          en: "Clear dashboards, no technical jargon.",
          de: "Übersichtliche Dashboards ohne Fachjargon.",
        }),
        example: t({
          fr: "Un plombier découvre que 70 % de ses contacts viennent du mobile local et adapte son numéro en évidence.",
          en: "A plumber discovers 70% of contacts come from local mobile and highlights their phone number.",
          de: "Ein Installateur stellt fest, dass 70 % der Kontakte vom lokalen Mobilgerät kommen, und hebt seine Nummer hervor.",
        }),
      },
      chat: {
        highlight1: t({
          fr: "Convertit les visiteurs hésitants au moment où l'intention est forte.",
          en: "Converts hesitant visitors when intent is strongest.",
          de: "Konvertiert zögernde Besucher im Moment starker Absicht.",
        }),
        highlight2: t({
          fr: "WhatsApp ou chat intégré avec horaires et messages d'accueil.",
          en: "WhatsApp or integrated chat with hours and welcome messages.",
          de: "WhatsApp oder integrierter Chat mit Öffnungszeiten und Begrüssungsnachrichten.",
        }),
        example: t({
          fr: "Une fleuriste reçoit des commandes de dernière minute via WhatsApp depuis le site.",
          en: "A florist receives last-minute orders via WhatsApp from the site.",
          de: "Eine Floristin erhält Last-Minute-Bestellungen per WhatsApp über die Website.",
        }),
      },
      "ia-assistant": {
        highlight1: t({
          fr: "Réponses 24 h/24 aux questions fréquentes, demandes qualifiées.",
          en: "24/7 answers to frequent questions, qualified requests.",
          de: "Rund um die Uhr Antworten auf häufige Fragen, qualifizierte Anfragen.",
        }),
        highlight2: t({
          fr: "Entraîné sur vos services et FAQ, avec escalade humaine si besoin.",
          en: "Trained on your services and FAQ, with human escalation when needed.",
          de: "Trainiert auf Ihre Leistungen und FAQ, mit menschlicher Eskalation bei Bedarf.",
        }),
        example: t({
          fr: "Un garage répond sur révisions et délais, puis propose une prise de rendez-vous en fin de conversation.",
          en: "A garage answers about services and timelines, then offers booking at the end of the conversation.",
          de: "Eine Garage antwortet zu Service und Fristen und schlägt am Gesprächsende eine Terminbuchung vor.",
        }),
      },
      "qr-menu": {
        highlight1: t({
          fr: "Carte à jour en un clic, sans réimpression.",
          en: "Menu updated in one click, no reprinting.",
          de: "Menü mit einem Klick aktualisiert, ohne Neudruck.",
        }),
        highlight2: t({
          fr: "Allergènes, photos, versions lunch/dîner et multilingue.",
          en: "Allergens, photos, lunch/dinner versions and multilingual.",
          de: "Allergene, Fotos, Mittags-/Abendversionen und Mehrsprachigkeit.",
        }),
        example: t({
          fr: "Un bistrot genevois met à jour le plat du jour chaque matin ; les clients scannent le QR sur table.",
          en: "A Geneva bistro updates the daily special each morning; clients scan the QR on the table.",
          de: "Ein Genfer Bistro aktualisiert jeden Morgen das Tagesgericht; Gäste scannen den QR am Tisch.",
        }),
      },
      coaching: {
        highlight1: t({
          fr: "Autonomie réelle sur votre site après la livraison.",
          en: "Real autonomy on your site after delivery.",
          de: "Echte Autonomie auf Ihrer Website nach der Lieferung.",
        }),
        highlight2: t({
          fr: "Session et documentation adaptées à vos modules actifs.",
          en: "Session and documentation adapted to your active modules.",
          de: "Session und Dokumentation angepasst an Ihre aktiven Module.",
        }),
        example: t({
          fr: "Une association modifie ses actualités et envoie sa newsletter après 90 minutes de prise en main.",
          en: "An association updates news and sends its newsletter after 90 minutes of onboarding.",
          de: "Ein Verein passt News an und versendet den Newsletter nach 90 Minuten Einführung.",
        }),
      },
      personnalise: {
        highlight1: t({
          fr: "Fonctionnalité sur mesure pour un besoin hors catalogue.",
          en: "Custom functionality for a need outside the catalogue.",
          de: "Massgeschneiderte Funktion für einen Bedarf ausserhalb des Katalogs.",
        }),
        highlight2: t({
          fr: "Analyse, développement et intégration à votre site Merlin.",
          en: "Analysis, development and integration into your Merlin site.",
          de: "Analyse, Entwicklung und Integration in Ihre Merlin-Website.",
        }),
        example: t({
          fr: "Un vigneron obtient réservation de dégustations avec groupes et paiement en ligne.",
          en: "A winemaker gets tasting bookings with groups and online payment.",
          de: "Ein Winzer erhält Degustationsbuchungen mit Gruppen und Online-Zahlung.",
        }),
      },
      seo: {
        highlight1: t({
          fr: "Contacts qualifiés via Google — levier rentable pour une PME suisse.",
          en: "Qualified contacts via Google — a cost-effective lever for Swiss SMEs.",
          de: "Qualifizierte Kontakte über Google — ein rentabler Hebel für Schweizer KMU.",
        }),
        highlight2: t({
          fr: "Mots-clés locaux, structure technique et fiche Google Business.",
          en: "Local keywords, technical structure and Google Business Profile.",
          de: "Lokale Keywords, technische Struktur und Google Business Profil.",
        }),
        example: t({
          fr: "Un électricien à Lausanne reçoit 5 à 8 appels qualifiés par mois sur « électricien Lausanne urgence ».",
          en: "An electrician in Lausanne receives 5–8 qualified calls per month for 'electrician Lausanne emergency'.",
          de: "Ein Elektriker in Lausanne erhält 5–8 qualifizierte Anrufe pro Monat für « Elektriker Lausanne Notfall ».",
        }),
      },
      "google-ads": {
        highlight1: t({
          fr: "Visibilité immédiate sur les recherches actives, budget maîtrisé.",
          en: "Immediate visibility on active searches, controlled budget.",
          de: "Sofortige Sichtbarkeit bei aktiven Suchen, kontrolliertes Budget.",
        }),
        highlight2: t({
          fr: "Ciblage géographique, annonces et suivi des conversions.",
          en: "Geographic targeting, ads and conversion tracking.",
          de: "Geografisches Targeting, Anzeigen und Conversion-Tracking.",
        }),
        example: t({
          fr: "Un déménageur trace chaque appel estival sur Genève et Lausanne pour mesurer le coût par client.",
          en: "A mover tracks every summer call in Geneva and Lausanne to measure cost per client.",
          de: "Ein Umzugsunternehmen verfolgt jeden Sommeranruf in Genf und Lausanne, um Kosten pro Kunde zu messen.",
        }),
      },
      "google-business": {
        highlight1: t({
          fr: "Premier contact local : appels et itinéraires sans pub payante.",
          en: "First local contact: calls and directions without paid ads.",
          de: "Erster lokaler Kontakt: Anrufe und Routen ohne bezahlte Werbung.",
        }),
        highlight2: t({
          fr: "Fiche complète avec photos, horaires et collecte d'avis.",
          en: "Complete profile with photos, hours and review collection.",
          de: "Vollständiges Profil mit Fotos, Öffnungszeiten und Bewertungssammlung.",
        }),
        example: t({
          fr: "Un coiffeur complète sa fiche et double ses appels via le pack local « near me ».",
          en: "A hairdresser completes their profile and doubles calls via the local 'near me' pack.",
          de: "Ein Coiffeur vervollständigt sein Profil und verdoppelt Anrufe über das lokale « in meiner Nähe »-Paket.",
        }),
      },
      "strategie-digitale": {
        highlight1: t({
          fr: "Efforts concentrés là où l'impact est maximal pour votre activité.",
          en: "Efforts focused where impact is greatest for your business.",
          de: "Aufwand dort konzentriert, wo die Wirkung für Ihre Tätigkeit am grössten ist.",
        }),
        highlight2: t({
          fr: "Feuille de route 6–12 mois avec actions concrètes et mesurables.",
          en: "6–12 month roadmap with concrete, measurable actions.",
          de: "6–12-Monats-Roadmap mit konkreten, messbaren Massnahmen.",
        }),
        example: t({
          fr: "Un cabinet d'architecture priorise portfolio en ligne et LinkedIn plutôt que Google Ads.",
          en: "An architecture firm prioritises online portfolio and LinkedIn over Google Ads.",
          de: "Ein Architekturbüro priorisiert Online-Portfolio und LinkedIn statt Google Ads.",
        }),
      },
      "audit-presence": {
        highlight1: t({
          fr: "État des lieux avant d'investir : visibilité, cohérence, failles.",
          en: "Assessment before investing: visibility, consistency, gaps.",
          de: "Ist-Stand vor Investition: Sichtbarkeit, Konsistenz, Lücken.",
        }),
        highlight2: t({
          fr: "Rapport clair avec plan d'action priorisé.",
          en: "Clear report with prioritised action plan.",
          de: "Klarer Bericht mit priorisiertem Aktionsplan.",
        }),
        example: t({
          fr: "Un physiothérapeute corrige horaires Google et annuaires obsolètes — +30 % d'appels en une semaine.",
          en: "A physiotherapist fixes Google hours and outdated directories — +30% calls in one week.",
          de: "Ein Physiotherapeut korrigiert Google-Öffnungszeiten und veraltete Verzeichnisse — +30 % Anrufe in einer Woche.",
        }),
      },
      "avis-reputation": {
        highlight1: t({
          fr: "Avis réguliers qui rassurent les prospects et améliorent le classement local.",
          en: "Regular reviews that reassure prospects and improve local ranking.",
          de: "Regelmässige Bewertungen beruhigen Interessenten und verbessern das lokale Ranking.",
        }),
        highlight2: t({
          fr: "Relances automatiques et mise en avant sur votre site.",
          en: "Automatic follow-ups and highlighting on your site.",
          de: "Automatische Erinnerungen und Hervorhebung auf Ihrer Website.",
        }),
        example: t({
          fr: "Un nettoyeur passe de 4 à 47 avis Google en six mois, note 4,8.",
          en: "A cleaner goes from 4 to 47 Google reviews in six months, rating 4.8.",
          de: "Ein Reinigungsunternehmen steigt in sechs Monaten von 4 auf 47 Google-Bewertungen, Note 4,8.",
        }),
      },
      prospection: {
        highlight1: t({
          fr: "Pipeline structuré de la capture lead à la conversion.",
          en: "Structured pipeline from lead capture to conversion.",
          de: "Strukturierte Pipeline von der Lead-Erfassung bis zur Conversion.",
        }),
        highlight2: t({
          fr: "Qualification, relances et rappels adaptés à votre cycle de vente.",
          en: "Qualification, follow-ups and reminders adapted to your sales cycle.",
          de: "Qualifizierung, Nachfassaktionen und Erinnerungen passend zu Ihrem Verkaufszyklus.",
        }),
        example: t({
          fr: "Un consultant B2B qualifie en trois étapes et reçoit un rappel s'il n'a pas relancé sous 48 h.",
          en: "A B2B consultant qualifies in three steps and gets a reminder if they haven't followed up within 48 h.",
          de: "Ein B2B-Berater qualifiziert in drei Schritten und erhält eine Erinnerung, wenn er innerhalb von 48 h nicht nachfasst.",
        }),
      },
      logo: {
        highlight1: t({
          fr: "Identité visuelle professionnelle, mémorable dès le premier regard.",
          en: "Professional visual identity, memorable at first glance.",
          de: "Professionelle visuelle Identität, beim ersten Blick einprägsam.",
        }),
        highlight2: t({
          fr: "Déclinaisons, favicon et fichiers sources pour tous vos supports.",
          en: "Variations, favicon and source files for all your materials.",
          de: "Varianten, Favicon und Quelldateien für alle Ihre Medien.",
        }),
        example: t({
          fr: "Une boulangerie obtient un logo chaleureux utilisé sur site, sacs et réseaux sociaux.",
          en: "A bakery gets a warm logo used on site, bags and social media.",
          de: "Eine Bäckerei erhält ein warmes Logo für Website, Tüten und Social Media.",
        }),
      },
      "charte-graphique": {
        highlight1: t({
          fr: "Communication cohérente sur web, print et réseaux sociaux.",
          en: "Consistent communication across web, print and social media.",
          de: "Stimmige Kommunikation im Web, Print und Social Media.",
        }),
        highlight2: t({
          fr: "Palette, typographies, logo et templates documentés.",
          en: "Palette, typography, logo and templates documented.",
          de: "Palette, Typografie, Logo und Vorlagen dokumentiert.",
        }),
        example: t({
          fr: "Une fintech aligne présentations, site et cartes de visite sur une même identité.",
          en: "A fintech aligns presentations, site and business cards on one identity.",
          de: "Ein Fintech-Unternehmen richtet Präsentationen, Website und Visitenkarten auf eine Identität aus.",
        }),
      },
      affiche: {
        highlight1: t({
          fr: "Support percutant pour événements, promos et présence locale.",
          en: "Impactful material for events, promos and local presence.",
          de: "Wirkungsvolles Medium für Events, Aktionen und lokale Präsenz.",
        }),
        highlight2: t({
          fr: "Format, message et QR code vers votre site si souhaité.",
          en: "Format, message and QR code to your site if desired.",
          de: "Format, Botschaft und QR-Code zu Ihrer Website auf Wunsch.",
        }),
        example: t({
          fr: "Un yoga studio distribue des flyers avec QR vers la page de réservation du cours découverte.",
          en: "A yoga studio distributes flyers with QR to the trial class booking page.",
          de: "Ein Yoga-Studio verteilt Flyer mit QR zur Buchungsseite des Schnupperkurses.",
        }),
      },
      "carte-visite": {
        highlight1: t({
          fr: "Networking efficace avec un design aligné à votre marque.",
          en: "Effective networking with design aligned to your brand.",
          de: "Effektives Networking mit Design passend zu Ihrer Marke.",
        }),
        highlight2: t({
          fr: "Recto-verso, QR code et fichiers prêts pour l'imprimeur.",
          en: "Double-sided, QR code and files ready for the printer.",
          de: "Beidseitig, QR-Code und Dateien druckfertig.",
        }),
        example: t({
          fr: "Un agent immobilier : QR vers ses biens disponibles, le contact scanne et voit les annonces.",
          en: "A real estate agent: QR to available properties — the contact scans and sees listings.",
          de: "Ein Immobilienmakler: QR zu verfügbaren Objekten — der Kontakt scannt und sieht die Inserate.",
        }),
      },
    },
  },
} satisfies Dictionary;

export default optionsContent;
