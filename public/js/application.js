$(document).ready(function () {

});






function formScrape (formObject){
  if (formObject.find('input').attr('name') === "_method"){
    var realMethod = formObject.find('input').attr('value');
  } else {
    var realMethod = formObject.attr('method');
  }
  var scrape = {
    url: formObject.attr('action'),
    method: realMethod,
    data: formObject.serialize()
  };
  return scrape
}
