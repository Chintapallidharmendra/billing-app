import { SQLiteDatabase } from "expo-sqlite";

import { ProductEntity, NewProductEntity } from "@/types/interface";

export const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
  const DATABASE_VERSION = 1;

  try {
    let { user_version: currentDbVersion } = await db.getFirstAsync<{
      user_version: number;
    }>("PRAGMA user_version");

    if (currentDbVersion >= DATABASE_VERSION) {
      return;
    }

    if (currentDbVersion === 0) {
      await db.execAsync(`
        PRAGMA journal_mode = 'wal';
        
        CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          description TEXT,
          category TEXT CHECK(category IN ('SWEET', 'SNACK', 'REFRESHMENT'))
        );

        CREATE TABLE IF NOT EXISTS prices (
          id INTEGER PRIMARY KEY NOT NULL,
          product_id INTEGER NOT NULL,
          price REAL NOT NULL,
          quantity REAL NOT NULL,
          unit TEXT CHECK(unit IN ('KG', 'G', 'ML', 'L', 'PIECE')),
          FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
        );
      `);
      currentDbVersion = 1;
    }

    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  } catch (error) {
    console.error("Database migration failed:", error);
    throw error;
  }
};

export const getProducts = async (db: SQLiteDatabase) => {
  try {
    const products = await db.queryAsync("SELECT * FROM products");
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductsByCategory = async (
  db: SQLiteDatabase,
  category: "SNACK" | "SWEET" | "REFRESHMENT"
): Promise<ProductEntity[]> => {
  try {
    const products = await db.getAllAsync<ProductEntity>(
      `SELECT 
        id,
        name,
        description,
        category
      FROM products 
      WHERE category = ? 
      ORDER BY name ASC`,
      [category]
    );

    return products || [];
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw new Error(`Failed to fetch ${category} products: ${error.message}`);
  }
};

export const createProduct = async (
  db: SQLiteDatabase,
  product: NewProductEntity
): Promise<Boolean> => {
  try {
    let result = await db.runAsync(
      "INSERT INTO products (name, description, category) VALUES (?, ?, ?);",
      product.name,
      product.description,
      product.category
    );
    if (result.lastInsertRowId > 0) {
      console.log("Product created successfully:", result);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
