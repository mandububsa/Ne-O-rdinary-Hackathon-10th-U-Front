"use server";

const BASE_URL = "https://zxcv9203.duckdns.org";

export interface Material {
  categoryId: number;
  name: string;
  measure: string;
}

export interface CreateRecipeRequest {
  name: string;
  description: string;
  mainMaterials: Material[];
  subMaterials: Material[];
}

export interface CreateRecipeResponse {
  code: string;
  data: {
    id: number;
  };
  responseTime: string;
}

export async function createRecipe(
  request: CreateRecipeRequest,
  image?: File | null,
): Promise<CreateRecipeResponse> {
  const formData = new FormData();

  // request 파트는 JSON 문자열로 변환하여 추가
  formData.append("request", JSON.stringify(request));

  // image 파트는 파일이 있으면 파일을, 없으면 빈 문자열을 추가
  if (image) {
    formData.append("image", image);
  } else {
    formData.append("image", "");
  }

  const response = await fetch(`${BASE_URL}/api/v1/recipes`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("API Error Response:", errorBody);
    throw new Error(
      `Failed to create recipe: ${response.status} ${response.statusText} - ${errorBody}`,
    );
  }

  return response.json();
}
