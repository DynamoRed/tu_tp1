import Item from "../utils/item.util";
import User, { UserErrors } from "../utils/user.util";

describe("User class testing", () => {
	it("Should successfully create a user", () => {
		const user = new User("test_user", "test@test.fr");
		expect(user.name).toEqual("test_user");
		expect(user.email).toEqual("test@test.fr");
		expect(user.isValid()).toBeTruthy();
	});

	it("Should return an error if user name length > 100", () => {
		const user = new User(new Array(200).join(" "), "test@test.fr");
		expect(user.isValid()).toEqual(UserErrors.InvalidName);
	});

	it("Should return an error if mail is invalid", () => {
		const user = new User("test", "testtest.fr");
		expect(user.isValid()).toEqual(UserErrors.InvalidEmail);
	});

	it("Should successfully create a todolist", () => {
		const user = new User("test_user", "test@test.fr"); // valid
		user.createToDoList();

		expect(user.todolist).not.toBeNull();
	});

	it("Should throw an error if user already have a todolist", () => {
		const user = new User("test_user", "test@test.fr"); // valid
		user.createToDoList();
		
		expect(() => {
			user.createToDoList();
		}).toThrow(Error);
	});

	it("Should successfully add an item in todolist", () => {
		const user = new User("test_user", "test@test.fr"); // valid
		user.createToDoList();
		
		const item = new Item("item1", "Hello World !");

		user.addItemInTodo(item, user.todolist!)
	});
});
