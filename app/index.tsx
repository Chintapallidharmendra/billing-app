import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";

import { migrateDbIfNeeded } from "@/lib/database";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to billing app!</Text>
      <Link href="/products" style={styles.button}>
        <Text style={styles.buttonText}>Go to billing</Text>
      </Link>
      <Link href="/cart" style={styles.button}>
        <Text style={styles.buttonText}>Go to cart</Text>
      </Link>
      <Link href="/admin" style={styles.button}>
        <Text style={styles.buttonText}>Admin</Text>
      </Link>
    </View>
  );
};

const index = () => {
  // const db = useSQLiteContext();
  return (
    <SQLiteProvider databaseName="billing.db" onInit={migrateDbIfNeeded}>
      <Home />
    </SQLiteProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#f4511e",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    marginBottom: 10,
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default index;
