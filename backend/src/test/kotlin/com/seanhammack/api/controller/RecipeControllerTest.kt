package com.seanhammack.api.controller

import com.seanhammack.api.entity.Recipe
import com.seanhammack.api.entity.Restaurant
import com.seanhammack.api.service.RecipeService
import org.junit.jupiter.api.Test
import org.mockito.ArgumentMatchers.any
import org.mockito.ArgumentMatchers.eq
import org.mockito.Mockito.verify
import org.mockito.Mockito.`when`
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest
import org.springframework.http.MediaType
import org.springframework.test.context.bean.override.mockito.MockitoBean
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import tools.jackson.databind.ObjectMapper
import java.math.BigDecimal
import java.util.UUID

@WebMvcTest(RecipeController::class)
class RecipeControllerTest {
    @Autowired
    lateinit var mockMvc: MockMvc

    @MockitoBean
    lateinit var recipeService: RecipeService

    @Autowired
    lateinit var objectMapper: ObjectMapper

    @Test
    fun `getRecipes should return all recipes when no query`() {
        val recipes = listOf(createRecipe(name = "Apple Pie"))
        `when`(recipeService.getAllRecipes()).thenReturn(recipes)

        mockMvc
            .perform(get("/recipes"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$[0].name").value("Apple Pie"))

        verify(recipeService).getAllRecipes()
    }

    @Test
    fun `getRecipes should return searched recipes when query present`() {
        val query = "apple"
        val recipes = listOf(createRecipe(name = "Apple Pie"))
        `when`(recipeService.searchRecipes(query)).thenReturn(recipes)

        mockMvc
            .perform(get("/recipes").param("q", query))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$[0].name").value("Apple Pie"))

        verify(recipeService).searchRecipes(query)
    }

    @Test
    fun `update should return updated recipe`() {
        val id = UUID.randomUUID()
        val recipe = createRecipe(id = id, name = "Updated Name")
        `when`(recipeService.updateRecipe(eq(id), any(Recipe::class.java))).thenReturn(recipe)

        mockMvc
            .perform(
                put("/recipes/$id")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(recipe)),
            ).andExpect(status().isOk)
            .andExpect(jsonPath("$.name").value("Updated Name"))

        verify(recipeService).updateRecipe(eq(id), any(Recipe::class.java))
    }

    @Test
    fun `delete should return ok`() {
        val id = UUID.randomUUID()

        mockMvc
            .perform(delete("/recipes/$id"))
            .andExpect(status().isOk)

        verify(recipeService).deleteRecipe(id)
    }

    private fun createRecipe(
        id: UUID? = null,
        name: String = "Test Recipe",
    ): Recipe =
        Recipe(
            id = id,
            restaurant = Restaurant(id = UUID.randomUUID(), name = "Test Restaurant"),
            name = name,
            instructions = "Instructions",
            yieldAmount = BigDecimal.TEN,
            yieldUnit = "servings",
            ingredients = "Ingredients",
        )
}
