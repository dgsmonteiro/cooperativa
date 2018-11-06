import {
  Component, OnInit, ViewChild, ElementRef, AfterViewChecked
} from '@angular/core';
import { UserComponent } from '../../components/user/user.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import {
  PRESET_FORMS, PRESET_VALIDATORS, PRESET_FORMATTERS
} from '../../models/FormModal';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: UserComponent;
  userMenu: string[] = ['Login', 'Ajuda'];
  userLinks: string[] = ['Conta', 'Projetos', 'Recursos', 'Metas', 'Desafios'];

  constructor(
    // formBuilder: FormBuilder,
    // private conversationService: ConversationService,
    // private alertas: MatSnackBar
  ) {
    this.user = new UserComponent();
    // this.formMessage = formBuilder.group({
    //   textBox: new FormControl('', {
    //     updateOn: 'change',
    //     validators: [Validators.required]
    //   })
    // });
  }

  ngOnInit() {
    // menssagem de boas vindas
    // this.waitingResponse = true;
    // this.conversationService.sendMsg('ola', this.chatbot.context).subscribe(
    //   res => this.chatbotAns(res),
    //   err => console.log(err)
    // );
  }

  // sugestoesFiltradas(): string[] {
  //   const texto = this.formMessage.controls.textBox.value || '';
  //   return this.sugestao.filter(x => x.toUpperCase().includes(texto.toUpperCase()));
  // }

  // sendMessage() {
  //   const caixaTxt = this.formMessage.controls.textBox as FormControl;
  //   caixaTxt.updateValueAndValidity();
  //   const msg: string = caixaTxt.value.trim();
  //   if (!msg) {
  //     return;
  //   }
  //   if (!caixaTxt.valid) {
  //     this.alertas.open(
  //       (caixaTxt.errors || {
  //         message: `O ${this.nomeValidacao} que você digitou é inválido!`
  //       }).message as string,
  //       'Entendi',
  //       { politeness: 'polite', duration: 3000, verticalPosition: 'top' }
  //     );
  //     return;
  //   } else if (!this.waitingResponse) {
  //     caixaTxt.setValidators(Validators.required);
  //     this.placeholder = 'O assistente está digitando...';
  //     this.waitingResponse = true;
  //     delete this.chatbot.context.sugestao;
  //     this.conversation.push({ text: this.formatMessage(msg), type: 'client' });
  //     // this.conversationService.sendMsg(msg, this.chatbot.context).subscribe(
  //     //   res => this.chatbotAns(res),
  //     //   err => console.log(err)
  //     // );
  //     this.formMessage.reset();
  //   }
  // }

  // private formatMessage(msg: string): string {
  //   const formatter = PRESET_FORMATTERS[this.nomeValidacao];
  //   if (formatter) {
  //     return formatter(msg);
  //   } else {
  //     return msg;
  //   }
  // }

  // sugestionClicked(suggestion: string) {
  //   this.formMessage.controls.textBox.setValue(suggestion);
  //   this.sendMessage();
  // }

  // chatbotAns(res: any) {
  //   this.waitingResponse = false;
  //   this.chatLastRes = res;
  //   this.chatbot.context = res.response.context;
  //   if (!res.response.output.nao_entendi) {
  //     this.sugestao = res.response.context.sugestao || [];
  //     delete this.chatbot.context.sugestao;
  //   }
  //   if (res.success) {
  //     if (Array.isArray(res.response.output.text)) {
  //       res.response.output.text.forEach((msg: any) => {
  //         this.conversation.push({ text: msg, type: 'bot' });
  //       });
  //     } else {
  //       this.conversation.push({ text: res.response.output.text, type: 'bot' });
  //     }
  //   }
  //   this.updateValidations();
  // }

  // ngAfterViewChecked() {
  //   this.scrollToBottom();
  // }

  // inputFocus() {
  //   this.scrollToBottom();
  // }

  // validInput(): boolean {
  //   const txtBox = this.formMessage.controls.textBox;
  //   return txtBox.valid && txtBox.value;
  // }

  // private updateValidations() {
  //   const dadosValidacao = this.chatbot.context.validacao;
  //   const formName: string = this.chatbot.context.formulario;
  //   this.scrollToBottom();
  //   if (!formName && !dadosValidacao) {
  //     this.placeholder = 'Digite aqui sua mensagem';
  //     return;
  //   }
  //   const validatorName = dadosValidacao.nome;
  //   const caixaTxt = this.formMessage.controls.textBox as FormControl;
  //   const validator = PRESET_VALIDATORS[validatorName];
  //   const form = PRESET_FORMS[formName];
  //   if (form) {
  //     // TODO abir modal
  //     console.log('abrir modal');
  //   } else if (validator) {
  //     caixaTxt.setValidators(validator);
  //     this.nomeValidacao = validatorName;
  //     this.placeholder = this.chatbot.context.validacao.placeholder ||
  //       'Digite aqui o seu ' + validatorName;
  //   } else {
  //     console.error(`Não foi possivel encontrar o formulario "${formName}" ou ` +
  //       `a validação "${validatorName}"`);
  //   }
  //   delete this.chatbot.context.validacao;
  //   delete this.chatbot.context.formulario;
  //   const nativeInput = this.refCaixaTexto.nativeElement as HTMLInputElement;
  //   nativeInput.focus();
  //   nativeInput.click();
  // }

  // private scrollToBottom() {
  //   if (this.divConversa && this.divConversa.nativeElement) {
  //     const baloes: HTMLElement = this.divConversa.nativeElement;
  //     baloes.scroll({
  //       top: baloes.scrollHeight,
  //       behavior: 'smooth'
  //     });
  //   }
  // }
}

