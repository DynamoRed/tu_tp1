import Item from "../utils/item.util";

describe("Item class testing", () => {
	it("Should throw an error if item content length > 1000", () => {
		expect(() => {
			let item: Item = new Item("test_item", new Array(2000).join(" "));
		}).toThrow(Error);
	});

	it("Should successfully create an item", () => {
		let item: Item = new Item("test_item", "Hello World !");
		expect(item.name).not.toBeNull();
	});
});