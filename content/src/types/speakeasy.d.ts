declare module "speakeasy" {
  export function generateSecret(options?: any): {
    base32: string;
    otpauth_url: string;
  };

  export function totp(options: {
    secret: string;
    encoding: string;
    token: string;
    window?: number;
  }): boolean;

}