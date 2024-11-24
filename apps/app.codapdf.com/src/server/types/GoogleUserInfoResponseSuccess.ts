export interface GoogleUserInfoResponseSuccess {
  /** The unique identifier for the user within Google's systems. */
  id: string;

  /** The user's full name. */
  name?: string;

  /** The user's given name. */
  given_name?: string;

  /** The user's family name. */
  family_name?: string;

  /** The user's profile picture URL. */
  picture?: string;

  /** The user's email address. */
  email?: string;

  /** Whether the user's email has been verified. */
  verified_email?: boolean;

  /** The user's locale (language and country code). */
  locale?: string;
}
