package org.example.moneymanager.repository;// ExpenseRepository.java
import org.example.moneymanager.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    // You can add custom query methods if needed
    List<Expense> findByGroupId(Long groupId);
}