import { Component } from '@angular/core';

@Component(
  {
    selector: 'app',
    template: `
      <h1>{{title}}</h1>
    `
  }
)
class App {
  title: string = "Hello Angular 2 with Webpack!"
}

export {
  App
}
