import React from "react";
import { StyleSheet } from "react-native";
import { ProductEntity } from "@/types/interface";
import { Button, Card, Text } from "react-native-paper";

export default function ProductCard({
  product,
  handleViewClk,
}: {
  product: ProductEntity;
  handleViewClk: (product: ProductEntity) => void | undefined;
}) {
  return (
    <Card style={styles.container}>
      <Card.Title
        title={`#${product.id} ${product.name}`}
        style={styles.cardTitle}
      />
      <Card.Content>
        <Text variant="bodyMedium">{product.description}</Text>
      </Card.Content>
      {handleViewClk && (
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => {
              handleViewClk(product);
            }}
          >
            View
          </Button>
        </Card.Actions>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#f4511e",
  },
});
