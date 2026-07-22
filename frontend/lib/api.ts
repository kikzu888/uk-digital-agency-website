const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type AdminLoginResponse = {
  access_token: string;
  token_type: "bearer";
};

export type ContactSubmission = {
  id: number;
  first_name: string;
  last_name: string;
  company_name: string;
  email: string;
  phone: string;
  preferred_service: string;
  budget_range: string;
  project_description: string;
  privacy_consent: boolean;
  marketing_consent: boolean;
  status: string;
  created_at: string;
};

async function parseJsonResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  return (await response.json()) as T;
}

export async function loginAdmin(email: string, password: string): Promise<AdminLoginResponse> {
  const response = await fetch(`${apiUrl}/api/v1/admin/auth/login`, {
    body: JSON.stringify({ email, password }),
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
  return parseJsonResponse<AdminLoginResponse>(response);
}

export async function logoutAdmin(): Promise<void> {
  const response = await fetch(`${apiUrl}/api/v1/admin/auth/logout`, {
    credentials: "include",
    method: "POST",
  });
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
}

export async function fetchContactSubmissions(): Promise<ContactSubmission[]> {
  const response = await fetch(`${apiUrl}/api/v1/admin/contact-submissions`, {
    credentials: "include",
  });
  return parseJsonResponse<ContactSubmission[]>(response);
}
