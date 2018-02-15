# shellcheck disable=SC2148
# -------------
# .bash_profile
# -------------

# Load Bash completions
[ -f "$(brew --prefix)"/etc/bash_completion ] && . "$(brew --prefix)"/etc/bash_completion

export PS1="\[\033[1;94m\]\w$\[\033[0m\] "

# Common aliases
alias cd..='cd ..' 
alias dir='ls -l' 
alias ..='cd ..' 
