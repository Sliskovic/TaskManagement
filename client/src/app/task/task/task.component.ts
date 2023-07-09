import { Component } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  links = ['All Tasks', 'Create Task'];
  activeLink = this.links[0];
}
