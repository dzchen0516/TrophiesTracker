import { Component, OnInit } from '@angular/core';
import { TrophyServiceService } from '../../services/trophy-service.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.page.html',
  styleUrls: ['./scoreboard.page.scss'],
})

export class ScoreboardPage implements OnInit {

  static allUsersResults;
  static allTrophiesResults;
  static allUsersTrophiesResults;
  static allUsers;
  static allTrophies;
  static allUsersTrophies;
  results;


  constructor(private trophyService: TrophyServiceService) {
    console.log("scoreboard page ctor run");
    var self = this;
    ScoreboardPage.allUsersResults = [];
    ScoreboardPage.allTrophiesResults = [];
    ScoreboardPage.allUsersTrophiesResults = [];
    ScoreboardPage.allUsers = [];
    ScoreboardPage.allTrophies = [];
    ScoreboardPage.allUsersTrophies = [];
    self.results = [];

    this.trophyService.getUsers(ScoreboardPage.allUsersResults, self.setAllUsers);
    this.trophyService.getTrophies(ScoreboardPage.allTrophiesResults, self.setAllTrophies);
    this.trophyService.getUsersTrophies(ScoreboardPage.allUsersTrophiesResults, self.setAllUsersTrophies, self);
  }

  printVar() {
    console.log(ScoreboardPage.allUsersResults);
    console.log(ScoreboardPage.allTrophiesResults);
    console.log(ScoreboardPage.allUsersTrophiesResults);
  }

  ngOnInit() {

    console.log(ScoreboardPage.allUsersResults);
    console.log("scoreboard page ng on init run");
  }

  setAllUsers() {
    ScoreboardPage.allUsersResults.forEach(item => {
      ScoreboardPage.allUsers.push({id: item.id, username: item.username});
    });
  }

  setAllTrophies() {
    ScoreboardPage.allTrophiesResults.forEach(item => {
      ScoreboardPage.allTrophies.push({id: item.id, trophyType: item.name});
    });
  }

  setAllUsersTrophies(scoreboard) {
    ScoreboardPage.allUsersTrophiesResults.forEach(item => {
      //retrive user name from allUsers array
      var userName = ScoreboardPage.allUsers.find(obj => {
          return obj.id === item.user_id;
      });

      //retrive trophy type from allTrophies array
      var num = ScoreboardPage.allTrophies.filter(obj => {
          return obj.id === item.trophy_id;
      });

      //check if the user exisits in the results array
      //that'll be rendered
      var keyIndex = scoreboard.results.findIndex(obj => {
          return obj.username === userName.username;
      });

      //create new entry {username: number of trophies} 
      //and push it to the results array
      //if the user not existis in the to the results array
      if(keyIndex === -1) {
        scoreboard.results.push({username: userName.username, num: 1});
      }
      //otherwise update the number of trohpies for the user
      else {
        scoreboard.results[keyIndex].num += 1;
      }

    });
  }

}
