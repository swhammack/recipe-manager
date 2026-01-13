package com.seanhammack.api.repository

import com.seanhammack.api.entity.Recipe
import com.seanhammack.api.entity.Restaurant
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest
import org.springframework.boot.jpa.test.autoconfigure.TestEntityManager
import java.math.BigDecimal

@DataJpaTest
class RecipeRepositoryTest {
    @Autowired
    lateinit var entityManager: TestEntityManager

    @Autowired
    lateinit var recipeRepository: RecipeRepository

    lateinit var testRestaurant: Restaurant

    @BeforeEach
    fun setup() {
        testRestaurant = Restaurant(name = "Test Restaurant")
        entityManager.persist(testRestaurant)
        entityManager.flush()
    }

    @Test
    fun `findAllSortedByName should return recipes ordered by name`() {
        val recipeB = createRecipe("Banana Bread")
        val recipeA = createRecipe("Apple Pie")
        val recipeC = createRecipe("Cherry Tart")

        entityManager.persist(recipeB)
        entityManager.persist(recipeA)
        entityManager.persist(recipeC)
        entityManager.flush()

        val results = recipeRepository.findAllSortedByName()

        assertEquals(3, results.size)
        assertEquals("Apple Pie", results[0].name)
        assertEquals("Banana Bread", results[1].name)
        assertEquals("Cherry Tart", results[2].name)
    }

    @Test
    fun `findRecipesByNameContainingIgnoreCase should find recipes matching query case-insensitively`() {
        val recipe1 = createRecipe("Apple Pie")
        val recipe2 = createRecipe("Pineapple Cake")
        val recipe3 = createRecipe("Banana Bread")

        entityManager.persist(recipe1)
        entityManager.persist(recipe2)
        entityManager.persist(recipe3)
        entityManager.flush()

        val results = recipeRepository.findRecipesByNameContainingIgnoreCase("APPLE")

        assertEquals(2, results.size)
        assertTrue(results.any { it.name == "Apple Pie" })
        assertTrue(results.any { it.name == "Pineapple Cake" })
        // Should also be sorted by name
        assertEquals("Apple Pie", results[0].name)
        assertEquals("Pineapple Cake", results[1].name)
    }

    private fun createRecipe(name: String): Recipe =
        Recipe(
            restaurant = testRestaurant,
            name = name,
            instructions = "Instructions",
            yieldAmount = BigDecimal.ONE,
            yieldUnit = "unit",
            ingredients = "Ingredients",
        )
}
