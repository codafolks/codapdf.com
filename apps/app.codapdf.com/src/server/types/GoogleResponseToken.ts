export interface GoogleResponseTokenResponseError {
  /** A single ASCII error code. */
  error: string;

  /** Human-readable ASCII text providing additional information. */
  error_description?: string;

  /** A URI identifying a human-readable web page with information about the error. */
  error_uri?: string;
}

export interface GoogleResponseTokenResponseSuccess {
  /** The access token issued by the authorization server. */
  access_token: string;

  /** The type of token issued. For Google APIs, this is typically "Bearer". */
  token_type: "Bearer";

  /** The remaining lifetime of the access token in seconds. */
  expires_in: number;

  /** The scopes of access granted by the access token, expressed as a space-delimited, case-sensitive string. */
  scope?: string;

  /** A token that can be sent to the Google OAuth endpoint to obtain a new access token. */
  refresh_token?: string;

  /** A JWT that contains identity information about the user. */
  id_token?: string;
}

export type GoogleResponseToken = GoogleResponseTokenResponseError | GoogleResponseTokenResponseSuccess;
