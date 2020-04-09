const generateLoaders = (htmlString, numberOfOccurences, parentElement) => {
  for (let occurence = 1; occurence <= numberOfOccurences; occurence++) {
    parentElement.insertAdjacentHTML('afterbegin', htmlString);
  }
  return;
};
