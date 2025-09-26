import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  @Input() externalColor: string = 'black';
  @Input('appHighlight') defaultColor: string = 'red';

  constructor() {}
}
