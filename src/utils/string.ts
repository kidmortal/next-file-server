export function censorString(params: {
  numberOfCharactersToCensor: number;
  input?: string;
}) {
  if (!params.input) {
    return params.input; // Nothing to censor
  }

  if (params.numberOfCharactersToCensor <= 0) {
    return params.input; // Nothing to censor
  }

  const length = params.input.length;
  const numberOfCensoredCharacters = Math.min(
    params.numberOfCharactersToCensor,
    length
  );

  const censoredPart = "*".repeat(numberOfCensoredCharacters);
  const uncensoredPart = params.input.slice(numberOfCensoredCharacters);

  return censoredPart + uncensoredPart;
}
