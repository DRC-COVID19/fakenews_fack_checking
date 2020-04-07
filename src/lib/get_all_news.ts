import _ from 'lodash';

export const getInformationLang = function (
  parentModel: Array<any>,
  childModel: any
): Promise<any> {
  return Promise.all(
    parentModel.map(async (data: any) => {
      const langAttributes: any = await childModel
        .find({
          informationID: data._id,
          codeLangue: 'fr',
        })
        .select('titre contenu -_id');
      return { ...data['_doc'], ...langAttributes['0']['_doc'] };
    })
  );
};

export const searchInformationLang = function (
  parentModel: any,
  childModel: any
): Promise<any> {
  return Promise.all(
    childModel.map(async (data: any) => {
      const news: any = await parentModel
        .findById(data.informationID)
        .select('_id source photo statut');
      return { ..._.pick(data['_doc'], ['titre', 'contenu']), ...news['_doc'] };
    })
  );
};
