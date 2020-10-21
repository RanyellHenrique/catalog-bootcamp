package com.bootcamp.catalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bootcamp.catalog.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

}
