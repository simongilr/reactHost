import { Component, Compiler, Injector, Type, ViewContainerRef, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('aboutRef', { static: true, read: ViewContainerRef }) aboutRef!: ViewContainerRef;
  @ViewChild('listRef', { static: true, read: ViewContainerRef }) listRef!: ViewContainerRef;

  constructor(private compiler: Compiler, private injector: Injector) {}

  async ngOnInit(): Promise<void> {
    const AboutModule = await import('about/About');
    const ListModule = await import('list/List');

    this.loadRemoteModule(AboutModule, this.aboutRef);
    this.loadRemoteModule(ListModule, this.listRef);
  }

  private async loadRemoteModule(module: any, container: ViewContainerRef): Promise<void> {
    try {
      const componentType = module.default;

      const moduleFactory = await this.compiler.compileModuleAsync(module);
      const moduleRef = moduleFactory.create(this.injector);
      const componentFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(componentType as Type<any>);

      container.clear();
      container.createComponent(componentFactory);
    } catch (error) {
      console.error('Error al cargar el módulo remoto', error);
    }
  }
}
