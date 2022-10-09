import { Component,ViewChild,ElementRef,OnInit,DoCheck } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface languageOption{
  symbol:string,
  languageText:string,
  language:string

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  public text:string;
  public startTime: Date;
  public timeLater: Date;
  public initialChar: number;
  public initialWords: number;
  public chartSpeed:number;
  public wordSpeed:number;
  public esFlags:Array<string>;
  public deFlags:Array<string>;
  public enFlags:Array<string>;
  public languagesFlags: Array<Array<string>>;
  public languageOptions: Array<languageOption>;

  @ViewChild("textElement",{static:false}) textArea:ElementRef;
  constructor(
    private _translate: TranslateService
  ){
    this.text = "";    
    this.textArea = {} as ElementRef;
    this.startTime = new Date();
    this.timeLater = new Date();
    this.initialChar = 0;
    this.initialWords = 0;
    this.chartSpeed = 0;
    this.wordSpeed = 0;
    _translate.setDefaultLang('en');
    _translate.use('en');
    this.esFlags = [
      "🇦🇷","🇨🇱","🇨🇴","🇧🇴","🇨🇷","🇨🇺","🇩🇴","🇪🇨","🇸🇻","🇵🇾","🇬🇳","🇬🇹","🇭🇳","🇲🇽","🇳🇮","🇵🇦","🇵🇪","🇪🇸","🇺🇾","🇻🇪"
    ];
    this.enFlags = [
      "🇬🇧","🇺🇸","🇦🇺","🇦🇬","🇧🇸","🇧🇧","🇧🇿","🇧🇼","🇨🇲","🇨🇦","🇩🇲","🇪🇷","🇵🇭","🇫🇯","🇬🇲","🇬🇭","🇬🇩","🇬🇾","🇮🇳","🇮🇪",
      "🇯🇲","🇯🇴","🇰🇪","🇰🇮","🇱🇸","🇱🇷","🇲🇼","🇲🇹","🇲🇭","🇲🇺","🇫🇲","🇳🇦","🇳🇷","🇳🇿","🇳🇬","🇵🇰","🇵🇼","🇵🇬","🇷🇼","🇰🇳","🇱🇨","🇻🇨",
      "🇦🇸","🇸🇨","🇸🇱","🇸🇬","🇸🇧","🇿🇦","🇸🇩","🇸🇿","🇹🇴","🇹🇿","🇹🇹","🇹🇻","🇺🇬","🇻🇺","🇿🇲","🇿🇼","🇼🇸","🇦🇮","🇧🇲","🇰🇾","🇯🇪","🇬🇮","🇳🇺",
      "🇳🇫","🇵🇷","🇹🇰","🇨🇨","🇫🇰","🇻🇬","🇻🇮","🇬🇺","🇬🇬","🇭🇰","🇮🇲","🇨🇰","🇨🇽","🇲🇸","🇹🇨","🇵🇳","🇲🇵"
    ]

    this.deFlags = [
      "🇩🇪","🇦🇹","🇨🇭","🇧🇪","🇱🇺","🇱🇮"
    ]
    this.languagesFlags = [];
    this.languageOptions = [];
  }

  ngOnInit(){
    this.languagesFlags.push(this.deFlags,this.esFlags,this.enFlags);
    let languagesTextString = ["Deutsch","Español","English"];
    let languagesOptions = ["de","es","en"];
    let setOptionsCounter = 0;
    this.languagesFlags.forEach( languageFlags => {
      
      let selectRdmFlag = (max:number) => {
        return Math.floor(Math.random() * max);
      };

      let countFlagsOnLanguage = languageFlags.length;
      let rdmFlag = selectRdmFlag(countFlagsOnLanguage);
      this.languageOptions.push({

        symbol: languageFlags[rdmFlag],
        languageText: languagesTextString[setOptionsCounter],
        language: languagesOptions[setOptionsCounter]

      });
      setOptionsCounter++;
    });
  }

  begin(){
    this.textArea.nativeElement.focus();
    this.startTime = new Date();
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