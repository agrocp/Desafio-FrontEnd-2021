var cep = $("#cep");

$( cep ).change(async () => {
    if(cep.val().length === 8){
        if(validaCep(cep.val())){
            var url = `https://viacep.com.br/ws/${cep.val()}/json/`;
            const response = await fetch(url);
            const data = await response.json();
            $('input[name="cidade"]').val(data.localidade);
            $('input[name="estado"]').val(data.uf);
            $('input[name="bairro"]').val(data.bairro);
            $('input[name="rua"]').val(data.logradouro);
        }
    }
});


function validaCep(cep){
    var validacep = /^[0-9]{8}$/;
    if(validacep.test(cep)) {
        return true;
    }
    else{
        return false;
    }
}

function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

function validadata(data){ // pega o valor do input
    data = data.replace(/\//g, "-"); // substitui eventuais barras (ex. IE) "/" por hífen "-"
    var data_array = data.split("-"); // quebra a data em array
    
    // para o IE onde será inserido no formato dd/MM/yyyy
    if(data_array[0].length != 4){
       data = data_array[2]+"-"+data_array[1]+"-"+data_array[0]; // remonto a data no formato yyyy/MM/dd
    }
    
    // comparo as datas e calculo a idade
    var hoje = new Date();
    var nasc  = new Date(data);
    var idade = hoje.getFullYear() - nasc.getFullYear();
    var m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
    
    if(idade < 18){
       return "menor";
    }
 
    if(idade >= 18){
       return true;
    }
    
    // se for maior que 60 não vai acontecer nada!
    return false;
 }



$('#formulario-cadastro').submit(function() {
    
    var nome = $("#nome");
    var cpf = $("#cpf");
    var cep = $("#cep");
    var cidade = $("#cidade");
    var estado = $("#estado");
    var bairro = $("#bairro");
    var rua = $("#rua");
    var dataNascimento = $("#data-nascimento");

    var erro = $(".alert");
    var campo = $("#campo-erro");

    erro.addClass("d-none");
    $('.is-invalid').removeClass('is-invalid');

    if(nome.val() == ''){
        erro.removeClass('d-none');
        campo.html('Preencha o campo nome.');
        nome.focus();
        nome.addClass('is-invalid');
        return false;
    }
    else
    if(nome.val().length > 100){
        erro.removeClass('d-none');
        campo.html('O campo nome deve ter no máximo 100 caracteres.');
        nome.focus();
        nome.addClass('is-invalid');
        return false;
    }

    if(cpf.val() == ''){
        erro.removeClass('d-none');
        campo.html('Preencha o campo cpf.');
        cpf.focus();
        cpf.addClass('is-invalid');
        return false;
    }
    else 
    if((cpf.val().length === 11) && (!TestaCPF(cpf.val()))){
        //validado
        alert('entrei');
        erro.removeClass('d-none');
        campo.html('cpf inválido');
        cpf.focus();
        cpf.addClass('is-invalid');
        return false;
    }
    else
    if((cpf.val().length !== 11)){
        erro.removeClass('d-none');
        campo.html('cpf inválido');
        cpf.focus();
        cpf.addClass('is-invalid');
        return false;
    }



    if(cep.val() == ''){
        erro.removeClass('d-none');
        campo.html('Preencha o campo cep');
        cep.focus();
        cep.addClass('is-invalid');
        return false;
    }
    else
    if(cep.val().length != 8){
        erro.removeClass('d-none');
        campo.html('CEP inválido, tenha certeza que digitou 8 dígitos e informou somente números');
        cep.focus();
        cep.addClass('is-invalid');
        return false;
    }
    else
        if(!validaCep(cep.val())){
            erro.removeClass('d-none');
            campo.html('CEP inválido, digite somente números');
            cep.focus();
            cep.addClass('is-invalid');
            return false;
        }

    if(cidade.val() == ''){
        erro.removeClass('d-none');
        campo.html('Preencha o campo cidade');
        cidade.focus();
        cidade.addClass('is-invalid');
        return false;
    }

    if(estado.val() == ''){
        erro.removeClass('d-none');
        campo.html('Preencha o campo estado');
        estado.focus();
        estado.addClass('is-invalid');
        return false;
    }

    if(bairro.val() == ''){
        erro.removeClass('d-none');
        campo.html('Preencha o campo bairro');
        bairro.focus();
        bairro.addClass('is-invalid');
        return false;
    }

    if(rua.val() == ''){
        erro.removeClass('d-none');
        campo.html('Preencha o campo rua');
        rua.focus();
        rua.addClass('is-invalid');
        return false;
    }

    if(dataNascimento.val() == ''){
        erro.removeClass('d-none');
        campo.html('Preencha o campo data de nascimento');
        dataNascimento.focus();
        dataNascimento.addClass('is-invalid');
        return false;
    }
    else if(!validadata(dataNascimento.val())){
        erro.removeClass('d-none');
        campo.html('Data inválida.');
        dataNascimento.focus();
        dataNascimento.addClass('is-invalid');
        return false;
    }
    else if(validadata(dataNascimento.val()) === "menor"){
        erro.removeClass('d-none');
        campo.html('Você é menor de idade e não pode se cadastrar');
        dataNascimento.focus();
        dataNascimento.addClass('is-invalid');
        return false;
    }


    return false;
});