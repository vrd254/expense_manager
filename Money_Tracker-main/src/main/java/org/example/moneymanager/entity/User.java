package org.example.moneymanager.entity;

import jakarta.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String email;
    private String password;

    @Column(columnDefinition = "double default 0.0")
    private double oweAmount;

    @Column(columnDefinition = "double default 0.0")
    private double ownAmount;

    public Double getTotalExpense() {
        return totalExpense;
    }

    public void setTotalExpense(Double totalExpense) {
        this.totalExpense = totalExpense;
    }

    @Column(name = "total_expense") // Add column for total expense
    private Double totalExpense;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public double getOweAmount() {
        return oweAmount;
    }

    public void setOweAmount(double oweAmount) {
        this.oweAmount = oweAmount;
    }

    public double getOwnAmount() {
        return ownAmount;
    }

    public void setOwnAmount(double ownAmount) {
        this.ownAmount = ownAmount;
    }
}
