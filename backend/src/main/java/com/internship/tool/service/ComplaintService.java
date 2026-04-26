package com.internship.tool.service;

import com.internship.tool.entity.Complaint;
import com.internship.tool.repository.ComplaintRepository;
import com.internship.tool.exception.ComplaintNotFoundException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ComplaintService {

    private final ComplaintRepository repository;

    public ComplaintService(ComplaintRepository repository) {
        this.repository = repository;
    }

    // ✅ CREATE
    public Complaint createComplaint(Complaint complaint) {
        complaint.setStatus("OPEN");
        complaint.setCreatedAt(LocalDateTime.now());
        complaint.setUpdatedAt(LocalDateTime.now());
        return repository.save(complaint);
    }

    // ✅ GET ALL (pagination)
    public Page<Complaint> getAllPaginated(Pageable pageable) {
        return repository.findAll(pageable);
    }

    // ✅ GET BY ID (404)
    public Complaint getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ComplaintNotFoundException("Complaint not found with id " + id));
    }

    // ✅ DELETE
    public void deleteComplaint(Long id) {
        if (!repository.existsById(id)) {
            throw new ComplaintNotFoundException("Complaint not found with id " + id);
        }
        repository.deleteById(id);
    }
}