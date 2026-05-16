'use client'

import { useState, useEffect } from 'react';

interface MaterialCategory {
  id: number;
  name: string;
  children: MaterialCategory[];
}

export function useMaterialCategories() {
  const [categories, setCategories] = useState<MaterialCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      console.log("요청!")
      try {
        const response = await fetch('https://zxcv9203.duckdns.org/api/v1/material-categories');
        console.log("요청 성공?")
        const json = await response.json();
        setCategories(json.data);
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