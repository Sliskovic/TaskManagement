import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';
import { TaskComponent } from './task/task.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

const routes: Routes = [
  { path: 'task', component: TaskComponent, },
  { path: 'task/:id', component: TaskDetailComponent },
  { path: 'create', component: TaskCreateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class TaskRoutingModule {}
