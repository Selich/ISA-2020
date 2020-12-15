package com.project.isa.repository;

import com.project.isa.model.auth.User;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, String> {

    User findByEmailIdIgnoreCase(String emailId);

}
