package org.example.moneymanager.entity;

import jakarta.persistence.*;
import org.example.moneymanager.entity.Group;
import java.time.LocalDateTime; // Import LocalDateTime
import java.util.Map;

@Entity
@Table(name = "expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    public Expense(){}
    public Expense(Group group){
        this.group = group;
    }

    private String description;
    private Double amount;

    @Column(name = "paid_by")
    private String paidBy;

    @ElementCollection
    @CollectionTable(name = "expense_amounts", joinColumns = @JoinColumn(name = "expense_id"))
    @MapKeyColumn(name = "member")
    @Column(name = "amount")
    private Map<String, Double> amounts;

    @Column(name = "created_at")
    private String createdAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getPaidBy() {
        return paidBy;
    }

    public void setPaidBy(String paidBy) {
        this.paidBy = paidBy;
    }

    public Map<String, Double> getAmounts() {
        return amounts;
    }

    public void setAmounts(Map<String, Double> amounts) {
        this.amounts = amounts;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
