# Match Label Action

This action locates one of a given list of labels in the labels active on the workflow PR. You can use this to change what actions run when a PR merges, for instance.

## Inputs

While `allowed` and `allowed_multiple` are both optional, at least one of either is required.

### `allowed`

**Optional** The labels to look for to match exactly one of. Separate via commas or newlines (using a block string).

### `allowed_multiple`

**Optional** The labels to look for to match many of. Separate via commas or newlines (using a block string).

### `default_match`

**Optional** A value to return if no matching labels are found.  If this value is not specified and no matching labels are found, this action will exit with a failing code.

## Outputs

### `match`

The one label from the `allowed` or `allowed_multiple` list that was located.  If no `default_match` is specified, the action will fail if no labels matched or more than one was found.

## Example usage

```yaml
uses: zwaldowski/match-label-action@v3
with:
  allowed: major, minor, patch
```
