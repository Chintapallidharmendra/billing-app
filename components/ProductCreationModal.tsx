import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { NewProductEntity } from "@/types/interface";
import { createProduct } from "@/lib/database";

export default function ProductCreationModal({
  isCreateModalVisible,
  setCreateModalVisible,
  category,
  fetchProducts,
}: {
  isCreateModalVisible: boolean;
  setCreateModalVisible: (visible: boolean) => void;
  category: "SNACK" | "SWEET" | "REFRESHMENT";
  fetchProducts: () => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const db = useSQLiteContext();

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Product name is required");
      return;
    }

    try {
      const product: NewProductEntity = {
        name,
        description,
        category: category,
      };

      const success = await createProduct(db, product);

      if (success) {
        Alert.alert("Success", "Product created successfully");
        setName("");
        setDescription("");
        setCreateModalVisible(false);
        await fetchProducts();
      } else {
        Alert.alert("Error", "Failed to create product");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
      console.error(error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isCreateModalVisible}
      onRequestClose={() => setCreateModalVisible(false)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.modalHeader}>
          {`${category.toLocaleLowerCase()} creation form`}
        </Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name*</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter product name"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter product description"
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.buttonGroup}>
            <Button
              title="Cancel"
              onPress={() => setCreateModalVisible(false)}
              color="#666"
            />
            <Button title="Save" onPress={handleSubmit} color="#f4511e" />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#f4511e",
    padding: 15,
    color: "#fff",
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
