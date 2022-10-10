import { Component,ViewChild,ElementRef,OnInit,DoCheck } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectLanguageComponent } from './components/dialogs/select-language/select-language.component';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{

  public text:string;
  public startTime: Date;
  public timeLater: Date;
  public initialChar: number;
  public initialWords: number;
  public chartSpeed:number;
  public wordSpeed:number;
  public translatorLoaded:boolean;
  
  @ViewChild("textElement",{static:false}) textArea:ElementRef;
  constructor(
    private _translate: TranslateService,
    private _dialog: MatDialog
  ){
    this.text = "";    
    this.textArea = {} as ElementRef;
    this.startTime = new Date();
    this.timeLater = new Date();
    this.initialChar = 0;
    this.initialWords = 0;
    this.chartSpeed = 0;
    this.wordSpeed = 0;
    this.translatorLoaded = false;
    this._translate.setDefaultLang('en');
  }
  ngOnInit(): void {
    let currentLocalLang = localStorage.getItem('lang') as string;
    currentLocalLang = (currentLocalLang == '') ? 'en': currentLocalLang;
    this._translate.use(currentLocalLang);
    console.log(this._translate.currentLoader);
    this._translate.currentLoader.getTranslation('es').subscribe((any) => {
      console.log(any);
      this.translatorLoaded = true;
    })
    
  }

  begin(){
    this.textArea.nativeElement.focus();
    this.startTime = new Date();
  }

  openChangeLanguage(){
    this._dialog.open(SelectLanguageComponent);
  }

  displayCounter(){
    this.timeLater = new Date();
    let diffDates_ms = this.timeLater.getTime() - this.startTime.getTime();
    let diffDatesSec = Math.floor(diffDates_ms / 1000);
    let diffDatesMin = diffDates_ms / 60000;
    let totalChar = this.countChar();
    let totalWords = this.countWords();
    let chartPerSec = totalChar/diffDatesSec;
    let wordsPerMin = totalWords/diffDatesMin;
    this.chartSpeed = Math.round(chartPerSec);
    this.wordSpeed = Math.round(wordsPerMin);
  }

  resetAll(){
    this.begin();
    this.textArea.nativeElement.value=""
    this.initialChar = this.countChar();
    this.initialWords = this.countWords();
  }

  countChar():number{
    let charsSeparated = this.text.split("");
    return charsSeparated.length;
  }

  countWords():number{
    let charsSeparated = this.text.split(" ");
    return charsSeparated.length;
  }
}