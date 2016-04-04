window.onload = function(){

var genDropDownSection = document.querySelector("section#drop-down-generation");
var pkmnDropDownSection = document.querySelector("section#drop-down-pokemon");
// var tot = (165*151);
// var el = document.createElement("p");
// el.innerHTML = tot;
// genDropDownSection.appendChild(el);

//get data:
pokedex = new Pokedex();

// generation drop down box:
var genDropDown = document.createElement("select");
for (var genNum = 1; genNum <= 6; genNum++){
  var option = document.createElement("option");
  option.value = genNum;
  option.innerText = "Generation " + genNum;
  genDropDown.appendChild(option);
};

genDropDownSection.appendChild(genDropDown);
// //////////////////////////////////////////////////

var pkmnDropDown = document.createElement("select");
pkmnDropDown.id = "pkmn-drop-down";

// create pokemon in selected generation drop down:
var makePkmnDropDown = function(){
  // can I use bind(this) to avoid this "oldPkmnDropDown" bullshit below
  // if so, how?
  while (pkmnDropDown.firstChild){
    pkmnDropDown.removeChild(pkmnDropDown.firstChild);
  }
  var genDropDown = document.querySelector("section#drop-down-generation select");
  for (var pkmnIndex = 0; pkmnIndex < pokedex.listGen[genDropDown.value].length; pkmnIndex++){
    var pkmnOption = document.createElement("option");
    pkmnOption.value = pkmnIndex;
    var nameLower = pokedex.listGen[genDropDown.value][pkmnIndex].name
    var nameCapitalised = nameLower.slice(0,1).toUpperCase() + nameLower.slice(1, nameLower.length).toLowerCase();
    pkmnOption.innerText = nameCapitalised;
    pkmnDropDown.appendChild(pkmnOption)
  };
  pkmnDropDownSection.appendChild(pkmnDropDown);
};

var infoBox = document.querySelector("section#pkmn-info-box");


var makePkmnInfoBox = function(name){
  // how do i delay this properly?
  // A: pass the display function to the pokemon constructor, so you can have it only invoke when the request has returned
  var showPkmnData = function(){
    // console.log(pkmn.natDexId, pkmn.types, pkmn.sprites, "moves:", pkmn.moves);
    console.log(pkmn);

    while (infoBox.firstChild){
      infoBox.removeChild(infoBox.firstChild);
    };

    var heading = document.createElement("h4");
    heading.innerText = "#" + pkmn.natDexId + " - " + pkmn.name;
    infoBox.appendChild(heading);

    if (pkmn.sprites.front){
      var spriteFront = document.createElement("img");
      spriteFront.src = pkmn.sprites.front;
      infoBox.appendChild(spriteFront);
    }

    if (pkmn.sprites.back){
      var spriteBack = document.createElement("img");
      spriteBack.src = pkmn.sprites.back;
      infoBox.appendChild(spriteBack);
    }
    if (pkmn.sprites.shinyFront){
      var spriteShinyFront = document.createElement("img");
      spriteShinyFront.src = pkmn.sprites.shinyFront;
      infoBox.appendChild(spriteShinyFront);
    }
    console.log(pkmn.sprites.shinyBack);

    if (pkmn.sprites.shinyBack){
      var spriteShinyBack = document.createElement("img");
      spriteShinyBack.src = pkmn.sprites.shinyBack;
      infoBox.appendChild(spriteShinyBack);
    }

    var types = document.createElement("p");
    types.innerText = "Type(s):";
    for (var i = 0; i < pkmn.types.length; i++){
      types.innerText += (" " + pkmn.types[i]);
    };
    infoBox.appendChild(types);

    var movesDropDownLabel = document.createElement("label")
    movesDropDownLabel.for = "moves-list";
    movesDropDownLabel.innerText = "Moves: ";
    var movesDropDown = document.createElement("select");
    movesDropDown.id = "moves-drop-down";
    movesDropDown.name = "moves-list";
    for (var i = 0; i < pkmn.moves.length; i++){
      var option = document.createElement("option");
      option.value = i;
      option.innerText = pkmn.moves[i];
      movesDropDown.appendChild(option);
    }
    movesDropDownLabel.appendChild(movesDropDown);
    infoBox.appendChild(movesDropDownLabel);
  };
  var pkmn = new Pokemon(name, showPkmnData);
}


makePkmnDropDown();
var selectedOption = document.querySelector("section#drop-down-pokemon option[value='"+ pkmnDropDown.value +"']");
console.log(pkmnDropDown.value);
makePkmnInfoBox(selectedOption.innerHTML.toLowerCase());

genDropDown.onchange = function(){
  makePkmnDropDown();
  var selectedOption = document.querySelector("section#drop-down-pokemon option[value='"+ pkmnDropDown.value +"']");  
  makePkmnInfoBox(selectedOption.innerHTML.toLowerCase());
}
// //////////////////////////////////////////////////



pkmnDropDown.onchange = function(){
  var selectedOption = document.querySelector("section#drop-down-pokemon option[value='"+ pkmnDropDown.value +"']");

  makePkmnInfoBox(selectedOption.innerHTML.toLowerCase());
}



};// window.onload end
