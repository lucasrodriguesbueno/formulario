
var tab1 = document.getElementById('tab1') 
var tab2 = document.getElementById('tab2')
var tab3 = document.getElementById('tab3')                                                         

var btnTab1 = document.getElementById('btn-tab1')
var btnTab2 = document.getElementById('btn-tab2')
var btnTab3 = document.getElementById('btn-tab3')
var btnTab4 = document.getElementById('btn-tab4')
var btnTab5 = document.getElementById('btn-tab5')
var btnTab6 = document.getElementById('btn-tab6')

btnTab2.addEventListener('click', function(event) {
   tab1.classList.remove('invisible')
   tab2.classList.add('invisible')
   tab3.classList.add('invisible')
   
})
btnTab5.addEventListener('click', function(event){
   tab2.classList.remove('invisible')
   tab1.classList.add('invisible')
   tab3.classList.add('invisible')

})
btnTab4.addEventListener('click', function(){
   tab1.classList.remove('invisible')
   tab2.classList.add('invisible')
   tab3.classList.add('invisible')
})
btnTab6.addEventListener('click', function(){
   tab1.classList.add('invisible')
   tab2.classList.add('invisible')
   tab3.classList.remove('invisible')
})

btnTab3.addEventListener('click', function() {
   tab2.classList.add('invisible')
   tab3.classList.remove('invisible')
   showLast()
   showResult()
   validateDate()
})

function isCPF() {   
        cpf = document.querySelector('#cpf').value
        cpf = cpf.replace(/[^\d]+/g,'');
        if(cpf == '') return false; 
        // Elimina CPFs invalidos conhecidos 
        if (cpf.length != 11)return false;   
        // Valida 1o digito   
        count = 0;   
        for (i=0; i < 9; i ++)      
            count += parseInt(cpf.charAt(i)) * (10 - i); 
            dig = 11 - (count % 11);   
            if (dig == 10 || dig == 11)      
                dig = 0;   
            if (dig != parseInt(cpf.charAt(9)))    
                return false;    
        // Valida 2o digito   
        count = 0;   
        for (i = 0; i < 10; i ++)      
            count += parseInt(cpf.charAt(i)) * (11 - i); 
        dig = 11 - (count % 11); 
        if (dig == 10 || dig == 11) 
            dig = 0; 
        if (dig != parseInt(cpf.charAt(10)))
            return false;     
        return true; 
    }

    function validaName(){
        nome = document.querySelector('#nome').value
        if(nome == ''){
            alert('Insira seu nome')
            
        }
        localStorage.setItem('nome', nome)
        validateDate()
        if(isCPF() == true){
            localStorage.setItem('cpf', cpf)
            countDays()
            btnTab1.addEventListener('click', function() {
            tab1.classList.add('invisible')
            tab2.classList.remove('invisible')
}
  ) 
        }else
        alert('CPF inválido');
        
    }
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

  function countDays() {
  let date_ini = new Date().getTime();
  let date_end = new Date(document.querySelector('#data').value).getTime();
  let dateIni = new Date();
  let dateEnd = new Date(document.querySelector('#data').value);
  let diff = 0;
  
  if(dateEnd.getMonth() < dateIni.getMonth()){
   dateEnd.setFullYear(dateIni.getFullYear() +1) 
   diff = dateEnd.getTime() - dateIni.getTime()
   var dataAniver = Math.floor(diff / day) 
  localStorage.setItem('dataAniver', dataAniver)

  }else {
   dateEnd.setFullYear(dateIni.getFullYear())
   diff = dateEnd.getTime() - dateIni.getTime()
   var dataAniver = Math.floor(diff / day +1) 
  localStorage.setItem('dataAniver', dataAniver)
  }


}

    //valida a data de nascimento
    function validateDate(){
        dtNasc = document.querySelector('#data').value
        if(dtNasc == ''){
            alert('Digite sua data de nascimento')
        }
        let data_americana = "2020-12-30";
        let data_brasileira = dtNasc.split('-').reverse().join('/');
        localStorage.setItem('data', data_brasileira)
    }
    function consultCEP(){
        const cep = document.querySelector("#cep").value;
        //valida o cep
        if(cep.length != 8 || cep === ""){
            alert('CEP inválido')
        }else 

        //pega o json recebido pela API viacep e altera os valores do input
        var url = "https://viacep.com.br/ws/"+ cep+"/json/";   
        $.getJSON(url, function(data){
            $("#adress").val(data.logradouro);
            $("#adress2").val(data.bairro);
            $("#adress3").val(data.localidade);
            $("adress4").val(data.numero);
            localStorage.setItem('rua', data.logradouro)
            localStorage.setItem('bairro', data.bairro)
            localStorage.setItem('localidade', data.localidade)
            localStorage.setItem('numero', data.numero)


            //converte o JSON para objeto
            fetch(url).then(function(response){
                response.json().then(function(data){
                    
                })
            }) 
        })
    }
    

    function showLast(){
      var final = document.querySelector('#final')
      final.innerHTML = `<p><br><strong>Nome: ${localStorage.getItem('nome', nome)}</p>
      <br>CPF: ${localStorage.getItem('cpf', cpf)}
      <br><br>Data Nascimento: ${localStorage.getItem('data', dtNasc)}</strong>`
   }
   function showResult(data){
      var inputNumber = document.getElementById('adress4')
      var inputEndereco = document.getElementById('adress')
      var inputBairro = document.getElementById('adress2')
      localStorage.setItem('numero', inputNumber.value)
      localStorage.setItem('endereco', inputEndereco.value)
      localStorage.setItem('bairro', inputBairro.value)
      var final = document.querySelector('#final')
      final.innerHTML += `<strong><p><br>Dias faltantes para aniversário: ${localStorage.getItem('dataAniver')}<br>
      <br>Endereço: ${localStorage.getItem('endereco')}</p>
      <br>Bairro: ${localStorage.getItem('bairro')}<br>
      <br>Cidade: ${localStorage.getItem('localidade')}<br>
      <br>Número: ${localStorage.getItem('numero')}</strong>`


   }




    


