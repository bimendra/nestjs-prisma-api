-- RedefineIndex
DROP INDEX "Product.sku_unique";
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");
