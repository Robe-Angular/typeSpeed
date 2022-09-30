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
  @ViewChild("textElement",{static:false}) textArea:ElementRef;

  title = 'typeSpeed';

  constructor(){
    this.text = "";    
    this.textArea = {} as ElementRef;
    this.startTime = new Date();
    this.timeLater = new Date();
    this.initialChar = 0;
    this.initialWords = 0;
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
    console.log('count');
    console.log(diffDates_ms);
    console.log(diffDatesSec);
    console.log(diffDatesMin);
    console.log(chartPerSec);
    console.log(wordsPerMin);
  }

  resetAll(){
    this.textArea.nativeElement.focus();
    this.textArea.nativeElement.value="";
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
