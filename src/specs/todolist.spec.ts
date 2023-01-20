import User from "../utils/user.util";
import ToDoList from "../utils/todolist.util";
import Item from "../utils/item.util";

describe("Todolist class testing", () => {
	let user: User;

	beforeEach(() => {
		user = new User("test_user", "test@test.fr");
	});

	it("Should successfully create a todolist", () => {
		const todolist = new ToDoList(user);
		expect(todolist).not.toBeNull();
	});

	it("Should successfully add an item in todolist", () => {
		const user = new User("test_user", "test@test.fr"); // valid
		const todolist = new ToDoList(user);

		const item = new Item("item1", "Hello World !");
		todolist.add(item);
	});

	it("Should return an error if item is already in list", () => {
		const user = new User("test_user", "test@test.fr"); // valid
		const todolist = new ToDoList(user);

		const item = new Item("item1", "Hello World !");
		const item2 = new Item("item1", "Hello World 2 !");
		todolist.add(item);

		expect(() => {
			todolist.add(item2);
		}).toThrow(Error);
	});

	it("Should throw an error if user don't have a todolist", () => {
		const item = new Item("item1", "Hello World !");

		expect(() => {
			user.todolist!.add(item);
		}).toThrow(Error);
	});
});