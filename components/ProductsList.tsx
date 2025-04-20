import React, { useState, useEffect } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import ProductCreationModal from "./ProductCreationModal";
import { fetchProductsByCategory } from "@/lib/database";
import { isNotNullOrEmptyArray } from "@/utils/global";
import ProductCard from "./ProductCard";
import { ProductEntity } from "@/types/interface";
import ProductDetailModal from "./ProductDetailModal";

const ProductsList = ({
  category,
}: {
  category: "SWEET" | "SNACK" | "REFRESHMENT";
}) => {
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isViewModalVisible, setViewModalVisible] = useState(false);
  const [products, setProducts] = useState<ProductEntity[] | []>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductEntity | null>(
    null
  );
  const db = useSQLiteContext();

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await fetchProductsByCategory(db, category);
      if (!fetchedProducts) {
        console.error("No products found");
        return;
      }
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleViewModal = (product: ProductEntity) => {
    setSelectedProduct(product);
    setViewModalVisible(true);
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Add new product"
          onPress={() => {
            setCreateModalVisible(true);
          }}
        />
      </View>

      {isNotNullOrEmptyArray(products) ? (
        products.map((product) => {
          return (
            <ProductCard
              product={product}
              key={product.id}
              handleViewClk={handleViewModal}
            />
          );
        })
      ) : (
        <Text style={{ color: "red" }}>
          No {category.toLocaleLowerCase()}s found
        </Text>
      )}
      <ProductCreationModal
        isCreateModalVisible={isCreateModalVisible}
        setCreateModalVisible={setCreateModalVisible}
        category={category}
        fetchProducts={fetchProducts}
      />
      {selectedProduct && (
        <ProductDetailModal
          isViewModalVisible={isViewModalVisible}
          setViewModalVisible={setViewModalVisible}
          product={selectedProduct}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 10,
  },
  buttonContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    width: "100%",
    backgroundColor: "#f4511e",
    padding: 10,
    color: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
  },
});

export default ProductsList;
