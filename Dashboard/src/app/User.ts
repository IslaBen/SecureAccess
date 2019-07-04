export class User {
    _id : string;
    name: string;
    lastName: string;
    rfID: number;
    constructor(name: string, lastName: string, rfID: number) {
        this.name = name;
        this.lastName = lastName;
        this.rfID = rfID;
    }
}
