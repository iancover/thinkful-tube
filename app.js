// *** THINKFUL TUBE CHALLENGE ***

// Stack Overflow endpoint
//    https://stackoverflow.com/search?q= + searchTerm + :1

// YouTube ChannelId URL
//    https://www.youtube.com/channel/ + ChannelId

// api key info:
// name: ThinkfulTube-API-Key
// parameter:  key=API_KEY
// key: AIzaSyBtPKc69l3KmUEHIlxf9dMXZahnAKlgXw4

// video id endpoint: 'https://www.googleapis.com/youtube/v3/watch?v=' or 'https://www.googleapis.com/youtube/v3/videos?id='
// video id key & string: '&key=AIzaSyBtPKc69l3KmUEHIlxf9dMXZahnAKlgXw4&part=snippet,contentDetails,statistics,status'

var THINKFULTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

var RESULT_HTML_TEMPLATE = (
  '<div class="result-box">' +
    '<a class="js-result-video" href="" target="_blank"><img class="js-result-thumbnail" src=""></a>' +
    '<p class="result-title"><a class="js-result-video" href="" target="_blank"><span class="js-result-title"></span></a></p>' +
  '</div>' +
  '<br>'
);

function getDataFromApi(searchTerm, callback) {
  var query = {
    part: 'snippet',
    key: 'AIzaSyBtPKc69l3KmUEHIlxf9dMXZahnAKlgXw4',
    q: searchTerm
  } 
    console.log('getDataFromApi running')
  console.log(query);  
  $.getJSON(THINKFULTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
  var template = $(RESULT_HTML_TEMPLATE);
  
  var thumbURL = result.snippet.thumbnails.medium.url
  var videoTitle = result.snippet.title;
  var videoURL = "https://www.youtube.com/watch?v=" + result.id.videoId;

  template.find(".js-result-thumbnail").attr("src", thumbURL);
  template.find(".js-result-title").text(videoTitle);
  template.find(".js-result-video").attr("href", videoURL);
  
    console.log(videoURL);
  console.log('renderResult running');
  return template;
}

function displayYoutubeSearchData(data) {
  var results = data.items.map(function(item, index) { // note: .map(fn(item,index)) - reads object as array
	    console.log('displayYoutubeSearchData running');
    console.log(data);
    return renderResult(item);
  });
  $('.js-search-results').html(results);
}
// note: 'data' is the json api script that comes back

function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    var queryTarget = $(event.currentTarget).find('.js-searchbox');
    var querySearch = queryTarget.val(); // extracts value from <input> searchbox
    queryTarget.val(""); // clear out input also check $('.js-search-form').reset()
    $('h2').show();
    console.log('watchSubmit running');
    getDataFromApi(querySearch, displayYoutubeSearchData); // make that value query to run getDataFromApi
  });
}

$(watchSubmit);