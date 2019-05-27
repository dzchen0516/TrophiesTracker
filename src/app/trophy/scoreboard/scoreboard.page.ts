import { Component, OnInit } from '@angular/core';
import { TrophyServiceService } from '../../services/trophy-service.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.page.html',
  styleUrls: ['./scoreboard.page.scss'],
})
export class ScoreboardPage implements OnInit {

  constructor(private trophyService: TrophyServiceService) { }

  ngOnInit() {
    this.trophyService.getUsers();
    this.trophyService.getTrophies();
    this.trophyService.getUsersTrophies();
  }

}
