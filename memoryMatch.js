/*Global Variables */
var clickedArray = [];
//Was created for the clearInterval method.
var interval; 
var started = false;
var time = 0;
//Part 3: 
var ready = true;
//Keeps tracks of the number of cells completed.
var numCompleted = 0;


/* Invoke functions */
//What does this do.....?
function randomAnswers() {
    var answers = [1, 1, 2, 2, 3, 3, 4, 4, 5];
    answers.sort((item) => {
      return .5 - Math.random();  
    });
    return answers;
}
function setUp() {
    var grid = document.getElementsByTagName('td');
    var answers = randomAnswers();
    for(var i = 0; i < grid.length; i++) {
        //Invoke a cell variable that equal to the grid[i] element
        var cell = grid[i];
        //Have the cell completed property equal false.
        cell.completed = false;
        //Have the cell clicked property equal false.
        cell.clicked = false;
        //Have the cell value = anwers[i] value.
        cell.value = answers[i];
        cell.addEventListener('mouseenter', function(){
            //Will cause cell to turn orange.
            if(this.completed == false && this.clicked == false) {
                this.style.background = 'orange';
            } 
        });
        cell.addEventListener('mouseleave', function() {
            if(this.completed == false && this.clicked == false) {
                this.style.background = 'blue';
            }
        })
        //Add a keydown event for when the numbers are pressed on the keyboard.
        //REMEMBER USE the document!!
        document.addEventListener('keydown', function() {
            //If teh key is between 1 to 10, than trigger the click event on the specified cell.
            if(event.key > 0 && event.key < 10) {
                grid[event.key - 1].click();
            }
        })
        
        //Define the clickedArray that takes the value that is clicked from the cell.
        cell.addEventListener('click', function() {
            //Unable to handle click events when ready is set to false.
            if(ready == false) {
                return;
            }
            //Timer will be triggered once the first cell is clicked.
            startTimer();
            if(this.completed == false && this.clicked == false) {
                clickedArray.push(this);
                reveal(this);
            }
            if(clickedArray.length == 2) {
                if(clickedArray[0].value == clickedArray[1].value) {
                     //If values match.
                    complete(clickedArray[0]);
                    complete(clickedArray[1]);
                    clickedArray = [];
                    if(numCompleted == 8) {
                        clearInterval(interval);
                         alert('You won in ' + time + ' seconds');
                        location.reload();
                    }
                } else {
                    //IF values do not match.
                      ready = false;  
                      document.getElementById('gridTable').style.border = '5px solid red';
                    //Ready variable when set to false, unable to handle click events.
                    setTimeout(function() {
                      //Hide values
                      hide(clickedArray[0]);
                      hide(clickedArray[1]); 
                      //Return board to past state.
                      clickedArray = [];
                      document.getElementById('gridTable').style.border = '5px solid black';
                      ready = true;                    
                    }, 500)
                }
            }
        })
        
        document.getElementById('restart').addEventListener('click', () => {
            //location.reload() -->reloads the page.
            location.reload();
        })
    }
}
//Turns red cells to blue cells and also set it's html and clicked property back to default values.
function hide(cell) {
    cell.clicked = false;
    cell.style.backgroundColor = 'blue';
    cell.innerHTML = '';
}
//If the cells match it turns purple, and the completed property is true, and numCompleted is incremented.
function complete(cell) {
    numCompleted++;
    cell.completed = true;
    cell.style.backgroundColor = 'purple';
}
function reveal(cell) {
    cell.innerHTML = cell.value;
    cell.style.background = 'red';
    cell.clicked = true;
}
///The start timer function will increment the total time. 
//And change the p tag with an id of timer to that time.
function startTimer() {
    if(started == false) {
        interval = setInterval(() => {
            time++;
            document.getElementById('timer').innerHTML = 'Time Elapsed ' + time;
        }, 1000);
        started = true;
    }
}
/* Execute function herer*/
setUp();
//Randomly distribute pairs of cells.
//turn blue cells orange when hovering over them.
//turn blue cells red when the hidden number is revealed.
//Start the elapsed time counter when first box is clicked.

//Invoke that randomly distribute values among cells 

