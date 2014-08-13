(function(){
  'use strict';

  $(document).ready(function(){
    $('#hide').click(hide);
    $('#show').click(show);
    $('form').submit(addRecipe);
    $('#categories a').click(filterCategory);
    $('#recipes').on('click', '.ingredient', filterIngredient);
    $('#recipes').on('click', '.delete', delRecipe); // calls and uses delete function //
  });// google event delegation //

  function filterCategory(e){
    var category = $(this).text();
    $('.recipe .category:contains('+category+')').closest('.recipe').fadeIn();
    $('.recipe .category:not(:contains('+category+'))').closest('.recipe').fadeOut();
    e.preventDefault();
  }

  function filterIngredient(e){ //should filter the ingredients//
    var ingredient = $(this).text();
    $('.recipe .ingredient:not(:contains(' + ingredient + '))').closest('.recipe').fadeOut();
    $('.recipe .ingredient:contains(' + ingredient + ')').closest('.recipe').fadeIn();
    e.preventDefault();
  }

  function delRecipe(){ // delete function //
    var id = $(this).closest('.recipe').attr('data-recipe-id'),
        type = 'delete',
        url = '/recipes/' + id;
    $.ajax({url:url, type:type, dataType:'json', success:function(data){
      var $recipe = $('.recipe[data-recipe-id='+data.id+']');
      $recipe.fadeOut();
      setTimeout(function(){$recipe.remove();}, 2000);
    }});
  }

  function addRecipe(e){  //stops the form from posting itself to a new url//
    var data = $('form').serialize(), // gets the data and puts it in a row. Data//
        type = $('form').attr('method'), // gets an attribute out of a tag. Verb//
        url = $('form').attr('action'); // gets the link. URL//
    //clearing form//
    $('input, textarea').val('');
    $.ajax({url:url, type:type, data:data, dataType:'html', success:function(html){
      var $recipe = $(html);
      $recipe.css('display','none');
      $('#recipes').prepend($recipe); //adds the new recipe to the front of the list of recipes. Append would put it at the end//
      $recipe.fadeIn(4000);
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

