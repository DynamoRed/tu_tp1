import moment from "moment";

import Item from "./item.util"
import User from "./user.util";

export default class ToDoList {
	private _items: Map<string, Item> = new Map();
	private _lastInsert: moment.Moment = moment();
	private _owner: User;

	constructor(owner: User){
		this._owner = owner;
	}

	get items(){
		return this._items;
	}

	get lastInsert(){
		return this._lastInsert;
	}

	get owner(){
		return this._owner;
	}

	public add(item: Item){
		/**
		 * Check if item can be insert
		 */
		if (Math.round(moment.duration({from: this.lastInsert, to: moment()}).as("minutes")) < 30) throw new Error("Too early to add another item");
		if (this.items.has(item.name) || this.items.size >= 10) throw new Error("Duplicate item or list full");

		/**
		 * Insert item
		 */
        this._items.set(item.name, item);
		this._lastInsert = moment();
	}
}