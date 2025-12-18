import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonRouterOutlet,
  IonRouterLink,
  IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonMenuToggle, IonItem, IonIcon, IonRouterLink, IonRouterOutlet, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonLabel, IonTitle],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Nueva Tarea', url: '/new', icon: 'person' },
  ];

  tituloActual: string = 'TodoUni';

  constructor(private router: Router) {
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.actualizarTitulo(event.urlAfterRedirects);
      }
    });
  }

  private actualizarTitulo(url: string) {
    const pagina = this.appPages.find(p => url.startsWith(p.url));
    this.tituloActual = pagina ? pagina.title : '';
  }
}
