import { Directive } from "@angular/core";
import { ElementRef } from "@angular/core";

/**
 * Generated class for the ProfileImgDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: "[profile-img]" // Attribute selector
})
export class ProfileImgDirective {
  constructor(private element: ElementRef) {
    console.log("Hello ProfileImgDirective Directive");
  }

  ngOnInit() {
    console.log(this.element.nativeElement);
    console.log("profile-img directive is working....");
  }
}
