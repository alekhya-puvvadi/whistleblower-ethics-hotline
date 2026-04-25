package com.internship.tool.service;

import com.internship.tool.entity.Complaint;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ComplaintService {

    private List<Complaint> complaints = new ArrayList<>();
    private Long idCounter = 1L;

    public Complaint createComplaint(Complaint complaint) {
        complaint.setId(idCounter++);
        complaint.setStatus("OPEN");
        complaints.add(complaint);
        return complaint;
    }

    public List<Complaint> getAllComplaints() {
        return complaints;
    }

    public Complaint getById(Long id) {
        return complaints.stream()
                .filter(c -> c.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Not found"));
    }

    public List<Complaint> getByStatus(String status) {
        return complaints.stream()
                .filter(c -> c.getStatus().equalsIgnoreCase(status))
                .toList();
    }

    public Complaint updateStatus(Long id, String status) {
        Complaint c = getById(id);
        c.setStatus(status);
        return c;
    }

    public void deleteComplaint(Long id) {
        complaints.removeIf(c -> c.getId().equals(id));
    }
}