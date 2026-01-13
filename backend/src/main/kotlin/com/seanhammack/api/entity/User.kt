package com.seanhammack.api.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table
import org.hibernate.annotations.CreationTimestamp
import java.time.OffsetDateTime
import java.util.UUID

@Entity
@Table(name = "users")
class User(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: UUID? = null,
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", nullable = false)
    var restaurant: Restaurant,
    @Column(nullable = false, unique = true)
    var email: String,
    @Column(name = "password_hash", nullable = false)
    var passwordHash: String,
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    val createdAt: OffsetDateTime? = null,
)
