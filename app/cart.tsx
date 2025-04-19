import { StyleSheet, Text, View } from "react-native";
import React from "react";

const cart = () => {
  return (
    <View style={styles.container}>
      <Text>Add cart functionality here!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default cart;
