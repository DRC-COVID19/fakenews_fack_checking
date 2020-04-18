const loadNews = (data, parentNode) => {
 

  parentNode.innerHTML = '';
  for (let news of data) {
      news.content = news.content.substr(0, 100)
    const imageToDisplay = news.photo ? news.photo : 'images/covid_19_1.jpg';
    const badgToDisplay = news.status == 'true' ? 'success' : 'danger';
    const statusToDisplay = news.status === 'true' ? 'vrai' : 'false';

    const KD_URL = `https://factcheck.stopcoronavirusrdc.info/news/${news.slug}`;
    const url=typeof KD_URL != 'undefined' ? `data-url=${KD_URL}` :'';

    const title=typeof news.title != 'undefined'  ? `data-title=${news.title}` : '';

 

     const socialeShare=`<ul class="social"><li>
    <span style="color :#3b5998 ; font-size:25px; margin-right:5px;"  class="button share-button facebook-share-button st-custom-button" data-network="facebook" ${url} ${title} >
      <span class="iconify" data-icon="jam:facebook-circle" data-inline="false"></span>
    </span>
  </li>
  <li>
    <span style="color :#38A1F3 ; font-size:25px; margin-right:5px;" class="button share-button facebook-share-button st-custom-button" data-network="twitter" ${url} ${title} >
      <span class="iconify" data-icon="jam:twitter-circle" data-inline="false"></span>
    </span>
  </li>
  <li>
    <span style="color :#61d0b6 ; font-size:25px;" class="button share-button facebook-share-button st-custom-button" data-network="whatsapp" ${url} ${title} >
      <span class="iconify" data-icon="mdi:whatsapp" data-inline="false"></span>
    </span>
  </li>
</ul>`;  
    const newsTemplate = `<div class="col-sm-12" style="col-sm-12">
   <a href="news/${news.slug}" class="card">
          <figure>
            <img style="max-height: 100%;max-width: 100%;" src="${imageToDisplay}" class="card-img" alt="${news.title}" />
          </figure>

          <div class="card-body">
            <span
              class="badge badge-${badgToDisplay} text-uppercase">${statusToDisplay}</span>

            <h5 class="card-title">${news.title}</h5>

            <p class="card-text">${news.content}...</p>
            <p class="card-text"><small class="text-muted">5 MARS 2020</small></p>
            <div class="text-right">
             ${socialeShare}
            </div>
          </div>
        </a></div>`;
    parentNode.insertAdjacentHTML('beforeend', newsTemplate);

    //  <%-include('../partials/social-share',{url :
    //     "https://www.kinshasadigital.com/kinshasa-digital-academy", title :
    //     info.title})%>
  }
};
