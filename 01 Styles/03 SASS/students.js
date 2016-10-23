/*jshint esversion: 6 */

import * as bootstrap from "./node_modules/bootstrap/dist/css/bootstrap.css";
import * as mystyles from "./mystyles.scss";
import {getAvg} from './averageService';

const scores = [90, 75, 60, 99, 94, 30];
const averageScore = getAvg(scores);
const messageToDisplay = `average score ${averageScore}`;

document.write(messageToDisplay);
