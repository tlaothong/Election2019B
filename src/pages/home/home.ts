import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { PartyScore, GlobalVaraible, ScoreOther } from '../../app/model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  listScoreAll: PartyScore[];
  listScore: PartyScore[] = [];
  listScoreWithStatusAllies: PartyScore[];
  listShowScore: PartyScore[] = [];
  listScoreOther: PartyScore[] = [];
  otherScore: ScoreOther = new ScoreOther;
  checkShowMoreParty: boolean = false
  // listfilter: PartyScore[];
  alliesData: string[];
  selectOptions: { title: string; subTitle: string; mode: string; };
  filter: string;

  constructor(public navCtrl: NavController, public http: HttpClient, public alertController: AlertController, public loadingCtrl: LoadingController) {
    // this.selectOptions = {
    //   title: 'Pizza Toppings',
    //   subTitle: 'Select your toppings',
    //   mode: 'md'
    // };
    // GetAllStatusAllies

  }
  ionViewDidEnter() {
    this.filter = "all";
    this.http.get<string[]>(GlobalVaraible.host + "GetAllStatusAllies")
      .subscribe(data => {
        this.alliesData = data;
        console.log("xxx");
        console.log(this.alliesData);
      });

    // "http://localhost:5000/api/ElectionV3/UploadFile"
    // GlobalVaraible.host + "GetAllPartyScore"
    this.listShowScore = [];
    this.listScoreAll = [];
    this.listScoreWithStatusAllies = [];
    // this.listfilter = [];
    this.listScore = [];
    this.http.post(GlobalVaraible.host + "UpdatePartyScore", null)
      .subscribe(data => {
        this.http.get<PartyScore[]>(GlobalVaraible.host + "GetAllPartyScore")
          .subscribe(data => {
            this.listScoreAll = data;
            // this.listfilter = this.listScoreAll;
            this.listScoreAll.forEach(data => {
              data.isChecked = true;
              this.listScore.push(data);
            });
            this.listShowScore = this.listScore;
            this.otherScore = { score: 0, scoreArea: 0, scorePartyList: 0, scorePercent: 0, isChecked: true, status: true };
            console.log(this.listScore);
          });
        // this.listfilter = this.listScoreAll;
      });
  }

  setStatusAlly(scorePartymodel: PartyScore) {
    this.http.post(GlobalVaraible.host + "SetStatusAllies/" + scorePartymodel.id + "/" + scorePartymodel.statusAllies, null)
      .subscribe(data => {
        console.log("set done");
      });
  }

  ShowMoreParty() {
    if (this.checkShowMoreParty == false) {
      this.checkShowMoreParty = true
    } else {
      this.checkShowMoreParty = false
    }
  }

  goFilter() {
    if (this.filter != "all") {
      this.listShowScore = this.listScoreAll.filter(it => it.statusAllies == this.filter);
      this.listScore.forEach(it => {
        it.isChecked = this.listShowScore.some(i => i.idParty == it.idParty)
      });
    }
    else {
      this.listShowScore = this.listScoreAll;
      this.listScore.forEach(it => {
        it.isChecked = true
      });
    }
  }

  checkFilter() {
    this.listShowScore = this.listScore.filter(it => it.isChecked);
    this.listScoreOther = this.listScore.filter(it => !it.isChecked);
    if (this.listScoreOther != []) {
      this.otherScore = { score: 0, scoreArea: 0, scorePartyList: 0, scorePercent: 0, isChecked: true, status: true };
      this.listScoreOther.forEach(data => {
        this.otherScore.score += data.haveScore;
        this.otherScore.scoreArea += data.areaScore;
        this.otherScore.scorePartyList += data.nameListScore;
        this.otherScore.scorePercent += data.percentScore;
      });
    }
    else {
      this.otherScore.status = false;
    }
  }

  SendResultScore() {
    console.log("1");
    const loader = this.loadingCtrl.create({
      content: 'กรุณารอสักครู่ กำลังส่งข้อมูล...',
      duration: 300000,
      dismissOnPageChange: true
    })
    loader.present();
    this.http.post(GlobalVaraible.host + "UpdateTable2", null)
      .subscribe(data => {
        console.log("2");
        this.http.post(GlobalVaraible.host + "UpdateScorePartyApp1", null)
          .subscribe(data => {
            console.log("3");
            const confirm = this.alertController.create({
              title: 'ส่งผลประเมิณสำเร็จ',
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    loader.dismiss();
                    console.log("done");
                  }
                }
              ]
            });
            confirm.present();
          });
      });

  }

  showScoreAreaOfParty(idPart: string) {
    this.navCtrl.push("KaddetailPage", { _idParty: idPart });
  }

  showScorePartyListOfParty() {
    this.navCtrl.push("PartylistdetailPage");
  }

  // getItems(ev) {
  //   // Reset items back to all of the items
  //   this.listfilter = this.listScoreAll;

  //   // set val to the value of the ev target
  //   var val = ev.target.value;

  //   // if the value is an empty string don't filter the items
  //   if (val && val.trim() != '') {
  //     this.listfilter = this.listScoreAll.filter((item) => {
  //       return (item.partyName.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //     });
  //   }
  // }
}
