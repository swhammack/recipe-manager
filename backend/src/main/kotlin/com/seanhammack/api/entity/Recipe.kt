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
import org.hibernate.annotations.UpdateTimestamp
import java.math.BigDecimal
import java.time.OffsetDateTime
import java.util.UUID

@Entity
@Table(name = "recipes")
class Recipe(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: UUID? = null,
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", nullable = false)
    var restaurant: Restaurant,
    @Column(nullable = false)
    var name: String,
    @Column(nullable = false, columnDefinition = "TEXT")
    var instructions: String,
    @Column(name = "yield_amount", nullable = false, precision = 10, scale = 2)
    var yieldAmount: BigDecimal,
    @Column(name = "yield_unit", nullable = false, length = 50)
    var yieldUnit: String,
    @Column(nullable = false, columnDefinition = "TEXT")
    var ingredients: String,
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    val createdAt: OffsetDateTime? = null,
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    var updatedAt: OffsetDateTime? = null,
)
