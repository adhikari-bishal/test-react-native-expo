import { ListComponent } from "../index";
import { fireEvent, render, screen } from "@testing-library/react-native";

describe("<ListComponent />", () => {
  // test rendering with provided data
  it("renders correctly with initial data", () => {
    const mockData = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];

    render(<ListComponent data={mockData} />);

    expect(screen.getByText("Item 1")).toBeTruthy();
    expect(screen.getByText("Item 2")).toBeTruthy();
  });

  // test rendering with empty data
  it("shows no items found message when data is empty", () => {
    render(<ListComponent data={[]} />);

    expect(screen.getByText("No items found")).toBeTruthy();
  });

  // test search feature
  it("filters items based on search term", () => {
    const mockData = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];

    render(<ListComponent data={mockData} />);

    fireEvent.changeText(
      screen.getByPlaceholderText("Search items..."),
      "Item 1",
    );

    expect(screen.getByText("Item 1")).toBeTruthy();
    expect(screen.queryByText("Item 3")).toBeNull();
  });

  // test if items can be selected
  it("allows selecting items", () => {
    const mockData = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];

    render(<ListComponent data={mockData} />);

    fireEvent.press(screen.getByText("Item 1"));

    expect(screen.getByText("Selected")).toBeTruthy();
  });

  // test if clearing search text works
  it("clears search input", () => {
    const mockData = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];

    render(<ListComponent data={mockData} />);

    fireEvent.changeText(
      screen.getByPlaceholderText("Search items..."),
      "Item1",
    );

    fireEvent.press(screen.getByText("Clear"));

    expect(screen.getByPlaceholderText("Search items...")).toBeEmptyElement();
  });
});
