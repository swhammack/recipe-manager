package com.seanhammack.api.repository

import com.seanhammack.api.entity.Recipe
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface RecipeRepository : JpaRepository<Recipe, UUID> {
    @Query("SELECT r FROM Recipe r ORDER BY r.name ASC")
    fun findAllSortedByName(): List<Recipe>

    @Query("select r from Recipe r where upper(r.name) like upper(concat('%', :query, '%')) ORDER BY r.name ASC")
    fun findRecipesByNameContainingIgnoreCase(
        @Param("query") query: String,
    ): List<Recipe>
}
