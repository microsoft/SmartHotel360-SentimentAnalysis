#!/usr/bin/env bash
#
# setup-local.sh - Run this *once* to install demo pre-reqs
# USAGE setup-local.sh
#

REPO_LOCATION="$HOME/code/smarthotel360-dev"
PROFILE="$REPO_LOCATION/deploy/.bash_profile"
GITCONFIG="$REPO_LOCATION/deploy/.gitconfig"
SETTINGS="$REPO_LOCATION/deploy/settings.json"

function getInfo {

    read -n 1 -r -p "WARNING: This script will replace your bash profile and VS Code Insiders settings. OK? [y/N]" ok
    
    # Install
    case ${ok:0:1} in
        y|Y ) install ;;
        * ) exit 0 ;;
    esac

}

function install {
    # ========================
    # Prep
    # ========================

    # Ask for the administrator password upfront
    # Needed for homebrew install and docker install
    echo ""
    echo "We need your local admin password to install: "
    sudo -v

    # Keep-alive: update existing `sudo` time stamp until script has finished
    while true; do sudo -n true; sleep 60; kill -0 "$$" || exit; done 2>/dev/null &

    # ========================
    # Demo-friendly macOS defaults
    # ========================

    osascript -e 'tell application "System Preferences" to quit'

    # Use F-keys by default
    defaults write NSGlobalDomain com.apple.keyboard.fnState -boolean true
    
    # Disable the “Are you sure you want to open this application?” dialog
    defaults write com.apple.LaunchServices LSQuarantine -bool false

    # Never go into computer sleep mode
    sudo systemsetup -setcomputersleep Off > /dev/null

    # Disable Notification Center and remove the menu bar icon
    # (Not working as of Sierra - Option+Click notification center to turn on DnD as workaround)
    launchctl unload -w /System/Library/LaunchAgents/com.apple.notificationcenterui.plist 2> /dev/null
    killall NotificationCenter

    # Disable smart quotes as they’re annoying when typing code
    defaults write NSGlobalDomain NSAutomaticQuoteSubstitutionEnabled -bool false

    # Disable smart dashes as they’re annoying when typing code
    defaults write NSGlobalDomain NSAutomaticDashSubstitutionEnabled -bool false

    # Disable automatic period substitution as it’s annoying when typing code
    defaults write NSGlobalDomain NSAutomaticPeriodSubstitutionEnabled -bool false

    # Disable automatic capitalization as it’s just annoying
    defaults write NSGlobalDomain NSAutomaticCapitalizationEnabled -bool false

    # Disable auto-correct
    defaults write NSGlobalDomain NSAutomaticSpellingCorrectionEnabled -bool false

    # "natural" scrolling is bullshit
    defaults write NSGlobalDomain com.apple.swipescrolldirection -bool false

    # You will need to reboot for all these to take effect.

    # ========================
    # Install demo tools
    # ========================

    # Install homebrew
    if ! [ -e /usr/local/bin/brew ]; then
        /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    fi;

    # Install Essentials
    brew update && brew upgrade

    brew install bash-completion
    brew install brew-cask-completion
    brew install git
    brew install node

    brew cask install docker
    brew install docker-completion
    brew install docker-compose-completion

    # Install cdias vanity items
    brew cask install google-chrome
    brew cask install iterm2
    brew tap caskroom/fonts
    brew cask install font-fira-code

    # Install demo-specific items 
    brew cask install slack
    
    # Install Azure CLI
    brew install azure-cli

    # Install .NET Core
    brew cask install dotnet-sdk

    # Install Functions runtime
    npm install -g azure-functions-core-tools@2.0.1-beta.20

    cd "$REPO_LOCATION/src/functions/AnalyzePendingTweet" || return
    func extensions install -p Microsoft.Azure.WebJobs.Extensions.CosmosDB -v 3.0.0-beta3-10558
    
    # ========================
    # Overwrite settings / configs
    # ========================

    # copy configs over
    cp -f "$PROFILE" "$HOME"/.bash_profile
    cp -f "$GITCONFIG" "$HOME"/.gitconfig
    cp -f "$SETTINGS" "$HOME/Library/Application Support/Code - Insiders/User/settings.json"

    echo "Done!"
    echo "You'll need to reboot for some macOS settings to take effect."
    read -n1 -r -p "Press any key to continue..."
    for app in "cfprefsd" "Dock" "Finder" "SystemUIServer" "Terminal"; do
	    killall "${app}" &> /dev/null
    done
}

getInfo;