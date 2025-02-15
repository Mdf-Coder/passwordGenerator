let generatedPassword = document.querySelector('.generated-pass')
let copyPass = document.querySelector('.copy-pass')
let passLength = document.querySelector('#myRange')
let passLengthValue = document.querySelector('.PB-range-slidervalue')
let uppCaseFilter = document.querySelector('#up-filter')
let lowCaseFilter = document.querySelector('#low-filter')
let symFilter = document.querySelector('#sym-filter')
let numFilter = document.querySelector('#num-filter')
let excludeDuplicateFilter = document.querySelector('#ex-dup-filter')
let generateBtn = document.querySelector('.cssbuttons-io')
let upBtn = document.querySelector('#go-up')
let downBtn = document.querySelector('#go-down')


// ------------------------------------------------------ //

generateBtn.addEventListener('click', creatRandomPassword)
uppCaseFilter.addEventListener('change', creatRandomPassword)
lowCaseFilter.addEventListener('change', creatRandomPassword)
symFilter.addEventListener('change', creatRandomPassword)
numFilter.addEventListener('change', creatRandomPassword)
excludeDuplicateFilter.addEventListener('change', creatRandomPassword)
passLength.addEventListener('input', changeLengthValue)
copyPass.addEventListener('click', copyGeneratedPass)
upBtn.addEventListener('click', upOrDownBtnHandler)
downBtn.addEventListener('click', upOrDownBtnHandler)

// ------------------------------------------------------- //
// Copy Password To Clipboard
function copyGeneratedPass() {
    copyPass.innerHTML = 'Copied!'
    copyPass.classList.add('copied')
    setTimeout(function () {
        copyPass.innerHTML = 'Copy'
        copyPass.classList.remove('copied')
    }, 3000)

    //    copy to clipboard
    navigator.clipboard.writeText(generatedPassword.innerHTML).then(() => {
    })

}

// Change Length Value By one
function upOrDownBtnHandler(event){
    if (event.target.getAttribute('data-func') === 'up'){
        passLength.value ++
    }else{
        passLength.value --
    }
    changeLengthValue()
}


// Change Value of length span
function changeLengthValue() {
    passLengthValue.innerHTML = 'Length : ' + passLength.value
    creatRandomPassword()
}


function creatRandomPassword() {
    try {

        let upperCaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        let lowerCaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        let symbols = ['@', '#', '&', '-', '_']

        let createdPassword = ''
        let allowedFilters = []
        let rounds = passLength.value
        let noDuplicate

        // Check Conditions
        if (uppCaseFilter.checked) {
            allowedFilters.push(upperCaseLetters)
        }
        if (lowCaseFilter.checked) {
            allowedFilters.push(lowerCaseLetters)
        }
        if (numFilter.checked) {
            allowedFilters.push(numbers)
        }
        if (symFilter.checked) {
            allowedFilters.push(symbols)
        }
        if (excludeDuplicateFilter.checked) {
            noDuplicate = true
        }


        let roundOfMakingLetter = 0
        while (roundOfMakingLetter < rounds) {


            //    Choose Category
            let chooseCategory = Math.floor(Math.random() * allowedFilters.length)
            let category = allowedFilters[chooseCategory]

            //    Choose Character
            let character = ''
            try {
                let chooseCharacter = Math.floor(Math.random() * category.length)
                character = category[chooseCharacter]
                createdPassword += character
            } catch (err) {
                generatedPassword.innerHTML = 'Enable More Filters / Disable Exclude Duplicate'
            }


            // Exclude Duplicate
            if (noDuplicate) {
                // Remove the chosen Character from the list
                let index = allowedFilters[chooseCategory].indexOf(character);
                if (index > -1) {
                    allowedFilters[chooseCategory].splice(index, 1);
                }
            }

            // Remove Lists that have been Emptied
            let i = 0
            while (i < allowedFilters.length) {
                if (allowedFilters[i].length === 0) {
                    allowedFilters.splice(i, 1);
                }
                i++
            }

            roundOfMakingLetter++
        }

        if (createdPassword.includes('undefined')) {
            generatedPassword.innerHTML = 'Enable More Filters!'
        } else {
            generatedPassword.innerHTML = createdPassword
        }
        if (!uppCaseFilter.checked &&
            !lowCaseFilter.checked &&
            !numFilter.checked &&
            !symFilter.checked){
            generatedPassword.innerHTML = 'Enable More Filters!'
        }

    }catch (err){

    }

}

