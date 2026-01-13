package com.seanhammack.api.controller

import com.seanhammack.api.entity.Recipe
import com.seanhammack.api.service.RecipeService
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

@RestController
@RequestMapping("/recipes")
class RecipeController(
    private val recipeService: RecipeService,
) {
    @GetMapping
    fun getRecipes(
        @RequestParam(value = "q", required = false) query: String? = null,
    ): List<Recipe> {
        if (query != null) {
            return recipeService.searchRecipes(query)
        }

        return recipeService.getAllRecipes()
    }

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: UUID,
        @RequestBody recipe: Recipe,
    ): Recipe = recipeService.updateRecipe(id, recipe)

    @DeleteMapping("/{id}")
    fun delete(
        @PathVariable id: UUID,
    ) = recipeService.deleteRecipe(id)
}
