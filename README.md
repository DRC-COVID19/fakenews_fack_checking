# <h1>Plateforme pour signaler/vérifier les fakes news</h1>

C'est un site web de signalement des **Fake news** en rapport avec la pandemie du **Covid-19**.<br />Les utilsateur ont la possibilité de solliter la vérification des informations.

Pour lancer l'application rassurez-vous d'avoir éxécuté les commande suivantes dans le **terminal**:

- **node.js** doit etre installé dans votre système

- Installer **Typescript** : https://www.typescriptlang.org/#download-links

- **npm install** si vous avez **npm** installé ou **yarn** si vous avez **yarn** installé

- Faites ensuite **npm run start** ou **yarn start** selon que vous avez **npm** ou **yarn**

- Le projet étant en Typescript,avant de lancer le server faites : **yarn build** ou **npm run build**

- Pour lancer le server faites **yarn start** ou **npm run start**.Par default l'application utilise le port 3000

- Pour travailler avec un base de données de test,vous devez créer un compte dans https://mlab.com/ puis créer une base de données

- pour avoir une configuration de production ,il faudra créer un fichier .env à la racine et y mettre les valeurs des variables environement pour la production.Pour avoir une configuration local , vous devez ajouter un fichier dev.ts dans le repertoire **config/** puis y mettre votre configuration comme le cas du fichier prod.ts

- Afin d'avoir des données pour initiales , veuillez éxécuter le script se trouvant dans le repertoire **lib/**

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

**A lire attentivement avant de contribuer à un projet open source**<br>

https://openclassrooms.com/fr/courses/2342361-gerez-votre-code-avec-git-et-github/2433731-contribuez-a-des-projets-open-source

https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/

https://medium.com/@bolajiayodeji/how-to-test-a-pull-request-locally-before-merging-634bb205d3a6

https://dev.to/bolajiayodeji/how-to-test-a-pull-request-locally-before-merging-1h29

<h2>Contributeurs</h2>

- **Christian Lisangola Bondjali**

- **Osée Mukaya Tshimanga**

- **Peniel Dialundana**

- **Axel Ilali**
