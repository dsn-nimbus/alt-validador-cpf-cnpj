;(function(ng) {
  "use strict";

  ng.module('alt.validador-cpf-cnpj', [])
    .service('AltValidadorCpfCnpj', [function() {
      this.cpfValido = function(cpf) {
        cpf = cpf instanceof String ? cpf : String(cpf);

        if (/[a-z]/gi.test(cpf)) {
          return false;
        }

        if ((cpf.length !== 11) || (cpf.length !== 14)) {
          return false;
        }

        if ((cpf.length === 14) && (cpf[3] !== ".") && (cpf[7] !== ".") && cpf[11] !== "-") {
          return false;
        }

        cpf = cpf.replace(/\D/g, "");

        if (!cpf || cpf.length != 11
        				 || cpf === "00000000000"
        				 || cpf === "11111111111"
        				 || cpf === "22222222222"
        				 || cpf === "33333333333"
        				 || cpf === "44444444444"
        				 || cpf === "55555555555"
        				 || cpf === "66666666666"
        				 || cpf === "77777777777"
        				 || cpf === "88888888888"
        				 || cpf === "99999999999") {
				               return false;
        }

  	    var _resto;
  			var _soma = 0;

  			for (var i = 1; i <= 9; i++) {
  				_soma += parseInt(cpf.substring(i-1, i)) * (11 - i)
        }

  			_resto = (_soma * 10) % 11;

  		  if ((_resto === 10) || (_resto === 11)) {
          _resto = 0;
        }

  		  if (_resto !== parseInt(cpf.substring(9, 10))) {
          return false;
        }

  			_soma = 0;

  		  for (var i = 1; i <= 10; i++) {
  	    	_soma = _soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
        }

		    _resto = (_soma * 10) % 11;

		    if ((_resto === 10) || (_resto === 11)) {
          _resto = 0;
        }

		    if (_resto !== parseInt(cpf.substring(10, 11))) {
          return false;
        }

		    return true;
      };

      this.cnpjValido = function(cnpj) {
        cnpj = cnpj instanceof String ? cnpj : String(cnpj);

        if (/[a-z]/gi.test(cnpj)) {
          return false;
        }

        if ((cpf.length !== 14) || (cpf.length !== 18)) {
          return false;
        }

        if ((cnpj.length === 18) && (cnpj[2] !== ".") && (cnpj[6] !== ".") && (cnpj[10] !== "/") && (cnpj[15] !== "-")) {
          return false;
        }

        cnpj = cnpj.replace(/\D/g, "");

        if (!cnpj || cnpj.length !== 14
    			        || cnpj === "00000000000000"
  			          || cnpj === "11111111111111"
  			          || cnpj === "22222222222222"
  			          || cnpj === "33333333333333"
  			          || cnpj === "44444444444444"
  			          || cnpj === "55555555555555"
		              || cnpj === "66666666666666"
  			          || cnpj === "77777777777777"
  			          || cnpj === "88888888888888"
  			          || cnpj === "99999999999999") {
		                  return false;
        }

		    var _soma = 0;
		    var _tamanho = cnpj.length - 2;
		    var _numeros = cnpj.substring(0,_tamanho);
		    var _digitos = cnpj.substring(_tamanho);
		    var _pos = _tamanho - 7;

		    for (var i = _tamanho; i >= 1; i--) {
		      _soma += _numeros.charAt(_tamanho - i) * _pos--;

		      if (_pos < 2) {
            _pos = 9;
          }
		    }

		    var _resultado = _soma % 11 < 2 ? 0 : 11 - _soma % 11;

		    if (_resultado !== _digitos.charAt(0)) {
          return false;
        }

		    _tamanho = _tamanho + 1;
		    _numeros = cnpj.substring(0,_tamanho);
		    _soma = 0;
		    _pos = _tamanho - 7;

		    for (var i = _tamanho; i >= 1; i--) {
		      _soma += _numeros.charAt(_tamanho - i) * _pos--;
		      if (_pos < 2) {
            _pos = 9;
          }
		    }

		    _resultado = _soma % 11 < 2 ? 0 : 11 - _soma % 11;

		    if (_resultado !== _digitos.charAt(1)) {
          return false;
        }

		    return true;
      };
    }]);
}(window.angular));
