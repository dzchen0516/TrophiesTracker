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
  trophiesDict;
  currentTrophy;
  currentPeriod;


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
    self.trophiesDict = {"notes" : 1, "trophy" : 2, "bells": 3};
    self.currentTrophy = "trophy";
    self.currentPeriod = "quarter";

    this.trophyService.getUsers(ScoreboardPage.allUsersResults, self.setAllUsers);
    this.trophyService.getTrophies(ScoreboardPage.allTrophiesResults, self.setAllTrophies);
    this.trophyService.getUsersTrophies(ScoreboardPage.allUsersTrophiesResults, self.setAllUsersTrophies, self);
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
    scoreboard.renderScoreboard('trophy', 'quarter');
    /*scoreboard.results = [];
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

      console.log(userName.username);

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

    });*/
  }

  trophySegmentChanged(ev: any) {
    console.log('Trophy Segment changed', ev);
    var self = this;
    self.currentTrophy = ev.detail.value;

    self.renderScoreboard(self.currentTrophy, self.currentPeriod);
    
    /*var trophyType = self.trophiesDict[self.currentTrophy];
    self.results = [];

    ScoreboardPage.allUsersTrophiesResults.forEach(item => {
      //retrive user name from allUsers array
      var userName = ScoreboardPage.allUsers.find(obj => {
          return obj.id === item.user_id;
      });

      console.log(userName);

      //retrive trophy type from allTrophies array
      var num = ScoreboardPage.allTrophies.filter(obj => {
          return obj.id === item.trophy_id && item.trophy_id === trophyType;
      });

      console.log(num);

      //check if the user exisits in the results array
      //that'll be rendered
      var keyIndex = self.results.findIndex(obj => {
          return obj.username === userName.username;
      });

      //create new entry {username: number of trophies} 
      //and push it to the results array
      //if the user not existis in the to the results array
      if(keyIndex === -1) {
        self.results.push({username: userName.username, num: num.length});
      }
      //otherwise update the number of trohpies for the user
      else {
        self.results[keyIndex].num += num.length;
      }

    });*/
  }

  periodSegmentChanged(ev: any) {
    console.log('Period Segment changed', ev);
    var self = this;
    self.currentPeriod = ev.detail.value;

    self.renderScoreboard(self.currentTrophy, self.currentPeriod);

    /*var trophyType = self.trophiesDict[self.currentTrophy];
    self.results = [];

    var today_date = new Date();
    var this_quarter = self.quarterOfTheYear(today_date.getMonth() + 1);

    ScoreboardPage.allUsersTrophiesResults.forEach(item => {
      var trophy_date = new Date(item.date_awarded);

      var trophy_quarter = self.quarterOfTheYear(trophy_date.getMonth() + 1);

      console.log(trophy_quarter);
      console.log(this_quarter);

      //retrive user name from allUsers array
      var userName = ScoreboardPage.allUsers.find(obj => {
          return obj.id === item.user_id;
      });

      console.log(userName);

      //retrive trophy type from allTrophies array
      var num = ScoreboardPage.allTrophies.filter(obj => {
          return obj.id === item.trophy_id && item.trophy_id === trophyType;
      });

      console.log(num);

      //check if the user exisits in the results array
      //that'll be rendered
      var keyIndex = self.results.findIndex(obj => {
          return obj.username === userName.username;
      });

      //create new entry {username: number of trophies} 
      //and push it to the results array
      //if the user not existis in the to the results array
      if(keyIndex === -1) {
        self.results.push({username: userName.username, num: num.length});
      }
      //otherwise update the number of trohpies for the user
      else {
        self.results[keyIndex].num += num.length;
      }

    });*/
    
  }

  quarterOfTheYear(month) {
      if(month <= 8 && month >= 6) return 1;
      else if(month >= 9 && month <= 11) return 2;
      else if(month == 12 || month <= 2) return 3;
      else if(month >= 3 && month <= 5) return 4;
  }

  renderScoreboard(currentTrophy, currentPeriod) {
    console.log("rednering scoreboard");
    var self = this;
    var trophyType = self.trophiesDict[currentTrophy];
    self.results = [];

    var today_date = new Date();
    var this_quarter = self.quarterOfTheYear(today_date.getMonth() + 1);
    //var this_quarter = 4;

    //initiate the scoreboard list
    ScoreboardPage.allUsers.forEach(user => {
      self.results.push({username: user.username, num: 0});
    });

    ScoreboardPage.allUsersTrophiesResults.forEach(item => {
      console.log(this_quarter);
      var trophy_date = new Date(item.date_awarded);
      var trophy_quarter = self.quarterOfTheYear(trophy_date.getMonth() + 1);
      //applied period or time filter
      if(currentPeriod === 'alltime' || 
         (currentPeriod === 'quarter' && this_quarter === trophy_quarter)) {
          //retrive user name from allUsers array
          var userName = ScoreboardPage.allUsers.find(obj => {
            return obj.id === item.user_id;
          });

          console.log(userName);

          //retrive trophy type from allTrophies array
          var num = ScoreboardPage.allTrophies.filter(obj => {
            return obj.id === item.trophy_id && item.trophy_id === trophyType;
          });

          console.log(num);

          //check if the user exisits in the results array
          //that'll be rendered
          var keyIndex = self.results.findIndex(obj => {
            return obj.username === userName.username;
          });

          //create new entry {username: number of trophies} 
          //and push it to the results array
          //if the user not existis in the to the results array
          if(keyIndex === -1) {
            self.results.push({username: userName.username, num: num.length});
          }
          //otherwise update the number of trohpies for the user
          else {
            self.results[keyIndex].num += num.length;
          }
      }
    });

    //sort the scoreboard list in descending order
    self.results.sort((a, b) => (a.num < b.num) ? 1 : -1);

  }

}
