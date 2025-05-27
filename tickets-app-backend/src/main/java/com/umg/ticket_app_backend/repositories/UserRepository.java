package com.umg.ticket_app_backend.repositories;

import com.umg.ticket_app_backend.entities.auth.Role;
import com.umg.ticket_app_backend.entities.auth.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    List<User> findByRole(Role role);
}
