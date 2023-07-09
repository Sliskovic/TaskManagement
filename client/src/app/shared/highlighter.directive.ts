import { Directive, ElementRef, HostBinding, Input, SecurityContext, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appHighlighter]'
})
export class HighlighterDirective {

  @Input("highlight") searchTerm!: string;
  @Input() caseSensitive = false;
  @Input() customClasses = "";

  @HostBinding("innerHtml")
  content!: any;
  constructor(private el: ElementRef, private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.el?.nativeElement) {
      if ("searchTerm" in changes) {
        const text = (this.el.nativeElement as HTMLElement).textContent ?? "";
        if (this.searchTerm === "") {
          this.content = text;
        } else {
          const regex = new RegExp(
            this.searchTerm,
          );
          const newText = text.replace(regex, (match: string) => {
            return `<mark class="highlight ${this.customClasses}">${match}</mark>`;
          });
          const sanitzed = this.sanitizer.sanitize(
            SecurityContext.HTML,
            newText
          );
          this.content = sanitzed;
        }
      }
    }
  }

}
