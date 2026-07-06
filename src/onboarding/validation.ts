const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function isProfileComplete(name: string, email: string): boolean {
  return name.trim().length > 0 && isValidEmail(email);
}
