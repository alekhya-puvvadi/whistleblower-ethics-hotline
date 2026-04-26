package com.internship.tool.controller;

import com.internship.tool.entity.Complaint;
import com.internship.tool.service.ComplaintService;

import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintService service;

    public ComplaintController(ComplaintService service) {
        this.service = service;
    }

    // ✅ POST /create
    @PostMapping("/create")
    public ResponseEntity<Complaint> create(@Valid @RequestBody Complaint complaint) {
        return new ResponseEntity<>(service.createComplaint(complaint), HttpStatus.CREATED);
    }

    // ✅ GET /all (pagination)
    @GetMapping("/all")
    public ResponseEntity<Page<Complaint>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        return ResponseEntity.ok(service.getAllPaginated(PageRequest.of(page, size)));
    }

    // ✅ GET /{id} with 404
    @GetMapping("/{id}")
    public ResponseEntity<Complaint> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }
}