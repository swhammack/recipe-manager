package com.seanhammack.api.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import org.hibernate.annotations.CreationTimestamp
import java.time.OffsetDateTime
import java.util.UUID

@Entity
@Table(name = "restaurants")
class Restaurant(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: UUID? = null,
    @Column(nullable = false)
    var name: String,
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    val createdAt: OffsetDateTime? = null,
)
