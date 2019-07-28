export class Agenda {
    agenda: {
      userId: String,
      inicio: String,
      fim: Number,
      horaInicio: Number,
      horaFim: Number,
      endereco: Number,
      valor: String,
      formaPagamento: {
        dinheiro: Boolean,
        pagSeguro: Boolean
      }
    }

    set (agenda) {
      this.agenda = agenda;
    }
    get (){
      return this.agenda;
    }
    
  }
  