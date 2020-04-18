# **Plateforme des signalement et vérification des fakes news liées au COVID-19**

Ceci une application web de signalement des **fake news** liées à la pandemie de **COVID-19**. Elle permet au grand public de solliter la vérification d'une information et aux organismes de fact checking de pouvoir apporter une réponse définitive aux différentes rumeurs.

Pour commencer l'application en mode développement, suivre les étapes suivantes:

## **Prerequis**

### **Node.js**

Assurez vous d'avoir **Node.js** installé sur votre machine de dévelopment. Si ce n'est pas le cas, veuillez vous rendre sur le [site officiel de Node.js](https://nodejs.org) pour télécharger et executez le fichier d'installation.

### **Typescript**

L'application nécessite [**Typescript**](https://www.typescriptlang.org/#download-links). Typescript peut etre installé comme un package Node.js en executant la commande suivante:

```
npm install -g typescript
```

### **Base de données**

Le developpement ou la mise en production de cette application nécessite une base de données [MongoDB](https://www.mongodb.com/). Nous vous recommandons de créer votre base de données sur [Mlab](https://mlab.com/) ou autres services similaires.

Les paramètres de connexion de la base de données se renseignent via un fichier `.env`. Selon que vous soyez dans un environemnt de dévelopment ou produciton, créez respectivement soit fichier `dev.env` ou `prod.env`. Mettez-y les informations ci-dessous et completez les valeurs renseignant les paramètres de connexion:

```
MONGO_USER=
MONGO_PASSWORD=
MONGO_DBNAME=
MONGO_HOSTNAME=
```

Afin d'avoir des données pour initiales, veuillez éxécuter le script `lib/get_all_news.ts`.

## **Commandes**

Après avoir installé tous les prérequis ci-dessus, executez dans l'ordre les commandes ci-après dans un **terminal**:

```
npm install
npm run build
npm run start_dev
```

Par default l'application utilise le port 5000.

## **Tech Stack**

- Node.js
- Express
- Typescript -> _*Backend*_
- Javascript -> _*Frontend*_
- MongoDB
- Moteur de template -> _*EJS*_

## **À lire attentivement avant de contribuer à un projet open source**

- [Gérez votre code avec Git et GitHub](https://openclassrooms.com/fr/courses/2342361-gerez-votre-code-avec-git-et-github/2433731-contribuez-a-des-projets-open-source)

- [The beginner's guide to contributing to a GitHub project](https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/)

- [How to test a Pull Request locally before Merging](https://medium.com/@bolajiayodeji/how-to-test-a-pull-request-locally-before-merging-634bb205d3a6)

- [How to test a Pull Request locally before Merging](https://dev.to/bolajiayodeji/how-to-test-a-pull-request-locally-before-merging-1h29)

## **Contributeurs**

- [Christian Lisangola Bondjali](https://github.com/theman2000)

- [Osée Mukaya Tshimanga](https://github.com/Mukaya)

- [Peniel Dialundana](https://github.com/bilwifi)

- [Axel Ilali](https://github.com/axelilali)
