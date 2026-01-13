package com.seanhammack.api.service

import com.seanhammack.api.entity.Recipe
import com.seanhammack.api.repository.RecipeRepository
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class RecipeService(
    private val recipeRepository: RecipeRepository,
) {
    fun getAllRecipes(): List<Recipe> = recipeRepository.findAllSortedByName()

    fun searchRecipes(query: String): List<Recipe> = recipeRepository.findRecipesByNameContainingIgnoreCase(query)

    fun updateRecipe(
        id: UUID,
        updatedRecipe: Recipe,
    ): Recipe {
        val existingRecipe =
            recipeRepository
                .findById(id)
                .orElseThrow { NoSuchElementException("Recipe not found with id: $id") }

        existingRecipe.name = updatedRecipe.name
        existingRecipe.instructions = updatedRecipe.instructions
        existingRecipe.ingredients = updatedRecipe.ingredients
        existingRecipe.yieldAmount = updatedRecipe.yieldAmount
        existingRecipe.yieldUnit = updatedRecipe.yieldUnit

        return recipeRepository.save(existingRecipe)
    }

    fun deleteRecipe(id: UUID) {
        recipeRepository.deleteById(id)
    }
}
