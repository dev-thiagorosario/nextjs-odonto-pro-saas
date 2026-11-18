import assert from "node:assert/strict";
import { test } from "node:test";
import { serviceSchema } from "./service-schema";

const validService = { name: "Limpeza dental", price: "150,50", duration: 30 };

test("normalizes Brazilian decimal prices and trims names without rounding", () => {
  const result = serviceSchema.parse({ ...validService, name: "  Limpeza dental  ", price: "99999999,99" });
  assert.equal(result.name, "Limpeza dental");
  assert.equal(result.price, "99999999.99");
  assert.equal(serviceSchema.parse({ ...validService, price: "0" }).price, "0");
  assert.equal(serviceSchema.parse({ ...validService, price: "0.01" }).price, "0.01");
});

test("rejects ambiguous, negative, overflowing and fractional-cent prices", () => {
  for (const price of ["", "-1", "1.234,56", "1,234", "100000000", "1e3", "Infinity", "R$ 10"]) {
    assert.equal(serviceSchema.safeParse({ ...validService, price }).success, false, price);
  }
});

test("requires a name and a positive integer duration within the database range", () => {
  for (const duration of [0, -1, 1.5, NaN, Infinity, 2147483648, "30"]) {
    assert.equal(serviceSchema.safeParse({ ...validService, duration }).success, false, String(duration));
  }
  assert.equal(serviceSchema.safeParse({ ...validService, name: "  " }).success, false);
  assert.equal(serviceSchema.safeParse({ ...validService, name: "a".repeat(121) }).success, false);
});

test("discards client-supplied ownership and status fields", () => {
  assert.deepEqual(serviceSchema.parse({ ...validService, userId: "another-user", status: false }), {
    name: validService.name, price: "150.50", duration: validService.duration,
  });
});
