import moment from "moment";
import RegexUtil from "./regex.util";

import ToDoList from "./todolist.util";
import Item from "./item.util";
import EmailSenderService from "../services/emailsender.service";

export enum UserErrors {
	InvalidName = -1,
	InvalidEmail = -2,
	InvalidBirthdate = -3,
}

export default class User {
	private _name: string = "";
	private _email: string = "";
	private _birthdate: moment.Moment = moment();
	private _todolist: ToDoList | null = null;

	constructor(name: string, email: string){
		this.name = name;
		this.email = email;
	}

	get name(): string {
		return this._name;
	}

	get email(): string {
		return this._email;
	}

	get birthdate(): moment.Moment {
		return this._birthdate;
	}

	get todolist(): ToDoList|null {
		return this._todolist;
	}

	set name(v: string) {
		this._name = v;
	}

	set email(v: string) {
		this._email = v;
	}

	set birthdate(v: moment.Moment) {
		this._birthdate = v;
	}

	public createToDoList() {
		/**
		 * Check existing todolist
		 */
		if (this.todolist) throw new Error("You already have a todolist");

		this._todolist = new ToDoList(this);
	}

	public addItemInTodo(item: Item, todolist: ToDoList) {
		// Guards inside
		todolist.add(item);

		/**
		 * At 8 items, send a mail to the user
		*/
		if (todolist.items.size == 8) {
			EmailSenderService.sendMail(this);
		}
	}

	isValid(): number {
		let validity = 1;

		/**
		 * Email should match RFC822 email address regex
		 * Name should be valid
		 * User must be at least 13yo
		 */
		if (!this.email.match(RegexUtil.email)) validity = UserErrors.InvalidEmail;
		else if (!this.name.match(RegexUtil.fullname)) validity = UserErrors.InvalidName;
		else if (Math.round(moment.duration({from: this._birthdate, to: moment()}).as("years")) < 13) validity = UserErrors.InvalidBirthdate;

		return validity;
	}
}