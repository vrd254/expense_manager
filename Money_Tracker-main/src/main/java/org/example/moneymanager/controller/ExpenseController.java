package org.example.moneymanager.controller;// ExpenseController.java

import org.example.moneymanager.entity.Expense;
import org.example.moneymanager.entity.Group;
import org.example.moneymanager.entity.User;
import org.example.moneymanager.repository.UserRepository;
import org.example.moneymanager.service.ExpenseService;
import org.example.moneymanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseController {
    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/expenses")
    public ResponseEntity<Expense> addExpense(@RequestBody Expense expense) {
        Expense savedExpense = expenseService.saveExpense(expense);
        return ResponseEntity.status(201).body(savedExpense);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/settle/{uname}")
    public User Settle(@PathVariable String uname) {
        User user1 = userService.findByUsername(uname);
        user1.setOwnAmount(0);
        user1.setOweAmount(0);
        System.out.println("hhh");
        userRepository.save(user1);
        return user1;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/oweamt/{uname}/{amt}")
    public User oweUser(@PathVariable String uname, @RequestBody Map<String, Integer> amounts,@PathVariable double amt) {
        System.out.println(amounts.entrySet());
        User user1 = userService.findByUsername(uname);
        if (user1 == null) {
            throw new RuntimeException("User not found with username: " + uname);
        }
        user1.setOwnAmount(user1.getOwnAmount()+amt);
        userRepository.save(user1);
        for (Map.Entry<String, Integer> entry : amounts.entrySet()) {
            String username = entry.getKey();
            Integer amount = entry.getValue();
            System.out.println("username : "+username+" amount : "+amount);
            User user2 = userService.findByUsername(username);
            user2.setOweAmount(user2.getOweAmount() + amount);
            user2.setTotalExpense(user2.getTotalExpense() + amount);
            userRepository.save(user2);
        }

        return user1;
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{groupId}/expenses")
    public ResponseEntity<List<Expense>> getExpensesByGroupId(@PathVariable Long groupId) {
        List<Expense> expenses = expenseService.getExpensesByGroupId(groupId);
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }
}
