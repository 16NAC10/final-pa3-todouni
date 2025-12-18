import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule, ToastController, NavController, AlertController} from '@ionic/angular';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss']
})
export class TaskDetailPage implements OnInit {
  task?: Task;
  form!: FormGroup;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private router: Router,
    private alertCtrl: AlertController,
  ) {}

  ngOnInit() {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      materia: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      prioridad: ['media'],
      descripcion: [''],
      completada: [false]
    });

    this.taskService.getById(this.id).subscribe(t => {
      this.task = t;
      this.form.patchValue(t);
    });
  }

  save() {
    if (!this.task) return;
    const updated: Task = { ...this.task, ...this.form.value };
    this.taskService.update(updated).subscribe(async () => {
      const toast = await this.toastCtrl.create({ message: 'Tarea actualizada', duration: 1200 });
      await toast.present();
      this.router.navigate(['/home']);
    });
  }

  async deleteTask() {
    if (!this.task || !this.task.id) return;

    const alert = await this.alertCtrl.create({
      header: 'Eliminar tarea',
      message: '¿Estás seguro de que querés eliminar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.taskService.delete(this.task!.id!).subscribe(async () => {
              const toast = await this.toastCtrl.create({
                message: 'Tarea eliminada',
                duration: 1200,
                color: 'danger'
              });
              await toast.present();
              await this.router.navigate(['/home']);
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
