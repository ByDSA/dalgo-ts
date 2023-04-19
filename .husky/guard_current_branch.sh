#!/bin/bash
set -e

. "$(dirname -- "$0")/_/husky.sh"

fatal_error() {
  message=${1:-"Error fatal"}
  echo "ERROR: $message"
  exit 1
}

assert_valid_current_branch() {
  echo "Comprobando ramas remotas ..."
  local remotes
  set +e
  remotes=$(git branch -a grep remotes)
  set -e

  if [ -z "$remotes" ]; then
    any_branch_flag=1
    echo "No hay ramas remotas. Primer push."
  else
    echo "Ramas remotas:"
    echo "$remotes"
  fi

  if [ -n "$any_branch_flag" ]; then
    echo "Se omite la verificación de la rama actual."
    exit 0
  fi

  local current_branch
  current_branch=$(git rev-parse --abbrev-ref HEAD)

  local match='^((fix)|(feat)|(chore))(\((.+)\))?\/(.+)$'

  if ! (echo "$current_branch" | grep -Eq "$match"); then
    fatal_error "No se puede editar diréctamente la rama $current_branch. El nombre de la rama debe cumplir el siguiente patrón: $match"
  fi
}

assert_valid_current_branch
