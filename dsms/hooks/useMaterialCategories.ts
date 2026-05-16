'use client'

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { MaterialCategoryWithChildren } from '@/types/recipe';

export function useMaterialCategories() {
  const [categories, setCategories] = useState<MaterialCategoryWithChildren[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await api.get<MaterialCategoryWithChildren[]>('/material-categories');
        setCategories(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading, isError };
}
