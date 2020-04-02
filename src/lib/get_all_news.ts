export function getInformationLang(
  parentModel: Array<any>,
  childModel: any
): Promise<any> {
  return Promise.all(
    parentModel.map(async (data: any) => {
      const langAttributes: any = await childModel
        .find({
          informationID: data._id,
          codeLangue: 'fr'
        })
        .select('titre contenu -_id');
      return { ...data['_doc'], ...langAttributes['0']['_doc'] };
    })
  );
}
