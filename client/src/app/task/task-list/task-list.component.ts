import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Observer } from 'rxjs';

import { TaskService } from '../task.service';
import {
  Priority,
  PriorityColor,
  Status,
  StatusColor,
  TaskDto,
} from '../dto/task.interface';
import { LoggerService } from 'src/app/shared/logging.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<TaskDto>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  taskId = 0;
  displayedColumns: string[] = [
    'index',
    'name',
    'description',
    'priority',
    'status',
    'createdAt',
    'action',
  ];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize: number = 5;
  pageIndex: number = 0;
  totalTasks: number = 0;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    this.loadTasks();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.sort.active = 'createdAt';
    this.sort.direction = 'desc';
    this.sort.sortChange.emit();
  }
  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadTasks();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  loadTasks() {
    const observer: Observer<TaskDto[]> = {
      next: (response) => {
        this.dataSource.data = response;
      },
      error: (error) => {
        this.logger.log('Error fetching tasks:', error);
      },
      complete: () => {
        this.logger.log('Task observable is now completed.');
      },
    };
    this.taskService.getTasks().subscribe(observer);
  }

  viewTaskDetails(taskId: number) {
    this.router.navigate(['/task', taskId]);
  }
  getPriorityColor(priority: Priority): string {
    const priorityMap: Record<Priority, string> = {
      [Priority.LOW]: PriorityColor.LOW,
      [Priority.MEDIUM]: PriorityColor.MEDIUM,
      [Priority.HIGH]: PriorityColor.HIGH,
    };

    return priorityMap[priority] || 'inherit';
  }

  getStatusColor(status: Status): string {
    const statusMap: Record<Status, string> = {
      [Status.CLOSED]: StatusColor.CLOSED,
      [Status.INPROCESS]: StatusColor.INPROCESS,
      [Status.PROJECTED]: StatusColor.PROJECTED,
    };

    return statusMap[status] || 'inherit';
  }
}
