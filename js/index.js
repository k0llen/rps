// Rules modal
const rulesBtn = document.querySelector('.rules-btn');
const rulesCloseBtn = document.querySelector('.rules-modal-close');
const rulesModal = document.querySelector('.rules-modal');
const body = document.querySelector('.body');

rulesBtn.addEventListener('click', ()=>{
    rulesModal.classList.toggle('active');
    body.classList.toggle('modal-active');
})
rulesCloseBtn.addEventListener('click', ()=>{
    rulesModal.classList.remove('active');
    body.classList.remove('modal-active');
})
window.addEventListener('click', (e)=>{
    if(!rulesModal.contains(e.target) && !rulesBtn.contains(e.target)) {
        rulesModal.classList.remove('active');
        body.classList.remove('modal-active');
    }
})



window.addEventListener('click', (event) =>{
    if(event.target.closest('.btn')){
        // getting info about picked button
        const pickedBtn = {
            'value': event.target.closest('.btn').dataset.name,
            'beatby': event.target.closest('.btn').dataset.beatBy,
            'imgSrc': event.target.closest('.btn').querySelector('img').getAttribute('src'),
            'color': event.target.closest('.btn').dataset.color,
        };

        const blockYou = document.querySelector('.block-you');
        const blockHouse = document.querySelector('.block-house');
        const blockYouPlace = blockYou.querySelector('.place');        
        const blockHousePlace = blockHouse.querySelector('.place');

        // array of all btns
        const btnsArray = [
            {
                'value': 'scissors',
                'beatby': 'rock',
                'imgSrc': 'img/icon-scissors.svg',
                'color': 'hsl(40, 84%, 53%)',
            },
            {
                'value': 'paper',
                'beatby': 'scissors',
                'imgSrc': 'img/icon-paper.svg',
                'color': 'hsl(230, 89%, 65%)',
            },
            {
                'value': 'rock',
                'beatby': 'paper',
                'imgSrc': 'img/icon-rock.svg',
                'color': 'hsl(349, 70%, 56%)',
            },
        ];

        // get random btn number
        function getRandomBtn(min,max) {
            let rand = min + Math.random() * (max + 1 - min);
            return Math.floor(rand);
        };

        //drawing picked btn
        function drawPickedBtn() {
            const pickedBtnTemplate = `                            
            <div class="picked-btn ${pickedBtn.value}" data-name="${pickedBtn.value}" data-beat-by="${pickedBtn.beatby}">
                <img src="${pickedBtn.imgSrc}" alt="${pickedBtn.name}">
            </div>`;
            blockYouPlace.insertAdjacentHTML('beforebegin', pickedBtnTemplate);
            blockYouPlace.classList.add('picked');
        }

        drawPickedBtn();

        // Step 2(When you picked your btn)
        const buttonsWrapper = document.querySelector('.buttons');
        const gameResults = document.querySelector('.game-results');

        function step2() {
            buttonsWrapper.style.display = 'none';
            if (window.innerWidth >= 900) {
                gameResults.style.display = 'flex';
            } else {
                gameResults.style.display = 'grid';
            }
        }

        step2();

        //Computer picking his btn
        function drawComputerPick() {
            const picked = getRandomBtn(0,2);
            const pickedBtnTemplate = `                            
            <div class="picked-btn ${btnsArray[picked].value}" data-name="${btnsArray[picked].value}" data-beat-by="${btnsArray[picked].beatby}">
                <img src="${btnsArray[picked].imgSrc}" alt="${btnsArray[picked].value}">
            </div>`;
            blockHousePlace.insertAdjacentHTML('beforebegin', pickedBtnTemplate);
            blockHousePlace.classList.add('picked');
        }

        setTimeout(drawComputerPick, 1500);


        const game = document.querySelector('.game');
        // Who win ???????
        function whoWin() {
            const computerPick = document.querySelector('.block-house').querySelector('.picked-btn');
            const yourPick = document.querySelector('.block-you').querySelector('.picked-btn');
            let scores = JSON.parse(localStorage.getItem('scores'));

            if (computerPick.dataset.name === yourPick.dataset.name) {
                gameResults.querySelector('.block-again').classList.add('tie');
            } else if (computerPick.dataset.name === yourPick.dataset.beatBy) {
                gameResults.querySelector('.block-again').classList.add('lose');
                if (scores - 1 >= 0) {
                    scores -= 1;
                    document.querySelector('.scores-count').innerText = scores;
                    localStorage.setItem('scores', scores);
                }
                blockHouse.classList.add('you-win');
            } else if (computerPick.dataset.beatBy === yourPick.dataset.name) {
                gameResults.querySelector('.block-again').classList.add('win');
                scores += 1;
                document.querySelector('.scores-count').innerText = scores;
                localStorage.setItem('scores', scores);
                blockYou.classList.add('you-win');
            }
            gameResults.querySelector('.block-again').style.transform = 'scale(1)';
            if (window.innerWidth >=800) {
                game.style.maxWidth = '950px';
            } else {

            }
        }

        setTimeout(whoWin, 2000);

        // reseting game
        const btnAgain = document.querySelector('.btn-again');

        function resetGame() {
            document.querySelectorAll('.picked-btn').forEach((btn) =>{
                btn.remove();
            })
            buttonsWrapper.style.display = 'flex';
            gameResults.style.display = 'none';
            blockYouPlace.classList.remove('picked');
            blockHousePlace.classList.remove('picked');
            gameResults.querySelector('.block-again').style.transform = 'scale(0)';
            game.style.maxWidth = '700px';
            gameResults.querySelector('.block-again').classList.remove('tie');
            gameResults.querySelector('.block-again').classList.remove('win');
            gameResults.querySelector('.block-again').classList.remove('lose');
            blockHouse.classList.remove('you-win');
            blockYou.classList.remove('you-win');
        }

        btnAgain.addEventListener('click', () =>{
            resetGame();
        })
    }
})

window.onload = () => {
    let scores = JSON.parse(localStorage.getItem('scores'));
    if (localStorage.getItem('scores')) {
        document.querySelector('.scores-count').innerText = scores;
    } else {
        localStorage.setItem('scores', 0);
        document.querySelector('.scores-count').innerText = 0;
    }
}