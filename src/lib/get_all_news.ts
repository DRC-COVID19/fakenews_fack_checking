import _ from 'lodash';

export const getInformationLang = function (
  parentModel: Array<any>,
  childModel: any
): Promise<any> {
  return Promise.all(
    parentModel.map(async (data: any) => {
      const langAttributes: any = await childModel
        .find({
          news: data._id,
          langISOCode: 'fr',
        })
        .select('title content -_id');
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
        .findById(data.news)
        .select('_id source photo status');
      return { ..._.pick(data['_doc'], ['title', 'content']), ...news['_doc'] };
    })
  );
};
