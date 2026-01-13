package com.seanhammack.api.repository

import com.seanhammack.api.entity.Restaurant
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface RestaurantRepository : JpaRepository<Restaurant, UUID>
