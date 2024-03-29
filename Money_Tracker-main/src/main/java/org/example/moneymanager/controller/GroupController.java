package org.example.moneymanager.controller;

import org.example.moneymanager.entity.Group;
import org.example.moneymanager.entity.User;
import org.example.moneymanager.repository.GroupRepository;
import org.example.moneymanager.service.GroupService;
import org.example.moneymanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class GroupController {
    @Autowired
    private GroupService groupService;

    @Autowired
    private GroupRepository groupRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/groups")
    public ResponseEntity<?> getGroup() {
        try {
            List<Group> grps= groupService.getAllGroup();

            Map<String, String> response = new HashMap<>();
            response.put("message","grop sent");
            return ResponseEntity.ok(grps);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Error during Add Group: " + e.getMessage()); // Include the exception message
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/addgroup")
    public ResponseEntity<?> addMembersToGroup(@RequestBody Group group) {
        try {
            groupService.saveGroup(group);
            return ResponseEntity.ok("Members added to group successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding members to group: " + e.getMessage());
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/groups/{groupId}/members")
    public ResponseEntity<List<String>> getGroupMembers(@PathVariable Long groupId) {
        List<String> members = groupService.getGroupMembers(groupId);
        if (members != null) {
            return ResponseEntity.ok(members);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/groups1/{groupId}")
    public ResponseEntity<Group> getGroupById(@PathVariable Long groupId) {
        try {
            Group group = groupService.getGroupById(groupId);
            return ResponseEntity.ok(group);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Handle error as needed
        }
    }
}