import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
interface languageOption{
  symbol:string,
  languageText:string,
  language:string

}

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss']
})
export class SelectLanguageComponent implements OnInit {
  public esFlags:Array<string>;
  public deFlags:Array<string>;
  public enFlags:Array<string>;
  public languagesFlags: Array<Array<string>>;
  public languageOptions: Array<languageOption>;

  constructor(
    private _dialogRef: MatDialogRef<SelectLanguageComponent>,
    private _translator: TranslateService
  ) { 
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

  ngOnInit(): void {
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

  selectLang(lang:string){
    this._translator.use(lang);
    this._dialogRef.close();
  }

}
