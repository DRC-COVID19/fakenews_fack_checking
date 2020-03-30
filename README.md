# <h1>Plateforme pour signaler/vérifier les fakes news</h1>

C'est un site web de signalement des **Fake news** en rapport avec la pandemie du **Covid-19**.<br />Les utilsateur ont la possibilité de solliter la vérification des informations.

Pour lancer l'application rassurez-vous d'avoir éxécuté les commande suivantes dans le **terminal**:

- **npm install** si vous avez **npm** installé ou **yarn** si vous avez **yarn** installé
- Faites ensuite **npm run start** ou **yarn start** selon que vous avez **npm** ou **yarn**

**Tech Stack**

- Node.js
- Express
- Typescript -> _Backend_
- Javascript -> _Frontend_
- MongoDB
- Moteur de template -> _EJS_

<h2>Structuration des dossiers du projet</h2>
<ul>
 <li>
    src/
    <ul>
    <li>controllers/</li>
    <li>middlewares/</li>
    <li>models/</li>
    <li>routes/</li>
    <li>services/</li>
    <li>views/
        <ul>
            <li>pages/ <- _ICi_ ces les pages que les visiteurs vont voir_</li>
            <li>partials/ <- _Ici_ Ces des morceau de pages réutilisables</li>
        </ul>
    </li>
    </ul>
 </li>
</ul>
