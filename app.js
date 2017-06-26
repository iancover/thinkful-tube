// Thinkful Tube


// *** API KEY INFO ***

// name: ThinkfulTube-API-Key
// pass as parameter:  key=API_KEY
// key: AIzaSyBtPKc69l3KmUEHIlxf9dMXZahnAKlgXw4

var THINKFULTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

var RESULT_HTML_TEMPLATE = (
  '<div>' +
    '<h2>' +
    '<a class="js-result-name" href="" target="_blank"></a></h2>' +
  '</div>'
);

function getDataFromApi(searchTerm, callback) {
  var query = {
    part: 'snippet',
    key: '',
    q: searchTerm + ''
  }
  $.getJSON(THINKFULTUBE_SEARCH_URL, query, callback);
}


function renderResult(result) {
  var template = $(RESULT_HTML_TEMPLATE);
  template.find(".js-result-name").text(result.name).attr("href", result.html_url);
  return template;
}

function displayYoutubeSearchData(data) {
  var results = data.items.map(function(item, index) {
    return renderResult(item);
  });
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    var queryTarget = $(event.currentTarget).find('.js-query');
    var query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYoutubeSearchData);
  });
}

$(watchSubmit);