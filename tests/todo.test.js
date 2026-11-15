import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("Tiny To-Do App", () => {
  it("should add to-do items and clear the list", async (context) => {
    const testdriver = TestDriver(context);

    // Target the production environment
    await testdriver.provision.chrome({
      url: "https://mikedutuandu.github.io/testdriver-trial/",
    });

    // Verify initial state
    let countAssert = await testdriver.assert("0 items is displayed");
    expect(countAssert).toBeTruthy();

    // Add first to-do item
    const input = await testdriver.find("What needs doing input field");
    await input.click();
    await testdriver.type("Buy groceries");

    const addButton = await testdriver.find("Add button");
    await addButton.click();

    // Verify item was added
    let itemAssert = await testdriver.assert(
      "Buy groceries is visible in the list and item count is 1 item"
    );
    expect(itemAssert).toBeTruthy();

    // Add second to-do item
    await input.click();
    await testdriver.type("Read documentation");
    await addButton.click();

    // Verify second item was added
    let secondAssert = await testdriver.assert("2 items are listed");
    expect(secondAssert).toBeTruthy();

    // Clear all items
    const clearButton = await testdriver.find("Clear all button");
    await clearButton.click();

    // Verify all items cleared
    let clearAssert = await testdriver.assert(
      "the list is empty and 0 items is displayed"
    );
    expect(clearAssert).toBeTruthy();
  });
});
