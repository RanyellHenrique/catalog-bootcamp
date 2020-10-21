package com.bootcamp.catalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bootcamp.catalog.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
