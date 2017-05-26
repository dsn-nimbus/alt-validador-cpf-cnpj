"use strict";

describe('alt.validador-cpf-cnpj', function() {
  var _validador;

  beforeEach(module('alt.validador-cpf-cnpj'));

  beforeEach(inject(function($injector) {
    _validador = $injector.get('AltValidadorCpfCnpj');
  }));

  describe('cpfValido', function() {
    it('deve passar em toda listagem de cpfs válidos e inválidos e retornar as validações corretamente', function() {
      var _cpfs = getCPFs();

      for (var i = 0; i < _cpfs.length; i++) {
        var _resultado = _validador.cpfValido(_cpfs[i].in)

        expect(_resultado).toBe(_cpfs[i].out)

        if (_resultado !== _cpfs[i].out) {
          explicaErro(_cpfs[i], _cpfs[i].out, _resultado)
        }
      }
    })
  })
});

function explicaErro(info, outputEsperado, resultadoObtido) {
  console.error(`Esperava que ${info.in} fosse ${outputEsperado ? 'valido' : 'inválido'}, mas o mesmo é ${resultadoObtido ? 'valido' : 'inválido'}.`)
}

function getCPFs() {
  return [
    {
      in: undefined,
      out: false
    },
    {
      in: '',
      out: false
    },
    {
      in: 1,
      out: false
    },
    {
      in: '11111111111',
      out: false
    },
    {
      in: '22222222222',
      out: false
    },
    {
      in: '33333333333',
      out: false
    },
    {
      in: '44444444444',
      out: false
    },
    {
      in: '55555555555',
      out: false
    },
    {
      in: '66666666666',
      out: false
    },
    {
      in: '77777777777',
      out: false
    },
    {
      in: '88888888888',
      out: false
    },
    {
      in: '99999999999',
      out: false
    },
    {
      in: '155.224.602-7', // faltando o 0 no final,
      out: false
    },
    {
      in: '155224.602-70', // faltando separação
      out: false
    },
    {
      in: '155.224602-70', // faltando separação
      out: false
    },
    {
      in: '155.224.60270', // faltando separação
      out: false
    },
    {
      in: '155.224.602-70',
      out: true
    },
    {
      in: 15522460270,
      out: true
    },
    {
      in: '15522460270',
      out: true
    },
    {
      in: '045.222.735-68',
      out: true
    },
    {
      in: '988.884.576-40',
      out: true
    },
    {
      in: '98888457640',
      out: true
    },
    {
      in: 98888457640,
      out: true
    }
  ]
}
