import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  private taskService = inject(TaskService);
  tasks: Task[] = [];
  filter: 'all' | 'pending' | 'completed' = 'all';

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (res) => this.tasks = res.tasks,
      error: (err) => console.error(err)
    });
  }

  get filteredTasks(): Task[] {
    if (this.filter === 'pending') return this.tasks.filter(t => !t.completed);
    if (this.filter === 'completed') return this.tasks.filter(t => t.completed);
    return this.tasks;
  }

  toggleComplete(task: Task): void {
    const updated = { ...task, completed: !task.completed };
    this.taskService.updateTask(task._id, updated).subscribe(() => this.loadTasks());
  }

  deleteTask(id: string): void {
    if (confirm('Delete this task?')) {
      this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
    }
  }
}