import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from './logging.service';
import { NotificationService } from './notification.service';
import { PriorityHighlightDirective } from './priority-highlight.directive';
import { HighlighterDirective } from './highlighter.directive';



@NgModule({
  declarations: [
    PriorityHighlightDirective,
    HighlighterDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [
    LoggerService,
    NotificationService,
    LoggerService,
  ],
  exports: [
    PriorityHighlightDirective,
    HighlighterDirective
  ]
})
export class SharedModule { }
