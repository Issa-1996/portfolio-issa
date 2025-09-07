# Mon Portfolio Personnel

Bienvenue sur mon portfolio personnel ! Ce site web présente mes compétences, mes projets et mes expériences en tant que développeur web.

## Fonctionnalités

- Design moderne et réactif
- Navigation fluide avec défilement doux
- Section "À propos" pour me présenter
- Section "Compétences" pour mettre en avant mes compétences techniques
- Galerie de projets avec aperçu et liens
- Formulaire de contact fonctionnel
- Compatible mobile

## Technologies Utilisées

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript (ES6+)
- Font Awesome pour les icônes
- Google Fonts pour la typographie

## Structure du Projet

```
portefolio/
├── index.html          # Page principale
├── css/
│   └── style.css      # Feuille de style principale
├── js/
│   └── main.js        # JavaScript pour les interactions
└── README.md          # Ce fichier
```

## Personnalisation

### Changer les couleurs
Pour modifier les couleurs du site, éditez les variables CSS dans le fichier `css/style.css` :

```css
:root {
    --primary-color: #3498db;    /* Couleur principale */
    --secondary-color: #2c3e50;  /* Couleur secondaire */
    --text-color: #333;         /* Couleur du texte */
    --light-bg: #f9f9f9;        /* Couleur de fond légère */
    --white: #ffffff;           /* Blanc */
}
```

### Ajouter des projets
Pour ajouter ou modifier des projets, mettez à jour le tableau `projects` dans le fichier `js/main.js` :

```javascript
const projects = [
    {
        title: 'Titre du Projet',
        description: 'Description du projet',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        image: 'chemin/vers/image.jpg',
        demo: '#',
        code: '#'
    },
    // Ajoutez d'autres projets ici
];
```

### Personnaliser les informations personnelles
Modifiez le contenu dans `index.html` pour y ajouter vos informations personnelles, notamment dans les sections :
- En-tête (votre nom et titre)
- Section "À propos"
- Section "Compétences"
- Pied de page (liens sociaux)

## Comment l'utiliser

1. Clonez ce dépôt
2. Ouvrez `index.html` dans votre navigateur
3. Personnalisez le contenu selon vos besoins

## Licence

Ce projet est sous licence MIT. N'hésitez pas à l'utiliser comme base pour votre propre portfolio.
