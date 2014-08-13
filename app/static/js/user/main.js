(function(){
  'use strict';

  $(document).ready(function(){
    $('#hide').click(hide);
    $('#show').click(show);
    $('form').submit(addRecipe);
  });

  function addRecipe(e){  //stops the form from posting itself to a new url//
    var data = $('form').serialize(), // gets the data and puts it in a row. Data//
        type = $('form').attr('method'), // gets an attribute out of a tag. Verb//
        url = $('form').attr('action'); // gets the link. URL//
    //clearing form//
    $('input, textarea').val('');
    //hiding form//
    hide();
    $.ajax({url:url, type:type, data:data, dataType:'html', success:function(html){
      $('#recipes').prepend(html); //adds the new recipe to the front of the list of recipes. Append would put it at the end//
    }}); //sends the data over the internet using ajax. Waits for a response. Plugs in the variables declared above and dataType plus success function//
    e.preventDefault(); //stops the page from loading a new page (default)//
  }

  function hide(){
    $('form').fadeOut();
  }

  function show(){
    $('form').fadeIn();
  }

})();

