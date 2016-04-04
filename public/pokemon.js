var Pokemon = function(name){
  var nameCapitalised = name.slice(0,1).toUpperCase() + name.slice(1, name.length).toLowerCase()
  this.name = nameCapitalised;
  this.natDexId;
  this.moves = [];
  this.sprites = {front: "", back: "", shinyFront: "", shinyBack: ""};
  this.types = [];


  // add localStorage saving // //////////////////////////////////////////////////

  this.getData = function(){
    var url = "http://pokeapi.co/api/v2/pokemon/" + name;
    console.log("getting data from", url);
    var request = new XMLHttpRequest;
    request.open("GET", url);
    request.send();
    request.onload = function(){
      if (request.status >= 200 && request.status < 400){
        console.log("api GET successful");
        var pkmnData = JSON.parse(request.responseText);
        console.log("got data from api for pokemon:", name);
        console.log(pkmnData);
        this.natDexId = pkmnData.id;
        for (var i = 0; i < pkmnData.types.length; i++){
          this.types.unshift(pkmnData.types[i].type.name);
        };
        for (var i = 0; i < pkmnData.moves.length; i++){
          this.moves.push(pkmnData.moves[i].move.name);
        };
        this.sprites.front = pkmnData.sprites.front_default;
        this.sprites.back = pkmnData.sprites.back_default;
        this.sprites.shinyFront = pkmnData.sprites.front_shiny;
        this.sprites.shinyBack = pkmnData.sprites.back_shiny;
        // localStorage.setItem("key", JSON.stringify(objectToStore));
      };// if status valid end
    }.bind(this);// request.onload end
  };//getData function end

  this.getData();


}