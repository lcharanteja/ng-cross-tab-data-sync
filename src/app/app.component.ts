import { Component, Inject } from '@angular/core';
import { SYNCHRONIZER_FACTORY } from './synchronizer';
import { FormControl, NgControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.less' ]
})
export class AppComponent {
  readonly control = new FormControl('');

  constructor(
    @Inject(SYNCHRONIZER_FACTORY)
    synchronizerFactory: (accessor: () => string) => Observable<string>
  ) {
    const synchronizer = synchronizerFactory(() => this.control.value || '');

    synchronizer.subscribe(value => {
      this.control.setValue(value);
    })
  }
}
