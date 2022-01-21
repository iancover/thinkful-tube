// *** NEED YOUTUBE API_KEY ***

const THINKFULTUBE_SEARCH_URL =
  'https://www.googleapis.com/youtube/v3/search';

const API_KEY = 'eNTerAPiKEyHereOrThISdoEsNTwoRK';

const RESULT_HTML_TEMPLATE =
  '<div class="result-box">' +
  '<a class="js-result-video" href="" target="_blank"><img class="js-result-thumbnail" src=""></a>' +
  '<p class="result-title"><a class="js-result-video" href="" target="_blank"><span class="js-result-title"></span></a></p>' +
  '</div>' +
  '<br>';

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: API_KEY,
    q: searchTerm,
  };
  console.log('getDataFromApi');
  console.log(query);
  $.getJSON(THINKFULTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
  const template = $(RESULT_HTML_TEMPLATE);
  const thumbURL = result.snippet.thumbnails.medium.url;
  const videoTitle = result.snippet.title;
  const videoURL = 'https://www.youtube.com/watch?v=' + result.id.videoId;

  template.find('.js-result-thumbnail').attr('src', thumbURL);
  template.find('.js-result-title').text(videoTitle);
  template.find('.js-result-video').attr('href', videoURL);

  console.log(videoURL);
  console.log('renderResult running');
  return template;
}

function displayYoutubeSearchData(data) {
  const results = data.items.map(function (item, index) {
    console.log('displayYoutubeSearchData running');
    console.log(data);
    return renderResult(item);
  });
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(function (event) {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-searchbox');
    const querySearch = queryTarget.val();
    queryTarget.val('');
    $('h2').show();
    console.log('watchSubmit running');
    getDataFromApi(querySearch, displayYoutubeSearchData); // make that value query to run getDataFromApi
  });
}

$(watchSubmit);
