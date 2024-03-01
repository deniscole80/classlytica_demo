import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription, map } from 'rxjs';

@Directive({
  selector: '[onlyOne]'
})
export class LimitTextDirective {

  private subscription!: Subscription;

  constructor(private ngControl: NgControl) {
  }

  ngOnInit() {
    const control = this.ngControl.control!;
    this.subscription = control.valueChanges.pipe(
      map((value: any) => {
        if(value){
          let part = value.replace(/[^0-9\.]+/g, "")
          return part[0];
        }
        return null
      })
    ).subscribe(v => control.setValue(v, { emitEvent: false }));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
