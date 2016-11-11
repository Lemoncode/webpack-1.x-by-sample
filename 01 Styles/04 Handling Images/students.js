import * as bootstrap from './node_modules/bootstrap/dist/css/bootstrap.css';
import * as mystyles from './mystyles.scss';
import {getAvg} from './averageService';
import logoImg from './content/logo_1.png';

const img = document.createElement('img');
img.src = logoImg;

document.getElementById('imgContainer').appendChild(img);

const scores = [90, 75, 60, 99, 94, 30];
const averageScore = getAvg(scores);
const messageToDisplay = `average score ${averageScore}`;

document.write(messageToDisplay);
