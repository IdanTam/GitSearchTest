//represet git search result item 
export class GitRepository {
    public id: number;
    public name: string;
    public avatar: string;
    public owner: string;

    constructor(id: number, name: string, avatar: string, owner: string) {
        this.id = id;
        this.avatar = avatar;
        this.owner = owner;
        this.name = name;
    }
}

