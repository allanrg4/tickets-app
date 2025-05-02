package com.umg.ticket_app_backend.repositories;

import com.umg.ticket_app_backend.entities.auth.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
