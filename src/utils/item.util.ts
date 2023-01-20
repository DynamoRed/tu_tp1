import moment from "moment";

export default class Item {
    private _name: string;
    private _content?: string;
    private _creation_date: moment.Moment = moment();

    get name(){
        return this._name
    }

    get content(){
        return this._content || "";
    }

    get creation_date(){
        return this._creation_date
    }

	set name(v: string){
		this._name = v;
	}

	set content(v: string){
		if (v.length > 1000) throw new Error("Too long content");
		this._content = v;
	}

    constructor(name: string, content?: string) {
        this._name = name;
		if (content) this.content = content;
    }
}