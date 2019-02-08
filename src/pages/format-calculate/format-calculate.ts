import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AreaData, ScoreArea } from '../../app/model';
import { FormatCalculateDetailPage } from '../format-calculate-detail/format-calculate-detail';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the FormatCalculatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-format-calculate',
  templateUrl: 'format-calculate.html',
})
export class FormatCalculatePage {

  // listArea: testArea[];
  listProvice: string[];
  listArea: ScoreArea[];
  status: boolean[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.status = [true, true]
    this.http.get<string[]>("https://electionvars.azurewebsites.net/api/Election/GetAreaAll")
      .subscribe(data => {
        this.listProvice = data;
        for (var i = 0; i < this.listProvice.length; i++) {
          this.status[i] = true;
        }
        console.log(this.listProvice);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormatCalculatePage');
  }

  ionViewDidEnter() {
    console.log("Enter IonDidViewEnter");

  }

  showDetailArea(index: number, nameArea: string) {
    if (this.status[index] == true) {
      this.status[index] = false;
    }
    else {
      this.status[index] = true;
    }
    this.http.get<AreaData[]>("https://electionvars.azurewebsites.net/api/Election/GetDistrictAll/" + nameArea)
      .subscribe(data => {
        this.listArea = data;
        console.log(this.listArea);
      });
  }

  GoCalculate(subdistrict) {
    this.navCtrl.push(FormatCalculateDetailPage, {
      data: subdistrict
    })
  }

}
