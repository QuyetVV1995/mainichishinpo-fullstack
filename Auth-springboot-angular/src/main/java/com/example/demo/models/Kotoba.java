package com.example.demo.models;

import javax.persistence.*;

@Entity
@Table(name = "kotoba")
public class Kotoba {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "yomikata")
    private String yomikata;

    @Column(name = "kanji")
    private String kanji;

    @Column(name = "imi")
    private String imi;

    @Column(name = "rei")
    private String rei;

    @Column(name = "iminorei")
    private String iminorei;

    public Kotoba(Long id, String yomikata, String kanji, String imi, String rei, String iminorei) {
        this.id = id;
        this.yomikata = yomikata;
        this.kanji = kanji;
        this.imi = imi;
        this.rei = rei;
        this.iminorei = iminorei;
    }

    public Kotoba() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getYomikata() {
        return yomikata;
    }

    public void setYomikata(String yomikata) {
        this.yomikata = yomikata;
    }

    public String getKanji() {
        return kanji;
    }

    public void setKanji(String kanji) {
        this.kanji = kanji;
    }

    public String getImi() {
        return imi;
    }

    public void setImi(String imi) {
        this.imi = imi;
    }

    public String getRei() {
        return rei;
    }

    public void setRei(String rei) {
        this.rei = rei;
    }

    public String getIminorei() {
        return iminorei;
    }

    public void setIminorei(String iminorei) {
        this.iminorei = iminorei;
    }
}