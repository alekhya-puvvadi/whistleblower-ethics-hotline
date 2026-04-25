package com.internship.tool.controller;

import com.internship.tool.entity.Complaint;
import com.internship.tool.service.ComplaintService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintService service;

    public ComplaintController(ComplaintService service) {
        this.service = service;
    }

    @PostMapping
    public Complaint create(@RequestBody Complaint complaint) {
        return service.createComplaint(complaint);
    }

    @GetMapping
    public List<Complaint> getAll() {
        return service.getAllComplaints();
    }

    @GetMapping("/{id}")
    public Complaint getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping("/status/{status}")
    public List<Complaint> getByStatus(@PathVariable String status) {
        return service.getByStatus(status);
    }

    @PutMapping("/{id}")
    public Complaint updateStatus(@PathVariable Long id,
                                  @RequestParam String status) {
        return service.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.deleteComplaint(id);
        return "Deleted successfully";
    }
}