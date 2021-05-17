package com.example.demo.repository;

import com.example.demo.models.Kotoba;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface KotobaRepository extends JpaRepository<Kotoba, Long> {

    List<Kotoba> findByKanji(String kanji);
}
