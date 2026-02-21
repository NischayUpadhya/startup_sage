console.log("🔥 REAL SERVER FILE LOADED 🔥")

import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

app.post("/analyze", async (req, res) => {
  const { title } = req.body

  console.log("Running live GitHub competitor search...")

  try {
    const baseQuery = title.split(" ").slice(0, 3).join(" ")
    const query = encodeURIComponent(baseQuery + " in:name,description")

    const githubRes = await fetch(
      `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=5`,
      {
        headers: {
          "User-Agent": "startup-sage-app"
        }
      }
    )

    console.log("GitHub Status:", githubRes.status)

    const githubData = await githubRes.json()

    const competitors = (githubData.items || []).map(repo => {

      let threatLevel = "Low"
      if (repo.stargazers_count > 5000) threatLevel = "High"
      else if (repo.stargazers_count > 1000) threatLevel = "Medium"

      let marketPosition =
        repo.stargazers_count > 5000
          ? "Market Leader"
          : repo.stargazers_count > 1000
          ? "Growing Player"
          : "Emerging"

      let gapOpportunity =
        repo.stargazers_count < 1000
          ? "High Opportunity"
          : repo.stargazers_count < 5000
          ? "Moderate Opportunity"
          : "Low Opportunity"

      return {
        name: repo.name,
        description: repo.description || "No description available",
        website: repo.html_url,
        stars: repo.stargazers_count,
        threatLevel,
        marketPosition,
        gapOpportunity
      }
    })

    // Top competitor
    const topCompetitor = competitors.length > 0 ? competitors[0] : null

    // Competition intensity
    const totalStars = competitors.reduce((sum, c) => sum + c.stars, 0)

    let competitionLevel = "Low"

    if (totalStars > 100000) {
      competitionLevel = "High"
    } else if (totalStars > 30000) {
      competitionLevel = "Medium"
    }

    // Differentiation advice
    const differentiationAdvice =
      competitionLevel === "High"
        ? "Highly competitive market. Focus on niche targeting, superior UX, or breakthrough AI capability."
        : competitionLevel === "Medium"
        ? "Moderate competition. Differentiation through features and branding will be key."
        : "Low competition. Strong opportunity to capture early market share."

    // Final response
    res.json({
      marketScore: 84,
      riskScore: 32,

      revenue: [
        "Subscription Model",
        "Freemium Tier",
        "Marketplace Commission"
      ],

      swot: {
        strengths: [
          "Strong problem-solution fit",
          "Scalable digital model"
        ],
        weaknesses: [
          "Requires strong user acquisition"
        ],
        opportunities: [
          "Expansion into global markets"
        ],
        threats: [
          "Established competitors"
        ]
      },

      suggestions: [
        "Focus on niche market first",
        "Add gamification features",
        "Build strong brand positioning"
      ],

      competitors,
      topCompetitor,
      competitionLevel,
      totalStars,
      differentiationAdvice
    })

  } catch (error) {
    console.error("ERROR:", error)
    res.status(500).json({ error: "Failed to fetch competitors" })
  }
})

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000")
})