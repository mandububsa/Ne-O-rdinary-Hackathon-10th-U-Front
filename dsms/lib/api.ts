// lib/api.ts
// 공통 API 클라이언트. 모든 fetch는 이걸 통해서.
// 백엔드 응답 공통 형태: { data: T, ... } 로 가정 (data 없으면 응답 전체 반환).

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://zxcv9203.duckdns.org/api/v1';

// 이미지 등 정적 자원은 /api/v1 경로가 아니라 호스트 루트에서 서빙됨
export const API_ORIGIN = new URL(BASE_URL).origin;

// 백엔드가 내려주는 상대 경로(/recipe-images/...)를 절대 URL로 변환
export function assetUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${API_ORIGIN}${path}`;
}

type QueryValue = string | number | boolean | (string | number)[] | undefined | null;
export type Query = Record<string, QueryValue>;

// Spring Pageable 응답 형태
export type Page<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // 현재 페이지 (0-based)
  size: number;
  first: boolean;
  last: boolean;
};

function buildUrl(path: string, query?: Query): string {
  const url = new URL(`${BASE_URL}${path}`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null) continue;
      // 배열은 ?key=1&key=2 형태로 (Spring List 파라미터 기본 규칙)
      if (Array.isArray(value)) {
        value.forEach((v) => url.searchParams.append(key, String(v)));
      } else {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

async function request<T>(path: string, init?: RequestInit, query?: Query): Promise<T> {
  const res = await fetch(buildUrl(path, query), {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`API ${res.status} ${res.statusText} — ${path}`);
  }
  const json = await res.json();
  return (json?.data ?? json) as T;
}

export const api = {
  get: <T>(path: string, query?: Query) => request<T>(path, undefined, query),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: 'POST',
      body: body == null ? undefined : JSON.stringify(body),
    }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: 'PUT',
      body: body == null ? undefined : JSON.stringify(body),
    }),
  del: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};
