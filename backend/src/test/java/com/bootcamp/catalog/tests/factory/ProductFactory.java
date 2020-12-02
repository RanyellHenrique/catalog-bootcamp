package com.bootcamp.catalog.tests.factory;

import java.time.Instant;

import com.bootcamp.catalog.dto.ProductDTO;
import com.bootcamp.catalog.entities.Category;
import com.bootcamp.catalog.entities.Product;

public class ProductFactory {

	public static Product createProduct() {
		Product product = new Product(1L, "Phone", "Good Phone", 800.00, Instant.parse("2020-10-20T03:00:00Z"), "http://imagem.com/imagem.jpg");
		product.getCategories().add(new Category(1L, null));
		return product;
	}
	
	public static ProductDTO createProductDTO() {
		Product product = createProduct();
		return new ProductDTO(product, product.getCategories());
	}
	
	public static ProductDTO createProductDTO(Long id) {
		ProductDTO product = createProductDTO();
		product.setId(id);
		return product;
	}
}
