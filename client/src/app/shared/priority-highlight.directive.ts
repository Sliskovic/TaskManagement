import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';
import { Priority, PriorityColor } from '../task/dto/task.interface';

@Directive({
  selector: '[appPriorityHighlight]'
})
export class PriorityHighlightDirective {

  @Input('appPriorityHighlight') priority!: Priority;


    constructor(private el: ElementRef) {}

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['priority'] && this.priority) {
        const priorityClass = this.getPriorityClass(this.priority);
        this.el.nativeElement.classList.add(priorityClass);
      }
    }

    private getPriorityClass(priority: string): string {
      switch (priority) {
        case 'LOW':
          return 'priority-low';
        case 'MEDIUM':
          return 'priority-medium';
        case 'HIGH':
          return 'priority-high';
        default:
          return '';
      }
    }

  }
