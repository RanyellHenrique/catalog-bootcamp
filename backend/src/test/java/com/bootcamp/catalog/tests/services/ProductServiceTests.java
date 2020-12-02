package com.bootcamp.catalog.tests.services;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.bootcamp.catalog.dto.ProductDTO;
import com.bootcamp.catalog.entities.Category;
import com.bootcamp.catalog.entities.Product;
import com.bootcamp.catalog.repositories.CategoryRepository;
import com.bootcamp.catalog.repositories.ProductRepository;
import com.bootcamp.catalog.services.ProductService;
import com.bootcamp.catalog.services.exceptions.DataBaseException;
import com.bootcamp.catalog.services.exceptions.ResourceNotFoundException;
import com.bootcamp.catalog.tests.factory.CategoryFactory;
import com.bootcamp.catalog.tests.factory.ProductFactory;

@ExtendWith(SpringExtension.class)
public class ProductServiceTests {

	@InjectMocks
	private ProductService service;
	
	@Mock
	private ProductRepository repository;
	
	@Mock
	private CategoryRepository categoryRepository;
	
	private long existingId;
	private long nonExistingId;
	private long dependentId;
	private Product product;
	private PageImpl<Product> page;
	private ProductDTO productUpdate;
	private Category category;
	
	@BeforeEach
	public void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
		dependentId = 4L;
		product = ProductFactory.createProduct();
		page = new PageImpl<>(List.of(product));
		productUpdate = ProductFactory.createProductDTO();
		category = CategoryFactory.createCategory();
		
		Mockito.when(repository.find(ArgumentMatchers.any(), ArgumentMatchers.anyString(), ArgumentMatchers.any())).thenReturn(page);
		Mockito.when(repository.save(ArgumentMatchers.any())).thenReturn(product);
		
		Mockito.when(repository.findById(existingId)).thenReturn(Optional.of(product));
		Mockito.when(repository.findById(nonExistingId)).thenReturn(Optional.empty());
		
		Mockito.when(repository.getOne(existingId)).thenReturn(product);
		Mockito.when(repository.getOne(nonExistingId)).thenThrow(EntityNotFoundException.class);
		
		Mockito.when(categoryRepository.getOne(existingId)).thenReturn(category);
		
		Mockito.doNothing().when(repository).deleteById(existingId);
		Mockito.doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(nonExistingId);
		Mockito.doThrow(DataIntegrityViolationException.class).when(repository).deleteById(dependentId);
	}
	
	@Test
	public void updateShouldThrowResourceNotFoundExceptionWhenIdDoesNotExists() {
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.update(nonExistingId, productUpdate);
		});
	
	}
	
	@Test
	public void updateShouldReturnAProductDTOWhenIdExists() {
		productUpdate.setName("PC gamer 2");
		
		ProductDTO result = service.update(existingId, productUpdate);
		
		Assertions.assertTrue(existingId == result.getId());
		Assertions.assertEquals(product.getName(), result.getName());
		Mockito.verify(repository, Mockito.times(1)).save(product);
	}
	
	@Test
	public void findAllPagedShouldReturnAListPaged() {
		
		Page<ProductDTO> result = service.findAllPaged(existingId, "", PageRequest.of(0, 2));
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(1, result.getTotalElements());
		Mockito.verify(categoryRepository, Mockito.times(1)).getOne(existingId);
		Mockito.verify(repository, Mockito.times(1)).find(ArgumentMatchers.any() , ArgumentMatchers.any(), ArgumentMatchers.any());
	}
	
	@Test
	public void findByIdShouldThrowResourceNotFoundExceptionWhenTheIdDoesNotExist() {
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.findById(nonExistingId);
		});
		Mockito.verify(repository, Mockito.times(1)).findById(nonExistingId);
	}
	
	@Test
	public void findByIdShouldReturnAProductDTOWhenTheIdExists() {
		ProductDTO result = service.findById(existingId);
		
		Assertions.assertTrue(result != null);
		Assertions.assertEquals(existingId, result.getId());
		Mockito.verify(repository, Mockito.times(1)).findById(existingId);
	}
	
	@Test
	public void deleteShouldThrowDataBaseExceptionWhenIdDoesNotExist() {
		Assertions.assertThrows(DataBaseException.class, () -> {
			service.delete(dependentId);
		});
		Mockito.verify(repository, Mockito.times(1)).deleteById(dependentId);
	}
	
	@Test
	public void deleteShouldDoNothingWhenIdExists() {
		Assertions.assertDoesNotThrow(() -> {
			service.delete(existingId);
		});
		Mockito.verify(repository, Mockito.times(1)).deleteById(existingId);
	}
	
	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.delete(nonExistingId);
		});
		Mockito.verify(repository, Mockito.times(1)).deleteById(nonExistingId);
	}
}
