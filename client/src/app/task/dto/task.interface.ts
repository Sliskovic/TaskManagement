export interface TaskDto {
    id: any; 
    name: string;
    description: string;
    priority: Priority
    status: Status,
    createdAt: Date
}
export enum Priority {
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High',
  }
  
  export enum Status {
    CLOSED = 'Closed',
    INPROCESS = 'In Process',
    PROJECTED= 'Projected',
  }

  export enum PriorityColor {
    LOW = 'priority-low',
    MEDIUM = 'priority-medium',
    HIGH = 'priority-high',
  }
  
  export enum StatusColor {
    CLOSED = 'gray',
    INPROCESS = 'green',
    PROJECTED = 'blue',
  }