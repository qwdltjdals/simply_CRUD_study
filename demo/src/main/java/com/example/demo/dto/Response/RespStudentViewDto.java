package com.example.demo.dto.Response;

import com.example.demo.entity.Student;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RespStudentViewDto {
    private Long id;
    private String name;
    private Long grade;
    private Long studentClass;
}
