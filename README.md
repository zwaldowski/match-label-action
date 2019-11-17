# Match Label Action

This action locates 
This action prints "Hello World" or "Hello" + the name of a person to greet to the log.

## Inputs

### `allowed`

**Required** The labels to look for. Separate via commas or newlines (using a block string).

## Outputs

### `match`

The one label from the `allowed` list that was located. The action will fail if no labels matched or more than one was found.

## Example usage

uses: zwaldowski/match-label-action@master
with:
  allowed: >
    major
    minor
    patch
