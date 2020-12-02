package com.bootcamp.catalog.tests.factory;

import com.bootcamp.catalog.dto.CategoryDTO;
import com.bootcamp.catalog.entities.Category;

public class CategoryFactory {

	public static Category createCategory() {
		return new Category(1L, "Livros");
	}
	
	public static CategoryDTO createProductDTO() {
		return new CategoryDTO(createCategory());
	}
}
