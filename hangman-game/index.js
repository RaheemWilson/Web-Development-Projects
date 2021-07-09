window.onload = loadGame()

function loadGame(){
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    const theCanvas = document.getElementById('hangmancanvas');
    
    let numWrong = 0;
    var ctx = theCanvas.getContext("2d")
    var answerList;
    var keys = []

    const alphabets = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
    const keypad = document.getElementById('keypad');
    for(let i = 0; i < alphabets.length; i++){
        var letterButton = document.createElement('button');
        letterButton.className = `alphabet ${alphabets[i]}`
        letterButton.innerHTML = alphabets[i];
        keypad.appendChild(letterButton);
    }

    const key = `g4BcSibMWYEurT+GsE7Z2g==obTGHRNgqrUIhlsL`
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/trivia',
        headers: { 'X-Api-Key': key },
        contentType: 'application/json',
        success: function(result) {
            console.log(result)
            if(result[0]['answer'].length > 4){
                startGame(result)
            }
            else 
            {
               loadGame()
            }
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });

    function createGuessBoard({ category, question, answer }){
        const trivia = document.getElementById('trivia');
        const fillBlanks = document.getElementById('fill-blanks')
        
        const info = `<p>Category: ${category}</p>
                      <p>Trivia: ${question}</p>
                    `
        trivia.innerHTML = info.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        
        answerList = [...answer.toUpperCase()]
        for(let i = 0; i < answer.length; i++){ 
            let letterTag = document.createElement('p');
            letterTag.className = [' ', '-', "'"].includes(answerList[i]) ? 'letter-char'  : 'letter' 
            letterTag.innerHTML = answerList[i].toUpperCase()
            fillBlanks.appendChild(letterTag)
        }
    }

    function startGame(result){
        createGuessBoard(result[0])
        drawCanvas()
        addListeners()
    }

    function addListeners(){
        let btns = document.getElementsByClassName('alphabet')
        for(i of btns){
            i.addEventListener('click', keyPadListener, false)
        }
        
        document.addEventListener('keyup', keyPadListener, false)
            
        window.addEventListener('selectstart', event => event.preventDefault());
        
        modal.style.display = "none";
        span.onclick = function() {
            modal.style.display = "none";
        }

        let nextGame = document.getElementById('game')
        nextGame.addEventListener('click', function(){
            window.location.reload() = 'true'
        })
    }

    function keyPadListener(event){
        function keySelected(){
            if(event.ctrlKey && event.shiftKey && event.keyCode === 'i' ){
                return null;
            } else if(event.keyCode > 64 && event.keyCode < 91){
                if(keys.includes(event.key)){
                    return null
                } else {
                    keys.push(event.key)
                    return event.key.toUpperCase()
                }    
           } else {
               return null
           }
        }



        const letterSelected = this.innerHTML || keySelected()
        const answerTags = document.getElementsByClassName('letter')
        if(letterSelected == null){
            return;
        } else {
            document.getElementsByClassName(letterSelected)[0].disabled = true;
        }
        
    
        if(answerList.includes(letterSelected)){
            const characters = document.getElementsByClassName('letter-char')
            for(let i=0; i < answerTags.length; i++){
                if(letterSelected == answerTags[i].innerHTML){
                    answerTags[i].className += ' visible'
                }
            }
    
            const visibleTags = document.getElementsByClassName('visible')
            if((visibleTags.length + characters.length) == answerList.length){
                youWon();
            }
        }
        else{
            displayTries()
            if(numWrong == 4){
                youLost()
            }
        }
        drawCanvas()
    }

    function displayTries(){
        let display = document.querySelector('#hangman-display p')
        ++numWrong
        display.innerHTML = `<i>Attempts left: <strong>${4-numWrong}</strong></i>`
    }

    function youWon(){
        const winEmojis = ['9995', '127775', '127881', '127882', '128175']
        let emoji = document.getElementById('emoji')
        var resultTag = document.querySelector("#myModal p")
        emoji.innerHTML = `&#${winEmojis[Math.floor(Math.random() * winEmojis.length)]};`

        resultTag.innerHTML = "<strong>You Won!</strong>"
        modal.style.display = "block";
    }
    
    function youLost(){
        const losingEmojis = ['127183', '128078', '128542']   
        let emoji = document.getElementById('emoji')
        var resultTag = document.querySelector("#myModal p")   
        var revealAnswer = document.createElement("p")

        emoji.innerHTML = `&#${losingEmojis[Math.floor(Math.random() * losingEmojis.length)]};`
        
        resultTag.innerHTML = `<strong>You Lost!</strong>`
        revealAnswer.innerHTML = `The correct word is <strong>${answerList.join("")}</strong>`
        resultTag.parentNode.insertBefore(revealAnswer, resultTag.nextSibling);
        modal.style.display = "block";
    }

    function clearCanvas(context, canvas) { 
        context.clearRect(0, 0, canvas.width, canvas.height); 
        var w = canvas.width; 
        canvas.width = 1; 
        canvas.width = w; 
    }
    
    function drawGallows(){ 
        ctx.moveTo(120,305); 
        ctx.lineTo(280,305); 
        ctx.moveTo(260,305); 
        ctx.lineTo(260,70); 
        ctx.lineTo(180,70); 
        ctx.lineTo(180,96); 
        ctx.stroke(); 
    }
    
    function drawHangman(drawNum){ 
        switch(drawNum) 
          { 
           case 0: 
              drawGallows(); 
           break; 
           case 1: 
              drawHead(); 
           break; 
           case 2: 
              drawBody(); 
           break; 
           case 3: 
              drawArm1(); 
              drawArm2(); 
           break; 
           case 4: 
              drawLeg1(); 
              drawLeg2(); 
           break; 
         } 
      }
    
    function drawHead(){ 
        ctx.beginPath(); 
        ctx.arc(180,120,23,0,Math.PI*2,false); 
        ctx.closePath(); 
        ctx.stroke(); 
    }
    
    function drawBody(){ 
        ctx.moveTo(180,143); 
        ctx.lineTo(180,248); 
        ctx.stroke(); 
    }
    
    function drawArm1(){ 
        ctx.moveTo(180,175); 
        ctx.lineTo(142,167); 
        ctx.stroke(); 
    } 
    function drawArm2(){ 
        ctx.moveTo(180,175); 
        ctx.lineTo(218,167); 
        ctx.stroke(); 
    }
    function drawLeg1(){ 
        ctx.moveTo(180,245); 
        ctx.lineTo(145,270); 
        ctx.stroke(); 
    } 
     
    function drawLeg2(){ 
        ctx.moveTo(180,245); 
        ctx.lineTo(215,270); 
        ctx.stroke(); 
    }
    function drawCanvas(){
        clearCanvas(ctx, theCanvas)
        for(var i=0;i<=numWrong;i++){ 
            drawHangman(i); 
        } 
    }
}



