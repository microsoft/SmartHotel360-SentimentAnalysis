#!/usr/bin/env bash
#
# reset-demo.sh - used after demoing to reset to clean state
# USAGE: reset-demo.sh
#

REPO="${HOME}/code/smarthotel360-dev"

# ========================
# Teardown local resources
# ========================
#echo "Tearing down Azure resources..."

# TBD

# ========================
# Teardown local resources
# ========================
echo "Resetting local resources..."

# Kill VS Code if running
osascript -e 'tell application "Code - Insiders" to quit'
osascript -e 'tell application "Code" to quit'

# Remove extensions
code-insiders --uninstall-extension ms-vscode.vscode-node-azure-pack
code-insiders --uninstall-extension wesbos.theme-cobalt2

# Delete VS Code - Insiders
rm -rf "/Applications/Visual Studio Code - Insiders.app"
rm -rf "${HOME}/Downloads/Visual Studio Code - Insiders.app"
rm -rf "${HOME}/Downloads/VSCode-darwin-insider.zip"

# Teardown dockerized app
docker system prune --volumes -f
docker rmi --no-prune sh360registry.azurecr.io/web
docker rmi --no-prune sh360devregistry.azurecr.io/web


# Reset git repo to pre-demo state
cd "${REPO}" || exit 1
git reset --hard && git clean -f -d

echo "Demo reset."