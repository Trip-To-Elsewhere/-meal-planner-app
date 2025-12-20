#!/bin/bash

# Script to push your meal planner app to GitHub
# Usage: ./push-to-github.sh YOUR_REPO_NAME

REPO_NAME=${1:-meal-planner-app}
GITHUB_USERNAME="Trip-To-Elsewhere"

echo "📤 Pushing to GitHub..."
echo "Repository: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo ""

# Update remote URL
git remote set-url origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git

# Push to GitHub
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Success! Your code is now on GitHub!"
    echo "🔗 View it at: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    echo ""
    echo "🎯 Next step: Connect to Netlify"
else
    echo ""
    echo "❌ Push failed. Make sure:"
    echo "1. Repository exists on GitHub: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    echo "2. You're logged in to GitHub (might need to authenticate)"
    echo "3. Repository name is correct"
fi
