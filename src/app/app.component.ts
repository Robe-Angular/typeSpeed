import { Component,ViewChild,ElementRef } from '@angular/core';


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
  @ViewChild("textElement",{static:false}) textArea:ElementRef;
  constructor(){
    this.text = "";    
    this.textArea = {} as ElementRef;
    this.startTime = new Date();
    this.timeLater = new Date();
    this.initialChar = 0;
    this.initialWords = 0;
    this.chartSpeed = 0;
    this.wordSpeed = 0;
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
