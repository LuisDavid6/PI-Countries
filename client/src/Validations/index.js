export function validate(value) {
  if (value.name) {
    if (value.name.length < 3) return 'The name must be at least 3 characters'
    if (value.name[0] === ' ') return 'The name cannot start with a space'
    if (/[^a-zA-Z0-9 ]/g.test(value.name)) return 'Those types of characters are not allowed'
  }

  if (value.difficulty) {
    if (value.difficulty === 0) return 'You must select a difficulty'
  }

  if (value.duration) {
    if (value.duration <= 0) return 'Duration must be greater than 0'
    if (value.duration > 8) return 'The duration cannot exceed 8 hours'
  }
}
