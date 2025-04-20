import React from "react";
import {
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { ProductEntity } from "@/types/interface";
import ProductCard from "./ProductCard";

export default function ProductDetailModal({
  isViewModalVisible,
  setViewModalVisible,
  product,
}: {
  isViewModalVisible: boolean;
  setViewModalVisible: (visible: boolean) => void;
  product: ProductEntity;
}) {
  const db = useSQLiteContext();

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isViewModalVisible}
      onRequestClose={() => setViewModalVisible(false)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ProductCard product={product} />
        {/* TODO: Manage price and qunatity from here */}
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
    width: "100%",
    gap: 10,
    marginTop: 20,
  },
});
