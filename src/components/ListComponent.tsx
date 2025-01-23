import React, { useCallback, useRef } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  clearSearch,
  setSearchTerm,
  toggleSelectItem,
} from "../redux/slices/listSlice";

const ListComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { dataSource, selectedItems, searchTerm, loading } = useSelector(
    (state: RootState) => state.list,
  );
  const inputRef = useRef<TextInput>(null);

  const handleSearch = (text: string) => {
    dispatch(setSearchTerm(text));
  };

  const handleSelect = useCallback(
    (item) => {
      dispatch(toggleSelectItem(item));
    },
    [dispatch],
  );

  const handleClear = () => {
    inputRef.current?.clear();
    dispatch(clearSearch());
  };

  const renderItem = useCallback(
    ({ item }) => {
      const isSelected = selectedItems.some(
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
    [selectedItems, handleSelect],
  );

  return loading ? (
    <ActivityIndicator size="large" />
  ) : (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Search..."
          value={searchTerm}
          onChangeText={handleSearch}
        />
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={dataSource}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items found.</Text>
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
  emptyText: { textAlign: "center", marginTop: 20 },
});

export default ListComponent;
