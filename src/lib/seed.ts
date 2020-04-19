import { News } from '../models/news.model';
import { NewsLang } from '../models/news_lang.model';
import './db.start';

const fakeNews: any[] = [
  {
    source: 'Facebook',
    title: "Le covid-19 a été crée aux Etats-Unis d'Amérique",
    content:
      'Le virus corona est un virus américain, fabriqué dans l’objectif de déstabiliser la chine. Donc seul les américains possèdent aussi le traitement. C’est même la raison pour laquelle c’est la grande puissance qui est la moins touchée par ce virus.',
    photo:
      'https://res.cloudinary.com/jochri3/image/upload/v1585900412/Fake%20new%20images/american_corona.jpg',

    status: 'false',
  },

  {
    source:
      'https://www.lci.fr/international/coronavirus-covid-19-pandemie-sante-traitement-paludisme-la-chloroquine-un-don-du-ciel-selon-donald-trump-2148937.html',
    title: 'La chloroquine, un don du ciel selon Donald Trump.',
    photo:
      'https://res.cloudinary.com/jochri3/image/upload/v1585897968/Fake%20new%20images/download-11-3-880x495.jpg',
    content:
      'En pleine lutte mondiale contre la pandémie de covid-19, le président américain a vanté les mérites de la chloroquine. Cet antipaludéen serait un "don du ciel", selon Donald Trump.',
    status: 'true',
  },
  {
    source:
      'https://www.who.int/fr/emergencies/diseases/novel-coronavirus-2019/advice-for-public/q-a-coronaviruses',
    title: 'Le port du masque protège contre le Coronavirus',
    photo: '',
    content:
      'Il ne faut porter un masque que si on présente des symptômes de la COVID-19 (en particulier, la toux) ou si on s’occupe de quelqu’un susceptible d’être atteint de la maladie. Les masques jetables sont à usage unique.',
    status: 'true',
  },
  {
    source:
      'https://www.who.int/fr/emergencies/diseases/novel-coronavirus-2019/advice-for-public/q-a-coronaviruses',
    title:
      'Les êtres humains peuvent contracter la COVID-19 à partir d’une source animale',
    photo:
      'https://res.cloudinary.com/jochri3/image/upload/v1585770199/Fake%20new%20images/image5.jpg',
    content:
      'Les sources animales éventuelles de la COVID-19 n’ont pas encore été confirmées.Pour se protéger, par exemple lorsque l’on va sur des marchés d’animaux vivants, il faut éviter le contact direct avec les animaux et les surfaces en contact avec les animaux et toujours respecter les règles relatives à la sécurité sanitaire des aliments.',
    status: 'true',
  },

  {
    source: 'facebook',
    title: 'La conspiration des laboratoires pharmaceutiques:',
    photo:
      'https://res.cloudinary.com/jochri3/image/upload/v1585770199/Fake%20new%20images/image4_ligne7_et_8.jpg',
    content:
      'De grandes entreprises ayant fait fortune dans les médicaments dissimulaient des traitements simples et efficaces contre le coronavirus, pour ne pas compromettre la \n vente d’un futur vaccin.',
    status: 'false',
  },
  {
    source:
      'https://www.rtbf.be/info/dossier/fact-checking-covid-19/detail_coronavirus-les-personnes-de-groupe-sanguin-o-sont-elles-mieux-immunisees?id=10464490',
    title: 'Les personnes de groupe sanguin O sont-elles mieux immunisées',
    photo:
      'https://res.cloudinary.com/jochri3/image/upload/v1585899515/kongo_bololo.jpg',
    content: 'Les personnes de groupe sanguin O sont-elles mieux immunisées',
    status: 'false',
  },
  {
    source:
      'https://www.who.int/fr/emergencies/diseases/novel-coronavirus-2019/advice-for-public/q-a-coronaviruses',
    title: 'L’immunité de la jeunesse contre le virus:',
    photo: '',
    content:
      'Il est faux de penser que le virus ne touche que les personnes âgées, même si la fragilité d’un organisme influe sur la capacité de celui-ci à affronter une contamination.',
    status: 'false',
  },
  {
    source:
      'https://www.rtbf.be/info/dossier/epidemie-de-coronavirus/detail_coronavirus-le-vrai-et-le-faux-des-rumeurs-et-idees-recues-sur-le-covid-19?id=10441926',
    title: 'Une soupe à l’ail miracle ?',
    photo:
      'https://res.cloudinary.com/jochri3/image/upload/v1585770199/Fake%20new%20images/image2_ligne11.jpg',
    content:
      'Boire de l’eau, une soupe à l’ail (voire de l’eau de javel) ou se rincer la gorge avec une solution saline permet d’éviter d’être contaminé',
    status: 'false',
  },
  {
    source:
      'https://www.rtbf.be/info/dossier/epidemie-de-coronavirus/detail_coronavirus-le-vrai-et-le-faux-des-rumeurs-et-idees-recues-sur-le-covid-19?id=10441926',
    title: 'Les Africains sont plus résistants face au virus',
    photo:
      'https://res.cloudinary.com/jochri3/image/upload/v1585899516/afrcan_protected.jpg',
    content:
      'Selon les Centres de contrôle et de prévention des maladies (CDC), toute personne qui entre en contact étroit avec une personne infectée par le coronavirus risque de le contracter.',
    status: 'false',
  },
  {
    source:
      'https://www.rtbf.be/info/dossier/epidemie-de-coronavirus/detail_coronavirus-le-vrai-et-le-faux-des-rumeurs-et-idees-recues-sur-le-covid-19?id=10441926',
    title: 'Des billets de banque sont contagieux',
    photo:
      'https://res.cloudinary.com/jochri3/image/upload/v1585770200/Fake%20new%20images/image6_ligne13.jpg',
    content:
      'Des banques chinoises ont décidé de mettre en quarantaine les billets de banque usagés puis de les nettoyer à l’aide de rayons ultraviolets ou de hautes températures pour désinfecter les billets, avant de les placer sous scellés et de les isoler pendant sept ou quatorze jours. L’objectif affiché est de limiter la propagation du coronavirus.',
    status: 'false',
  },
  {
    source:
      'https://www.who.int/fr/emergencies/diseases/novel-coronavirus-2019/advice-for-public/q-a-coronaviruses',
    title: 'La transmission du virus par les colis venus de Chine:',
    photo:
      'https://res.cloudinary.com/jochri3/image/upload/v1585770199/Fake%20new%20images/image3_ligne14.jpg',
    content:
      'Même si cela varie en fonction de l’environnement et de la température, les germes pathogènes ne survivent que \n quelques heures sur les objets – les colis mais aussi les pièces de monnaie ou les \ncartes de crédit.',
    status: 'false',
  },
  {
    source: 'facebook',
    title: 'Traitement tranditionnelle',
    photo:
      'https://res.cloudinary.com/jochri3/image/upload/v1585899515/kongo_bololo.jpg',
    content:
      "A part le kongo bololo d'autres guérisseur traditionnels ont déjà trouvé le traitement de ce virus, mais le gouvernement ne veut pas les écouter.",
    status: 'false',
  },
  {
    source: 'Facebook',
    title: 'COVID-19 petit problème dans le corps',
    photo: '',
    content:
      "L'homme congolais a des virus plus puissant que le COVID-19 dans son corps.Il se retrouve donc immunisé contre celui-ci.",
    status: 'false',
  },
];

(async function () {
  for (let information of fakeNews) {
    const { source, status, photo, title, content } = information;
    const info = new News({
      source,
      status,
      photo,
    });

    const infoLangue = new NewsLang({
      news: info._id,
      langISOCode: 'fr',
      lang: 'francais',
      title,
      content,
    });
    try {
      await info.save();
      await infoLangue.save();
      console.log(info);
    } catch (error) {
      console.log('Errr : ', error);
    }
  }
})();
