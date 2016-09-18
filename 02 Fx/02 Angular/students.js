import * as angular from 'angular'
import {studentsComponent} from './studentsComponent'

var app = angular.module('myStudentsApp', []);

app.component('studentsComponent', studentsComponent);

console.log(app);
