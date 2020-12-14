package com.project.isa.repository.auth;

import com.project.isa.model.auth.ConfirmationToken;

import org.springframework.data.repository.CrudRepository;

public interface ConfirmationTokenRepository extends CrudRepository<ConfirmationToken, String> {
    ConfirmationToken findByConfirmationToken(String confirmationToken);
}
