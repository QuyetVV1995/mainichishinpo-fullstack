package com.example.demo.controller;

import com.example.demo.models.Role;
import com.example.demo.models.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/account/")
public class AccountController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @GetMapping(value = "/all", produces = "application/json")
    public ResponseEntity<List<User>> getAll(){
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PostMapping(value = "/create", produces = "application/json")
    public ResponseEntity<?> createAccount(@RequestBody User user){
        return ResponseEntity.ok(userRepository.save(user));
    }

    @GetMapping(value = "/get-roles", produces = "application/json")
    public ResponseEntity<List<Role>> getRole(){
        return ResponseEntity.ok(roleRepository.findAll());
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(userRepository.findById(id).get());
    }

    @PutMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<?> updateUserById(@PathVariable Long id, @Valid @RequestBody User user){
        User updateUser = userRepository.findById(id).get();
        updateUser.setUsername(user.getUsername());
        updateUser.setEmail(user.getEmail());
        updateUser.setPassword(user.getPassword());
        updateUser.setRoles(null);
        updateUser.setRoles(user.getRoles());
        return ResponseEntity.ok(userRepository.save(updateUser));
    }

    @DeleteMapping(value = "/delete/{id}", produces = "application/json")
    public void deleteUserById(@PathVariable Long id){
      userRepository.deleteById(id);
    }
}
