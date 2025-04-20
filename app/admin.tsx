import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProductsCategoryTab from "@/components/ProductsCategoryTab";
import { SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "@/lib/database";

const admin = () => {
  return (
    <SQLiteProvider databaseName="products.db" onInit={migrateDbIfNeeded}>
      <View style={styles.container}>
        <ProductsCategoryTab />
      </View>
    </SQLiteProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default admin;
