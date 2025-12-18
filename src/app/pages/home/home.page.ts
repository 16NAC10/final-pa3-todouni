import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import {AlertController,  ToastController} from '@ionic/angular';
import { Router } from '@angular/router';
import {
  IonBadge, IonButton,
  IonCard, IonCheckbox,
  IonContent,
  IonHeader, IonIcon,
  IonItem,
  IonLabel, IonList, IonSegment, IonSegmentButton,
  IonSelect, IonSelectOption, IonSpinner,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonItem, IonLabel, IonSelect, IonSelectOption, IonSegment, IonSegmentButton, IonList, IonCheckbox, IonBadge, IonButton, IonIcon, IonSpinner, FormsModule, NgClass, NgForOf, NgIf],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  materias: string[] = [];
  filterMateria = 'todas';
  filterCompletada: 'todas' | 'completas' | 'incompletas' = 'todas';
  loading = false;

  constructor(
    private taskService: TaskService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.taskService.getAll().subscribe(tasks => {
      // Orden por fecha (más próxima primero)
      this.tasks = tasks.sort((a, b) => new Date(a.fechaVencimiento).getTime() - new Date(b.fechaVencimiento).getTime());
      this.materias = Array.from(new Set(this.tasks.map(t => t.materia)));
      this.loading = false;
    }, () => this.loading = false);
  }

  get filteredTasks() {
    return this.tasks.filter(t => {
      if (this.filterMateria !== 'todas' && t.materia !== this.filterMateria) return false;
      if (this.filterCompletada === 'completas' && !t.completada) return false;
      if (this.filterCompletada === 'incompletas' && t.completada) return false;
      return true;
    });
  }

  prioridadClass(p: string) {
    return {
      'prioridad-alta': p === 'alta',
      'prioridad-media': p === 'media',
      'prioridad-baja': p === 'baja'
    };
  }

  toggleCompleted(task: Task) {
    const updated = { ...task, completada: !task.completada };
    this.taskService.update(updated).subscribe(() => {
      task.completada = updated.completada;
    });
  }

  async confirmDelete(task: Task) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: `¿Borrar tarea "${task.titulo}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Borrar', role: 'destructive', handler: () => this.deleteTask(task) }
      ]
    });
    await alert.present();
  }

  deleteTask(task: Task) {
    this.taskService.delete(task.id!).subscribe(async () => {
      await this.presentToast('Tarea borrada');
      this.loadTasks();
    });
  }

  openDetail(task: Task) {
    this.router.navigate(['/task-detail', task.id]);
  }

  async presentToast(msg: string) {
    const t = await this.toastCtrl.create({ message: msg, duration: 1500, position: 'bottom' });
    await t.present();
  }
}
