# Allow Only Numbers And Decimal Numbers Directive.

## Providing InputNumberDirective reference in app.module

=> Import statement for HttpClientModule
```
import {InputIntDirective} from './directives/input-int-directive';
```
Note:"Please include import statement according to the location of directive."

=> Specify Module name in app.modules[declarations, exports].

Example:
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {InputIntDirective} from './directives/input-int-directive';

@NgModule({
  declarations: [
    InputNumberDirective
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    InputNumberDirective
  ]
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


## Directive usage in html

=> Specify the below html tag instead on input number tag.
```
<input [(ngModel)]="inputValue" name="inputNumberField" class="form-control" type="text" allowOnlyNumeric />
```
Note:"'allowOnlyNumeric' specifies the directive for the input field."
Note:"'ngModel' must be available for this directive to work."
