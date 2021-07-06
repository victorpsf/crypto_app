export default {
  name: 'encrypt-page',

  data() {
    return {
      mode: 'form',

      fields: [{
        name: 'dependecy-field',
        label: 'Opção',
        field: 'option',
        value: null,
        shared: {
          options: { '1': 'Teste', '2': 'Teste 2' },
          fields: {
            '1': [
              { name: 'text-field', label: 'Valor', field: 'value', value: null, shared: { type: 'password' } },
            ],
            '2': [
              { name: 'file-field', label: 'Chaves', field: 'keys', value: null },
              { name: 'text-field', label: 'Valor', field: 'value', value: null, shared: { type: 'password' } },
            ]
          }
        },
      }]
    }
  },
}