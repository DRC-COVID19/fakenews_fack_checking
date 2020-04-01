import { Information } from '../models/Information';
import { InformationLang } from '../models/InformationLang';
import mongoose from 'mongoose';
import '../services/DataBasInit';

const fakeNews: any[] = [
  {
    source: 'Facebook',
    titre: "Le covid-19 a été crée aux Etats-Unis d'Amérique",
    contenu:
      'Le virus corona est un virus américain, fabriqué dans l’objectif de déstabiliser la chine. Donc seul les américains possèdent aussi le traitement. C’est même la raison pour laquelle c’est la grande puissance qui est la moins touchée par ce virus.',
    photo:
      'https://res.cloudinary.com/jochri3/image/upload/v1585577164/Fake%20new%20images/american_corona.jpg',
    statut: 'fausse'
  },
  {
    source: 'Facebook',
    titre: 'Les africains sont plus résistants aux virus',
    contenu: 'Les africains sont plus résistants aux virus',
    photo:
      'https://res.cloudinary.com/jochri3/image/upload/v1585577838/Fake%20new%20images/africain_protected.jpg',
    statut: 'fausse'
  },
  {
    source: 'Facebook',
    titre:
      'Boire de l’eau, une saupe à l’ail ou se rincer la gorge avec une solution saline protège contre le corona virus',
    contenu:
      'Boire de l’eau, une saupe à l’ail ou se rincer la gorge avec une solution saline protège contre le corona virus',
    photo:
      'https://res.cloudinary.com/jochri3/image/upload/v1585578057/Fake%20new%20images/eau_aile.jpg',
    statut: 'fausse'
  },
  {
    source: 'Facebook',
    titre: 'Boire du congo Bololo permet de guérir du coronavirus',
    contenu: 'Boire du congo Bololo permet de guérir du coronavirus ',
    photo:
      'https://res.cloudinary.com/jochri3/image/upload/v1585578183/Fake%20new%20images/kongo_bololo.jpg',
    statut: 'fausse'
  }
];

(async function() {
  for (let information of fakeNews) {
    const { source, titre, contenu, photo, statut } = information;
    const session = await mongoose.startSession();

    session.startTransaction();
    try {
      const opts = { session };
      const info = await Information.create(
        [
          {
            source,
            photo,
            statut
          }
        ],
        opts
      );

      const infoLangue = await InformationLang.create(
        [
          {
            information: info,
            langue: 'francais',
            codeLangue: 'fr',
            titre,
            contenu
          }
        ],
        opts
      );
      await session.commitTransaction();
      session.endSession();
      return true;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
})();
