import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import ProductsList from "./ProductsList";

const ProductsCategoryTab = () => {
  const [activeTab, setActiveTab] = useState("sweets");

  const renderContent = () => {
    switch (activeTab) {
      case "sweets":
        return <ProductsList category="SWEET" />;
      case "snacks":
        return <ProductsList category="SNACK" />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "sweets" && styles.activeTab]}
          onPress={() => setActiveTab("sweets")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "sweets" && styles.activeTabText,
            ]}
          >
            Sweets
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "snacks" && styles.activeTab]}
          onPress={() => setActiveTab("snacks")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "snacks" && styles.activeTabText,
            ]}
          >
            Snacks
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>{renderContent()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  tabBar: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#f4511e",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#f4511e",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    width: "100%",
  },
});

export default ProductsCategoryTab;
