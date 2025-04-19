import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Mayuri Billing" }} />
      <Stack.Screen
        name="products"
        options={{
          title: "Prodcuts",
        }}
      />
      <Stack.Screen
        name="cart"
        options={{
          title: "Cart",
        }}
      />
    </Stack>
  );
}
