import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import debounce from "lodash.debounce";

interface Item {
  id: number;
  name: string;
}

interface ListComponentProps {
  data: Item[];
}

const ListComponent: React.FC<ListComponentProps> = ({ data = [] }) => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [dataSource, setDataSource] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    setDataSource(data);
  }, [data]);

  // Define a debounced search function instead of setTimeout
  const search = useCallback(
    debounce((searchValue: string) => {
      if (searchValue.trim() === "") {
        setDataSource(data);
      } else {
        setDataSource(
          data.filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase()),
          ),
        );
      }
    }, 500),
    [data],
  );

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    search(text);
  };

  // Refactored to toggle item select onclick
  const handleSelect = useCallback((item: Item) => {
    setSelectedItems((prevSelected) => {
      const isSelected = prevSelected.some(
        (selected) => selected.id === item.id,
      );
      return isSelected
        ? prevSelected.filter((selected) => selected.id !== item.id)
        : [...prevSelected, item];
    });
  }, []);

  const handleClear = () => {
    inputRef.current?.clear();
    setSearchTerm("");
    setDataSource(data);
  };

  const renderItem = useCallback(
    ({ item }: { item: Item }) => {
      const isSelected: boolean = selectedItems.some(
        (selected) => selected.id === item.id,
      );

      return (
        <TouchableOpacity
          onPress={() => handleSelect(item)}
          style={[styles.item, isSelected && { borderColor: "green" }]}
        >
          <Text style={[styles.itemText, isSelected && { fontWeight: "500" }]}>
            {item.name}
          </Text>
          <Text style={[styles.statusText, isSelected && { color: "green" }]}>
            {isSelected ? "Selected" : "Not selected"}
          </Text>
        </TouchableOpacity>
      );
    },
    [selectedItems],
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          ref={inputRef}
          onChangeText={handleSearch}
          value={searchTerm}
          placeholder="Search items..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={dataSource}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "#666", marginTop: 20 }}>
            No items found
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  clearButton: {
    padding: 8,
    justifyContent: "center",
    height: 40,
    backgroundColor: "#cf0707",
    borderRadius: 8,
  },
  clearButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  item: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  statusText: {
    fontSize: 14,
    color: "#666",
  },
});

export default ListComponent;
