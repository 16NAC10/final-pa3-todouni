import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.scss']
})
export class TaskFormPage implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      materia: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      prioridad: ['media'],
      descripcion: [''],
      completada: [false]
    });
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const data = this.form.value;
    this.taskService.create(data).subscribe(async () => {
      const t = await this.toastCtrl.create({ message: 'Tarea creada', duration: 1200 });
      await t.present();
      this.router.navigate(['/tabs/home']);
    });
  }
}
