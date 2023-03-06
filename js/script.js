class Validator {

    constructor(){
        this.validations = [
            'data-min-length',
            'data-max-length',
            'data-only-letters',
            'data-email-validate',
            'data-required',
            'data-equal',
            'data-password-validate',
        ]
    }
    // inicia a validação a todos os campos 
    validate(form) {

        // limpar todas as validações antigas 
        let currentValidations = document.querySelectorAll('form.error-validation');

        if(currentValidations.length) {
            this.cleanValidations(currentValidations);
        }

        // pegar todos input
        let inputs = form.getElementsByTagName('input');

        // transforma HTMLcollection em Array
        let inputsArray =[...inputs];

        // loop nos inputs e validação mediantes aos atributos emcontrados
        inputsArray.forEach(function(input, obj){

            // fazer validação de acordo com o atributo do input
            for(let i = 0; this.validations.length > i; i++){
                if(input.getAttribute(this.validations[i])!= null){
                    
                    let method = this.validations[i].replace('data-','').replace('-', '');

                    // valor do input
                    let value = input.getAttribute(this.validations[i])

                    // invoca o método
                    this[method](input, value);

                }
            }
        }, this);
    }
    // método para validar se tem um minimo de caracteres
    minlength(input, minValue){
        let inputLength = input.value.length;

        let erroMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if(inputLength < minValue){
            this.printMessage(input, erroMessage);
        }
    }
    // método para valoidação se passou do maximo de caracteres
    maxlength(input, maxValue){
        let inputLength = input.value.length;

        let erroMessage = `O campo precisa ter menos ${maxValue} caracteres`;

        if(inputLength > maxValue) {
            this.printMessage(input, erroMessage);
        }
    }
    // método para validar string que só contem letras
    onlyletters(input) {
        let re = /^[A-Za-z]+$/;;

        let inputValue = input.value;

        let erroMessage = 'Este campo não aceita números nem caracteres especiais';

        if(!re.test(inputValue)){
            this.printMessage(input, erroMessage);
        }
    }
    // método para validar e-mail
    emailvalidate(input){
        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let erroMessage = `Insira um e-mail no padrão thiagohsantana@icloud.com`;

        if(!re.test(email)){
            this.printMessage(input, erroMessage);
        }
    }
    // verificar se um campo esta igual o outro
    equal(input, inputName){
        let inputToCampare = document.getElementsByName(inputName[0]);
        
        let erroMessage = `Este campo precisa esta igual ao ${inputName}`;
        if(input.value != inputToCampare.value){
            this.printMessage(input, erroMessage);
        }
    }
    // método para exibir inputs que são necessarios
    required(input){

        let inputValue = input.value;

        if(inputValue === ''){
            let erroMessage = `Este campo é obrigatorio`;

            this.printMessage(input, erroMessage);
        }
    }
    // validar o campo de senha 
    passwordvalidate(input){

        // explodir string em array
        let charArr = input.value.split('');

        let uppercases = 0;
        let numbers = 0;

        for(let i = 0; charArr.length > i; i++){
            if(charArr[i] === charArr[i].toUpperCase() &&
            isNaN(parseInt(charArr[i]))){
                uppercases++;
            } else if(!isNaN(parseInt(charArr[i]))){
                numbers++;
            }

            if(uppercases === 0 || numbers === 0){
                let erroMessage = `A senha precisa um caracteres maiusculo e um numero`;

                this.printMessage(input, erroMessage);
            }
        }
        // método para imprimir mensagens de erro
        printMessage(input, msg){
            // checa os erros presentes no input

            let errorsQty = input.parentNode.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classlist.remove('template');
            inputParent.appendChild(templete);
        }
    }
    // remove todas as validações para fazer a checagem novamente
    cleanValidations(validations){
        validations.forEach(el => el.remove());
    }
}

let form = document.getElementById('register-form');
let submit = document.getElementById('btn-submit');

let validator = new Validator();

// evento de envio do form, que valida os inputs
submit.addEventListener('click', function(e){
    e.preventDefault();

    validator.validate(form);
});
