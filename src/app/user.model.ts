export class User {
    public index?: number;
    public id?: number;
    public name: string;
    public email: string;
    public contact: string;

    constructor(name: string, email: string, contact: string) {
        this.name = name;
        this.email = email;
        this.contact = contact;
    }

}