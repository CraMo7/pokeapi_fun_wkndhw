API requests are both in the object constructors. Currently just in Pokedex and Pokemon constructors.

Pokedex constructor is called on line 11 of app.js, and Pokemon constructor is called within the "makePkmnInfoBox" function - which is passed the appropriate pokemon name by accessing the innerHTML of the drop down option tag - makePkmnInfoBox function is defined lines 50-112 of app.js - invoked on lines 118, 123 and 132 of app.js.

The constructors define and then invoke their respective object methods, each named getData.
These methods get the data from the appropriate path at pokeapi.co, and, once the requests are completed and the data retreived, store them as properties of the pokedex and pokemon objects being contructed. The data can then be accessed from the objects in app.js to be displayed.
