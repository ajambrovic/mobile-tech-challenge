export function isTournamentNameValid(name: string) {
  if (name.trim().length === 0) {
    return "Name can't be empty";
  }

  const foundNonAlphaNumOrWhiteSpaceCharacter =
    name.match('^[a-zA-Z0-9 ]*$') === null;
  if (foundNonAlphaNumOrWhiteSpaceCharacter) {
    return 'Invalid character found, only latin characters, numbers and spaces can be used';
  }
}

const DATE_FORMATTER = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'short',
  timeStyle: 'medium',
});

export function formatDate(date: string) {
  return DATE_FORMATTER.format(new Date(date));
}
