import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {NgModel} from '@angular/forms';

@Directive({
  selector: 'input[allowOnlyNumeric] [ngModel][allowOnlyNumeric]'
})
export class InputNumberDirective {

  // Regular expression for allowing decimal number and numbers only.
  // Note: To allow only number's use "/^[0-9]*$/g".
  private regex: RegExp = new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);

  // To allow special key functionalities.
  // To allow negative number's add "-" to the bellow list.
  private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'];

  constructor(private el: ElementRef, public ngModel: NgModel) {
  }

  // To listen to mouse paste events.
  // To paste the value in the input field through mouse events.
  @HostListener('paste', ['$event'])
  documentRClick(event: Event) {
    this.onPasteValue(event);
  }

  // To listen to keyboard events.
  @HostListener('keydown', [ '$event' ])
  onKeyDown(event: KeyboardEvent) {

    if(((event.key === 'v' || event.key === 'V') && event.ctrlKey === true)){
      this.onPasteValue(event);
      return;
    } else {
      if (this.specialKeys.indexOf(event.key) !== -1 || ((event.key === 'c' || event.key === 'C') && event.ctrlKey === true)) {
        return;
      }
      let current: string = this.el.nativeElement.value;
      let next: string = current.concat(event.key);
      if (next && !String(next).match(this.regex)) {
        event.preventDefault();
      }
    }
  }

  // To paste value in the input field.
  // Login applies the same for mouse paste event and keyboard event (Ctl+v or Ctl+V).
  onPasteValue(event){
    let nonUpdatedValue = JSON.parse(JSON.stringify(this.el.nativeElement.value));
    setTimeout(() => {
      const initalValue:string = this.ngModel.value;
      if(initalValue && !String(initalValue).match(this.regex)){
        this.ngModel.control.setValue(nonUpdatedValue);
        this.el.nativeElement.value = nonUpdatedValue;
        event.preventDefault();
      }
    }, 320);
  }
}
