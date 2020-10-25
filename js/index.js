// This script controls the mechanics behind the game.
// Developed by the data journalism team of the Hessischer Rundfunk in 2018
// Adpated by Torsten Heycke

/*  Copyright (C) 2018  Till Hafermann, Miguel Pascual Sanina, hr-Datenteam

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// CUSTOMIZATION:

// dropdown for choosing a card
var chooseCardMsg = "(Choose card)";
// error message if no card is chosen
var noCardSelectionMsG = "No card selected";
// error message if wrong number of categories is chosen
var noCategorySelectionMsG = "Select exactly five categories";
var turnWonMsg = "You won!"; // turn won
var turnLostMsg = "You lost..."; // turn lost
var turnDrawMsg = "You tied."; // turn results in draw
var gameWonMsg = "You won: "; // game won
var gameLostMsg = "You lost: "; // game lost
var gameDrawMsg = "You tied: "; // game results in draw
// text to display in infoline while player choses category
var turnWaitMsg = "Choose categories";
// text to display in infoline when game is over
var gameOverMsg = "Game over";
// text to display in infoline when summary is shown
var gameWaitMsg = "Start new game?";


// Game is configured for 10 rounds and five categories per card.
// Change this here. Progress bar percentage should be 100/number of Rounds.

var numberOfRounds = 10;
var numberOfCategories = 6;
var progressBarPercentage = "width: 14.29%";
var currentRound = 1;


// CUSTOMIZATION: Enter your data for the cards here
// Example data for countries of the EU taken from various Wikipedia pages (Oct. 22, 2018)

// Data header: Names of the categories, first one = title of the card
var data_header = ["Playername", "TDs", "INTs", "QBR", "SACKS",
				   "YDS", "COMP %"];

// Category names for summary
var summary_header = ["", "TDS", "INTS", "QBR", "SACKS",
"YDS", "COMP"];

// Units if necessary, first entry always empty
var data_suffix = ["", "", "", " ", "", " total yards",""];

// Specify which number wins: larger or smaller, first entry always empty
var data_comparison = ["", "larger", "smaller", "larger", "smaller", "larger", "larger"];

// One array per card, structure: Title first, then category values
var TomBrady = ["Tom Brady",24,8,89.1,27,4057,60.8];
var AaronRodgers = ["Aaron Rodgers",26,4,95.7,36,4002,62];
var RussellWilson = ["Russell Wilson",31,5,107.8,48,4110,66.1];
var DrewBrees = ["Drew Brees",27,4,75.5,12,2979,74.3];
var MattRyan = ["Matt Ryan",26,14,86.7,48,4466,66.2];
var BenRoethlisberger = ["Ben Roethlisberger",0,1,66.5,2,351,56.5];
var CamNewton = ["Cam Newton",0,1,17.8,6,572,56.2];
var PhilipRivers = ["Philip Rivers",23,20,92,34,4615,66];
var CarsonWentz = ["Carson Wentz",27,7,93.7,37,4039,63.9];
var MatthewStafford = ["Matthew Stafford",19,5,60.1,18,2499,64.3];
var JimmyGaroppolo = ["Jimmy Garoppolo",27,13,102.5,36,3978,69.1];
var DerekCarr = ["Derek Carr",21,8,100,29,4054,70.4];
var JaredGoff = ["Jared Goff",22,16,86.3,22,4638,62.9];
var DakPrescott = ["Dak Prescott",30,11,101,23,4902,65.1];
var DeshaunWatson = ["Deshaun Watson",26,12,92.2,44,3852,67.3];
var KirkCousins = ["Kirk Cousins",26,6,101.3,28,3603,69.1];
var TyrodTaylor = ["Tyrod Taylor",1,0,13.1,0,33,66.7];
var CaseKeenum = ["Case Keenum",11,5,49,15,1707,64.8];
var BakerMayfield = ["Baker Mayfield",22,21,76.9,40,3827,59.4];
var NickFoles = ["Nick Foles",3,2,43.5,8,736,65.8];
var BlakeBortles = ["Blake Bortles",0,0,3.5,0,3,50];
var JameisWinston = ["Jameis Winston",33,30,86.8,47,5109,60.7];
var MarcusMariota = ["Marcus Mariota",7,2,40.8,25,1203,59.4];
var LamarJackson = ["Lamar Jackson",36,6,101.7,23,3127,66.1];
var JoeFlacco = ["Joe Flacco",6,5,85.1,26,1,822,65.3];
var JoshRosen = ["Josh Rosen",1,5,13.8,16,567,53.2];
var TeddyBridgewater = ["Teddy Bridgewater",9,2,44.3,12,1384,67.9];
var JoshMcCown = ["Josh McCown",0,0,4.5,0,24,60];
var RyanTannehill = ["Ryan Tannehill",22,6,81.8,31,2742,70.3];
var AndyDalton = ["Andy Dalton",16,14,62.4,37,3494,59.5];
var MitchTrubisky = ["Mitch Trubisky",17,10,78.7,38,3138,63.2];
var JarrettStidham = ["Jarrett Stidham",0,1,4.8,1,14,50];
var PatrickMahomes = ["Patrick Mahomes",26,5,91.7,17,4031,65.9];
var JacobyBrissett = ["Jacoby Brissett",18,6,82.9,27,2942,60.9];
var EliManning = ["Eli Manning",6,5,21.2,5,1042,61.9];
var RyanFinley = ["Ryan Finley",2,2,11.9,11,474,47.1];
var SamDarnold = ["Sam Darnold",19,13,70.2,33,3024,61.9];
var MattMoore = ["Matt Moore",4,0,21.2,8,659,64.8];
var DwayneHaskins = ["Dwayne Haskins",7,7,43.5,29,1365,58.6];
var KylerMurray = ["Kyler Murray",20,12,88.8,48,3722,64.4];
var JoshAllen = ["Josh Allen",20,9,86.2,38,3089,58.8];
var DevlinHodges = ["Devlin Hodges",5,8,45.9,15,1063,62.5];
var DanielJones = ["Daniel Jones",24,12,69.8,38,3027,61.9];
var RyanFitzpatrick = ["Ryan Fitzpatrick",20,13,80.6,40,3529,62];
var MasonRudolph = ["Mason Rudolph",13,9,52.1,15,1765,62.2];
var DavidBlough = ["David Blough",4,6,20,14,984,54];
var GardnerMinshew = ["Gardner Minshew",21,6,79.9,33,3271,60.6];
var DrewLock = ["Drew Lock",7,3,92.4,5,1020,64.1];
var MikeGlennon = ["Mike Glennon",1,0,13.1,0,56,60];
var TrevorSiemian = ["Trevor Siemian",0,0,28.1,2,3,50];
var RobertGriffinIII = ["Robert Griffin III",1,2,27.4,5,225,60.5];


// group cards in one array
var allCards = [TomBrady, AaronRodgers, RussellWilson, DrewBrees, MattRyan, BenRoethlisberger, 
  CamNewton, PhilipRivers, CarsonWentz, MatthewStafford, JimmyGaroppolo, DerekCarr, 
  JaredGoff, DakPrescott, DeshaunWatson, KirkCousins, TyrodTaylor, CaseKeenum, BakerMayfield, 
  NickFoles, BlakeBortles, JameisWinston, MarcusMariota, LamarJackson, JoeFlacco, 
  JoshRosen, TeddyBridgewater, JoshMcCown, RyanTannehill, AndyDalton, MitchTrubisky, JarrettStidham, PatrickMahomes, JacobyBrissett, EliManning, RyanFinley, SamDarnold, MattMoore, DwayneHaskins, KylerMurray, JoshAllen, DevlinHodges, DanielJones, RyanFitzpatrick, MasonRudolph, DavidBlough, GardnerMinshew, DrewLock, MikeGlennon, TrevorSiemian, RobertGriffinIII];

// list of cards in case player wants to choose a specific card to play with
// list of arrays with variable name and title of card
var cardsList = [["jameiswinston", "Jameis Winston"], ["belgium", "Belgium"],
	["bulgaria", "Bulgaria"], ["croatia", "Croatia"], ["cyprus", "Cyprus"],
	["czechrepublic", "Czech Republic"], ["denmark", "Denmark"], ["estonia", "Estonia"],
	["finland", "Finland"], ["france", "France"], ["germany", "Germany"],
	["greece", "Greece"], ["hungary", "Hungary"], ["ireland", "Ireland"],
	["italy", "Italy"], ["latvia", "Latvia"], ["lithuania", "Lithuania"],
	["luxembourg", "Luxembourg"], ["malta", "Malta"],
	["netherlands", "Netherlands"], ["poland", "Poland"], ["portugal", "Portugal"],
	["romania", "Romania"], ["slovakia", "Slovakia"], ["slovenia", "Slovenia"],
	["spain", "Spain"], ["sweden", "Sweden"], ["uk", "United Kingdom"]];



// Inititate buttons and information displays
var startGameButton;
var startTurnButton;
var newGameButton;
var showSummaryButton;
var waitingButton;
var infoLine;
var summaryList;
var gameProgressBar;
var computerCardDiv;


// set width of hud and button container on small devices
var viewportWidth = $(window).width();

if (viewportWidth <= 576) {
  $("#hudcontent").css( "maxWidth", viewportWidth );
  $("#buttons").css( "maxWidth", viewportWidth );
  $("#infocontent").css( "maxWidth", viewportWidth );
}

// initiate variables for later use
var gameMode;
var chosenCard;
var chosenCategories;
var playerCards;
var computerCards;
var playerPoints;
var computerPoints;
var playerCount;
var computerCount;
var currentPlayerCard;
var currentComputerCard;
var stateOfGame;

// format numbers for display,
// decimal divider is ".", thousands separator is ","
function formatNumbers(num){
  return (
    num
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
	  // for German locale use lines below
      // .replace(".",",")
      // .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    );
}

// function to randomly shuffle arrays
function shuffleCards() {
  //Shuffles an array
  var currentIndex = allCards.length;
  var temporaryValue;
  var randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = allCards[currentIndex];
    allCards[currentIndex] = allCards[randomIndex];
    allCards[randomIndex] = temporaryValue;
  }

}


//Set button-states
//1=game mode selection
//2=category selection
//3=start game
//4=start next turn
//5=turn in progress
//6=last turn finished
//7=showing summary

function updateButtons(state) {
  stateOfGame = state;
  switch(state) {
    case 1:
      // Show only game mode selectors
      document.getElementById("hud").style.display = "none";
      document.getElementById("hud2").style.display = "none";
      document.getElementById("getMode").style.display = "flex";
      document.getElementById("getCategories").style.display = "none";
      document.getElementById("summary").style.display = "none";
      document.getElementById("cards").style.display = "none";
      document.getElementById("buttons").style.display = "none";
      newGameButton.style.display = "none";
      // Reset summary
      while (summaryList.hasChildNodes()) {
        summaryList.removeChild(summaryList.lastChild);
      }

      getMode();
      break;
    case 2:
      // Show only category selectors
      document.getElementById("hud").style.display = "none";
      document.getElementById("hud2").style.display = "none";
      document.getElementById("getMode").style.display = "none";
      document.getElementById("getCategories").style.display = "flex";
      document.getElementById("summary").style.display = "none";
      document.getElementById("cards").style.display = "none";
      document.getElementById("buttons").style.display = "none";
      getCategories();
      break;
    case 3:
      // Disable all buttons, show "waiting"-button, hide summary, show carddeck
      document.getElementById("hud").style.display = "block";
//      document.getElementById("hud2").style.display = "flex";
      document.getElementById("getMode").style.display = "none";
      document.getElementById("getCategories").style.display = "none";
      document.getElementById("summary").style.display = "none";
      document.getElementById("cards").style.display = "block";
      document.getElementById("buttons").style.display = "flex";
      startGameButton.style.display = "none";
      startTurnButton.style.display = "none";
      newGameButton.style.display = "none";
      waitingButton.style.display = "inline";
      showSummaryButton.style.display = "none";
      infoLine.innerHTML = "";
      break;
    case 4:
      // Display button to start next turn
      startGameButton.style.display = "none";
      startTurnButton.style.display = "inline";
      newGameButton.style.display = "none";
      waitingButton.style.display = "none";
      showSummaryButton.style.display = "none";
      break;
    case 5:
      // Disable all buttons, show "waiting"-button, reset infoline
      startGameButton.style.display = "none";
      startTurnButton.style.display = "none";
      newGameButton.style.display = "none";
      waitingButton.style.display = "inline";
      showSummaryButton.style.display = "none";
      infoLine.classList.remove("text-success");
      infoLine.classList.remove("text-danger");
      infoLine.classList.remove("text-warning");
      infoLine.classList.add("text-light");
      infoLine.innerHTML = "<h4 class='mb-1'>Round " + currentRound + " of " +
                           numberOfRounds + "</h4>";
      break;
    case 6:
      // Show button to display summary after last turn
      startGameButton.style.display = "none";
      startTurnButton.style.display = "none";
      newGameButton.style.display = "none";
      waitingButton.style.display = "none";
      showSummaryButton.style.display = "inline";
      break;
    case 7:
      // Show summary, hide cards, show "new game"-button
      startGameButton.style.display = "none";
      startTurnButton.style.display = "none";
      newGameButton.style.display = "inline";
      waitingButton.style.display = "none";
      showSummaryButton.style.display = "none";
      infoLine.style.display = "none";
      document.getElementById("summary").style.display = "block";
      document.getElementById("cards").style.display = "none";
      document.getElementById("hud2").style.display = "none";
      break;
  }
}

function getMode() {
  // function to let user select a game mode:
  // either classic with a random card in each round
  // or play with one card throughout the entire game

  var cardsListDropdown = document.getElementById("chosenCardSelect");
  var noCardSelectionDiv = document.getElementById("noCardSelection");
  noCardSelectionDiv.innerHTML = "";

  // Reset list of cards to choose from first
  while (cardsListDropdown.hasChildNodes()) {
    cardsListDropdown.removeChild(cardsListDropdown.lastChild);
  }

  // Build list of all cards to choose from
  var chooseCardMsgElement = document.createElement("option");
  chooseCardMsgElement.value = "noSelection";
  var chooseCardMsgContent = document.createTextNode(chooseCardMsg);
  chooseCardMsgElement.appendChild(chooseCardMsgContent);
  cardsListDropdown.appendChild(chooseCardMsgElement);

  var newCardInList;
  var newCardInListContent;

  for (i = 0; i < cardsList.length; i+=1) {
    newCardInList = document.createElement("option");
    newCardInList.value = cardsList[i][0];
    newCardInListContent = document.createTextNode(cardsList[i][1]);
    newCardInList.appendChild(newCardInListContent);
    cardsListDropdown.appendChild(newCardInList);
  }


  // build random list of categories - delete this section if
  // getCategories() will be used

  chosenCategories = [];
  for (i = 1; i < data_header.length; i+=1) {
    chosenCategories.push(i);
  }

  var currentCatIndex = chosenCategories.length;
  var temporaryCatValue;
  var randomCatIndex;

  // While there remain elements to shuffle...
  while (0 !== currentCatIndex) {

    // Pick a remaining element...
    randomCatIndex = Math.floor(Math.random() * currentCatIndex);
    currentCatIndex -= 1;

    // And swap it with the current element.
    temporaryCatValue = chosenCategories[currentCatIndex];
    chosenCategories[currentCatIndex] = chosenCategories[randomCatIndex];
    chosenCategories[randomCatIndex] = temporaryCatValue;
  }

  // Use number (specified before) of categories of shuffled list
  chosenCategories = chosenCategories.slice(0, numberOfCategories);



  // Let player choose game mode
  $(document).on("click", "#randomCards", function() {
    gameMode = "random";
    initGame();
  });

  $(document).on("click", "#chosenCardButton", function() {
    gameMode = "fixedCard";
    chosenCard = $("#chosenCardSelect :selected").val();

    if (chosenCard == "noSelection") {
      noCardSelectionDiv.innerHTML = noCardSelectionMsG;
    } else {
      initGame();
    }

  });

}

function getCategories() {
  // function to let user select, which categories to play with:
  // either with five random categories (currently)
  // or with five fixed categories

  var categoriesList = document.getElementById("chosenCategoriesList");
  var noCategorySelectionDiv = document.getElementById("noCategorySelection");
  noCategorySelectionDiv.innerHTML = "";

  // Reset checkboxes for categories
  while (categoriesList.hasChildNodes()) {
    categoriesList.removeChild(categoriesList.lastChild);
  }

  // Build checkboxes with categories
  var newCategoryCheckbox;
  var newCategoryInput;
  var newCategoryLabel;
  var newCategoryLabelContent;

  for (i = 1; i < data_header.length; i+=1) {
    newCategoryCheckbox = document.createElement("div");
    newCategoryCheckbox.classList.add("custom-control", "custom-checkbox",
                                      "custom-control-inline");

    newCategoryInput = document.createElement("input");
    newCategoryInput.id = i;
    newCategoryInput.classList.add("custom-control-input");
    newCategoryInput.type = "checkbox";

    newCategoryLabel = document.createElement("label");
    newCategoryLabel.classList.add("custom-control-label");
    newCategoryLabel.setAttribute("for", i);
    newCategoryLabelContent = document.createTextNode(data_header[i]);
    newCategoryLabel.appendChild(newCategoryLabelContent);

    newCategoryCheckbox.appendChild(newCategoryInput);
    newCategoryCheckbox.appendChild(newCategoryLabel);

    categoriesList.appendChild(newCategoryCheckbox);
  }

  // Let player choose categories

  // If player chooses random categories, create random array of five numbers
  $(document).on("click", "#randomCategories", function() {
    chosenCategories = [];
    for (i = 1; i < data_header.length; i+=1) {
      chosenCategories.push(i);
    }

    var currentCatIndex = chosenCategories.length;
    var temporaryCatValue;
    var randomCatIndex;

    // While there remain elements to shuffle...
    while (0 !== currentCatIndex) {

      // Pick a remaining element...
      randomCatIndex = Math.floor(Math.random() * currentCatIndex);
      currentCatIndex -= 1;

      // And swap it with the current element.
      temporaryCatValue = chosenCategories[currentCatIndex];
      chosenCategories[currentCatIndex] = chosenCategories[randomCatIndex];
      chosenCategories[randomCatIndex] = temporaryCatValue;
    }

    // Use first five categories of shuffled list
    chosenCategories = chosenCategories.slice(0, numberOfCategories);

    initGame();

  });

  // if player chooses own categories, store in array
  $(document).on("click", "#chosenCategoriesButton", function() {
    chosenCategories = [];
    for (i = 1; i < data_header.length; i+=1) {
      currentCatID = "#" + i;
      if ($(currentCatID).is(":checked"))
        chosenCategories.push(i);
    }

    if (chosenCategories.length != numberOfCategories) {
      noCategorySelectionDiv.innerHTML = noCategorySelectionMsG;
    } else {
      initGame();
    }
  });

}

function buildDecks() {
  // Assign cards to player and computer according to game mode selection

  if (gameMode == "random") {
    // Deal 10 random cards each 
    playerCards = allCards.slice(0, numberOfRounds);
    computerCards = allCards.slice(numberOfRounds, 20);
  } else {
    // assign the chosen card to player 10 times
    playerCards = [];
    for (i = 0; i < numberOfRounds; i+=1) {
      playerCards.push(eval(chosenCard));
    }
    // remove chosen player card from cards, assign computer random cards
    chosenCardIndex = allCards.indexOf(eval(chosenCard));
    allCards.splice(chosenCardIndex, 1);
    computerCards = allCards.slice(0, numberOfRounds);
  }

}

function updateScore() {
  // function to display the current score
  playerCount = document.getElementById("player_count");
  computerCount = document.getElementById("computer_count");
  playerCount.innerHTML = playerPoints;
  computerCount.innerHTML = computerPoints;
}

function buildComputerCard() {
  // function to display the current card of the computer
  computerCardDiv.classList.toggle("flip");

  var computerCardBack = document.getElementById("computerCardBack");
  computerCardBack.style.height = $(playercard).height() + "px";
  var computercardBackHeader=document.getElementById("computercardBackHeader");
  computercardBackHeader.innerHTML =  currentComputerCard[0];


  setTimeout(function(){
    //wait with card content so as not to display it before card is flipped back

    // Change heading of computer card
    var computercardHeader = document.getElementById("computercard_header");
    computercardHeader.innerHTML = "<h3 class='m-3 card-title'>" +
                                   currentComputerCard[0] + "</h3>";

    // Fill in computer card by looping through card-array
    var computercardCategories = document
      .getElementById("computercard_categories");
    computercardCategories.innerHTML = "";
    for (i = 0; i < chosenCategories.length; i+=1) {

      var currentCategory = chosenCategories[i];

      // make new row
      var newRow = document.createElement("div");
      newRow.id = "computer_category_row" + currentCategory;
      newRow.classList.add("list-group-item", "d-flex",
                           "w-100", "justify-content-between");
      document.getElementById("computercard_categories").appendChild(newRow);

      // category
      var newCat = document.createElement("h6");
      var newCatContent = document.createTextNode(data_header[currentCategory]);
      newCat.appendChild(newCatContent);
      document.getElementById("computer_category_row" + currentCategory)
        .appendChild(newCat);

      // show value
      var newVal = document.createElement("span");
      var currentValue = formatNumbers(currentComputerCard[currentCategory]);
      var newValContent = document
        .createTextNode(currentValue + data_suffix[currentCategory]);
      newVal.appendChild(newValContent);
      newVal.id = "computercardCategory" + currentCategory;
      newVal.classList.add("category_nolink");
      document.getElementById("computer_category_row" + currentCategory)
        .appendChild(newVal);
    }
  }, 500);
}


// functions needed when page loads
$(document).ready(function() {

  startGameButton = document.getElementById("startGame");
  startGameButton.addEventListener("click", initGame);

  startTurnButton = document.getElementById("startTurn");
  startTurnButton.addEventListener("click", initTurn);

  newGameButton = document.getElementById("newGame");
  newGameButton.addEventListener("click", initNewGame);

  showSummaryButton = document.getElementById("showSummary");
  showSummaryButton.addEventListener("click", initSummary);

  waitingButton = document.getElementById("waiting");

  infoLine = document.getElementById("info_line");
  summaryList = document.getElementById("summary_list");
  gameProgressBar = document.getElementById("gameProgress");

  computerCardDiv = document.getElementById("computercard");


  // Players turn: player chooses category
  $(document).on("click", ".category_link", function(event) {

    if (stateOfGame == 5) {

      var computerCardDiv = document.getElementById("computercard");
      var firstComputerCard = currentComputerCard;
      var firstPlayerCard = currentPlayerCard;

      // turn over computer card
      computerCardDiv.classList.toggle("flip");

      // log the chosen category
      var categoryID = parseInt(this.id.slice(-1));
      if (categoryID == 0) {
        categoryID = 10;
      }
      var chosenPlayerCategory = document
        .getElementById("playercardCategory" + categoryID);
      var chosenComputerCategory = document
        .getElementById("computercardCategory" + categoryID);

      // Prepare summary entry

      var newSummaryLine = document.createElement("div");
      newSummaryLine.classList.add("d-flex", "w-100", "border-top", "py-1");


      var newSummaryPlayer = document.createElement("div");
      newSummaryPlayer.classList.add("text-right", "summary_left")
      newSummaryPlayer.innerHTML = currentPlayerCard[0] + "<br>" +
        formatNumbers(currentPlayerCard[categoryID]) + data_suffix[categoryID];

      var newSummaryCat = document.createElement("div");
      newSummaryCat.classList
        .add("text-center", "d-inline-block", "px-1", "text-secondary", "summary_center")
      newSummaryCat.innerHTML = "<i>" + summary_header[categoryID] + "</i>";

      var newSummaryComputer = document.createElement("div");
      newSummaryComputer.classList.add("text-left", "summary_right")
      newSummaryComputer.innerHTML = currentComputerCard[0] + "<br>" +
        formatNumbers(currentComputerCard[categoryID]) +data_suffix[categoryID];

      if (data_comparison[categoryID] == "larger") {
        if (firstPlayerCard[categoryID] > firstComputerCard[categoryID]) {
          newSummaryPlayer.classList.add("winner");
        } else if (firstPlayerCard[categoryID] < firstComputerCard[categoryID]){
          newSummaryComputer.classList.add("winner");
        }
      } else {
        if (firstPlayerCard[categoryID] < firstComputerCard[categoryID]) {
          newSummaryPlayer.classList.add("winner");
        } else if (firstPlayerCard[categoryID] > firstComputerCard[categoryID]){
          newSummaryComputer.classList.add("winner");
        }
      }

      newSummaryLine.appendChild(newSummaryPlayer);
      newSummaryLine.appendChild(newSummaryCat);
      newSummaryLine.appendChild(newSummaryComputer);

      summaryList.appendChild(newSummaryLine);

      // Prepare progress-bar

      var progressBarWin = document.createElement("div");
      progressBarWin.classList.add("progress-bar", "bg-success");
      progressBarWin.style = progressBarPercentage;
      progressBarWin.role = "progressbar";

      var progressBarLose = document.createElement("div");
      progressBarLose.classList.add("progress-bar", "bg-danger");
      progressBarLose.style = progressBarPercentage;
      progressBarLose.role = "progressbar";

      var progressBarDraw = document.createElement("div");
      progressBarDraw.classList.add("progress-bar", "bg-warning");
      progressBarDraw.style = progressBarPercentage;
      progressBarDraw.role = "progressbar";

      // compare values, change message accordingly, update score

      if (data_comparison[categoryID] == "larger") {
        if (firstPlayerCard[categoryID] > firstComputerCard[categoryID]) {
          chosenPlayerCategory.classList.add("text-success");
          chosenComputerCategory.classList.add("text-danger");
          infoLine.classList.remove("text-light");
          infoLine.classList.add("text-success");
          infoLine.innerHTML = "<h4 class='mb-1'>" + turnWonMsg + "</h4>";
          gameProgressBar.appendChild(progressBarWin);
          playerPoints += 1;
        } else if (firstPlayerCard[categoryID] < firstComputerCard[categoryID]){
          chosenPlayerCategory.classList.add("text-danger");
          chosenComputerCategory.classList.add("text-success");
          infoLine.classList.remove("text-light");
          infoLine.classList.add("text-danger");
          infoLine.innerHTML = "<h4 class='mb-1'>" + turnLostMsg + "</h4>";
          gameProgressBar.appendChild(progressBarLose);
          computerPoints += 1;
        } else {
          chosenPlayerCategory.classList.add("text-warning");
          chosenComputerCategory.classList.add("text-warning");
          infoLine.classList.remove("text-light");
          infoLine.classList.add("text-warning");
          infoLine.innerHTML = "<h4 class='mb-1'>" + turnDrawMsg + "</h4>";
          gameProgressBar.appendChild(progressBarDraw);
        }
      } else {
        if (firstPlayerCard[categoryID] < firstComputerCard[categoryID]) {
          chosenPlayerCategory.classList.add("text-success");
          chosenComputerCategory.classList.add("text-danger");
          infoLine.classList.remove("text-light");
          infoLine.classList.add("text-success");
          infoLine.innerHTML = "<h4 class='mb-1'>" + turnWonMsg + "</h4>";
          playerPoints += 1;
          gameProgressBar.appendChild(progressBarWin);
        } else if (firstPlayerCard[categoryID] > firstComputerCard[categoryID]){
          chosenPlayerCategory.classList.add("text-danger");
          chosenComputerCategory.classList.add("text-success");
          infoLine.classList.remove("text-light");
          infoLine.classList.add("text-danger");
          gameProgressBar.appendChild(progressBarLose);
          infoLine.innerHTML = "<h4 class='mb-1'>" + turnLostMsg + "</h4>";
          computerPoints += 1;
        } else {
          chosenPlayerCategory.classList.add("text-warning");
          chosenComputerCategory.classList.add("text-warning");
          infoLine.classList.remove("text-light");
          infoLine.classList.add("text-warning");
          infoLine.innerHTML = "<h4 class='mb-1'>" + turnDrawMsg + "</h4>";
          gameProgressBar.appendChild(progressBarDraw);
        }
      }

      updateScore();


      //remove current card from decks

      playerCards.shift();
      computerCards.shift();
      currentRound += 1;

      // Proceed: Next card, if cards left or summary, if no cards left

      if (playerCards.length > 0) {
        updateButtons(4);
      } else {
        updateButtons(6);
        infoLine.classList.remove("text-success");
        infoLine.classList.remove("text-warning");
        infoLine.classList.remove("text-danger");
        infoLine.classList.add("text-light");
        infoLine.innerHTML = "<h4 class='mb-1'>" + gameOverMsg + "</h4>";
      }

    }

  } );

  // Show gameMode-Chooser on load - GAME IS STARTED HERE
  updateButtons(1);

});


// initiate new game after a game is finished
function initNewGame() {
  // updateButtons(1);
  window.location.reload()
}


function initGame() {
  //Function to initiate the actual game

  // Shuffle and deal cards
  shuffleCards();
  buildDecks();

  // Show cards and beginn game
  updateButtons(3);

  // Reset score
  playerPoints = 0;
  computerPoints = 0;
  updateScore();

  // Reset progress bar
  while (gameProgressBar.hasChildNodes()) {
    gameProgressBar.removeChild(gameProgressBar.lastChild);
  }

  // Start turn
  initTurn()
}

function initSummary() {
  //Function to display a summary of each turn after the game

  // Change buttons when summary is shown
  updateButtons(7)

  var summaryHeadline = document.getElementById("summaryHeadline");

  if (playerPoints > computerPoints) {
    summaryHeadline.innerHTML = "<h3 class='text-success'>" + gameWonMsg +
      playerPoints + ":" + computerPoints + "</h3>";
  }
  if (playerPoints < computerPoints) {
    summaryHeadline.innerHTML = "<h3 class='text-danger'>" + gameLostMsg +
      playerPoints + ":" + computerPoints + "</h3>";
  }
  if (playerPoints == computerPoints) {
    summaryHeadline.innerHTML = "<h3 class='text-warning'>" + gameDrawMsg +
      playerPoints + ":" + computerPoints + "</h3>";
  }
}

function initTurn() {
  //Function to initiate the next turn by showing the topmost player card

  updateButtons(5);

  // choose first card from each deck
  currentPlayerCard = playerCards[0];
  currentComputerCard = computerCards[0];

  // Change heading of player card
  var playercardHeader = document.getElementById("playercard_header");
  playercardHeader.innerHTML = "<h3 class='m-3 card-title'>" +
    currentPlayerCard[0] + "</h3>";

  // Fill in player card by looping through card-array
  var playercardCategories = document.getElementById("playercard_categories");
  playercardCategories.innerHTML = "";
  for (i = 0; i < chosenCategories.length; i+=1) {

    var currentCategory = chosenCategories[i];

    // make new row
    var newRow = document.createElement("div");
    newRow.id = "player_category_row" + currentCategory;
    newRow.classList
      .add("list-group-item");
    document.getElementById("playercard_categories").appendChild(newRow);

    // category
    var newCat = document.createElement("h6");
    var newCatContent = document.createTextNode(data_header[currentCategory]);
    newCat.appendChild(newCatContent);

    // value


    var newVal = document.createElement("h6");
    var currentValue = formatNumbers(currentPlayerCard[currentCategory]);
    var newValContent = document
      .createTextNode(currentValue + data_suffix[currentCategory]);
    newVal.appendChild(newValContent);

    // link whole row
    var newRowLink = document.createElement("a");
    newRowLink.id = "playercardCategory" + currentCategory;
    newRowLink.href = "#";
    newRowLink.classList
      .add("category_link", "d-flex", "w-100", "justify-content-between");
    newRowLink.appendChild(newCat);
    newRowLink.appendChild(newVal);
    document.getElementById("player_category_row" + currentCategory)
      .appendChild(newRowLink);

  }

  buildComputerCard();

}
