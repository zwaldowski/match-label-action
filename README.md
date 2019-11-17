# Match Label Action

This action locates one of a given list of labels in the labels active on the workflow PR. You can use this to change what actions run when a PR merges, for instance.

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
