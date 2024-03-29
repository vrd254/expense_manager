package org.example.moneymanager.service;
import org.example.moneymanager.entity.Group;
import org.example.moneymanager.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.moneymanager.entity.User;
import org.example.moneymanager.repository.UserRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class GroupService {
    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;



    public Group  saveGroup(Group group)
    {
        return  groupRepository.save(group);
    }

    public List<Group> getAllGroup()
    {
        return groupRepository.findAll();
    }
    public long findIdByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            return user.getId();
        } else {
            // Handle the case where the user with the given username is not found
            return -1; // or throw an exception
        }
    }

    public List<String> getGroupMembers(Long groupId) {
        Optional<Group> optionalGroup = groupRepository.findById(groupId);
        return optionalGroup.map(Group::getMembers).orElse(null);
    }

    public Group getGroupById(Long groupId) {
        return groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));
    }

    public void addMembersToGroup(long groupId, String[] members) {
        Group group = groupRepository.findById(groupId).orElseThrow(() -> new RuntimeException("Group not found with id: " + groupId));
        // Add members to the group
        group.getMembers().addAll(Arrays.asList(members));
        groupRepository.save(group);
    }
}