import Item from "../utils/item.util";

describe("Item class testing", () => {
	it("Should successfully create an item", () => {
		const item = new Item("item1", "Hello World !");
		expect(item.name).toEqual("item1");
		expect(item.content).toEqual("Hello World !");
	});
});