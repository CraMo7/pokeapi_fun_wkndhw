var Pokedex = function(){
  this.getData = function(gen){
        var limit = this.genDict[gen].limit;
        var offset = this.genDict[gen].offset;
        var url = "http://pokeapi.co/api/v2/pokemon/?limit="+limit+"&offset="+offset;
        console.log("getting data from", url);
        var request = new XMLHttpRequest;
        request.open("GET", url);
        request.send();
        request.onload = function(){
          if (request.status >= 200 && request.status < 400){
            console.log("api GET successful");
            this.listGen["gen"+gen] = JSON.parse(request.responseText).results;
            console.log("got data from api for gen", gen);
            localStorage.setItem("pokedex_gen"+gen, JSON.stringify(this.listGen["gen"+gen]));
          };// if status valid end
        }.bind(this);// request.onload end
  };//getData function end

  this.listGen = {};
  for (var genNum = 1; genNum <= 6; genNum++){
    this.listGen[genNum] = JSON.parse(localStorage.getItem("pokedex_gen"+genNum))
    console.log("looking for gen", genNum, "data in Local Storage");
  };
  this.genDict = {
    1: {limit: 151, offset: 0},
    2: {limit: 100, offset: 151},
    3: {limit: 135, offset: 251},
    4: {limit: 107, offset: 386},
    5: {limit: 156, offset: 493},
    6: {limit: 72, offset: 649}
  };

  for (var genNum = 1; genNum <= 6; genNum++){
    if (!this.listGen[genNum]){
      console.log("local storage data for gen", genNum, "not found");
      this.getData(genNum);
    }
  }

};// Pokedex constructor end

Pokedex.prototype = {

};// prototype methods end