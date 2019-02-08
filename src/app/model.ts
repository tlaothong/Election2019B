
export class ElectionModel {
    id: string;
    nameArea: string;
    numberArea: number;
    province: string;
    district: string;
    party: string;
    nameRegister: string;
    score: number;
    targetScore: number
    tag: string
}

export class testArea {
    nameArea: string;
    subArea: string[];
    status: boolean
}

export class LocationModel {
    id: string;
    idProvince: string;
    locationCode: string;
    province: string;
    district: string;
    subDistrict: string;
    zipCode: string;
    note: string;
}

export class PartyScore {
    id: string;
    idParty: string;
    partyName: string;
    totalScore: number;
    areaScore: number;
    nameListScore: number;
    percentScore: number;
}
export class AreaElection {

    id: string;
    nameArea: string;
    partyName: string;
    score: string;
    tag: string;
    partyWinner: string;
}

export class FilterArea {
    name: string;
    isChecked: boolean;
}

export class DataMaxScore {
    id: string;
    idArea: string;
    idParty: string;
    nameArea: string;
    nameInitial: string;
    nameParty: string;
    nameRegister: string;
    noRegister: string;
    score: number;
    source: number;
    status: boolean;
    tags: string[];
}


export class AreaData {
    Id: string;
    NameParty: string;
    NameArea: string;
    LocationCode: string;
    IDProvince: string;
    District: string;
    SubDistrict: string;
    NameRegister: string;
    NoRegister: string;
    Status: string;
    ScoreReceive: DataScore[];
}

export class ScoreArea {
    id: string;
    idArea: string;
    nameArea: string;
    idParty: string;
    nameParty: string;
    noRegister: string;
    nameRegister: string;
    status: string;
    nameInitial: string;
    tags: string;
    score: string;
    source: string;
}

export class DataScore {
    DateElection: Date;
    Score: number;
    status: boolean;
    nameInitial: string;
    tags: string[];
    score: number;
    source: string;
}


export class GlobalVaraible {
    static host: string = "https://electionvars.azurewebsites.net/api/ElectionV2/";
}