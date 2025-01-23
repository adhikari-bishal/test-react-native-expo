import { ListComponent } from "../index";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../../redux/rootReducer";

describe("<ListComponent />", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        list: {
          data: [
            { id: 1, name: "Item 1" },
            { id: 2, name: "Item 2" },
          ],
          dataSource: [
            { id: 1, name: "Item 1" },
            { id: 2, name: "Item 2" },
          ],
          selectedItems: [],
          searchTerm: "",
          loading: false,
          error: null,
        },
      },
    });
  });

  // test rendering with provided data
  it("renders correctly with initial data", () => {
    render(
      <Provider store={store}>
        <ListComponent />
      </Provider>,
    );

    expect(screen.getByText("Item 1")).toBeTruthy();
    expect(screen.getByText("Item 2")).toBeTruthy();
  });

  // test rendering with empty data
  it("shows no items found message when data is empty", () => {
    store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        list: {
          data: [],
          dataSource: [],
          selectedItems: [],
          searchTerm: "",
          loading: false,
          error: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <ListComponent />
      </Provider>,
    );

    expect(screen.getByText("No items found.")).toBeTruthy();
  });

  // test search feature
  it("filters items based on search term", () => {
    render(
      <Provider store={store}>
        <ListComponent />
      </Provider>,
    );

    fireEvent.changeText(screen.getByPlaceholderText("Search..."), "Item 1");

    expect(screen.getByText("Item 1")).toBeTruthy();
    expect(screen.queryByText("Item 2")).toBeNull();
  });

  // test if items can be selected
  it("allows selecting items", () => {
    render(
      <Provider store={store}>
        <ListComponent />
      </Provider>,
    );

    fireEvent.press(screen.getByText("Item 1"));

    // Check if the "Selected" text is displayed after selection
    expect(screen.getByText("Selected")).toBeTruthy();
  });

  // test if clearing search text works
  it("clears search input", () => {
    render(
      <Provider store={store}>
        <ListComponent />
      </Provider>,
    );

    fireEvent.changeText(screen.getByPlaceholderText("Search..."), "Item1");
    fireEvent.press(screen.getByText("Clear"));

    // Check if the search input is cleared
    expect(screen.getByPlaceholderText("Search...")).toHaveTextContent("");
  });
});
