package com.seanhammack.api.service

import com.seanhammack.api.entity.Recipe
import com.seanhammack.api.entity.Restaurant
import com.seanhammack.api.repository.RecipeRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.mockito.Mockito.mock
import org.mockito.Mockito.verify
import org.mockito.Mockito.`when`
import java.math.BigDecimal
import java.util.Optional
import java.util.UUID

class RecipeServiceTest {
    private val recipeRepository: RecipeRepository = mock(RecipeRepository::class.java)
    private val recipeService = RecipeService(recipeRepository)

    @Test
    fun `getAllRecipes should return sorted recipes from repository`() {
        val recipes =
            listOf(
                createRecipe(name = "Apple Pie"),
                createRecipe(name = "Banana Bread"),
            )
        `when`(recipeRepository.findAllSortedByName()).thenReturn(recipes)

        val result = recipeService.getAllRecipes()

        assertEquals(recipes, result)
        verify(recipeRepository).findAllSortedByName()
    }

    @Test
    fun `searchRecipes should return recipes matching query`() {
        val query = "apple"
        val recipes = listOf(createRecipe(name = "Apple Pie"))
        `when`(recipeRepository.findRecipesByNameContainingIgnoreCase(query)).thenReturn(recipes)

        val result = recipeService.searchRecipes(query)

        assertEquals(recipes, result)
        verify(recipeRepository).findRecipesByNameContainingIgnoreCase(query)
    }

    @Test
    fun `updateRecipe should update and save existing recipe`() {
        val id = UUID.randomUUID()
        val existingRecipe = createRecipe(id = id, name = "Old Name")
        val updatedRecipe = createRecipe(name = "New Name", instructions = "New Instructions")

        `when`(recipeRepository.findById(id)).thenReturn(Optional.of(existingRecipe))
        `when`(recipeRepository.save(existingRecipe)).thenReturn(existingRecipe)

        val result = recipeService.updateRecipe(id, updatedRecipe)

        assertEquals("New Name", result.name)
        assertEquals("New Instructions", result.instructions)
        verify(recipeRepository).findById(id)
        verify(recipeRepository).save(existingRecipe)
    }

    @Test
    fun `updateRecipe should throw exception when recipe not found`() {
        val id = UUID.randomUUID()
        val updatedRecipe = createRecipe()

        `when`(recipeRepository.findById(id)).thenReturn(Optional.empty())

        assertThrows<NoSuchElementException> {
            recipeService.updateRecipe(id, updatedRecipe)
        }
    }

    @Test
    fun `deleteRecipe should call repository delete`() {
        val id = UUID.randomUUID()

        recipeService.deleteRecipe(id)

        verify(recipeRepository).deleteById(id)
    }

    private fun createRecipe(
        id: UUID? = null,
        name: String = "Test Recipe",
        instructions: String = "Test Instructions",
        ingredients: String = "Test Ingredients",
    ): Recipe {
        val restaurant = Restaurant(id = UUID.randomUUID(), name = "Test Restaurant")
        return Recipe(
            id = id,
            restaurant = restaurant,
            name = name,
            instructions = instructions,
            yieldAmount = BigDecimal.TEN,
            yieldUnit = "servings",
            ingredients = ingredients,
        )
    }
}
