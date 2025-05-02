package com.umg.ticket_app_backend.entities.auth;

import com.umg.ticket_app_backend.dtos.auth.AuthRegister;
import jakarta.persistence.*;
import lombok.*;

import java.util.stream.Stream;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private Role role;

    public static User fromRequest(AuthRegister request, String encodedPassword) {
        final var newUser = new User();
        final var userRole = Stream.of(Role.values())
                .filter(c -> c.getCode().equals(request.role()))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);

        newUser.setUsername(request.username());
        newUser.setPassword(encodedPassword);
        newUser.setFirstName(request.firstName());
        newUser.setLastName(request.lastName());
        newUser.setRole(userRole);

        return newUser;
    }
}
